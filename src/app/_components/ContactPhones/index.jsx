import PhoneItem from "../PhoneItem"

const ContactPhones = ({ barbershop }) => {
  return (
    <div className="space-y-3">
      {barbershop.phones.map((phone, index) => (
        <PhoneItem key={index} phone={phone} />
      ))}
    </div>
  )
}

export default ContactPhones
