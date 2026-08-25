import { createSupabaseServerClient } from '@/lib/supabase-server'
import { redirect } from 'next/navigation'
import LogoutButton from '@/components/LogoutButton'
import Link from 'next/link'

export default async function Dashboard() {
  const supabase = createSupabaseServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect('/login')

    const { data: profile } = await supabase
  .from('profiles')
  .select('role')
  .eq('id', user.id)
  .single()

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-8 text-center">
      <h1 className="text-3xl font-bold mb-2 text-[#722F37]">Mi Panel</h1>
      <p className="text-gray-600 mb-6">
        Sesión iniciada como:{' '}
        <span className="font-semibold text-[#722F37]">{user.email}</span>
      </p>

      <div className="flex flex-col items-center gap-3">

      
        {profile?.role === 'tutor' ? (
          <>
            <Link
              href="/dashboard/horarios"
              className="inline-block bg-[#722F37] text-[#F3EAD9] px-6 py-2 rounded-lg font-semibold hover:bg-[#5B252C]"
            >
              Gestionar mis horarios
            </Link>
            <Link
              href="/dashboard/reservas-recibidas"
              className="inline-block bg-[#722F37] text-[#F3EAD9] px-6 py-2 rounded-lg font-semibold hover:bg-[#5B252C]"
            >
              Citas recibidas
            </Link>
          </>
        ) : (
          <Link
            href="/dashboard/reservas"
            className="inline-block bg-[#722F37] text-[#F3EAD9] px-6 py-2 rounded-lg font-semibold hover:bg-[#5B252C]"
          >
            Mis reservas
          </Link>
        )}

        <LogoutButton />
            </div>
    </div>
  )
}