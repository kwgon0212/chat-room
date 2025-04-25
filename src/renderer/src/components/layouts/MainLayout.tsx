import { Outlet, useLocation } from 'react-router-dom'

import { AppSidebar } from '@renderer/AppSiderbar'
import { SidebarProvider, SidebarTrigger } from '../ui/sidebar'
import { Separator } from '../ui/separator'

export function MainLayout() {
  const pathname = useLocation().pathname.split('/')[1]

  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="w-full h-screen flex flex-col">
        <header className="border-b flex items-center gap-2 p-2">
          <SidebarTrigger />
          <div className="h-5 flex justify-center items-center mr-2">
            <Separator orientation="vertical" />
          </div>
          <h2>{pathname}</h2>
        </header>
        <main className="size-full p-2">
          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  )
}
