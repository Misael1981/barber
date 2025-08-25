"use client"

import Image from "next/image"
import { Button } from "../ui/button"
import { Card, CardContent } from "../ui/card"
import { Sheet } from "../ui/sheet"
import { useState } from "react"
import { useSession } from "next-auth/react"
import { Dialog, DialogContent } from "../ui/dialog"
import SignInDialog from "../SignInDialog"
import Reservation from "../Reservation"

const ServiceItem = ({ service, barberShop }) => {
  // 1. Não exibir horários que já foram agendados
  const [selectedDay, setSelectedDay] = useState(null)
  const [selectedTime, setSelectedTime] = useState(null)
  const [dayBookings, setDayBookings] = useState([])
  const [bookingSheetIsOpen, setBookingSheetIsOpen] = useState(false)
  const [signInDialogIsOpen, setSignInDialogIsOpen] = useState(false)

  const { data } = useSession()

  const handleBookingClick = () => {
    if (data?.user) {
      return setBookingSheetIsOpen(true)
    }
    return setSignInDialogIsOpen(true)
  }

  const handleBookingSheetOpenChange = () => {
    setSelectedDay(undefined)
    setSelectedTime(undefined)
    setDayBookings([])
    setBookingSheetIsOpen(false)
  }

  return (
    <>
      <Card className="p-0 lg:h-fit lg:w-[500px]">
        <CardContent className="flex items-center gap-3 p-3">
          <div className="relative max-h-[110px] min-h-[110px] min-w-[110px] max-w-[110px]">
            <Image
              alt={service.name}
              src={service.imageUrl}
              fill
              className="rounded-xl object-cover"
            />
          </div>
          <div className="space-y-2 p-0 lg:flex-1">
            <h3 className="text-sm font-semibold">{service.name}</h3>
            <p className="text-sm text-gray-400">{service.description}</p>
            <div className="flex items-center justify-between">
              <p className="text-sm font-bold text-primary">
                {Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(Number(service.price))}
              </p>

              <Sheet
                open={bookingSheetIsOpen}
                onOpenChange={handleBookingSheetOpenChange}
              >
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={handleBookingClick}
                >
                  Reservar
                </Button>

                <Reservation
                  service={service}
                  barberShop={barberShop}
                  selectedDay={selectedDay}
                  setSelectedDay={setSelectedDay}
                  selectedTime={selectedTime}
                  setSelectedTime={setSelectedTime}
                  dayBookings={dayBookings}
                  setDayBookings={setDayBookings}
                />
              </Sheet>
            </div>
          </div>
        </CardContent>
      </Card>

      <Dialog
        open={signInDialogIsOpen}
        onOpenChange={(open) => setSignInDialogIsOpen(open)}
      >
        <DialogContent className="w-[90%]">
          <SignInDialog />
        </DialogContent>
      </Dialog>
    </>
  )
}

export default ServiceItem
