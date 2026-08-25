'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'

interface Disponibilidad {
  id: string
  materia: string
  descripcion: string | null
  fecha: string | null
  hora: string | null

}

export default function MisHorarios() {
  const [horarios, setHorarios] = useState<Disponibilidad[]>([])
  const [cargando, setCargando] = useState(true)

  async function cargar() {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return
    const { data } = await supabase
      .from('disponibilidades')
      .select('*')
      .eq('tutor_id', user.id)
      .order('fecha', { ascending: true })
    setHorarios((data as Disponibilidad[]) ?? [])
    setCargando(false)
  }

  useEffect(() => {
    cargar()
  }, [])

  async function eliminar(id: string) {
    if (!confirm('¿Eliminar este horario? Esta acción no se puede deshacer.')) return
    await supabase.from('disponibilidades').delete().eq('id', id)
    cargar()
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-[#722F37]">Mis horarios</h1>
        <Link
          href="/dashboard/horarios/nuevo"
          className="bg-[#722F37] text-[#F3EAD9] px-4 py-2 rounded-lg font-semibold hover:bg-[#5B252C]"
        >
          + Publicar horario
        </Link>
      </div>

      {cargando ? (
        <p className="text-gray-600">Cargando...</p>
      ) : horarios.length === 0 ? (
        <p className="text-gray-600 bg-white rounded-xl p-6 text-center shadow">
          Aún no has publicado horarios.
        </p>
      ) : (
        <ul className="space-y-3">
          {horarios.map((h) => (
            <li key={h.id} className="bg-white rounded-xl shadow p-4 flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="font-bold text-[#722F37]">{h.materia}</p>
                <p className="text-sm text-gray-600">
                  {h.fecha} a las {h.hora} — {h.descripcion}
                </p>
              </div>
              <div className="flex gap-4">
              <Link
                 href={`/dashboard/horarios/${h.id}/editar`}
                  className="text-blue-700 font-semibold hover:underline"
                >
                 Editar
                  </Link>
                <button
                 onClick={() => eliminar(h.id)}
                   className="text-red-700 font-semibold hover:underline"
                >
                Eliminar
               </button>
              
              </div>
      
            </li>
            
          ))}
        </ul>
      )}
    </div>
  )
}