import Image from "next/image"
import { Card, CardContent } from "../ui/card"
import { Avatar, AvatarImage } from "../ui/avatar"

const MapDescription = ({ booking }) => {
  return (
    <div className="relative flex h-[180px] w-full items-end">
      <Image
        src="/map.png"
        fill
        className="rounded-xl object-cover"
        alt="Mapa do Salão"
      />
      <Card className="z-50 mx-5 mb-3 w-full rounded-xl">
        <CardContent className="flex items-center gap-3 px-5 py-0">
          <Avatar>
            <AvatarImage src={booking.service.barbershop.imageUrl} />
          </Avatar>
          <div>
            <h3 className="font-semibold">{booking.service.barbershop.name}</h3>

            <p className="text-sm text-gray-400">
              {booking.service.barbershop.address}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default MapDescription
