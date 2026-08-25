import Link from 'next/link'

export default function Home() {
  return (
    <section className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-10 md:p-14 text-center">
      <h1 className="text-4xl md:text-5xl font-extrabold text-[#722F37] mb-4">
        Agenda la cita con el tutor sin perder tiempo
        
      </h1>
      <p className="text-xl text-gray-600 mb-8">
        Mira los horarios de atención reales de cada tutor y agenda tu cita antes de salir de casa. Sin esperas y sin pagos.
      </p>
      <div className="flex justify-center gap-4">
        <Link
          href="/tutores"
          className="bg-[#722F37] text-[#F3EAD9] px-6 py-3 rounded-lg font-semibold hover:bg-[#5B252C]"
        >
          Ver tutores
        </Link>
        <Link
          href="/register"
          className="border-2 border-[#722F37] text-[#722F37] px-6 py-3 rounded-lg font-semibold hover:bg-[#722F37] hover:text-[#F3EAD9]"
        >
          Soy tutor
        </Link>
      </div>
    </section>
  )
}