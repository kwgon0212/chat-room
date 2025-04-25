import { useAuthStore } from './store/authStore'
import { MessageCircle } from 'lucide-react'

const Home = () => {
  const { isAuthenticated } = useAuthStore()

  const handleClickCreateRoom = async () => {
    const data = await window.api.createRoom()
    console.log(data)
  }

  return (
    <div className="size-full flex items-center justify-center">
      <div className="text-center text-gray-500 flex flex-col items-center gap-5">
        <MessageCircle size={50} />
        <div>
          <h2 className="text-xl font-semibold mb-2">채팅방을 선택해주세요</h2>
          <p>왼쪽 사이드바에서 채팅방을 선택하거나 새 채팅을 시작하세요.</p>
        </div>
      </div>
    </div>
  )
}

export default Home
