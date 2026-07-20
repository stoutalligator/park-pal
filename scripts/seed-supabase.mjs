#!/usr/bin/env node
// Seeds the `parks` and `badges` reference tables in Supabase from the
// existing local mock data files, so they stay the single source of truth
// instead of being retyped in SQL.
//
// Usage:
//   node --env-file=.env scripts/seed-supabase.mjs
// (requires SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY — see .env.example)

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import WebSocket from 'ws';
import { createClient } from '@supabase/supabase-js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

const SUPABASE_URL = process.env.SUPABASE_URL || process.env.EXPO_PUBLIC_SUPABASE_URL;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
  console.error('Missing SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY env vars. See .env.example.');
  process.exit(1);
}

// supabase-js always spins up a Realtime sub-client, which needs a global
// WebSocket — Node 20 (unlike Node 22+ or React Native) doesn't have one
// built in, even though this script never uses realtime features.
const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false },
  realtime: { transport: WebSocket },
});

// Pulls the runtime array literal out of a `export const NAME: Type[] = [...]`
// TS file without needing a TypeScript loader — the literal itself (strings,
// numbers, nested arrays) is plain JS, only the surrounding type annotation
// is TS-specific, so we can `Function()` just the extracted literal.
function extractArrayLiteral(filePath, exportName) {
  const src = fs.readFileSync(filePath, 'utf8');
  const marker = `export const ${exportName}`;
  const startIdx = src.indexOf(marker);
  if (startIdx === -1) throw new Error(`Could not find "${exportName}" in ${filePath}`);
  const eqIdx = src.indexOf('=', startIdx);
  const arrayStart = src.indexOf('[', eqIdx);
  let depth = 0;
  let i = arrayStart;
  for (; i < src.length; i++) {
    if (src[i] === '[') depth++;
    else if (src[i] === ']') {
      depth--;
      if (depth === 0) {
        i++;
        break;
      }
    }
  }
  const arrayLiteral = src.slice(arrayStart, i);
  // eslint-disable-next-line no-new-func -- trusted local project source file
  return new Function(`return ${arrayLiteral};`)();
}

async function seedParks() {
  const parks = extractArrayLiteral(path.join(ROOT, 'src/data/parks.ts'), 'ALL_PARKS');
  const rows = parks.map((p) => ({
    id: p.id,
    name: p.name,
    state: p.state,
    region: p.region,
    description: p.description,
    established_year: p.establishedYear,
    acres: p.acres,
    lat: p.lat,
    lng: p.lng,
  }));
  const { error } = await supabase.from('parks').upsert(rows, { onConflict: 'id' });
  if (error) throw new Error(`Seeding parks failed: ${error.message}`);
  console.log(`Seeded ${rows.length} parks.`);
}

async function seedBadges() {
  const badges = extractArrayLiteral(path.join(ROOT, 'src/data/badges.ts'), 'ALL_BADGES');
  const rows = badges.map((b) => ({
    id: b.id,
    name: b.name,
    description: b.description,
    category: b.category,
    goal: b.goal ?? null,
  }));
  const { error } = await supabase.from('badges').upsert(rows, { onConflict: 'id' });
  if (error) throw new Error(`Seeding badges failed: ${error.message}`);
  console.log(`Seeded ${rows.length} badges.`);
}

async function main() {
  await seedParks();
  await seedBadges();
  console.log('Seed complete.');
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
