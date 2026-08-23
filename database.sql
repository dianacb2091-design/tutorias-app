
-- TutoríasApp — Esquema completo de base de datos


-- ── 1. TABLA: profiles ──
create table if not exists profiles (
  id          uuid primary key default gen_random_uuid(),
  full_name   text,
  role        text not null default 'padre'
              check (role in ('padre', 'tutor')),
  bio         text,
  created_at  timestamptz not null default now()
);

-- ── 2. TABLA: disponibilidades ──
create table if not exists disponibilidades (
  id           uuid primary key default gen_random_uuid(),
  tutor_id     uuid references profiles(id) on delete cascade,
  materia      text not null,
  descripcion  text,
  fecha        date,
  hora         text,
  precio       numeric not null default 0,
  created_at   timestamptz not null default now()
);

-- ── 3. TABLA: reservas ──
create table if not exists reservas (
  id                uuid primary key default gen_random_uuid(),
  disponibilidad_id uuid references disponibilidades(id) on delete cascade,
  padre_id          uuid references profiles(id) on delete cascade,
  estado            text not null default 'pendiente'
                    check (estado in ('pendiente', 'confirmada', 'cancelada')),
  created_at        timestamptz not null default now()
);

-- ── 4. Trigger: perfil automático al registrarse ──
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, role)
  values (
    new.id,
    new.raw_user_meta_data->>'full_name',
    coalesce(new.raw_user_meta_data->>'role', 'padre')
  );
  return new;
end;
$$ language plpgsql security definer;

create or replace trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

-- ── 5. POLÍTICAS RLS POR ROL ──
alter table profiles enable row level security;

create policy "lectura pública de profiles"
on profiles for select using (true);

create policy "usuario edita su propio perfil"
on profiles for update to authenticated
using (id = auth.uid());

alter table disponibilidades enable row level security;

create policy "lectura pública de disponibilidades"
on disponibilidades for select using (true);

create policy "tutor crea sus disponibilidades"
on disponibilidades for insert to authenticated
with check (
  tutor_id = auth.uid()
  and exists (select 1 from profiles where id = auth.uid() and role = 'tutor')
);

create policy "tutor edita sus disponibilidades"
on disponibilidades for update to authenticated
using (tutor_id = auth.uid());

create policy "tutor elimina sus disponibilidades"
on disponibilidades for delete to authenticated
using (tutor_id = auth.uid());

alter table reservas enable row level security;

create policy "padre crea su reserva"
on reservas for insert to authenticated
with check (
  padre_id = auth.uid()
  and exists (select 1 from profiles where id = auth.uid() and role = 'padre')
);

create policy "involucrados ven sus reservas"
on reservas for select to authenticated
using (
  padre_id = auth.uid()
  or exists (
    select 1 from disponibilidades d
    where d.id = disponibilidad_id and d.tutor_id = auth.uid()
  )
);

create policy "involucrados actualizan reserva"
on reservas for update to authenticated
using (
  padre_id = auth.uid()
  or exists (
    select 1 from disponibilidades d
    where d.id = disponibilidad_id and d.tutor_id = auth.uid()
  )
);