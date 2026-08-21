'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function Register() {
  const router = useRouter()
  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rol, setRol] = useState<'padre' | 'tutor'>('padre')
  const [error, setError] = useState<string | null>(null)
  const [cargando, setCargando] = useState(false)

  async function manejarRegistro(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setCargando(true)

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: nombre, role: rol },
      },
    })

    if (error) {
      setError(error.message)
      setCargando(false)
      return
    }

    router.push('/login')
  }

  return (
    <div className="max-w-md mx-auto bg-white rounded-2xl shadow-lg p-8">
      <h1 className="text-3xl font-bold mb-6 text-center text-[#722F37]">Crear Cuenta</h1>

      {error && (
        <p className="bg-red-100 text-red-700 p-3 rounded mb-4 text-sm">{error}</p>
      )}

      <form onSubmit={manejarRegistro} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Nombre completo</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#722F37]"
            placeholder="Ana Torres"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Correo</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#722F37]"
            placeholder="tucorreo@ejemplo.com"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#722F37]"
            placeholder="Mínimo 6 caracteres"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Soy...</label>
          <select
            value={rol}
            onChange={(e) => setRol(e.target.value as 'padre' | 'tutor')}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#722F37]"
          >
            <option value="padre">Padre / Madre de familia</option>
            <option value="tutor">Tutor / Profesor</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={cargando}
          className="w-full bg-[#722F37] text-[#F3EAD9] py-3 rounded-lg font-semibold hover:bg-[#5B252C] disabled:opacity-50"
        >
          {cargando ? 'Creando cuenta...' : 'Registrarme'}
        </button>
      </form>

      <p className="text-center text-sm text-gray-600 mt-4">
        ¿Ya tienes cuenta?{' '}
        <a href="/login" className="text-[#722F37] font-semibold hover:underline">
          Inicia sesión
        </a>
      </p>
    </div>
  )
}