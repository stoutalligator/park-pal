-- Optional extra place names that tie a live NPS alert to a trail when the
-- alert doesn't name the trail itself (e.g. "Mowich Lake" for Tolmie Peak).
-- Read by the app (src/data/npsAlerts.ts → alertsForTrail) and written by the
-- seed from docs/compendium-research/*.json ("alertKeywords"). Also folded
-- into schema.sql for fresh setups. Run once in the Supabase SQL editor,
-- BEFORE the next `npm run seed:supabase` (the seed now writes this column).

alter table public.trail_details
  add column if not exists alert_keywords jsonb not null default '[]';
