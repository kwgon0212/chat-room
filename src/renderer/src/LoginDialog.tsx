import { Button } from '@renderer/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@renderer/components/ui/dialog'
import { Input } from '@renderer/components/ui/input'
import { Label } from '@renderer/components/ui/label'
import { Loader2 } from 'lucide-react'
import { useState } from 'react'
import { useAuthStore } from './store/authStore'

export function LoginDialog() {
  const [userId, setUserId] = useState('')
  const [userPassword, setUserPassword] = useState('')
  const [error, setError] = useState('')
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async () => {
    const { setUser } = useAuthStore.getState()
    setIsLoading(true)
    const res = await window.api.localLogin(userId, userPassword)
    if (res.success) {
      setOpen(false)
      setUser(res.user)
    } else {
      setError('아이디 또는 비밀번호가 일치하지 않습니다')
    }
    setIsLoading(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full cursor-pointer">로그인</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>로그인</DialogTitle>
          {/* <DialogDescription>로그인 후 이용해주세요</DialogDescription> */}
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              아이디
            </Label>
            <Input
              id="userId"
              value={userId}
              placeholder="아이디를 입력해주세요"
              className="col-span-3"
              onChange={(e) => setUserId(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              비밀번호
            </Label>
            <Input
              id="userPassword"
              type="password"
              value={userPassword}
              placeholder="비밀번호를 입력해주세요"
              className="col-span-3"
              onChange={(e) => setUserPassword(e.target.value)}
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
        <DialogFooter>
          <Button type="submit" className="w-full" onClick={handleLogin}>
            {isLoading ? <Loader2 className="size-4 animate-spin" /> : '로그인'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
