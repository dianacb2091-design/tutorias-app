import { crearHorario } from './actions'

export default function NuevoHorario({ searchParams }: { searchParams: { error?: string } }) {
  return (
    <div className="max-w-lg mx-auto bg-white rounded-2xl shadow-lg p-8">
      <h1 className="text-3xl font-bold mb-6 text-[#722F37]">Publicar nuevo horario de atención</h1>

      {searchParams.error && (
        <p className="bg-red-100 text-red-700 p-3 rounded mb-4 text-sm">
          No se pudo publicar el horario. Intenta de nuevo.
        </p>
      )}

      <form action={crearHorario} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Materia</label>
          <input
            type="text"
            name="materia"
            required
            placeholder="Matemáticas"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#722F37]"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Descripción</label>
          <textarea
            name="descripcion"
            rows={3}
            placeholder="Refuerzo para primaria..."
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#722F37]"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Fecha</label>
            <input
              type="date"
              name="fecha"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#722F37]"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Hora</label>
            <input
              type="time"
              name="hora"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#722F37]"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-[#722F37] text-[#F3EAD9] py-3 rounded-lg font-semibold hover:bg-[#5B252C]"
        >
          Publicar horario
        </button>
      </form>
    </div>
  )
}