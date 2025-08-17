import { db } from "../../_lib/prisma"
import { notFound } from "next/navigation"
import Image from "next/image"
import { Button } from "@/app/_components/ui/button"
import {
  ChevronLeftIcon,
  MapPinIcon,
  MenuIcon,
  PhoneIcon,
  Smartphone,
  StarIcon,
} from "lucide-react"
import Link from "next/link"
import ServiceItem from "@/app/_components/ServiceItem"
import PhoneItem from "@/app/_components/PhoneItem"

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

  return (
    <div>
      {/* Imagem */}
      <div className="relative h-[250px] w-full">
        <Image
          alt={barbershop.name}
          src={barbershop?.imageUrl}
          fill
          className="object-cover"
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
        <Button
          size="icon"
          variant="secondary"
          className="absolute right-4 top-4"
        >
          <MenuIcon />
        </Button>
      </div>

      {/* Nome, endereço e avaliação */}
      <div className="border-b border-solid p-5">
        <h1 className="mb-6 text-xl font-bold">{barbershop.name}</h1>
        <div className="mb-2 flex items-center gap-1">
          <MapPinIcon className="gap-1 text-primary" size={18} />
          <p className="text-sm">{barbershop?.address}</p>
        </div>
        <div className="flex items-center gap-1">
          <StarIcon className="gap-1 fill-primary text-primary" size={18} />
          <p className="text-sm">5.0 (499 avaliações)</p>
        </div>
      </div>

      {/* Sobre nós */}
      <div className="border-b border-solid p-5">
        <h2 className="mb-2 text-xs font-bold uppercase text-gray-400">
          Sobre nós
        </h2>
        <p className="text-justify text-sm">{barbershop?.description}</p>
      </div>

      {/* Serviços */}
      <div className="space-y-3 border-b border-solid p-5">
        <h2 className="mb-3 text-xs font-bold uppercase text-gray-400">
          Serviços
        </h2>
        <div className="space-y-3">
          {barbershop.services.map((service) => (
            <ServiceItem key={service.id} service={service} />
          ))}
        </div>
      </div>

      {/* Contato */}

      <div className="space-y-3 p-5">
        {barbershop.phones.map((phone, index) => (
          <PhoneItem key={index} phone={phone} />
        ))}
      </div>
    </div>
  )
}

export default BarbershopPage
