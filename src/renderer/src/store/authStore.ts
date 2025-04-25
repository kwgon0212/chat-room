import { create } from 'zustand'

interface User {
  _id: string
  email: string
  password: string
  nickname: string
  tag: string
}

interface AuthState {
  user: User | null
  setUser: (user: User | null) => void
  isAuthenticated: boolean
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  setUser: (user) => set({ user, isAuthenticated: !!user }),
  isAuthenticated: false
}))
