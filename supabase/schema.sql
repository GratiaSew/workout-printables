create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.exercises (
  id uuid primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  category text not null,
  target_sets integer not null default 4 check (target_sets > 0),
  target_reps text not null default '10',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.exercise_logs (
  id uuid primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  exercise_id uuid not null references public.exercises(id) on delete cascade,
  date date not null,
  weight numeric not null default 0,
  reps integer not null check (reps > 0),
  sets integer not null check (sets > 0),
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.workout_days (
  user_id uuid not null references auth.users(id) on delete cascade,
  date date not null,
  done boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (user_id, date)
);

create table if not exists public.schedules (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references auth.users(id) on delete cascade,
  anchor_date date not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.schedule_days (
  id uuid primary key default gen_random_uuid(),
  schedule_id uuid not null references public.schedules(id) on delete cascade,
  day_index integer not null check (day_index >= 0),
  label text not null,
  type text not null check (type in ('workout', 'rest')),
  exercise_names jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (schedule_id, day_index)
);

alter table public.profiles enable row level security;
alter table public.exercises enable row level security;
alter table public.exercise_logs enable row level security;
alter table public.workout_days enable row level security;
alter table public.schedules enable row level security;
alter table public.schedule_days enable row level security;

drop policy if exists "profiles owner" on public.profiles;
create policy "profiles owner" on public.profiles
for all using (auth.uid() = id)
with check (auth.uid() = id);

drop policy if exists "exercises owner" on public.exercises;
create policy "exercises owner" on public.exercises
for all using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists "exercise_logs owner" on public.exercise_logs;
create policy "exercise_logs owner" on public.exercise_logs
for all using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists "workout_days owner" on public.workout_days;
create policy "workout_days owner" on public.workout_days
for all using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists "schedules owner" on public.schedules;
create policy "schedules owner" on public.schedules
for all using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists "schedule_days owner via schedule" on public.schedule_days;
create policy "schedule_days owner via schedule" on public.schedule_days
for all
using (
  exists (
    select 1
    from public.schedules s
    where s.id = schedule_days.schedule_id and s.user_id = auth.uid()
  )
)
with check (
  exists (
    select 1
    from public.schedules s
    where s.id = schedule_days.schedule_id and s.user_id = auth.uid()
  )
);
