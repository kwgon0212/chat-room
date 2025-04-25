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
import { useEffect, useState } from 'react'

export function RegisterDialog() {
  const [userId, setUserId] = useState('')
  const [userPassword, setUserPassword] = useState('')
  const [userPasswordConfirm, setUserPasswordConfirm] = useState('')
  const [userNickname, setUserNickname] = useState('')
  const [error, setError] = useState('')
  const [open, setOpen] = useState(false)

  const handleReigster = async () => {
    if (!userId || !userPassword || !userPasswordConfirm || !userNickname) {
      setError('모든 항목을 입력해주세요')
      return
    }
    if (userPassword !== userPasswordConfirm) {
      setError('비밀번호가 일치하지 않습니다')
      return
    }

    const res = await window.api.localRegister(userId, userPassword, userNickname)
    console.log(res)
    setOpen(false)
  }

  useEffect(() => {
    if (!open) {
      setUserId('')
      setUserPassword('')
      setUserPasswordConfirm('')
      setUserNickname('')
      setError('')
    }
  }, [open])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="link" className="cursor-pointer w-fit text-xs p-0">
          회원가입
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>회원가입</DialogTitle>
          {/* <DialogDescription>로그인 후 이용해주세요</DialogDescription> */}
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              아이디
            </Label>
            <Input
              id="userId"
              required
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
              required
              type="password"
              value={userPassword}
              placeholder="비밀번호를 입력해주세요"
              className="col-span-3"
              onChange={(e) => setUserPassword(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              비밀번호 확인
            </Label>
            <Input
              id="userPasswordConfirm"
              required
              type="password"
              value={userPasswordConfirm}
              placeholder="비밀번호를 입력해주세요"
              className="col-span-3"
              onChange={(e) => setUserPasswordConfirm(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              닉네임
            </Label>
            <Input
              id="userNickname"
              required
              type="text"
              value={userNickname}
              placeholder="닉네임을 입력해주세요"
              className="col-span-3"
              onChange={(e) => setUserNickname(e.target.value)}
            />
          </div>
          {error && (
            <div className="grid grid-cols-4 items-center">
              <p className="text-center text-red-500 text-sm col-span-4">{error}</p>
            </div>
          )}
        </div>
        <DialogFooter>
          <Button type="submit" className="w-full cursor-pointer" onClick={handleReigster}>
            회원가입
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
