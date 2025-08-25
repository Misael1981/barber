"https://ts9ua2aa19.ufs.sh/f/V1iaeQg5P6aEiOlHecICFXdjJmIauOw2BR95zqv7oyAMVkgE"
"https://ts9ua2aa19.ufs.sh/f/V1iaeQg5P6aEC8I2wmfIPnewRgBKuQLjsdWpbFxDEY2yrl81"
"https://ts9ua2aa19.ufs.sh/f/V1iaeQg5P6aETA29hfGWDZeVkFJE6l9u5ANKfdLg821HCBop"
"https://ts9ua2aa19.ufs.sh/f/V1iaeQg5P6aEnEaMfZLLPkKcFNhYyovIwbuqUtgGjJeX8iW3"
"https://ts9ua2aa19.ufs.sh/f/V1iaeQg5P6aEpkOyFdGinRUhEaM84ufSvHD9zbXNA52cmOdG"
"https://ts9ua2aa19.ufs.sh/f/V1iaeQg5P6aEOAAwFPUTJPulKZN5OSqWvUFY2ERBQVHaGkw7"
"https://ts9ua2aa19.ufs.sh/f/V1iaeQg5P6aEigQLWsICFXdjJmIauOw2BR95zqv7oyAMVkgE"
"https://ts9ua2aa19.ufs.sh/f/V1iaeQg5P6aEONCTpjUTJPulKZN5OSqWvUFY2ERBQVHaGkw7"
"https://ts9ua2aa19.ufs.sh/f/V1iaeQg5P6aEIYSPHMkwdF9ycHZXWjMNoE1JVferS27b0sIv"
"https://ts9ua2aa19.ufs.sh/f/V1iaeQg5P6aEbqBpJ7Y6LrbTAIh4mUlpWk0idqHXNoKCf3FR"
"https://ts9ua2aa19.ufs.sh/f/V1iaeQg5P6aEiHmkbCICFXdjJmIauOw2BR95zqv7oyAMVkgE"
"https://ts9ua2aa19.ufs.sh/f/V1iaeQg5P6aEbd89hwY6LrbTAIh4mUlpWk0idqHXNoKCf3FR"
"https://ts9ua2aa19.ufs.sh/f/V1iaeQg5P6aEjLnDLYLPU7DpBZKX1420GltJuOvI5NwPbzma"
"https://ts9ua2aa19.ufs.sh/f/V1iaeQg5P6aEFSuaarfTEAIQZjl8WKHPYz1smVdptTg0xLiN"
"https://ts9ua2aa19.ufs.sh/f/V1iaeQg5P6aEDiSIKhN4grY8OsVWxzwkyN4MhmKAdXeqp5aB"
"https://ts9ua2aa19.ufs.sh/f/V1iaeQg5P6aEjyuyuBPU7DpBZKX1420GltJuOvI5NwPbzmaF"
"https://ts9ua2aa19.ufs.sh/f/V1iaeQg5P6aEb7kuFQY6LrbTAIh4mUlpWk0idqHXNoKCf3FR"
"https://ts9ua2aa19.ufs.sh/f/V1iaeQg5P6aEAXNzKLljdGH0Y1UkaP6gmJqQVWeBvt2XzxN5"
"https://ts9ua2aa19.ufs.sh/f/V1iaeQg5P6aErRm8FQb8biCdIzL40EmXWFr2U5AgxNqf9PVa"
"https://ts9ua2aa19.ufs.sh/f/V1iaeQg5P6aEAZUbAZljdGH0Y1UkaP6gmJqQVWeBvt2XzxN5"

```
<SheetContent className="gap-0 overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Fazer reserva</SheetTitle>
        </SheetHeader>
        {/* Calenadério */}
        <div className="border-b border-solid py-5">
          <Calendar
            mode="single"
            locale={ptBR}
            selected={selectedDay}
            onSelect={handleDateSelect}
            fromDate={new Date()}
            styles={{
              head_cell: {
                width: "100%",
                textTransform: "capitalize",
              },
              cell: {
                width: "100%",
              },
              button: {
                width: "100%",
              },
              nav_button_previous: {
                width: "32px",
                height: "32px",
              },
              nav_button_next: {
                width: "32px",
                height: "32px",
              },
              caption: {
                textTransform: "capitalize",
              },
            }}
          />
        </div>

        {/* Horários */}
        {selectedDay && (
          <div className="flex gap-3 overflow-x-auto border-b border-solid px-5 [&::-webkit-scrollbar]:hidden">
            {TIME_LIST.map((time) => (
              <Button
                onClick={() => handleTimeSelect(time)}
                variant={selectedTime === time ? "default" : "outline"}
                className="rounded-full"
                key={time}
              >
                {time}
              </Button>
            ))}
          </div>
        )}

        {/* Card com detalhes da reserva */}
        {selectedTime && selectedDay && (
          <Card>
            <CardContent>
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
        )}

        <SheetFooter className="mt-5 px-5">
          <SheetClose asChild>
            <Button
              onClick={handleCreateBooking}
              disabled={!selectedDay || !selectedTime}
            >
              Confirmar
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
```
