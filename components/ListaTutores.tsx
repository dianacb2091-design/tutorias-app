'use client'

import { useState } from 'react'
import TutorCard from './TutorCard'


interface Disponibilidad {
  id: string
  materia: string
  descripcion: string | null
  profiles: { full_name: string | null } | null
  fecha: string | null
  hora: string | null
}

export default function ListaTutores({ disponibilidades }: { disponibilidades: Disponibilidad[] }) {
  const [busqueda, setBusqueda] = useState('')

  const filtrados = disponibilidades.filter((d) =>
    `${d.materia} ${d.profiles?.full_name ?? ''}`.toLowerCase().includes(busqueda.toLowerCase())
  )

  return (
    <div>
      <div className="max-w-md mx-auto mb-6">
        <input
          type="text"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          placeholder="Buscar por materia o nombre del tutor..."
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#722F37]"
        />
      </div>

      {filtrados.length === 0 ? (
        <p className="text-center text-gray-600 bg-white rounded-xl p-6 shadow">
          No se encontraron tutores para tu búsqueda.
        </p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtrados.map((d) => (
            <div key={d.id} className="flex flex-col gap-3">
              <TutorCard
  id={d.id}
  nombre={d.profiles?.full_name ?? 'Sin nombre'}
  materia={d.materia}
  descripcion={d.descripcion ?? ''}
  
/>
              
            </div>
          ))}
        </div>
      )}
    </div>
  )
}