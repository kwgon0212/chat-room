import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer
const api = {
  getData: () => ipcRenderer.invoke('get-data'),
  createRoom: (password?: string, maxUsers?: number) =>
    ipcRenderer.invoke('create-room', { password, maxUsers }),
  localRegister: (email: string, password: string, nickname: string) =>
    ipcRenderer.invoke('local-register', { email, password, nickname }),
  localLogin: (email: string, password: string) =>
    ipcRenderer.invoke('local-login', { email, password }),
  getLocalUser: () => ipcRenderer.invoke('get-local-user'),
  localLogout: () => ipcRenderer.invoke('local-logout'),
  loginKakao: () => ipcRenderer.invoke('login-kakao')
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
