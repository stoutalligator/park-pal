-- Live NPS alerts (Danger / Park Closure / Caution / Information), copied
-- verbatim from the NPS API by the sync-nps-alerts Edge Function and read by
-- the app (src/data/npsAlerts.ts). Also folded into schema.sql for fresh
-- setups. Run once in the Supabase SQL editor.

create table public.park_alerts (
  id text primary key,                 -- NPS alert id
  park_code text not null,             -- nps.gov park code, e.g. 'zion'
  category text not null,
  title text not null,
  description text not null default '',
  url text,
  last_indexed_date timestamptz,
  fetched_at timestamptz not null default now()
);

create index park_alerts_park_code on public.park_alerts (park_code);

alter table public.park_alerts enable row level security;

create policy "park alerts are publicly readable" on public.park_alerts
  for select using (true);

grant select on public.park_alerts to anon, authenticated;
grant all on public.park_alerts to service_role;

-- When the last successful sync ran (shown in the app as "Updated N min ago").
insert into public.app_config (key, value) values ('nps_alerts_synced_at', 'null'::jsonb)
on conflict (key) do nothing;

-- ---------------------------------------------------------------------------
-- Schedule: run the sync every 30 minutes.
-- Prerequisites (Dashboard → Database → Extensions): enable pg_cron and pg_net.
-- Then deploy the function (see supabase/functions/sync-nps-alerts/index.ts)
-- and replace the two placeholders below before running this block:
--   <PROJECT_REF>  your project ref (the subdomain of your Supabase URL)
--   <ANON_KEY>     your project's anon (public) key
-- The function throttles itself to one NPS fetch per 10 minutes, so the
-- public anon key is enough to call it.
-- ---------------------------------------------------------------------------
-- select cron.schedule(
--   'sync-nps-alerts',
--   '*/30 * * * *',
--   $$
--   select net.http_post(
--     url := 'https://<PROJECT_REF>.supabase.co/functions/v1/sync-nps-alerts',
--     headers := jsonb_build_object('Authorization', 'Bearer <ANON_KEY>', 'Content-Type', 'application/json'),
--     body := '{}'::jsonb
--   );
--   $$
-- );
