import Image from "next/image"
import { Card, CardContent } from "../ui/card"
import { Button } from "../ui/button"
import { MenuIcon } from "lucide-react"
import { Sheet, SheetTrigger } from "../ui/sheet"
import SidebarSheet from "../SidebarSheet"
import Link from "next/link"

const Header = () => {
  return (
    <Card className="p-0 lg:py-3">
      <CardContent className="flex flex-row items-center justify-between p-5">
        <Link href="/">
          <Image alt="FSW Barber" src="/Logo.png" height={18} width={120} />
        </Link>
        <Sheet>
          <SheetTrigger asChild className="lg:hidden">
            <Button size="icon" variant="outline">
              <MenuIcon />
            </Button>
          </SheetTrigger>
          <SidebarSheet />
        </Sheet>
        <div className="hidden items-center gap-5 lg:flex">
          <p>Agendamentos</p>
          <p>Login</p>
        </div>
      </CardContent>
    </Card>
  )
}

export default Header
