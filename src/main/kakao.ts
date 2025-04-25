import { BrowserWindow, ipcMain } from 'electron'
import dotenv from 'dotenv'
import { join } from 'path'

dotenv.config({ path: join(__dirname, '../../.env') })

const API_KEY = process.env.KAKAO_REST_API_KEY!
const REDIRECT_URI = process.env.KAKAO_REDIRECT_URI!

ipcMain.handle('login-kakao', async () => {
  return new Promise((resolve, reject) => {
    const authWindow = new BrowserWindow({
      width: 500,
      height: 700,
      show: true,
      webPreferences: {
        nodeIntegration: false
      }
    })

    const authUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`

    authWindow.loadURL(authUrl)

    // 1. 리다이렉트 감지
    authWindow.webContents.on('will-redirect', async (event, url) => {
      const parsedUrl = new URL(url)
      const code = parsedUrl.searchParams.get('code')

      if (code) {
        event.preventDefault()
        authWindow.close()

        try {
          // 2. access_token 요청
          const tokenRes = await fetch('https://kauth.kakao.com/oauth/token', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({
              grant_type: 'authorization_code',
              client_id: API_KEY,
              redirect_uri: REDIRECT_URI,
              code
            })
          })

          const tokenData = await tokenRes.json()

          // 3. 유저 정보 요청
          const userRes = await fetch('https://kapi.kakao.com/v2/user/me', {
            headers: {
              Authorization: `Bearer ${tokenData.access_token}`,
              'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
            }
          })

          const user = await userRes.json()
          console.log(user)
          resolve(user)
        } catch (err) {
          reject(err)
        }
      }
    })
  })
})
