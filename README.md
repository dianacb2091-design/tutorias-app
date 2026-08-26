# TutoríasApp — Citas escolares de tutoría

Aplicación web que conecta a **tutores** (profesores) con **padres de familia** de una institución educativa. Los tutores publican sus horarios de atención reales y los padres agendan la cita **antes de salir de casa**, sin filas, sin esperas y sin pagos.

## Enlaces

| App desplegada | https://tutorias-app-delta.vercel.app 
| Video demostrativo | (https://ister.sharepoint.com/:v:/s/sgdl4na1595/IQDidM_V-P0ZSpvEWXYQl92oAZraW3urePfoG6DcWanxePA?e=QT1X3J)
| Base de datos | Supabase (PostgreSQL en la nube) 

## El problema que resuelve

En la escuela, los padres llegan sin saber si el tutor está disponible: hacen fila, preguntan en secretaría y muchas veces vuelven sin conseguir la cita. TutoríasApp muestra los **horarios de atención reales** de cada tutor y permite agendar la cita en línea, con confirmación y cancelación.

## Stack tecnológico

- **Next.js 14** (App Router) + **TypeScript**
- **Supabase** — PostgreSQL + Autenticación + Row Level Security (RLS)
- **Tailwind CSS**
- **Open Library API** y **Open-Meteo API** — APIs externas públicas
- **Vercel** — despliegue continuo desde GitHub

## Roles y cuentas de prueba

| Rol | Correo | Contraseña |
|---|---|---|
| Tutor | `tutor1@prueba.com` | `123456` |
| Tutor | `ana@prueba.com` | `123456` |
| Padre | `padre1@prueba.com` | `123456` |

## Modelo de datos

| Tabla | Descripción | Relaciones |
|---|---|---|
| `profiles` | Nombre y rol (`tutor` / `padre`) de cada usuario | 1→1 con Auth |
| `disponibilidades` | Horarios de atención que publica un tutor | N→1 con `profiles` (`tutor_id`) |
| `reservas` | Citas agendadas por un padre | N→1 con `profiles` (`padre_id`) y N→1 con `disponibilidades` (`disponibilidad_id`) |

## Funcionalidades (CRUD completo)

- **Create** — El tutor publica horarios (Server Action desde el servidor); el padre agenda citas.
- **Read** — Listado público de tutores con buscador en tiempo real (`useState`), detalle público por ruta dinámica `/tutores/[id]`, y paneles "Mis citas" / "Citas recibidas".
- **Update** — El tutor edita sus horarios y confirma citas (`pendiente → confirmada`).
- **Delete** — El tutor elimina horarios; el padre cancela citas (`cancelada`).

## Seguridad

- Autenticación con roles (`tutor` / `padre`) en el registro.
- **Row Level Security (RLS)** en Supabase: cada rol solo lee/escribe lo que le corresponde (un tutor no puede agendar citas; un padre no puede publicar horarios).
- Rutas `/dashboard` protegidas con **middleware**.

## APIs externas

La sección `/recursos` consume la API pública de **Open Library** con `fetch` + `async/await` en un Server Component. El usuario busca un **tema** (ej: `fracciones`) y los libros llegan en vivo; cada tarjeta enlaza a la ficha real del libro. Si la API no responde, se muestra un mensaje amable (manejo básico de errores).

Además, el detalle de cada horario muestra el **clima previsto en Cuenca para el día de la cita** (Open-Meteo, sin clave), siguiendo la sugerencia del documento de las instrucciones sobre contextualizar la reserva con el clima del día.

## Cómo ejecutarlo localmente

```bash
git clone <url-del-repo>
cd tutorias-app
npm install
# crea .env.local con tus claves de Supabase:
# NEXT_PUBLIC_SUPABASE_URL=...
# NEXT_PUBLIC_SUPABASE_ANON_KEY=...
npm run dev
```

## Trabajo futuro

- Que los tutores **recomienden temas específicos** por estudiante después de la cita.
- Agrupar el catálogo de tutores **por profesor** (no solo por materia).
- Historial de búsquedas recientes en Recursos (como un navegador).
- Archivar horarios con fecha pasada como **historial del mes**: citas atendidas, asistencias y cancelaciones tardías.
- Permitir que el **tutor cancele** una cita en caso de emergencia.
- Reporte mensual de asistencia para el tutor.

---
Proyecto académico — desarrollado con Next.js, TypeScript y Supabase.