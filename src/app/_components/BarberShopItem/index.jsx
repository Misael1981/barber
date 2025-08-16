import Image from "next/image"
import { Card, CardContent } from "../ui/card"
import { Button } from "../ui/button"

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
        </div>
        <div className="px-1 py-3">
          <h3 className="truncate font-semibold">{barberShop.name}</h3>

          <p className="truncate text-sm text-gray-400">{barberShop.address}</p>

          <Button variant="secondary" className="mt-3 w-full">
            Reservar
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default BarberShopItem
