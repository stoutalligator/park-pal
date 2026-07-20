-- Park Pal — Supabase schema
-- Run this once in the Supabase SQL Editor (Project > SQL Editor > New query),
-- then run `node scripts/seed-supabase.mjs` to populate parks/badges.
--
-- If you already ran this against an existing project, apply new columns
-- incrementally instead of re-running the whole file, e.g.:
--   alter table public.profiles add column if not exists units text not null default 'mi' check (units in ('mi', 'km'));

create extension if not exists pgcrypto;

-- ---------------------------------------------------------------------------
-- Reference data (seeded via scripts/seed-supabase.mjs, read-only to clients)
-- ---------------------------------------------------------------------------

create table public.parks (
  id text primary key,
  name text not null,
  state text not null,
  region text not null,
  description text not null default '',
  established_year int,
  acres int,
  lat numeric not null,
  lng numeric not null
);

create table public.badges (
  id text primary key,
  name text not null,
  description text not null default '',
  category text not null,
  goal int
);

-- ---------------------------------------------------------------------------
-- Per-user data
-- ---------------------------------------------------------------------------

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  name text not null default 'Explorer',
  explorer_style text,
  goal text,
  onboarding_complete boolean not null default false,
  profile_background text not null default 'mountain-lake',
  avatar text not null default 'hiking',
  units text not null default 'mi' check (units in ('mi', 'km')),
  created_at timestamptz not null default now()
);

-- Auto-create a profile row whenever a new auth user signs up.
create function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id) values (new.id);
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

create table public.user_park_status (
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  park_id text not null references public.parks(id) on delete cascade,
  status text not null default 'notVisited'
    check (status in ('visited', 'bucketList', 'planned', 'notVisited')),
  is_favorite boolean not null default false,
  primary key (user_id, park_id)
);

create table public.trips (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  park_id text not null references public.parks(id) on delete restrict,
  start_date date not null,
  end_date date not null,
  activities text[] not null default '{}',
  notes text not null default '',
  weather text,
  favorite_trail text,
  wildlife_sightings text[],
  rating smallint check (rating between 1 and 5),
  miles_hiked numeric,
  elevation_gain_ft numeric,
  created_at timestamptz not null default now()
);

-- Photos are capped at 3 per trip *structurally*: slot only accepts 0-2 and
-- (trip_id, slot) is unique, so a 4th photo has nowhere valid to insert.
create table public.trip_photos (
  id uuid primary key default gen_random_uuid(),
  trip_id uuid not null references public.trips(id) on delete cascade,
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  storage_path text not null,
  slot smallint not null check (slot between 0 and 2),
  created_at timestamptz not null default now(),
  unique (trip_id, slot)
);

create table public.user_badges (
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  badge_id text not null references public.badges(id) on delete cascade,
  earned boolean not null default false,
  earned_date timestamptz,
  progress int not null default 0,
  primary key (user_id, badge_id)
);

-- Reference data: popular trails and animals per park (seeded via
-- scripts/seed-supabase.mjs, read-only to clients). Not every park has
-- entries yet — content is filled in incrementally.
create table public.trails (
  id text primary key,
  park_id text not null references public.parks(id) on delete cascade,
  name text not null,
  description text not null default '',
  miles numeric not null,
  elevation_gain_ft int not null,
  difficulty text not null check (difficulty in ('Easy', 'Moderate', 'Hard'))
);

create table public.animals (
  id text primary key,
  park_id text not null references public.parks(id) on delete cascade,
  name text not null,
  description text not null default '',
  rarity text not null check (rarity in ('Common', 'Uncommon', 'Rare'))
);

-- One row per completion/sighting event (not upserted) — repeat hikes of the
-- same trail across different trips each add a row, so sum(miles) correctly
-- accumulates, while "has this ever been done" is just "a row exists".
-- trail_id/animal_id are nullable to support custom entries the user typed
-- in that aren't in the trails/animals catalog.
-- trip_id links a completion back to the trip it happened on (cascades on
-- trip delete, unlike trail_id/animal_id which orphan-not-destroy so catalog
-- edits never wipe a user's history).
create table public.user_trail_completions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  trail_id text references public.trails(id) on delete set null,
  trip_id uuid references public.trips(id) on delete cascade,
  park_id text not null references public.parks(id) on delete cascade,
  name text not null,
  miles numeric not null,
  elevation_gain_ft int not null default 0,
  completed_at timestamptz not null default now()
);

