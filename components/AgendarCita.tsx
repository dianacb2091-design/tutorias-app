'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function AgendarCita({ disponibilidadId }: { disponibilidadId: string }) {
  const router = useRouter()
  const [mensaje, setMensaje] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  async function cita () {
    setMensaje(null)
    setError(null)

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      router.push('/login')
      return
    }

    const { error } = await supabase
      .from('reservas')
      .insert({ disponibilidad_id: disponibilidadId, padre_id: user.id })

    if (error) {
      setError('Solo los padres pueden agendar citas')
      return
    }
    setMensaje('¡Cita agendada!')
  }

  return (
    <div className="text-center">
      <button
        onClick={cita}
        className="bg-[#722F37] text-[#F3EAD9] px-4 py-2 rounded-lg font-semibold hover:bg-[#5B252C]"
      >
        Agendar cita
      </button>
      {mensaje && <p className="text-green-700 text-sm mt-1">{mensaje}</p>}
      {error && <p className="text-red-700 text-sm mt-1">{error}</p>}
    </div>
  )
}