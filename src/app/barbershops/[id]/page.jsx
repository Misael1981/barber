import { db } from "../../_lib/prisma"
import { notFound } from "next/navigation"
import Image from "next/image"
import { Card, CardContent } from "../../_components/ui/card"
import { Badge } from "../../_components/ui/badge"
import { StarIcon } from "lucide-react"
import Header from "../../_components/Header"

const BarbershopPage = async ({ params }) => {
  const barbershop = await db.barbershop.findUnique({
    where: {
      id: params.id,
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
      <Header />
      <div className="p-5">
        <div className="relative h-[250px] w-full">
          <Image
            fill
            className="rounded-2xl object-cover"
            src={barbershop.imageUrl}
            alt={barbershop.name}
          />
        </div>
        
        <div className="mt-4">
          <h1 className="text-xl font-bold">{barbershop.name}</h1>
          <div className="mt-2 flex items-center gap-2">
            <Badge className="space-x-1" variant="secondary">
              <StarIcon size={12} className="fill-primary text-primary" />
              <p className="text-xs font-semibold">5.0</p>
            </Badge>
            <p className="text-sm text-gray-400">{barbershop.address}</p>
          </div>
          
          <div className="mt-4">
            <p className="text-sm text-gray-600">{barbershop.description}</p>
          </div>

          <div className="mt-6">
            <h2 className="mb-3 text-xs font-bold uppercase text-gray-400">
              Serviços
            </h2>
            <div className="space-y-3">
              {barbershop.services.map((service) => (
                <Card key={service.id}>
                  <CardContent className="flex items-center gap-3 p-3">
                    <div className="relative h-[110px] w-[110px]">
                      <Image
                        fill
                        className="rounded-lg object-cover"
                        src={service.imageUrl}
                        alt={service.name}
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold">{service.name}</h3>
                      <p className="text-sm text-gray-400">{service.description}</p>
                      <div className="mt-2 flex items-center justify-between">
                        <p className="text-sm font-bold text-primary">
                          {Intl.NumberFormat("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                          }).format(Number(service.price))}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BarbershopPage