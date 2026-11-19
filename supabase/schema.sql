-- =============================================================================
-- Schema SQL oficial do e-commerce Cursos EAD para Supabase (PostgreSQL)
-- Execute este arquivo no SQL Editor do painel do Supabase.
-- =============================================================================

-- 1. Perfis de estudantes vinculados ao Supabase Auth
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text not null,
  email text not null,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "Usuarios visualizam o proprio perfil"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Usuarios atualizam o proprio perfil"
  on public.profiles for update
  using (auth.uid() = id);

-- Trigger automatica ao cadastrar usuario no Supabase Auth
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  insert into public.profiles (id, full_name, email)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'full_name', split_part(new.email, '@', 1)),
    new.email
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- 2. Catalogo de trilhas (26 trilhas do Nucleo de Projetos)
create table if not exists public.courses (
  id text primary key,
  slug text unique not null,
  title text not null,
  tagline text not null,
  description text not null,
  category text not null check (
    category in ('web-mobile', 'backend', 'ia-vibe', 'engenharia', 'dados-cloud', 'fundamentos')
  ),
  level text not null check (level in ('Iniciante', 'Intermediário', 'Avançado')),
  course_count integer not null check (course_count > 0),
  total_hours integer not null check (total_hours > 0),
  np_points integer not null default 30,
  price numeric(10, 2) not null check (price >= 49.99 and price <= 250.00),
  original_price numeric(10, 2),
  badge text,
  featured boolean not null default false,
  image text not null,
  image_alt text not null,
  stack text[] not null default '{}',
  outcomes text[] not null default '{}',
  prerequisites text[] not null default '{}',
  created_at timestamptz not null default now()
);

alter table public.courses enable row level security;

create policy "Catalogo publico de trilhas"
  on public.courses for select
  using (true);

-- 3. Modulos / cursos dentro de cada trilha (90 cursos totalizando 553h)
create table if not exists public.course_modules (
  id text primary key,
  course_id text not null references public.courses (id) on delete cascade,
  position integer not null,
  title text not null,
  hours integer not null check (hours > 0),
  topics text[] not null default '{}'
);

create index if not exists idx_course_modules_course_id on public.course_modules (course_id);

alter table public.course_modules enable row level security;

create policy "Modulos publicos das trilhas"
  on public.course_modules for select
  using (true);

-- 4. Matriculas e progresso por usuario
create table if not exists public.enrollments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  course_id text not null references public.courses (id) on delete cascade,
  paid_price numeric(10, 2) not null,
  coupon_applied text,
  completed_module_ids text[] not null default '{}',
  enrolled_at timestamptz not null default now(),
  unique (user_id, course_id)
);

create index if not exists idx_enrollments_user_id on public.enrollments (user_id);

alter table public.enrollments enable row level security;

create policy "Usuario le apenas suas matriculas"
  on public.enrollments for select
  using (auth.uid() = user_id);

create policy "Usuario cria suas proprias matriculas"
  on public.enrollments for insert
  with check (auth.uid() = user_id);

create policy "Usuario atualiza progresso das proprias matriculas"
  on public.enrollments for update
  using (auth.uid() = user_id);
