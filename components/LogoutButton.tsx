'use client'

import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function LogoutButton() {
  const router = useRouter()

  async function salir() {
    await supabase.auth.signOut()
    router.push('/')
    router.refresh()
  }

  return (
    <button
      onClick={salir}
      className="bg-[#722F37] text-[#F3EAD9] px-6 py-2 rounded-lg font-semibold hover:bg-[#5B252C]"
    >
      Cerrar sesión
    </button>
  )
}