import { ipcMain } from 'electron'
import { session } from 'electron'
import { MongoClient, ObjectId } from 'mongodb'
import * as dotenv from 'dotenv'
import { join } from 'path'
import { generateRoomCode, generateTag } from './helper/methods'
import bcrypt from 'bcrypt'
import crypto from 'crypto'

// 환경 변수 로드
dotenv.config({ path: join(__dirname, '../../.env') })

const client = new MongoClient(process.env.MONGO_URI!)
let db

async function connectToMongo() {
  if (!db) {
    await client.connect()
    db = client.db('chat')
    console.log('MongoDB 연결 완료!')

    // expiresAt 시간이 지나면 자동으로 도큐먼트 삭제하도록 TTL인덱스 설정
    await db.collection('sessions').createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0 })
  }
}

ipcMain.handle('local-register', async (_, { email, password, nickname }) => {
  try {
    await connectToMongo()

    const user = await db.collection('users').findOne({ email })
    if (user) {
      return { success: false, error: '이미 존재하는 이메일입니다' }
    }

    const tag = generateTag()

    await db
      .collection('users')
      .insertOne({ email, password: bcrypt.hashSync(password, 10), nickname, tag })
    return { success: true }
  } catch (error) {
    console.error('사용자 등록 실패:', error)
    return { success: false, error }
  }
})

ipcMain.handle('local-login', async (_, { email, password }) => {
  try {
    await connectToMongo()
    const user = await db.collection('users').findOne({ email })

    if (!user) {
      return { success: false, error: '사용자를 찾을 수 없습니다' }
    }

    if (!bcrypt.compareSync(password, user.password)) {
      console.log('비밀번호가 일치하지 않습니다')
      return { success: false, error: '비밀번호가 일치하지 않습니다' }
    }

    // 세션 생성
    const sessionId = crypto.randomUUID()
    // const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7일 후 만료
    const expiresAt = new Date(Date.now() + 1000 * 60 * 60) // 1시간 후 만료

    await db.collection('sessions').insertOne({
      sessionId,
      userId: user._id.toString(),
      expiresAt,
      createdAt: new Date()
    })

    // 쿠키 설정
    session.defaultSession.cookies.set({
      url: 'http://localhost',
      name: 'sessionId',
      value: sessionId,
      httpOnly: false,
      secure: false,
      path: '/',
      expirationDate: expiresAt.getTime() / 1000
    })

    return { success: true, user }
  } catch (error) {
    console.error('로그인 실패:', error)
    return { success: false, error }
  }
})

ipcMain.handle('get-local-user', async () => {
  try {
    await connectToMongo()

    const cookies = await session.defaultSession.cookies.get({ name: 'sessionId' })
    if (!cookies.length) return null

    const sessionId = cookies[0].value
    const sessionDoc = await db.collection('sessions').findOne({
      sessionId,
      expiresAt: { $gt: new Date() }
    })

    if (!sessionDoc) return null

    const user = await db.collection('users').findOne({ _id: new ObjectId(sessionDoc.userId) })
    return { nickname: user.nickname, tag: user.tag, _id: user._id.toString() }
  } catch (error) {
    console.error('사용자 정보 조회 실패:', error)
    return null
  }
})

ipcMain.handle('local-logout', async () => {
  try {
    const cookies = await session.defaultSession.cookies.get({ name: 'sessionId' })
    if (cookies.length) {
      const sessionId = cookies[0].value
      await db.collection('sessions').deleteOne({ sessionId })
      await session.defaultSession.cookies.remove('http://localhost', 'sessionId')
    }
    return { success: true }
  } catch (error) {
    console.error('로그아웃 실패:', error)
    return { success: false, error }
  }
})

ipcMain.handle('create-room', async (_, roomInfo: { password?: string; maxUsers?: number }) => {
  try {
    await connectToMongo()

    const roomCode = generateRoomCode()
    const rooms = db.collection('rooms')

    const newRoom = {
      roomCode,
      password: roomInfo.password || null,
      maxUsers: roomInfo.maxUsers || 4,
      createdAt: new Date()
    }

    const result = await rooms.insertOne(newRoom)
    return { roomId: result.insertedId.toString(), roomCode }
  } catch (err) {
    console.error('MongoDB 방 생성 에러:', err)
    throw new Error('MongoDB 방 생성 에러')
  }
})
