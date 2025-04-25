import {
  Calendar,
  ChevronRight,
  Home,
  Inbox,
  LogOut,
  MessageCirclePlus,
  MoreHorizontal,
  Pencil,
  Plus,
  Search,
  Settings,
  Trash2,
  User,
  User2
} from 'lucide-react'

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroupAction,
  SidebarMenuAction
} from '@renderer/components/ui/sidebar'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@renderer/components/ui/dropdown-menu'
import { AddRoomDialog } from './AddRoomDialog'
import { useAuthStore } from './store/authStore'
import { LoginDialog } from './LoginDialog'
import { RegisterDialog } from './RegisterDialog'
import { Button } from './components/ui/button'
import kakaoLoginImage from './assets/kakao.png'
const items = [
  {
    title: 'Home',
    url: '#',
    icon: Home
  },
  {
    title: 'Inbox',
    url: '#',
    icon: Inbox
  },
  {
    title: 'Calendar',
    url: '#',
    icon: Calendar
  },
  {
    title: 'Search',
    url: '#',
    icon: Search
  },
  {
    title: 'Settings',
    url: '#',
    icon: Settings
  }
]

export function AppSidebar() {
  const { isAuthenticated, user, setUser } = useAuthStore()

  const handleKakaoLogin = async () => {
    const user = await window.api.loginKakao()
    console.log(user)
    setUser(user)
  }

  const handleLogout = async () => {
    await window.api.localLogout()
    setUser(null)
  }

  if (!isAuthenticated) {
    return (
      <Sidebar className="h-screen flex flex-col justify-center items-center">
        <SidebarContent className="flex justify-center items-center p-5">
          <h2 className="text-xl font-semibold mb-2">채팅을 시작해보세요</h2>

          <div className="w-full space-y-2 flex flex-col items-center">
            <LoginDialog />
            <div className="flex items-center gap-2">
              <span className="text-xs">계정이 없으신가요?</span>
              <RegisterDialog />
            </div>
            <Button variant="ghost" className="p-0 cursor-pointer" onClick={handleKakaoLogin}>
              <img src={kakaoLoginImage} alt="kakao-login" className="size-full object-fit" />
            </Button>
          </div>

          <div className="mt-1 text-sm text-gray-500 text-center">
            <p>계정이 없으신가요? 지금 가입하시면</p>
            <p>모든 기능을 무료로 이용할 수 있습니다</p>
          </div>
        </SidebarContent>
      </Sidebar>
    )
  }

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>채팅방</SidebarGroupLabel>
          <SidebarGroupAction title="채팅방 추가" className="cursor-pointer">
            <AddRoomDialog />
          </SidebarGroupAction>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url} onClick={() => alert(item.title)}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild className="cursor-pointer">
                      <SidebarMenuAction showOnHover>
                        <MoreHorizontal />
                        <span className="sr-only">More</span>
                      </SidebarMenuAction>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-48 rounded-lg" side="right" align="start">
                      <DropdownMenuItem>
                        <Pencil className="text-muted-foreground" />
                        <span>채팅방 이름 수정</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Plus className="text-muted-foreground" />
                        <span>친구 추가</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <LogOut className="text-muted-foreground" />
                        <span>채팅방 나가기</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild className="cursor-pointer">
                <SidebarMenuButton>
                  <User2 /> {user?.nickname}#{user?.tag}
                  <ChevronRight className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="left" className="w-[--radix-popper-anchor-width]">
                <DropdownMenuItem>
                  <User className="text-muted-foreground" />
                  <span>내 계정</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="text-muted-foreground" />
                  <span>설정</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="text-muted-foreground" />
                  <span>로그아웃</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
