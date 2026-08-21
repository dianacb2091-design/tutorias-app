import { createSupabaseServerClient } from '@/lib/supabase-server'
import { redirect } from 'next/navigation'
import LogoutButton from '@/components/LogoutButton'

export default async function Dashboard() {
  const supabase = createSupabaseServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-8 text-center">
      <h1 className="text-3xl font-bold mb-2 text-[#722F37]">Mi Panel</h1>
      <p className="text-gray-600 mb-6">
        Sesión iniciada como:{' '}
        <span className="font-semibold text-[#722F37]">{user.email}</span>
      </p>
      <LogoutButton />
    </div>
  )
}