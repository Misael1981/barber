import BarberShopItem from "../_components/BarberShopItem"
import Header from "../_components/Header"
import Search from "../_components/Search"
import { db } from "../_lib/prisma"

const BarbeShopPage = async ({ searchParams }) => {
  const params = await searchParams
  const barbershops = await db.barbershop.findMany({
    where: {
      OR: [
        params?.title
          ? {
              name: {
                contains: params?.title,
                mode: "insensitive",
              },
            }
          : {},
        params.service
          ? {
              services: {
                some: {
                  name: {
                    contains: params.service,
                    mode: "insensitive",
                  },
                },
              },
            }
          : {},
      ],
    },
  })

  return (
    <>
      <Header />
      <div className="my-6 px-5">
        <Search />
      </div>
      <div className="mb-3 px-6">
        <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
          Resultados para &quot;{params?.title || params?.service}
          &quot;
        </h2>
        <div className="grid grid-cols-2 gap-4">
          {barbershops.map((barbershop) => (
            <BarberShopItem key={barbershop.id} barberShop={barbershop} />
          ))}
        </div>
      </div>
    </>
  )
}

export default BarbeShopPage
