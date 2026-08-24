import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'



export const metadata: Metadata = {
  title: 'TutoríasApp - Reserva tutorías fácilmente',
  description: 'Plataforma para reservar tutorías con profesores',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className="bg-[#E7DCC8] min-h-screen">
        <div className="max-w-5xl mx-auto my-6 bg-[#FAF6ED] rounded-2xl shadow-2xl overflow-hidden">
          <Navbar />
          <main className="px-6 py-8">{children}</main>
        </div>
      </body>
    </html>
  )
}