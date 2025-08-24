import { db } from "../../_lib/prisma"
import { notFound } from "next/navigation"
import Image from "next/image"
import { Button } from "@/app/_components/ui/button"
import { ChevronLeftIcon, MapPinIcon, MenuIcon, StarIcon } from "lucide-react"
import Link from "next/link"
import ServiceItem from "@/app/_components/ServiceItem"
import PhoneItem from "@/app/_components/PhoneItem"
import { Sheet, SheetTrigger } from "@/app/_components/ui/sheet"
import SidebarSheet from "@/app/_components/SidebarSheet"
import MapDescription from "@/app/_components/MapDescription"
import { Card, CardContent } from "@/app/_components/ui/card"
import AboutDescription from "@/app/_components/AboutDescription"
import ContactPhones from "@/app/_components/ContactPhones"
import OperationHours from "@/app/_components/OperationHours"
import FooterDescription from "@/app/_components/FooterDescription"
import Header from "@/app/_components/Header"

const BarbershopPage = async ({ params }) => {
  const { id } = await params
  const barbershop = await db.barbershop.findUnique({
    where: {
      id: id,
    },
    include: {
      services: true,
    },
  })

  if (!barbershop) {
    return notFound()
  }

  // Converter Decimal para number para evitar erro de serialização
  const barbershopWithConvertedPrices = {
    ...barbershop,
    services: barbershop.services.map((service) => ({
      ...service,
      price: Number(service.price),
    })),
  }

  const mockBooking = {
    service: {
      barbershop: {
        imageUrl: barbershopWithConvertedPrices.imageUrl,
        name: barbershopWithConvertedPrices.name,
        address: barbershopWithConvertedPrices.address,
      },
    },
  }

  return (
    <>
      <div className="hidden lg:block">
        <Header />
      </div>
      <div className="lg:boxed lg:mt-16 lg:flex lg:justify-between lg:gap-5">
        <div className="flex-2 w-full lg:max-w-[70%]">
          {/* Imagem */}
          <div className="relative h-[250px] w-full lg:h-[600px]">
            <Image
              alt={barbershopWithConvertedPrices.name}
              src={barbershopWithConvertedPrices?.imageUrl}
              fill
              className="rounded-2xl object-cover"
              sizes="(max-width: 768px) 167px, (max-width: 1200px) 300px, 400px"
              quality={90}
              priority={false}
            />
            <Button
              size="icon"
              variant="secondary"
              className="absolute left-4 top-4"
              asChild
            >
              <Link href="/">
                <ChevronLeftIcon />
              </Link>
            </Button>
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  size="icon"
                  variant="outline"
                  className="absolute right-4 top-4"
                >
                  <MenuIcon />
                </Button>
              </SheetTrigger>
              <SidebarSheet />
            </Sheet>
          </div>
          {/* Nome, endereço e avaliação */}
          <div className="border-b border-solid p-5 lg:flex lg:justify-between">
            <div>
              <h1 className="mb-6 text-xl font-bold">
                {barbershopWithConvertedPrices.name}
              </h1>
              <div className="mb-2 flex items-center gap-1">
                <MapPinIcon className="gap-1 text-primary" size={18} />
                <p className="text-sm">
                  {barbershopWithConvertedPrices?.address}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <StarIcon className="gap-1 fill-primary text-primary" size={18} />
              <p className="text-sm">5.0 (499 avaliações)</p>
            </div>
          </div>
          {/* Sobre nós */}
          <div className="border-b border-solid p-5 lg:hidden">
            <h2 className="mb-2 text-xs font-bold uppercase text-gray-400">
              Sobre nós
            </h2>
            <p className="text-justify text-sm">
              {barbershopWithConvertedPrices?.description}
            </p>
          </div>
          {/* Serviços */}
          <div className="space-y-3 border-b border-solid p-5">
            <h2 className="mb-3 text-xs font-bold uppercase text-gray-400">
              Serviços
            </h2>
            <div className="space-y-3 lg:flex lg:flex-wrap lg:justify-between lg:gap-3 lg:space-y-0">
              {barbershopWithConvertedPrices.services.map((service) => (
                <ServiceItem
                  key={service.id}
                  service={service}
                  barberShop={barbershopWithConvertedPrices}
                />
              ))}
            </div>
          </div>
          {/* Contato */}
          <div className="p-5 lg:hidden">
            <ContactPhones barbershop={barbershopWithConvertedPrices} />
          </div>
        </div>
        <Card className="hidden h-[100%] w-[30%] lg:block">
          <CardContent>
            <MapDescription booking={mockBooking} />
            <div className="my-5 border-b pb-5">
              <AboutDescription
                description={barbershopWithConvertedPrices?.description}
              />
            </div>
            <div className="block border-b pb-5">
              <ContactPhones barbershop={barbershopWithConvertedPrices} />
            </div>
            <div className="border-b">
              <OperationHours />
            </div>
            <FooterDescription />
          </CardContent>
        </Card>
      </div>
    </>
  )
}

export default BarbershopPage
