import Link from "next/link"
import { Button } from "../ui/button"
import { Calendar1Icon } from "lucide-react"

const AppointmentsButton = () => {
  return (
    <Button variant="ghost" asChild>
      <Link href="/bookings" className="lg:text-lg">
        <Calendar1Icon size={18} />
        Agendamentos
      </Link>
    </Button>
  )
}

export default AppointmentsButton
