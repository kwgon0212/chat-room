// src/providers/AuthProvider.tsx
import { useAuthStore } from '@renderer/store/authStore'
import { ReactNode, useEffect } from 'react'

interface Props {
  children: ReactNode
}

const AuthProvider = ({ children }: Props) => {
  const { setUser } = useAuthStore()
  // const setUser = useAuthStore((state) => state.setUser)
  function getCookie(name: string) {
    let matches = document.cookie.match(
      new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
    )
    return matches ? decodeURIComponent(matches[1]) : undefined
  }

  const sessionId = getCookie('sessionId')

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (!sessionId) {
          console.log('sessionId 쿠키가 없습니다.')
          return
        }

        const res = await window.api.getLocalUser()
        console.log(res)

        setUser(res)
      } catch (err) {
        console.error('유저 정보 로딩 실패:', err)
        setUser(null)
      }
    }

    fetchUser()
  }, [setUser, sessionId])

  return <>{children}</>
}

export default AuthProvider
