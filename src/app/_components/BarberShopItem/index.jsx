import Image from "next/image"
import { Card, CardContent } from "../ui/card"
import { Button } from "../ui/button"
import { Badge } from "../ui/badge"
import { StarIcon } from "lucide-react"
import Link from "next/link"

const BarberShopItem = ({ barberShop }) => {
  return (
    <Card className="min-w-[167px] rounded-2xl p-0">
      <CardContent className="p-0 px-1 pt-1">
        <div className="relative h-[159px] w-[159px] w-full">
          <Image
            fill
            className="rounded-2xl object-cover"
            src={barberShop.imageUrl}
            alt={barberShop.name}
          />
          <Badge
            className="absolute left-2 top-2 space-x-1"
            variant="secondary"
          >
            <StarIcon size={12} className="fill-primary text-primary" />
            <p className="text-xs font-semibold">5.0</p>
          </Badge>
        </div>
        <div className="px-1 py-3">
          <h3 className="truncate font-semibold">{barberShop.name}</h3>

          <p className="truncate text-sm text-gray-400">{barberShop.address}</p>

          <Link href={`/barbershops/${barberShop.id}`}>
            <Button variant="secondary" className="mt-3 w-full">
              Reservar
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}

export default BarberShopItem
