export const dynamic = 'force-dynamic'

interface Libro {
  key: string
  title: string
  author_name?: string[]
  first_publish_year?: number
}

export default async function Recursos() {
  const res = await fetch('https://openlibrary.org/search.json?q=matematicas&language=spa&limit=8')
  const json = await res.json()
  const libros = (json.docs ?? []) as Libro[]

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2 text-center text-[#722F37]">
        Recursos para estudiar
      </h1>
      <p className="text-center text-gray-600 mb-8">
        Libros recomendados traídos en vivo desde la API pública de Open Library 📚
      </p>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {libros.map((l) => (
          <div key={l.key} className="bg-white rounded-xl shadow p-4">
            <p className="font-bold text-[#722F37]">{l.title}</p>
            <p className="text-sm text-gray-600 mt-1">
              {l.author_name?.slice(0, 2).join(', ') ?? 'Autor desconocido'}
            </p>
            {l.first_publish_year && (
              <p className="text-xs text-gray-500 mt-2">Publicado en {l.first_publish_year}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}