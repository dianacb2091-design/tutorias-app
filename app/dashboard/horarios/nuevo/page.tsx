'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function NuevoHorario() {
  const router = useRouter()
  const [materia, setMateria] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [fecha, setFecha] = useState('')
  const [hora, setHora] = useState('')
  const [precio, setPrecio] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const [cargando, setCargando] = useState(false)

  async function crear(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setCargando(true)

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      setError('Debes iniciar sesión')
      setCargando(false)
      return
    }

    const { error } = await supabase
      .from('disponibilidades')
      .insert({
        tutor_id: user.id,
        materia,
        descripcion,
        fecha,
        hora,
        precio,
      })

    if (error) {
      setError(error.message)
      setCargando(false)
      return
    }

    router.push('/dashboard/horarios')
    router.refresh()
  }

  return (
    <div className="max-w-lg mx-auto bg-white rounded-2xl shadow-lg p-8">
      <h1 className="text-3xl font-bold mb-6 text-[#722F37]">Publicar nuevo horario</h1>

      {error && <p className="bg-red-100 text-red-700 p-3 rounded mb-4 text-sm">{error}</p>}

      <form onSubmit={crear} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Materia</label>
          <input
            type="text"
            value={materia}
            onChange={(e) => setMateria(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#722F37]"
            placeholder="Matemáticas"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Descripción</label>
          <textarea
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            rows={3}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#722F37]"
            placeholder="Refuerzo para primaria..."
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

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Precio ($/hora)</label>
          <input
            type="number"
            value={precio}
            onChange={(e) => setPrecio(Number(e.target.value))}
            required
            min={0}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#722F37]"
            placeholder="8"
          />
        </div>

        <button
          type="submit"
          disabled={cargando}
          className="w-full bg-[#722F37] text-[#F3EAD9] py-3 rounded-lg font-semibold hover:bg-[#5B252C] disabled:opacity-50"
        >
          {cargando ? 'Publicando...' : 'Publicar horario'}
        </button>
      </form>
    </div>
  )
}