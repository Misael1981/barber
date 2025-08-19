import { Card, CardContent } from "../ui/card"

const BookingInfo = () => {
  return (
    <Card className="p-0">
      <CardContent className="space-y-3 p-3">
        <div className="flex items-center justify-between">
          <h2 className="font-bold">{service.name}</h2>
          <p className="text-sm font-bold">
            {Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(Number(service.price))}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <h2 className="text- text-sm">Data</h2>
          <p className="text-sm">
            {format(selectedDay, "dd 'de' MMMM", {
              locale: ptBR,
            })}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <h2 className="text- text-sm">Horário</h2>
          <p className="text-sm">{selectedTime}</p>
        </div>

        <div className="flex items-center justify-between">
          <h2 className="text- text-sm">Barbearia</h2>
          <p className="text-sm">{barberShop.name}</p>
        </div>
      </CardContent>
    </Card>
  )
}

export default BookingInfo
