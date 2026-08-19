interface TutorCardProps {
  nombre: string
  materia: string
  descripcion: string
  precio: number
}

export default function TutorCard({ nombre, materia, descripcion, precio }: TutorCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow border-t-4 border-[#722F37]">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-xl font-bold text-gray-800">{nombre}</h2>
        <span className="bg-[#722F37] text-[#F3EAD9] text-sm font-semibold px-3 py-1 rounded-full">
          {materia}
        </span>
      </div>
      <p className="text-gray-600 mb-4">{descripcion}</p>
      <div className="flex items-center justify-between">
        <span className="text-[#722F37] font-bold">${precio}/hora</span>
        <span className="text-[#722F37] font-semibold">Ver horarios →</span>
      </div>
    </div>
  )
}