"use client"

import { CircleUserRound } from "lucide-react"
import { Button } from "../ui/button"
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog"
import SignInDialog from "../SignInDialog"

const LoginButton = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <CircleUserRound size={20} className="h-[20px] w-[20px]" />
          <p>Login</p>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <SignInDialog />
      </DialogContent>
    </Dialog>
  )
}

export default LoginButton
