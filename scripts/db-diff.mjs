#!/usr/bin/env node
// Read-only comparison of the live Supabase content tables (trails, animals,
// trail_details, animal_details) against what `npm run seed:supabase` would
// write from the local files — so a quick hotfix made directly in the database
// can't get silently overwritten by the next seed.
//
// Usage:
//   npm run db:diff
// Uses the public anon key (these tables are publicly readable); nothing is
// ever written. Exits 1 if anything differs, 0 if fully in sync.

import WebSocket from 'ws';
import { createClient } from '@supabase/supabase-js';
import { buildContentRows } from './lib/content-rows.mjs';

const SUPABASE_URL = process.env.SUPABASE_URL || process.env.EXPO_PUBLIC_SUPABASE_URL;
const ANON_KEY = process.env.SUPABASE_ANON_KEY || process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !ANON_KEY) {
  console.error('Missing EXPO_PUBLIC_SUPABASE_URL / EXPO_PUBLIC_SUPABASE_ANON_KEY. See .env.example.');
  process.exit(1);
}

// supabase-js needs a global WebSocket on Node 20 even though this never uses realtime.
const supabase = createClient(SUPABASE_URL, ANON_KEY, {
  auth: { autoRefreshToken: false, persistSession: false },
  realtime: { transport: WebSocket },
});

// PostgREST caps a single response (1000 rows by default), so page through.
async function fetchAll(table) {
  const pageSize = 1000;
  const rows = [];
  for (let from = 0; ; from += pageSize) {
    const { data, error } = await supabase
      .from(table)
      .select('*')
      .order('id')
      .range(from, from + pageSize - 1);
    if (error) throw new Error(`Reading ${table} failed: ${error.message}`);
    rows.push(...data);
    if (data.length < pageSize) return rows;
  }
}

// Key order differs between the local JSON and Postgres jsonb, so compare
// structurally rather than by string.
function deepEqual(a, b) {
  if (a === b) return true;
  if (a === null || b === null || typeof a !== 'object' || typeof b !== 'object') return false;
  if (Array.isArray(a) !== Array.isArray(b)) return false;
  const ka = Object.keys(a);
  const kb = Object.keys(b);
  if (ka.length !== kb.length) return false;
  return ka.every((k) => deepEqual(a[k], b[k]));
}

function short(value) {
  const s = typeof value === 'string' ? value : JSON.stringify(value);
  return s.length > 90 ? `${s.slice(0, 87)}...` : s;
}

function compareTable(table, localRows, dbRows) {
  const local = new Map(localRows.map((r) => [r.id, r]));
  const db = new Map(dbRows.map((r) => [r.id, r]));

  const changed = [];
  for (const [id, l] of local) {
    const d = db.get(id);
    if (!d) continue;
    const fields = Object.keys(l).filter((k) => !deepEqual(l[k], d[k] ?? null));
    if (fields.length) changed.push({ id, fields: fields.map((f) => ({ f, local: l[f], db: d[f] })) });
  }
  return {
    table,
    changed,
    onlyLocal: [...local.keys()].filter((id) => !db.has(id)),
    onlyDb: [...db.keys()].filter((id) => !local.has(id)),
  };
}

async function main() {
  const local = buildContentRows();
  const results = [];
  for (const table of ['trails', 'animals', 'trail_details', 'animal_details']) {
    results.push(compareTable(table, local[table], await fetchAll(table)));
  }

  let anyDiff = false;
  for (const { table, changed, onlyLocal, onlyDb } of results) {
    if (!changed.length && !onlyLocal.length && !onlyDb.length) {
      console.log(`${table}: in sync`);
      continue;
    }
    anyDiff = true;
    console.log(`\n${table}: ${changed.length} differ, ${onlyLocal.length} only local, ${onlyDb.length} only in DB`);

    if (changed.length) {
      console.log('  DIFFERENT — the next seed will OVERWRITE the DB value with the local one:');
      for (const { id, fields } of changed) {
        console.log(`    ${id}`);
        for (const { f, local: l, db } of fields) console.log(`      ${f}: DB=${short(db)}  local=${short(l)}`);
      }
    }
    if (onlyLocal.length) console.log(`  ONLY LOCAL — the next seed will ADD: ${onlyLocal.join(', ')}`);
    if (onlyDb.length) {
      console.log(`  ONLY IN DB — the seed never deletes, so these stay (a DB hotfix, or removed locally): ${onlyDb.join(', ')}`);
    }
  }

  console.log(
    anyDiff
      ? '\nDifferences found. Copy any DB hotfixes you want to keep into the local files BEFORE seeding.'
      : '\nEverything is in sync.'
  );
  process.exit(anyDiff ? 1 : 0);
}

main().catch((err) => {
  console.error(err.message);
  process.exit(2);
});
