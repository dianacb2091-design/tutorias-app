'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter, useParams } from 'next/navigation'

export default function EditarHorario() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string

  const [materia, setMateria] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [fecha, setFecha] = useState('')
  const [hora, setHora] = useState('')
  
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    async function cargar() {
      const { data } = await supabase
        .from('disponibilidades')
        .select('*')
        .eq('id', id)
        .single()
      if (data) {
        setMateria(data.materia)
        setDescripcion(data.descripcion ?? '')
        setFecha(data.fecha ?? '')
        setHora(data.hora ?? '')
        
      }
      setCargando(false)
    }
    cargar()
  }, [id])

  async function guardar(e: React.FormEvent) {
    e.preventDefault()
    const { error } = await supabase
      .from('disponibilidades')
      .update({ materia, descripcion, fecha, hora,})
      .eq('id', id)
    if (!error) {
      router.push('/dashboard/horarios')
      router.refresh()
    }
  }

  if (cargando) return <p className="text-center text-gray-600">Cargando...</p>

  return (
    <div className="max-w-lg mx-auto bg-white rounded-2xl shadow-lg p-8">
      <h1 className="text-3xl font-bold mb-6 text-[#722F37]">Editar horario</h1>

      <form onSubmit={guardar} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Materia</label>
          <input
            type="text"
            value={materia}
            onChange={(e) => setMateria(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#722F37]"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Descripción</label>
          <textarea
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            rows={3}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#722F37]"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Fecha</label>
            <input
              type="date"
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#722F37]"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Hora</label>
            <input
              type="time"
              value={hora}
              onChange={(e) => setHora(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#722F37]"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-[#722F37] text-[#F3EAD9] py-3 rounded-lg font-semibold hover:bg-[#5B252C]"
        >
          Guardar cambios
        </button>
      </form>
    </div>
  )
}