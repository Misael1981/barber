import { Card, CardContent } from "../ui/card"

const Footer = () => {
  return (
    <footer className="mt-10">
      <Card>
        <CardContent className="px-5 py-0">
          <p className="text-sm text-gray-400">
            © 2025 Copyright <span className="font-bold">FSW Barber</span>
          </p>
        </CardContent>
      </Card>
    </footer>
  )
}

export default Footer
