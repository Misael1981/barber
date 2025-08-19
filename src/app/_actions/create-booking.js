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
    // Converter string ISO para objeto Date preservando o horário
    const isoDate = new Date(date)

    // Extrair componentes UTC para preservar o horário original
    const year = isoDate.getUTCFullYear()
    const month = isoDate.getUTCMonth()
    const day = isoDate.getUTCDate()
    const hours = isoDate.getUTCHours()
    const minutes = isoDate.getUTCMinutes()

    // Criar uma nova data usando os componentes UTC
    const bookingDate = new Date(year, month, day, hours, minutes)

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
    return { success: true, booking }
  } catch (error) {
    console.error("Erro ao criar agendamento:", error)
    return { success: false, error: "Erro ao criar agendamento" }
  }
}
