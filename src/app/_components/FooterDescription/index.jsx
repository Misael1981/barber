import Image from "next/image"

const FooterDescription = () => {
  return (
    <footer className="flex items-center justify-between pb-5 pt-10">
      <p className="text-base">Em parceria com</p>
      <Image alt="FSW Barber" src="/Logo.png" height={20} width={125} />
    </footer>
  )
}

export default FooterDescription
