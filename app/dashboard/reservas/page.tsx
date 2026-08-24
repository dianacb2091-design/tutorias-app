'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

interface Reserva {
  id: string
  estado: string
  disponibilidades: {
    materia: string
    fecha: string | null
    hora: string | null
    precio: number
    profiles: { full_name: string | null } | null
  } | null
}

export default function MisReservas() {
  const [reservas, setReservas] = useState<Reserva[]>([])
  const [cargando, setCargando] = useState(true)

  async function cargar() {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return
    const { data } = await supabase
      .from('reservas')
      .select('*, disponibilidades(materia, fecha, hora, precio, profiles(full_name))')
      .eq('padre_id', user.id)
      .order('created_at', { ascending: false })
    setReservas((data as Reserva[]) ?? [])
    setCargando(false)
  }

  useEffect(() => {
    cargar()
  }, [])

  async function cancelar(id: string) {
    if (!confirm('¿Cancelar esta reserva?')) return
    await supabase.from('reservas').update({ estado: 'cancelada' }).eq('id', id)
    cargar()
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-[#722F37] mb-6">Mis reservas</h1>

      {cargando ? (
        <p className="text-gray-600">Cargando...</p>
      ) : reservas.length === 0 ? (
        <p className="text-gray-600 bg-white rounded-xl p-6 text-center shadow">
          Aún no has reservado horarios.
        </p>
      ) : (
        <ul className="space-y-3">
          {reservas.map((r) => (
            <li key={r.id} className="bg-white rounded-xl shadow p-4 flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="font-bold text-[#722F37]">
                  {r.disponibilidades?.materia ?? 'Materia'} con {r.disponibilidades?.profiles?.full_name ?? 'tutor'}
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
                  onClick={() => cancelar(r.id)}
                  className="text-red-700 font-semibold hover:underline"
                >
                  Cancelar
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}