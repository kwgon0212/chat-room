import { HashRouter, Routes, Route, useNavigate } from 'react-router-dom'
import Home from './Home'
import { ThemeProvider } from './components/theme-provider'
import { ThemeToggle } from './components/theme-toggle'
import { MainLayout } from './components/layouts/MainLayout'
import { Button } from './components/ui/button'

function App(): React.JSX.Element {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <HashRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/callback" element={<p>로그인중입니다...</p>} />
            <Route
              path="/test"
              element={
                <>
                  <Button>
                    <a href="/home">Home으로</a>
                  </Button>
                </>
              }
            >
              <Route path="123" element={<>123</>} />
            </Route>
          </Route>
        </Routes>
      </HashRouter>
      <ThemeToggle />
    </ThemeProvider>
  )
}

export default App
