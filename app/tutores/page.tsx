import TutorCard from '@/components/TutorCard'
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
  .select('id, materia, descripcion, precio, profiles ( full_name )')

if (error) {
  return (
    <p className="text-center text-red-600 font-semibold">
      Error de Supabase: {error.message}
    </p>
  )
}

const disponibilidades = (data ?? []) as Disponibilidad[]
  

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-center text-[#722F37]">
        Tutores Disponibles
      </h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {disponibilidades.map((d) => (
          <TutorCard
            key={d.id}
            nombre={d.profiles?.full_name ?? 'Sin nombre'}
            materia={d.materia}
            descripcion={d.descripcion ?? ''}
            precio={d.precio}
          />
        ))}
      </div>
    </div>
  )
}