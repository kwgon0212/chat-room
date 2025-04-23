import {
  Calendar,
  ChevronRight,
  Home,
  Inbox,
  LogOut,
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
import { AddFriendDialog } from './AddFriendDialog'

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
  },
  {
    title: 'Settings',
    url: '#',
    icon: Settings
  },
  {
    title: 'Settings',
    url: '#',
    icon: Settings
  },
  {
    title: 'Settings',
    url: '#',
    icon: Settings
  },
  {
    title: 'Settings',
    url: '#',
    icon: Settings
  },
  {
    title: 'Settings',
    url: '#',
    icon: Settings
  },
  {
    title: 'Settings',
    url: '#',
    icon: Settings
  },
  {
    title: 'Settings',
    url: '#',
    icon: Settings
  },
  {
    title: 'Settings',
    url: '#',
    icon: Settings
  },
  {
    title: 'Settings',
    url: '#',
    icon: Settings
  },
  {
    title: 'Settings',
    url: '#',
    icon: Settings
  },
  {
    title: 'Settings',
    url: '#',
    icon: Settings
  },
  {
    title: 'Settings',
    url: '#',
    icon: Settings
  },
  {
    title: 'Settings',
    url: '#',
    icon: Settings
  },
  {
    title: 'Settings',
    url: '#',
    icon: Settings
  },
  {
    title: 'Settings',
    url: '#',
    icon: Settings
  },
  {
    title: 'Settings',
    url: '#',
    icon: Settings
  },
  {
    title: 'Settings',
    url: '#',
    icon: Settings
  },
  {
    title: 'Settings',
    url: '#',
    icon: Settings
  },
  {
    title: 'Settings',
    url: '#',
    icon: Settings
  }
]

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>채팅방</SidebarGroupLabel>
          <SidebarGroupAction title="채팅방 추가" className="cursor-pointer">
            <AddFriendDialog />
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
                  <User2 /> Username
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
                <DropdownMenuItem>
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
