'use server'

import { createSupabaseServerClient } from '@/lib/supabase-server'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

export async function crearHorario(formData: FormData) {
  const supabase = createSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { error } = await supabase.from('disponibilidades').insert({
    tutor_id: user.id,
    materia: formData.get('materia') as string,
    descripcion: (formData.get('descripcion') as string) || null,
    fecha: formData.get('fecha') as string,
    hora: formData.get('hora') as string,
  })

  if (error) redirect('/dashboard/horarios/nuevo?error=1')

  revalidatePath('/dashboard/horarios')
  redirect('/dashboard/horarios')
}