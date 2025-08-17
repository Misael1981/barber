"use client"

import { SheetClose, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet"
import { Button } from "../ui/button"
import Link from "next/link"
import { Calendar1Icon, HomeIcon, LogInIcon, LogOutIcon } from "lucide-react"
import Image from "next/image"
import { quickSearchOptions } from "@/app/_constants/search"
import { Avatar, AvatarImage } from "../ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog"
import { signIn, signOut, useSession } from "next-auth/react"

const SidebarSheet = () => {
  const { data } = useSession()
  const handleLogoutClick = () => signOut()
  const handleLoginClick = () => signIn("google")

  return (
    <SheetContent className="overflow-y-auto">
      <SheetHeader>
        <SheetTitle className="text-left">Menu</SheetTitle>
      </SheetHeader>

      <div className="flex items-center justify-between gap-3 border-b border-solid py-5">
        {data?.user ? (
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage src={data?.user?.image ?? ""} />
            </Avatar>

            <div>
              <p className="font-bold">{data.user.name}</p>
              <p className="text-xs">{data.user.email}</p>
            </div>
          </div>
        ) : (
          <>
            <h2 className="font-bold">Olá, faça seu login!</h2>
            <Dialog>
              <DialogTrigger asChild>
                <Button size="icon">
                  <LogInIcon />
                </Button>
              </DialogTrigger>
              <DialogContent className="w-[90%]">
                <DialogHeader>
                  <DialogTitle>Faça login na plataforma</DialogTitle>
                  <DialogDescription>
                    Conecte-se usando sua conta do Google
                  </DialogDescription>
                </DialogHeader>
                <Button
                  variant="outline"
                  className="gap-2 font-bold"
                  onClick={handleLoginClick}
                >
                  <Image
                    src="/google.svg"
                    alt="Ícone do Google"
                    width={18}
                    height={18}
                  />
                  Google
                </Button>
              </DialogContent>
            </Dialog>
          </>
        )}
      </div>

      {/* <div className="flex items-center justify-between gap-3 border-b border-solid p-5">
        <h2 className="font-bold">Olá, faça seu login!</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button size="icon">
              <LogInIcon />
            </Button>
          </DialogTrigger>
          <DialogContent className="w-[90%]">
            <DialogHeader>
              <DialogTitle>Faça login na plataforma</DialogTitle>
              <DialogDescription>
                Conecte-se usando sua conta do Google
              </DialogDescription>
            </DialogHeader>
            <Button
              variant="outline"
              className="gap-2 font-bold"
              onClick={handleLoginWithGoogleClick}
            >
              <Image
                src="/google.svg"
                alt="Ícone do Google"
                width={18}
                height={18}
              />
              Google
            </Button>
          </DialogContent>
        </Dialog>
      </div> */}

      <div className="flex flex-col gap-2 border-b border-solid py-5">
        <SheetClose asChild>
          <Button className="justify-start gap-2" variant="ghost" asChild>
            <Link href="/">
              <HomeIcon size={18} />
              Início
            </Link>
          </Button>
        </SheetClose>
        <Button className="justify-start gap-2" variant="ghost">
          <Calendar1Icon size={18} />
          Agendamentos
        </Button>
      </div>

      <div className="flex flex-col gap-2 border-b border-solid py-5">
        {quickSearchOptions.map((opition) => (
          <Button
            key={opition.title}
            className="justify-start gap-2"
            variant="ghost"
          >
            <Image
              src={opition.imageUrl}
              alt={opition.title}
              width={18}
              height={18}
            />
            {opition.title}
          </Button>
        ))}
      </div>

      <div className="flex flex-col gap-2 py-5">
        <Button
          variant="ghost"
          className="justify-start gap-2"
          onClick={handleLogoutClick}
        >
          <LogOutIcon size={18} />
          Sair da conta
        </Button>
      </div>
    </SheetContent>
  )
}

export default SidebarSheet
