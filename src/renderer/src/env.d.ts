/// <reference types="vite/client" />

interface Window {
  api: {
    createRoom: (password?: string, maxUsers?: number) => Promise<{ data: string }>
    localRegister: (
      email: string,
      password: string,
      nickname: string
    ) => Promise<{ success: boolean }>
    localLogin: (
      email: string,
      password: string
    ) => Promise<{ success: boolean; user?: User; error?: string }>
    getLocalUser: () => Promise<User | null>
    localLogout: () => Promise<void>
    loginKakao: () => Promise<any>
  }
}