create table public.user_animal_sightings (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  animal_id text references public.animals(id) on delete set null,
  trip_id uuid references public.trips(id) on delete cascade,
  park_id text not null references public.parks(id) on delete cascade,
  name text not null,
  spotted_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Row Level Security
-- ---------------------------------------------------------------------------

alter table public.parks enable row level security;
alter table public.badges enable row level security;
alter table public.profiles enable row level security;
alter table public.user_park_status enable row level security;
alter table public.trips enable row level security;
alter table public.trip_photos enable row level security;
alter table public.user_badges enable row level security;
alter table public.trails enable row level security;
alter table public.animals enable row level security;
alter table public.user_trail_completions enable row level security;
alter table public.user_animal_sightings enable row level security;

-- Reference data: readable by anyone, no client writes (seeded via SQL only).
create policy "parks are publicly readable" on public.parks
  for select using (true);
create policy "badges are publicly readable" on public.badges
  for select using (true);
create policy "trails are publicly readable" on public.trails
  for select using (true);
create policy "animals are publicly readable" on public.animals
  for select using (true);

create policy "users manage their own profile" on public.profiles
  for all using (auth.uid() = id) with check (auth.uid() = id);

create policy "users manage their own park status" on public.user_park_status
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "users manage their own trips" on public.trips
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- Also verifies the parent trip belongs to the same user, not just the photo row.
create policy "users manage their own trip photos" on public.trip_photos
  for all using (
    auth.uid() = user_id
    and exists (select 1 from public.trips t where t.id = trip_id and t.user_id = auth.uid())
  )
  with check (
    auth.uid() = user_id
    and exists (select 1 from public.trips t where t.id = trip_id and t.user_id = auth.uid())
  );

create policy "users manage their own badges" on public.user_badges
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "users manage their own trail completions" on public.user_trail_completions
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "users manage their own animal sightings" on public.user_animal_sightings
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- ---------------------------------------------------------------------------
-- Base privileges
--
-- Required because "Automatically expose new tables" is off (Project
-- Settings > API) — that toggle is what would otherwise auto-grant these.
-- RLS policies above control *which rows*; these grants control whether the
-- role can attempt the operation at all. Both layers are needed.
-- ---------------------------------------------------------------------------

grant usage on schema public to anon, authenticated, service_role;

grant select on public.parks to anon, authenticated;
grant select on public.badges to anon, authenticated;
grant select on public.trails to anon, authenticated;
grant select on public.animals to anon, authenticated;

grant select, insert, update, delete on public.profiles to authenticated;
grant select, insert, update, delete on public.user_park_status to authenticated;
grant select, insert, update, delete on public.trips to authenticated;
grant select, insert, update, delete on public.trip_photos to authenticated;
grant select, insert, update, delete on public.user_badges to authenticated;
grant select, insert, update, delete on public.user_trail_completions to authenticated;
grant select, insert, update, delete on public.user_animal_sightings to authenticated;

-- service_role is the trusted backend/admin key (used only by scripts/*.mjs,
-- never shipped to the app) — it should have unrestricted access to
-- everything, same as it would if "Automatically expose new tables" were on.
grant all on all tables in schema public to service_role;

-- ---------------------------------------------------------------------------
-- Storage: trip photos bucket
-- ---------------------------------------------------------------------------

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'trip-photos',
  'trip-photos',
  true,
  5242880, -- 5MB
  array['image/jpeg', 'image/png', 'image/webp', 'image/heic']
)
on conflict (id) do nothing;

-- Path convention: {user_id}/{trip_id}/{slot}.jpg — policies match the first
-- path segment against the requesting user's id.
create policy "users upload their own trip photos"
  on storage.objects for insert
  with check (
    bucket_id = 'trip-photos'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

create policy "users manage their own trip photo files"
  on storage.objects for update using (
    bucket_id = 'trip-photos'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

create policy "users delete their own trip photo files"
  on storage.objects for delete using (
    bucket_id = 'trip-photos'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

create policy "trip photos are publicly readable"
  on storage.objects for select using (bucket_id = 'trip-photos');
