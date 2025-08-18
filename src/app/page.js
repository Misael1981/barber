import Image from "next/image"
import Header from "./_components/Header"
import { Button } from "./_components/ui/button"
import { db } from "./_lib/prisma"
import BarberShopItem from "./_components/BarberShopItem"
import { quickSearchOptions } from "./_constants/search"
import BookingItem from "./_components/BookingItem"
import Search from "./_components/Search"

const Home = async () => {
  const barberShops = await db.barbershop.findMany({})
  const popularBarberShops = await db.barbershop.findMany({
    orderBy: {
      name: "desc",
    },
  })
  return (
    <div>
      <Header />
      <div className="p-5">
        <h2 className="txt-xl font-bold">Olá, Misael!</h2>
        <p>Sábado, 16 de Agosto</p>

        <div className="mt-6">
          <Search />
        </div>

        {/* Botões de Busca */}
        <div className="mt-6 flex gap-3 overflow-auto [&::-webkit-scrollbar]:hidden">
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

        {/* Banner Principal */}
        <div className="relative mt-6 h-[150px] w-full">
          <Image
            src="/banner-01.png"
            fill
            className="rounded-xl object-cover"
            alt="Banner principal - Agende com os melhores"
          />
        </div>

        {/* Agendamentos */}
        <BookingItem />

        <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
          Recomendados
        </h2>
        <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
          {barberShops.map((barberShop) => (
            <BarberShopItem key={barberShop.id} barberShop={barberShop} />
          ))}
        </div>

        <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
          Populares
        </h2>
        <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
          {popularBarberShops.map((barberShop) => (
            <BarberShopItem
              key={barberShop.id}
              barberShop={barberShop}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home
