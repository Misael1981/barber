"use server"

import { db } from "../_lib/prisma"
import { revalidatePath } from "next/cache"

export const createBooking = async ({ serviceId, userId, date }) => {
  try {
    const booking = await db.booking.create({
      data: {
        serviceId,
        userId,
        date,
      },
    })

    // Revalida a página para mostrar os dados atualizados
    revalidatePath("/")
    
    return { success: true, booking }
  } catch (error) {
    console.error("Erro ao criar agendamento:", error)
    return { success: false, error: "Erro ao criar agendamento" }
  }
}
