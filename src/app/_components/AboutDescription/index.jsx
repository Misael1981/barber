const AboutDescription = ({ description }) => {
  return (
    <>
      <h2 className="mb-2 text-xs font-bold uppercase text-gray-400">
        Sobre nós
      </h2>
      <p className="text-justify text-sm">{description}</p>
    </>
  )
}

export default AboutDescription
