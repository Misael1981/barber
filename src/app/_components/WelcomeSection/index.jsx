import { format } from "date-fns"
import Search from "../Search"
import { ptBR } from "date-fns/locale"
import BarberShopItem from "../BarberShopItem"
import BookingItem from "../BookingItem"
import Image from "next/image"
import Carousel from "../Carousel"

const WelcomeSection = ({
  session,
  barberShops,
  bookings,
  mostViewedBarberShops,
}) => {
  return (
    <section className="relative lg:min-h-[400px] lg:bg-[url('/banner-02.jpg')] lg:bg-cover lg:bg-center lg:bg-no-repeat">
      <div className="lg:absolute lg:inset-0 lg:bg-black lg:bg-opacity-80"></div>
      <div className="boxed relative z-10 w-full gap-6 p-5 lg:flex lg:items-center lg:justify-between">
        <div className="w-full">
          <h2 className="txt-xl font-bold">
            Olá, {session?.user ? session.user.name : "Usuário"}!{" "}
            {/* ✅ CORREÇÃO: usar optional chaining */}
          </h2>
          <p>
            <span className="capitalize">
              {format(new Date(), "EEEE, dd", { locale: ptBR })}
            </span>
            <span>&nbsp;de&nbsp;</span>
            <span className="capitalize">
              {format(new Date(), "MMMM", { locale: ptBR })}
            </span>
          </p>
          <div className="mt-6">
            <Search />
          </div>
          <div className="relative mt-6 h-[150px] w-full lg:hidden">
            <Image
              src="/banner-01.png"
              fill
              className="rounded-xl object-cover"
              alt="Banner principal - Agende com os melhores"
            />
          </div>
          <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
            Agendamentos
          </h2>
          {bookings.length > 0 && <BookingItem booking={bookings[0]} />}
        </div>
        <div className="hidden w-[60%] lg:block">
          <Carousel title="Mais Vistos">
            {mostViewedBarberShops.map((barberShop) => (
              <BarberShopItem key={barberShop.id} barberShop={barberShop} />
            ))}
          </Carousel>
        </div>
      </div>
    </section>
  )
}

export default WelcomeSection
