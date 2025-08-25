"use server"

import { getServerSession } from "next-auth"
import { db } from "../_lib/prisma"
import { revalidatePath } from "next/cache"
import { authOptions } from "../_lib/auth"

export const createBooking = async ({ serviceId, userId, date }) => {
  const user = await getServerSession(authOptions)
  if (!user) {
    throw new Error("Usuário não autenticado")
  }

  try {
    const bookingDate = new Date(date)

    const booking = await db.booking.create({
      data: {
        serviceId,
        userId,
        date: bookingDate,
      },
    })

    // Revalida a página para mostrar os dados atualizados
    revalidatePath("/")
    revalidatePath("/barbershops")
    revalidatePath("/barbershops/[id]")
    revalidatePath("/bookings")
    return { success: true, booking }
  } catch (error) {
    console.error("Erro ao criar agendamento:", error)
    return { success: false, error: "Erro ao criar agendamento" }
  }
}
