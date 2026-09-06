-- Borrar todo si ya existe (para poder correr el script varias veces sin error)
drop trigger if exists on_auth_user_created on auth.users;
drop function if exists public.handle_new_user();
drop table if exists public.tickets cascade;
drop table if exists public.events cascade;
drop table if exists public.videos cascade;
drop table if exists public.audio_tracks cascade;
drop table if exists public.profiles cascade;

-- Crear tabla de Perfiles (extendiendo los usuarios de Auth)
create table public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  email text not null,
  role text default 'USER'::text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Habilitar RLS
alter table public.profiles enable row level security;

-- Políticas para Profiles
create policy "Public profiles are viewable by everyone." on profiles
  for select using (true);
create policy "Users can insert their own profile." on profiles
  for insert with check (auth.uid() = id);
create policy "Users can update own profile." on profiles
  for update using (auth.uid() = id);

-- Crear tabla de Eventos
create table public.events (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  date timestamp with time zone not null,
  price numeric not null,
  total_tickets integer not null,
  flyer_url text,
  description text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Políticas para Eventos
alter table public.events enable row level security;
create policy "Events are viewable by everyone." on events
  for select using (true);
create policy "Admins can insert events." on events
  for insert with check (
    exists (select 1 from public.profiles where id = auth.uid() and role = 'ADMIN')
  );
create policy "Admins can update events." on events
  for update using (
    exists (select 1 from public.profiles where id = auth.uid() and role = 'ADMIN')
  );
create policy "Admins can delete events." on events
  for delete using (
    exists (select 1 from public.profiles where id = auth.uid() and role = 'ADMIN')
  );

-- Crear tabla de Boletas/Reservas (Tickets)
create table public.tickets (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  event_id uuid references public.events(id) on delete cascade not null,
  status text default 'PENDING'::text not null, -- PENDING, APPROVED, REJECTED, USED
  receipt_url text,
  qr_code uuid default gen_random_uuid(),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Políticas para Tickets
alter table public.tickets enable row level security;
create policy "Users can view their own tickets." on tickets
  for select using (auth.uid() = user_id);
create policy "Users can create their own tickets." on tickets
  for insert with check (auth.uid() = user_id);
create policy "Admins can view all tickets." on tickets
  for select using (
    exists (
      select 1 from public.profiles where id = auth.uid() and role = 'ADMIN'
    )
  );
create policy "Admins can update tickets." on tickets
  for update using (
    exists (
      select 1 from public.profiles where id = auth.uid() and role = 'ADMIN'
    )
  );

-- Función (Trigger) para crear un perfil automáticamente cuando un usuario se registra
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, role)
  values (new.id, new.email, 'USER');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- IMPORTANTE: Crear el bucket de Storage (Ejecutar desde el panel de Supabase)
-- 1. Ve a "Storage" en Supabase.
-- 2. Crea un bucket llamado "receipts".
-- 3. Hazlo público.
-- 4. Crea otro bucket llamado "audio_sets" y hazlo público.

-- Crear tabla de Videos (YouTube)
create table public.videos (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  dj text not null,
  location text not null,
  youtube_url text not null,
  cover_url text not null,
  category text not null, -- 'CAPITULOS', 'BOSQUE', 'LIVE_SETS'
  duration text not null,
  chapter_number integer,
  views text default '1.2K'::text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.videos enable row level security;
create policy "Videos viewable by everyone." on videos for select using (true);
create policy "Admins can insert videos." on videos for insert with check (exists (select 1 from public.profiles where id = auth.uid() and role = 'ADMIN'));
create policy "Admins can update videos." on videos for update using (exists (select 1 from public.profiles where id = auth.uid() and role = 'ADMIN'));
create policy "Admins can delete videos." on videos for delete using (exists (select 1 from public.profiles where id = auth.uid() and role = 'ADMIN'));

-- Crear tabla de Radio/Audio
create table public.audio_tracks (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  dj text not null,
  location text not null,
  audio_url text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.audio_tracks enable row level security;
create policy "Audios viewable by everyone." on audio_tracks for select using (true);
create policy "Admins can insert audios." on audio_tracks for insert with check (exists (select 1 from public.profiles where id = auth.uid() and role = 'ADMIN'));
create policy "Admins can update audios." on audio_tracks for update using (exists (select 1 from public.profiles where id = auth.uid() and role = 'ADMIN'));
create policy "Admins can delete audios." on audio_tracks for delete using (exists (select 1 from public.profiles where id = auth.uid() and role = 'ADMIN'));

-- ==========================================
-- SCRIPT DE MIGRACIÓN: RESCATAR USUARIOS
-- ==========================================
-- Como acabamos de borrar y recrear la tabla de perfiles, 
-- necesitamos asegurarnos de que tu usuario de autenticación 
-- recupere su perfil y se le asigne el rango de ADMIN.
INSERT INTO public.profiles (id, email, role)
SELECT id, email, 'ADMIN'
FROM auth.users
ON CONFLICT (id) DO UPDATE SET role = 'ADMIN';
