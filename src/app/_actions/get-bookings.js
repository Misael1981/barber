"use server"

import { db } from "@/app/_lib/prisma"
import { endOfDay, startOfDay } from "date-fns"

export const getBookings = async ({ date }) => {
  if (!date || !(date instanceof Date) || isNaN(date)) {
    console.error("Data inválida recebida:", date)
    return []
  }

  console.log("getBookings - Data recebida:", date)
  console.log("getBookings - startOfDay:", startOfDay(date))
  console.log("getBookings - endOfDay:", endOfDay(date))

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

  console.log(
    "getBookings - Agendamentos encontrados no banco:",
    bookings.length,
  )
  console.log(
    "getBookings - Detalhes dos agendamentos:",
    bookings.map((b) => ({
      id: b.id,
      date: b.date,
      serviceId: b.service?.id,
      serviceName: b.service?.name,
      userName: b.user?.name,
    })),
  )

  // Converter Decimal para number e garantir que date seja um objeto Date
  const processedBookings = bookings.map((booking) => {
    const originalDate = booking.date
    
    // Corrigir o problema de fuso horário
    // Ao invés de usar new Date() diretamente, vamos preservar o horário original
    // Extraindo as partes da data e reconstruindo-a
    const dateObj = new Date(booking.date)
    const year = dateObj.getUTCFullYear()
    const month = dateObj.getUTCMonth()
    const day = dateObj.getUTCDate()
    const hours = dateObj.getUTCHours()
    const minutes = dateObj.getUTCMinutes()
    
    // Criar uma nova data usando os componentes UTC para preservar o horário
    const convertedDate = new Date(year, month, day, hours, minutes)
    
    console.log(`getBookings - Processando booking ${booking.id}:`, {
      originalDate,
      originalDateType: typeof originalDate,
      dateObj,
      utcHours: dateObj.getUTCHours(),
      utcMinutes: dateObj.getUTCMinutes(),
      convertedDate,
      convertedDateType: typeof convertedDate,
      hours: convertedDate.getHours(),
      minutes: convertedDate.getMinutes(),
      timeString: `${convertedDate.getHours()}:${convertedDate.getMinutes().toString().padStart(2, '0')}`
    })
    
    return {
      ...booking,
      date: convertedDate, // ✅ Converter string de volta para Date com horário correto
      service: booking.service
        ? {
            ...booking.service,
            price: Number(booking.service.price),
          }
        : null,
    }
  })
  
  console.log("getBookings - Retornando bookings processados:", processedBookings.length)
  return processedBookings
}
