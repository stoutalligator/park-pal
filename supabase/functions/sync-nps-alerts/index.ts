// Copies current NPS alerts (developer.nps.gov /alerts) into public.park_alerts
// so the app can read them without ever holding the NPS API key. Scheduled
// every 30 minutes with pg_cron (supabase/migrations/2026-10-13-nps-alerts.sql).
//
// Deploy:
//   npx supabase secrets set NPS_API_KEY=<your key>
//   npx supabase functions deploy sync-nps-alerts
// SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are provided by Supabase.

import { createClient } from 'npm:@supabase/supabase-js@2';

// Must match every npsCode in src/data/parkGuides.ts (tests/nps-codes.test.mjs
// fails if they drift). Sequoia and Kings Canyon share 'seki'.
const NPS_CODES = ["acad","arch","badl","bibe","bisc","blca","brca","cany","care","cave","chir","chis","cong","crla","cuva","dena","deva","drto","ever","gaar","glac","glba","grba","grca","grsa","grsm","grte","gumo","hale","havo","hosp","indu","isro","jeff","jotr","katm","kefj","kova","lacl","lavo","maca","meve","mora","neri","noca","npsa","olym","pefo","pinn","redw","romo","sagu","seki","shen","thro","viis","voya","whsa","wica","wrst","yell","yose","zion"];

// The anon key that can call this function is public, so skip the NPS fetch
// if a sync already ran recently — keeps anyone from burning the NPS quota.
const MIN_INTERVAL_MS = 10 * 60 * 1000;

interface NpsAlert {
  id: string;
  parkCode: string;
  category: string;
  title: string;
  description: string;
  url: string;
  lastIndexedDate: string;
}

function clean(text: string): string {
  return (text ?? '').replace(/<[^>]*>/g, ' ').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim();
}

Deno.serve(async () => {
  const supabase = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!);

  const { data: last } = await supabase.from('app_config').select('value').eq('key', 'nps_alerts_synced_at').maybeSingle();
  if (typeof last?.value === 'string' && Date.now() - new Date(last.value).getTime() < MIN_INTERVAL_MS) {
    return Response.json({ skipped: true, syncedAt: last.value });
  }

  const alerts: NpsAlert[] = [];
  for (let start = 0; ; start += 500) {
    const res = await fetch(
      `https://developer.nps.gov/api/v1/alerts?limit=500&start=${start}&parkCode=${NPS_CODES.join(',')}`,
      { headers: { 'X-Api-Key': Deno.env.get('NPS_API_KEY')! } }
    );
    if (!res.ok) return Response.json({ error: `NPS API returned ${res.status}` }, { status: 502 });
    const body = await res.json();
    alerts.push(...body.data);
    if (alerts.length >= Number(body.total) || body.data.length === 0) break;
  }

  const fetchedAt = new Date().toISOString();
  const rows = alerts
    .filter((a) => NPS_CODES.includes(a.parkCode))
    .map((a) => ({
      id: a.id,
      park_code: a.parkCode,
      category: a.category,
      title: clean(a.title),
      description: clean(a.description),
      url: a.url || null,
      last_indexed_date: a.lastIndexedDate ? new Date(a.lastIndexedDate.replace(' ', 'T') + 'Z').toISOString() : null,
      fetched_at: fetchedAt,
    }));

  // Only replace once the full fetch succeeded, so a failed run never empties the table.
  const { error: upsertError } = await supabase.from('park_alerts').upsert(rows, { onConflict: 'id' });
  if (upsertError) return Response.json({ error: upsertError.message }, { status: 500 });
  const { error: deleteError } = await supabase.from('park_alerts').delete().lt('fetched_at', fetchedAt);
  if (deleteError) return Response.json({ error: deleteError.message }, { status: 500 });
  await supabase.from('app_config').update({ value: fetchedAt, updated_at: fetchedAt }).eq('key', 'nps_alerts_synced_at');

  return Response.json({ alerts: rows.length, syncedAt: fetchedAt });
});
