import TutorCard from '@/components/TutorCard'

const tutoresTemporales = [
  {
    nombre: 'Ana Torres',
    materia: 'Matemáticas',
    descripcion: 'Profesora con 5 años de experiencia ayudando a niños de primaria.',
    precio: 8,
  },
  {
    nombre: 'Luis Mendoza',
    materia: 'Lenguaje',
    descripcion: 'Licenciado en educación, especialista en comprensión lectora.',
    precio: 7,
  },
  {
    nombre: 'Carla Ruiz',
    materia: 'Inglés',
    descripcion: 'Clases divertidas y prácticas para todas las edades.',
    precio: 10,
  },
]

export default function Tutores() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-center">Tutores Disponibles</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tutoresTemporales.map((tutor) => (
          <TutorCard key={tutor.nombre} {...tutor} />
        ))}
      </div>
    </div>
  )
}