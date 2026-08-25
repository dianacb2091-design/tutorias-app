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
      {data.descripcion && <p className="text-gray-600 mb-6">{data.descripcion}</p>}

      <AgendarCita disponibilidadId={data.id} />


    </div>
  )
}