import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="bg-[#722F37] shadow-md p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-[#F3EAD9]">
          TutoríasApp
        </Link>
        <div className="space-x-4">
          <Link href="/tutores" className="text-[#F3EAD9] hover:text-white">
            Ver Tutores
          </Link>
          <Link href="/login" className="text-[#F3EAD9] hover:text-white">
            Iniciar Sesión
          </Link>
          <Link
            href="/register"
            className="bg-[#F3EAD9] text-[#722F37] px-4 py-2 rounded font-semibold hover:bg-white"
          >
            Registrarse
          </Link>
        </div>
      </div>
    </nav>
  )
}