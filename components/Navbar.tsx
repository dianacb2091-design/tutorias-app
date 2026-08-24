'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import type { User } from '@supabase/supabase-js'
import { useRouter } from 'next/navigation'

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null)

  const router = useRouter()

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user))

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => listener.subscription.unsubscribe()
  }, [])

 async function salir() {
  await supabase.auth.signOut()
  router.push('/')
  router.refresh()
}

  return (
    <nav className="bg-[#722F37] shadow-md p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-[#F3EAD9]">
          TutoríasApp
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/tutores" className="text-[#F3EAD9] hover:text-white">
            Ver Tutores
          </Link>
          <Link href="/recursos" className="text-[#F3EAD9] hover:text-white">
             Recursos
          </Link>
          {user ? (
            <>
              <Link href="/dashboard" className="text-[#F3EAD9] hover:text-white font-semibold">
                Mi Panel
              </Link>
              <button
                onClick={salir}
                className="bg-[#F3EAD9] text-[#722F37] px-4 py-2 rounded font-semibold hover:bg-white"
              >
                Salir
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="text-[#F3EAD9] hover:text-white">
                Iniciar Sesión
              </Link>
              <Link
                href="/register"
                className="bg-[#F3EAD9] text-[#722F37] px-4 py-2 rounded font-semibold hover:bg-white"
              >
                Registrarse
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}