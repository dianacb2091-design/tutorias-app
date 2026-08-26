import Link from 'next/link'
import { createSupabaseServerClient } from '@/lib/supabase-server'
import AgendarCita from '@/components/AgendarCita'

export default async function DetalleHorario({ params }: { params: { id: string } }) {
  const supabase = createSupabaseServerClient()

  const { data } = await supabase
    .from('disponibilidades')
    .select('*, profiles(full_name)')
    .eq('id', params.id)
    .single()

  if (!data) {
    return (
      <div className="max-w-md mx-auto bg-white rounded-2xl shadow-lg p-8 text-center">
        <h1 className="text-2xl font-bold text-[#722F37] mb-4">Horario no encontrado</h1>
        <Link href="/tutores" className="text-[#722F37] font-semibold hover:underline">
          ← Volver a tutores
        </Link>
      </div>
    )
  }

  let clima: { min: number; max: number; lluvia: number } | null = null
  try {
    const resClima = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=-2.90&longitude=-79.01&start_date=${data.fecha}&end_date=${data.fecha}&daily=weathercode,temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=auto`
      )
      if (resClima.ok) {
        const j = await resClima.json()
        clima = {
          min: j.daily.temperature_2m_min[0],
          max: j.daily.temperature_2m_max[0],
          lluvia: j.daily.precipitation_probability_max[0],
          }
        }
      } catch {
    clima = null
  }
  

  return (
    <div className="max-w-lg mx-auto bg-white rounded-2xl shadow-lg p-8">
      <Link href="/tutores" className="text-sm text-[#722F37] font-semibold hover:underline">
        ← Volver a tutores
      </Link>

      <h1 className="text-3xl font-bold mt-4 mb-2 text-[#722F37]">{data.materia}</h1>
      <p className="text-gray-700 mb-1">
        Tutor: <span className="font-semibold">{data.profiles?.full_name ?? 'Sin nombre'}</span>
      </p>
      <p className="text-gray-700 mb-1">📅 Fecha: <span className="font-semibold">{data.fecha}</span></p>
      <p className="text-gray-700 mb-4">🕐 Hora: <span className="font-semibold">{data.hora}</span></p>

      {clima && (
  <p className="text-gray-700 mb-4">
    🌤️ Clima previsto en Cuenca ese día: {clima.min}° a {clima.max}°C · Probabilidad de lluvia: {clima.lluvia}%
  </p>
)}

      {data.descripcion && <p className="text-gray-600 mb-6">{data.descripcion}</p>}

      <AgendarCita disponibilidadId={data.id} />


    </div>
  )
}