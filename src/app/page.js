import Image from "next/image"
import Header from "./_components/Header"
import { Button } from "./_components/ui/button"
import { db } from "./_lib/prisma"
import BarberShopItem from "./_components/BarberShopItem"
import { quickSearchOptions } from "./_constants/search"
import { authOptions } from "./_lib/auth"
import { getServerSession } from "next-auth"
import WelcomeSection from "./_components/WelcomeSection"
import Carousel from "./_components/Carousel"

const Home = async () => {
  const session = await getServerSession(authOptions)
  const barberShops = await db.barbershop.findMany({
    take: 10,
  })

  // Populares (ordenadas por nome, primeiras 4)
  const popularBarberShops = await db.barbershop.findMany({
    skip: 10, // ✅ Pula as primeiras 2
    take: 10,
    orderBy: {
      createdAt: "desc", // ✅ A-Z em vez de Z-A
    },
  })

  // Mais vistos (ordenadas por data de criação, primeiras 3)
  const mostViewedBarberShops = await db.barbershop.findMany({
    orderBy: {
      createdAt: "asc", // ✅ Ordenação diferente
    },
    take: 10, // ✅ Limita a 3 resultados
  })
  console.log("Retorno de mostViewedBarberShops ", mostViewedBarberShops)
  const bookings = session?.user // ✅ CORREÇÃO: usar optional chaining
    ? await db.booking.findMany({
        where: {
          userId: session.user.id,
        },
        include: {
          service: {
            include: {
              barbershop: true,
            },
          },
        },
      })
    : []
  return (
    <div>
      <Header />
      <div className="p-0">
        <WelcomeSection
          session={session}
          bookings={bookings}
          barberShops={barberShops}
          mostViewedBarberShops={mostViewedBarberShops}
        />

        {/* Botões de Busca */}
        <div className="mx-auto mt-6 flex gap-3 overflow-auto px-5 lg:justify-center [&::-webkit-scrollbar]:hidden">
          {quickSearchOptions.map((option, index) => (
            <Button key={index} className="gap-2" variant="secondary">
              <Image
                src={option.imageUrl}
                width={16}
                height={16}
                alt={option.title}
              />
              {option.title}
            </Button>
          ))}
        </div>

        <div className="boxed my-10 px-5">
          <Carousel title="Recomendados">
            {barberShops.map((barberShop) => (
              <BarberShopItem key={barberShop.id} barberShop={barberShop} />
            ))}
          </Carousel>
        </div>

        <div className="boxed my-10 px-5">
          <Carousel title="Populares">
            {popularBarberShops.map((barberShop) => (
              <BarberShopItem key={barberShop.id} barberShop={barberShop} />
            ))}
          </Carousel>
        </div>
      </div>
    </div>
  )
}

export default Home
