"use client"

import Image from "next/image"
import { Card, CardContent } from "../ui/card"
import { Button } from "../ui/button"
import { MenuIcon } from "lucide-react"
import { Sheet, SheetTrigger } from "../ui/sheet"
import SidebarSheet from "../SidebarSheet"
import Link from "next/link"
import AppointmentsButton from "../AppointmentsButton"
import LoginButton from "../LoginButton"
import { useSession } from "next-auth/react"
import { Avatar, AvatarImage } from "../ui/avatar"
import Search from "../Search"
import { usePathname } from "next/navigation"

const Header = () => {
  const { data } = useSession()
  const pathname = usePathname()

  return (
    <Card className="p-0 lg:py-3">
      <CardContent className="flex flex-row items-center justify-between p-5">
        <Link href="/">
          <Image alt="FSW Barber" src="/Logo.png" height={18} width={120} />
        </Link>
        <div className="hidden w-[600px] lg:block">
          {pathname !== "/" && <Search />}
        </div>
        <Sheet>
          <SheetTrigger asChild className="lg:hidden">
            <Button size="icon" variant="outline">
              <MenuIcon />
            </Button>
          </SheetTrigger>
          <SidebarSheet />
        </Sheet>
        <div className="hidden items-center gap-5 lg:flex">
          <AppointmentsButton />
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
            <LoginButton />
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export default Header
