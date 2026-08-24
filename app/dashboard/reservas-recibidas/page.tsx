'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

interface ReservaRecibida {
  id: string
  estado: string
  profiles: { full_name: string | null } | null
  disponibilidades: {
    materia: string
    fecha: string | null
    hora: string | null
    precio: number
  } | null
}

export default function ReservasRecibidas() {
  const [reservas, setReservas] = useState<ReservaRecibida[]>([])
  const [cargando, setCargando] = useState(true)

  async function cargar() {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const { data: mios } = await supabase
      .from('disponibilidades')
      .select('id')
      .eq('tutor_id', user.id)

    const ids = mios?.map((d) => d.id) ?? []
    if (ids.length === 0) {
      setReservas([])
      setCargando(false)
      return
    }

    const { data } = await supabase
      .from('reservas')
      .select('*, profiles(full_name), disponibilidades(materia, fecha, hora, precio)')
      .in('disponibilidad_id', ids)
      .order('created_at', { ascending: false })

    setReservas((data as ReservaRecibida[]) ?? [])
    setCargando(false)
  }

  useEffect(() => {
    cargar()
  }, [])

  async function confirmar(id: string) {
    await supabase.from('reservas').update({ estado: 'confirmada' }).eq('id', id)
    cargar()
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-[#722F37] mb-6">Reservas recibidas</h1>

      {cargando ? (
        <p className="text-gray-600">Cargando...</p>
      ) : reservas.length === 0 ? (
        <p className="text-gray-600 bg-white rounded-xl p-6 text-center shadow">
          Aún no has recibido reservas.
        </p>
      ) : (
        <ul className="space-y-3">
          {reservas.map((r) => (
            <li key={r.id} className="bg-white rounded-xl shadow p-4 flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="font-bold text-[#722F37]">
                  {r.profiles?.full_name ?? 'Un padre'} reservó {r.disponibilidades?.materia ?? 'tu horario'}
                </p>
                <p className="text-sm text-gray-600">
                  {r.disponibilidades?.fecha} a las {r.disponibilidades?.hora} · ${r.disponibilidades?.precio}/hora
                </p>
                <span
                  className={`inline-block mt-1 text-xs font-bold px-2 py-1 rounded-full ${
                    r.estado === 'pendiente'
                      ? 'bg-yellow-100 text-yellow-800'
                      : r.estado === 'confirmada'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                  }`}
                >
                  {r.estado}
                </span>
              </div>
              {r.estado === 'pendiente' && (
                <button
                  onClick={() => confirmar(r.id)}
                  className="bg-green-700 text-white font-semibold px-4 py-2 rounded-lg hover:bg-green-800"
                >
                  Confirmar
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}