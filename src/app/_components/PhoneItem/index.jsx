"use client"

import { Smartphone } from "lucide-react"
import { Button } from "../ui/button"
import { toast } from "sonner"

const PhoneItem = ({ phone }) => {
  const handleCopyPhoneClick = (phone) => {
    navigator.clipboard.writeText(phone)
    toast.success("Número copiado com sucesso!")
  }

  return (
    <div className="flex justify-between" key={phone}>
      <div className="flex items-center gap-2">
        <Smartphone />
        <p>{phone}</p>
      </div>
      <Button
        variant="outline"
        size="sm"
        onClick={() => handleCopyPhoneClick(phone)}
      >
        Copiar
      </Button>
    </div>
  )
}

export default PhoneItem
