import ListaTutores from '@/components/ListaTutores'
import { createSupabaseServerClient } from '@/lib/supabase-server'

interface Disponibilidad {
  id: string
  materia: string
  descripcion: string | null
  fecha: string | null
  hora: string | null
  profiles: { full_name: string | null } | null
}

export default async function Tutores() {
  const supabase = createSupabaseServerClient()

  const { data } = await supabase
    .from('disponibilidades')
    .select('*, profiles(full_name)')

  const disponibilidades = (data ?? []) as Disponibilidad[]

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-center text-[#722F37]">
        Tutores Disponibles
      </h1>
      <ListaTutores disponibilidades={disponibilidades} />
    </div>
  )
}