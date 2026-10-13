-- Adds the app_config table for remote switches (already folded into
-- schema.sql for fresh setups). Run once in the Supabase SQL editor.
--
-- The switch starts OFF: no upcoming parks are shown.
--
-- To turn on Chiricahua once the bill is signed:
--   update public.app_config
--     set value = '["chiricahua"]'::jsonb, updated_at = now()
--     where key = 'enabled_upcoming_parks';
--
-- To turn it back off:
--   update public.app_config
--     set value = '[]'::jsonb, updated_at = now()
--     where key = 'enabled_upcoming_parks';

create table public.app_config (
  key text primary key,
  value jsonb not null,
  updated_at timestamptz not null default now()
);

insert into public.app_config (key, value) values ('enabled_upcoming_parks', '[]'::jsonb);

alter table public.app_config enable row level security;

create policy "app config is publicly readable" on public.app_config
  for select using (true);

grant select on public.app_config to anon, authenticated;
grant all on public.app_config to service_role;
