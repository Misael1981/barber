"use server"

import { db } from "../_lib/prisma"
import { revalidatePath } from "next/cache"

export const createBooking = async ({ serviceId, userId, date }) => {
  try {
    // console.log('=== CREATE BOOKING SERVER SIDE ===')
    // console.log('serviceId:', serviceId, typeof serviceId)
    // console.log('userId:', userId, typeof userId)
    // console.log('date:', date, typeof date)
    // console.log('date instanceof Date:', date instanceof Date)
    // console.log('date isNaN:', isNaN(date))

    const booking = await db.booking.create({
      data: {
        serviceId,
        userId,
        date,
      },
    })

    console.log("Booking criado com sucesso:", booking)

    // Revalida a página para mostrar os dados atualizados
    revalidatePath("/")
    revalidatePath("/barbershops")

    console.log("Agendamento criado com sucesso:", booking)
    return { success: true, booking }
  } catch (error) {
    console.error("Erro ao criar agendamento:", error)
    return { success: false, error: "Erro ao criar agendamento" }
  }
}
