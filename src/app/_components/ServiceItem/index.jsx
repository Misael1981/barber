"use client"

import Image from "next/image"
import { Button } from "../ui/button"
import { Card, CardContent } from "../ui/card"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet"
import { Calendar } from "../ui/calendar"
import { ptBR } from "date-fns/locale"
import { useEffect, useState } from "react"
import { format, set } from "date-fns"
import { createBooking } from "@/app/_actions/create-booking"
import { useSession } from "next-auth/react"
import { toast } from "sonner"
import { getBookings } from "@/app/_actions/get-bookings"
import { Dialog, DialogContent } from "../ui/dialog"
import SignInDialog from "../SignInDialog"

const TIME_LIST = [
  "08:00",
  "08:30",
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
]

const getTimeList = (bookings, serviceId) => {
  console.log("getTimeList - bookings recebidos:", bookings)
  console.log("getTimeList - serviceId:", serviceId)

  const timeList = TIME_LIST.filter((time) => {
    const hour = Number(time.split(":")[0])
    const minutes = Number(time.split(":")[1])

    // Filtrar apenas agendamentos do mesmo serviço
    const hasBookingOnCurrentTime = bookings.some((booking) => {
      const bookingHour = booking.date.getHours()
      const bookingMinutes = booking.date.getMinutes()
      const sameService = booking.service?.id === serviceId
      const sameTime = bookingHour === hour && bookingMinutes === minutes

      console.log(`Verificando horário ${time}:`, {
        bookingTime: `${bookingHour}:${bookingMinutes.toString().padStart(2, "0")}`,
        sameService,
        sameTime,
        bookingServiceId: booking.service?.id,
        targetServiceId: serviceId,
      })

      return sameService && sameTime
    })

    if (hasBookingOnCurrentTime) {
      console.log(`Horário ${time} está ocupado para este serviço`)
      return false
    }
    return true
  })

  console.log("getTimeList - horários disponíveis:", timeList)
  return timeList
}

const ServiceItem = ({ service, barberShop }) => {
  // 1. Não exibir horários que já foram agendados
  // 2. Salvar o agendamento para o usuário logado
  // 3. Não deixar o usuário reservar se o usuário não estiver logado

  const [selectedDay, setSelectedDay] = useState(undefined)
  const [selectedTime, setSelectedTime] = useState(undefined)
  const [dayBookings, setDayBookings] = useState([])
  const [bookingSheetIsOpen, setBookingSheetIsOpen] = useState(false)
  const [signInDialogIsOpen, setSignInDialogIsOpen] = useState(false)

  const { data } = useSession()

  useEffect(() => {
    const fetch = async () => {
      if (!selectedDay) {
        return
      }
      console.log("Buscando agendamentos para:", selectedDay)
      const bookings = await getBookings({ date: selectedDay })
      console.log("Agendamentos encontrados:", bookings)
      setDayBookings(bookings)
    }
    fetch()
  }, [selectedDay])
  console.log("dayBookings state:", dayBookings)

  const handleBookingClick = () => {
    if (data?.user) {
      return setBookingSheetIsOpen(true)
    }
    // Se o usuário não estiver logado, mostrar toast de erro
    return toast.error("Você precisa estar logado para fazer um agendamento")
  }

  const handleBookingSheetOpenChange = () => {
    setSelectedDay(undefined)
    setSelectedTime(undefined)
    setDayBookings([])
    setBookingSheetIsOpen(false)
  }

  const handleDateSelect = (date) => {
    setSelectedDay(date)
  }

  const handleTimeSelect = (time) => {
    setSelectedTime(time)
  }

  const handleCreateBooking = async () => {
    try {
      console.log("=== INICIANDO CRIAÇÃO DE AGENDAMENTO ===")
      console.log("selectedDay:", selectedDay)
      console.log("selectedTime:", selectedTime)
      console.log("data:", data)
      console.log("data?.user:", data?.user)
      console.log("data?.user?.id:", data?.user?.id)

      if (!selectedDay || !selectedTime) {
        console.log("Cancelando: selectedDay ou selectedTime não definidos")
        return
      }

      if (!data?.user?.id) {
        console.log("Cancelando: usuário não está logado")
        toast.error("Você precisa estar logado para fazer um agendamento")
        return
      }

      const hour = selectedTime.split(":")[0]
      const minute = selectedTime.split(":")[1]
      const newDate = set(selectedDay, {
        hour: Number(hour),
        minute: Number(minute),
      })

      console.log("Criando agendamento com dados:", {
        serviceId: service.id,
        userId: data?.user.id,
        date: newDate,
        dateType: typeof newDate,
        isValidDate: newDate instanceof Date && !isNaN(newDate),
      })

      const result = await createBooking({
        serviceId: service.id,
        userId: data?.user.id,
        date: newDate,
      })

      console.log("Resultado do createBooking:", result)

      if (result.success) {
        toast.success("Agendamento criado com sucesso")
        // Recarregar os agendamentos do dia selecionado
        console.log("Recarregando agendamentos para:", selectedDay)
        const bookings = await getBookings({ date: selectedDay })
        console.log("Novos agendamentos após criação:", bookings)
        setDayBookings(bookings)
      } else {
        toast.error(result.error || "Erro ao criar agendamento")
      }
    } catch (error) {
      console.error("Erro ao criar agendamento:", error)
      toast.error("Erro ao criar agendamento")
    }
  }

  return (
    <>
      <Card className="p-0">
        <CardContent className="flex items-center gap-3 p-3">
          <div className="relative max-h-[110px] min-h-[110px] min-w-[110px] max-w-[110px]">
            <Image
              alt={service.name}
              src={service.imageUrl}
              fill
              className="rounded-xl object-cover"
            />
          </div>
          <div className="space-y-2">
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
                <SheetContent className="gap-0 overflow-y-auto">
                  <SheetHeader>
                    <SheetTitle>Fazer reserva</SheetTitle>
                  </SheetHeader>
                  {/* Calenadério */}
                  <div className="border-b border-solid py-5">
                    <Calendar
                      mode="single"
                      locale={ptBR}
                      selected={selectedDay}
                      onSelect={handleDateSelect}
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
                    <div className="border-b border-solid py-5">
                      <div className="flex gap-3 overflow-x-auto border-b border-solid [&::-webkit-scrollbar]:hidden">
                        {getTimeList(dayBookings, service.id).map((time) => (
                          <Button
                            key={time}
                            className="rounded-full"
                            variant={
                              selectedTime === time ? "default" : "outline"
                            }
                            onClick={() => handleTimeSelect(time)}
                          >
                            {time}
                          </Button>
                        ))}
                      </div>

                      {selectedTime && (
                        <div className="p-5">
                          <Card className="p-0">
                            <CardContent className="space-y-3 p-3">
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
                                <h2 className="text- text-sm">Data</h2>
                                <p className="text-sm">
                                  {format(selectedDay, "dd 'de' MMMM", {
                                    locale: ptBR,
                                  })}
                                </p>
                              </div>

                              <div className="flex items-center justify-between">
                                <h2 className="text- text-sm">Horário</h2>
                                <p className="text-sm">{selectedTime}</p>
                              </div>

                              <div className="flex items-center justify-between">
                                <h2 className="text- text-sm">Barbearia</h2>
                                <p className="text-sm">{barberShop.name}</p>
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                      )}
                    </div>
                  )}

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
