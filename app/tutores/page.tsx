import TutorCard from '@/components/TutorCard'
import BotonReservar from '@/components/BotonReservar'
import { createSupabaseServerClient } from '@/lib/supabase-server'


interface Disponibilidad {
  id: string
  materia: string
  descripcion: string | null
  precio: number
  profiles: { full_name: string | null } | null
}

export default async function Tutores() {
  const supabase = createSupabaseServerClient()

  const { data, error } = await supabase
  .from('disponibilidades')
  .select('*, profiles(full_name)') 

const disponibilidades = (data ?? []) as Disponibilidad[]
  

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-center text-[#722F37]">
        Tutores Disponibles
      </h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {disponibilidades.map((d) => (
          <div key={d.id} className="flex flex-col gap-3">
          <TutorCard
            key={d.id}
            nombre={d.profiles?.full_name ?? 'Sin nombre'}
            materia={d.materia}
            descripcion={d.descripcion ?? ''}
            precio={d.precio}
          />
          <BotonReservar disponibilidadId={d.id} />
          </div>
        ))}
      </div>
    </div>
  )
}