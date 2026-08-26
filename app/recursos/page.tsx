interface Libro {
  key: string
  title: string
  author_name?: string[]
  first_publish_year?: number
}



export default async function Recursos({ searchParams }: { searchParams: { q?: string } }) {
  const tema = searchParams.q?.trim() || ''

  let libros: Libro[] = []
  let errorApi = false

  if (tema) {
    try {
      const res = await fetch(
        `https://openlibrary.org/search.json?q=${encodeURIComponent(tema)}&language=spa&limit=12`
      )
      if (!res.ok) throw new Error('Open Library no respondió')
      const json = await res.json()
      libros = (json.docs ?? []) as Libro[]
    } catch {
      errorApi = true
    }
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2 text-center text-[#722F37]">Recursos para estudiar</h1>
      <p className="text-center text-gray-600 mb-6">
        Busca el tema exacto que necesitas reforzar: libros en vivo desde la API pública de Open Library 📚
      </p>

      <form action="/recursos" method="get" className="max-w-md mx-auto mb-6 flex gap-2">
        <input
          type="text"
          name="q"
          defaultValue={tema}
          placeholder="Ej: fracciones, fotosíntesis, comprensión lectora..."
          className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#722F37]"
        />
        <button
          type="submit"
          className="bg-[#722F37] text-[#F3EAD9] px-4 py-2 rounded-lg font-semibold hover:bg-[#5B252C]"
        >
          Buscar
        </button>
      </form>

      {!tema && (
  <p className="text-center text-sm text-gray-500">
    Escribe el tema que necesitas reforzar y presiona Buscar.
  </p>
)}

      {tema && errorApi && (
        <p className="max-w-md mx-auto text-center bg-red-100 text-red-700 rounded-xl p-6">
          No se pudieron cargar los libros en este momento. La API de Open Library no respondió — intenta de nuevo en unos minutos.
        </p>
      )}

      {tema && !errorApi && libros.length === 0 && (
        <p className="max-w-md mx-auto text-center bg-white rounded-xl p-6 shadow">
          No se encontraron libros para ese tema. Prueba con otra palabra.
        </p>
      )}

      {tema && !errorApi && libros.length > 0 && (
        <>
          <p className="text-center text-sm text-gray-600 mb-4">
            Refuerzo para el tema: <span className="font-bold text-[#722F37]">{tema}</span>
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {libros.map((l) => (
              <a
            key={l.key}
            href={`https://openlibrary.org${l.key}`}
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-white rounded-xl shadow p-4 hover:shadow-lg transition-shadow"
            >
              <h2 className="font-bold text-[#722F37]">{l.title}</h2>
              <p className="text-sm text-gray-600">
                {l.author_name?.slice(0, 2).join(', ') ?? 'Autor desconocido'}
                </p>
                {l.first_publish_year && (
                  <p className="text-xs text-gray-500 mt-2">Publicado en {l.first_publish_year}</p>
                  )}
                  <p className="text-xs text-[#722F37] font-semibold mt-3">Ver libro en Open Library ↗</p>
                  </a>
                  ))}
              
          </div>
        </>
      )}
    </div>
  )
}