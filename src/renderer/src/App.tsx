import { SidebarProvider } from '@renderer/components/ui/sidebar'
import { HashRouter, Routes, Route } from 'react-router-dom'
import Home from './Home'
import AboutPage from './about/page'
import { AppSidebar } from './AppSiderbar'
import { SidebarTrigger } from './components/ui/sidebar'

function App(): React.JSX.Element {
  const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarTrigger />
      <HashRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </HashRouter>
    </SidebarProvider>
  )
}

export default App
