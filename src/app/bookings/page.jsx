import { getServerSession } from "next-auth"
import Header from "../_components/Header"
import { db } from "../_lib/prisma"
import { authOptions } from "../_lib/auth"
import { notFound } from "next/navigation"
import BookingItem from "../_components/BookingItem"

const Bookings = async () => {
  const seccion = await getServerSession(authOptions)

  if (!seccion?.user) {
    //Todo: Mostrar popup de login
    return notFound()
  }
  // Agendamentos Confirmados (futuros)
  const confirmedBookingsRaw = await db.booking.findMany({
    where: {
      userId: seccion.user.id,
      date: {
        gte: new Date(),
      },
    },
    include: {
      service: {
        include: {
          barbershop: true,
        },
      },
    },
    orderBy: {
      date: "asc",
    },
  })

  // Agendamentos Finalizados (passados)
  const finishedBookingsRaw = await db.booking.findMany({
    where: {
      userId: seccion.user.id,
      date: {
        lt: new Date(), // Data menor que hoje
      },
    },
    include: {
      service: {
        include: {
          barbershop: true,
        },
      },
    },
    orderBy: {
      date: "desc", // Mais recentes primeiro
    },
  })

  // Converter Decimal para number para evitar erro de serialização
  const confirmedBookings = confirmedBookingsRaw.map((booking) => ({
    ...booking,
    service: {
      ...booking.service,
      price: Number(booking.service.price),
    },
  }))

  const finishedBookings = finishedBookingsRaw.map((booking) => ({
    ...booking,
    service: {
      ...booking.service,
      price: Number(booking.service.price),
    },
  }))

  return (
    <>
      <Header />
      <div className="lg:boxed space-y-3 p-5">
        <h1 className="text-xl font-bold">Agendamentos</h1>

        <div className="lg:boxed justify-center gap-5 lg:flex">
          {/* Agendamentos Confirmados */}
          <div className="lg:max-w-[600px]">
            {confirmedBookings.length > 0 && (
              <div className="space-y-3">
                <h2 className="text-lg font-semibold uppercase tracking-wide text-gray-400">
                  Confirmados
                </h2>
                {confirmedBookings.map((booking) => (
                  <BookingItem key={booking.id} booking={booking} />
                ))}
              </div>
            )}
          </div>
          {/* Agendamentos Finalizados */}
          <div className="lg:max-w-[600px]">
            {finishedBookings.length > 0 && (
              <div className="space-y-3">
                <h2 className="text-lg font-semibold uppercase tracking-wide text-gray-400">
                  Finalizados
                </h2>
                {finishedBookings.map((booking) => (
                  <BookingItem key={booking.id} booking={booking} />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Mensagem quando não há agendamentos */}
        {confirmedBookings.length === 0 && finishedBookings.length === 0 && (
          <p className="py-8 text-center text-gray-400">
            Você não possui agendamentos.
          </p>
        )}
      </div>
    </>
  )
}

export default Bookings
