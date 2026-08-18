import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md p-4 mb-6">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-blue-600">
          TutoríasApp
        </Link>
        <div className="space-x-4">
          <Link href="/tutores" className="text-gray-700 hover:text-blue-600">
            Ver Tutores
          </Link>
          <Link href="/login" className="text-gray-700 hover:text-blue-600">
            Iniciar Sesión
          </Link>
          <Link
            href="/register"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Registrarse
          </Link>
        </div>
      </div>
    </nav>
  )
}