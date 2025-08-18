"use server"

import { db } from "@/app/_lib/prisma"
import { endOfDay, startOfDay } from "date-fns"

export const getBookings = async ({ date }) => {
  console.log('getBookings - Data recebida:', date)
  console.log('getBookings - startOfDay:', startOfDay(date))
  console.log('getBookings - endOfDay:', endOfDay(date))
  
  const bookings = await db.booking.findMany({
    where: {
      date: {
        lte: endOfDay(date),
        gte: startOfDay(date),
      },
    },
    include: {
      service: true,
      user: true,
    },
  })
  
  console.log('getBookings - Agendamentos encontrados no banco:', bookings.length)

  // Converter Decimal para number para evitar erro de serialização
  return bookings.map(booking => ({
    ...booking,
    service: booking.service ? {
      ...booking.service,
      price: Number(booking.service.price)
    } : null
  }))
}
