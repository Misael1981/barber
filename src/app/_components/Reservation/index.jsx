"use client"

import { ptBR } from "date-fns/locale"
import { format, set } from "date-fns"
import { Button } from "../ui/button"
import { Calendar } from "../ui/calendar"
import {
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "../ui/sheet"
import { TIME_LIST } from "@/app/_constants/timeList"
import { Card, CardContent } from "../ui/card"
import { createBooking } from "@/app/_actions/create-booking"
import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { toast } from "sonner"
import { getBookings } from "@/app/_actions/get-bookings"

// Função para gerar a lista de horários disponíveis
const getTimeList = ({ bookings, selectedDay }) => {
  return TIME_LIST.filter((time) => {
    const hour = Number(time.split(":")[0])
    const minutes = Number(time.split(":")[1])

    const hasBookingOnCurrentTime = bookings.some(
      (booking) =>
        booking.date.getHours() === hour &&
        booking.date.getMinutes() === minutes,
    )
    if (hasBookingOnCurrentTime) {
      return false
    }
    return true
  })
}

const Reservation = ({
  service,
  barberShop,
  selectedDay,
  setSelectedDay,
  selectedTime,
  setSelectedTime,
  dayBookings,
  setDayBookings,
}) => {
  const { data } = useSession()

  useEffect(() => {
    const fetch = async () => {
      if (!selectedDay) {
        console.log("selectedDay não definido, não buscando agendamentos")
        return
      }
      const bookings = await getBookings({
        date: selectedDay,
        serviceId: service.id,
      })
      setDayBookings(bookings)
    }
    console.log("useEffect")
    fetch()
  }, [selectedDay])

  const handleDateSelect = (date) => {
    setSelectedDay(date)
  }

  const handleTimeSelect = (time) => {
    setSelectedTime(time)
  }
  //   Função para criar agendamento
  const handleCreateBooking = async () => {
    try {
      if (!selectedDay || !selectedTime) {
        console.log("Cancelando: selectedDay ou selectedTime não definidos")
        return
      }

      const hour = selectedTime.split(":")[0]
      const minute = selectedTime.split(":")[1]

      const newDate = new Date(
        selectedDay.getFullYear(),
        selectedDay.getMonth(),
        selectedDay.getDate(),
        Number(hour),
        Number(minute),
      )

      console.log("Horário selecionado:", selectedTime)
      console.log("Data após set:", newDate)
      console.log("Hora local após set:", newDate.getHours())
      console.log("Hora UTC após set:", newDate.getUTCHours())

      await createBooking({
        serviceId: service.id,
        userId: data?.user.id,
        date: newDate,
      })

      toast.success("Agendamento criado com sucesso")
    } catch (error) {
      console.error("Erro ao criar agendamento:", error)
      toast.error("Erro ao criar agendamento")
    }
  }

  return (
    <SheetContent className="flex flex-col gap-0 overflow-y-auto">
      <SheetHeader>
        <SheetTitle>Fazer reserva</SheetTitle>
      </SheetHeader>
      <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden">
        {/* Calenadério */}
        <div className="border-b border-solid py-5">
          <Calendar
            mode="single"
            locale={ptBR}
            selected={selectedDay}
            onSelect={handleDateSelect}
            disabled={(date) => date < new Date()}
            styles={{
              head_cell: {
                width: "100%",
                textTransform: "capitalize",
              },
              cell: {
                width: "100%",
              },
              button: {
                width: "100%",
              },
              nav_button_previous: {
                width: "32px",
                height: "32px",
              },
              nav_button_next: {
                width: "32px",
                height: "32px",
              },
              caption: {
                textTransform: "capitalize",
              },
            }}
          />
        </div>
        {/* Horários */}
        {selectedDay && (
          <div className="flex gap-3 overflow-x-auto border-b border-solid p-5 [&::-webkit-scrollbar]:hidden">
            {getTimeList({ bookings: dayBookings, selectedDay }).map((time) => (
              <Button
                onClick={() => handleTimeSelect(time)}
                variant={selectedTime === time ? "default" : "outline"}
                className="rounded-full"
                key={time}
              >
                {time}
              </Button>
            ))}
          </div>
        )}
        {/* Card com detalhes da reserva */}
        {selectedTime && selectedDay && (
          <Card className="mx-5 my-5">
            <CardContent className="space-y-3 px-3">
              <div className="flex items-center justify-between">
                <h2 className="font-bold">{service.name}</h2>
                <p className="text-sm font-bold">
                  {Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(Number(service.price))}
                </p>
              </div>
              <div className="flex items-center justify-between">
                <h2 className="text-sm">Data</h2>
                <p className="text-sm text-gray-400">
                  {format(selectedDay, "dd 'de' MMMM", {
                    locale: ptBR,
                  })}
                </p>
              </div>
              <div className="flex items-center justify-between">
                <h2 className="text-sm">Horário</h2>
                <p className="text-sm text-gray-400">{selectedTime}</p>
              </div>
              <div className="flex items-center justify-between">
                <h2 className="text-sm">Barbearia</h2>
                <p className="text-sm text-gray-400">{barberShop.name}</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      <SheetFooter className="mt-5 px-5">
        <SheetClose asChild>
          <Button
            onClick={handleCreateBooking}
            disabled={!selectedDay || !selectedTime}
          >
            Confirmar
          </Button>
        </SheetClose>
      </SheetFooter>
    </SheetContent>
  )
}

export default Reservation
