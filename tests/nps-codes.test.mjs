import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

test('sync-nps-alerts covers exactly the park codes the app uses', () => {
  const guides = fs.readFileSync(path.join(ROOT, 'src/data/parkGuides.ts'), 'utf8');
  const appCodes = [...new Set([...guides.matchAll(/npsCode: '([a-z]+)'/g)].map((m) => m[1]))].sort();

  const fn = fs.readFileSync(path.join(ROOT, 'supabase/functions/sync-nps-alerts/index.ts'), 'utf8');
  const fnCodes = JSON.parse(fn.match(/const NPS_CODES = (\[[^\]]*\]);/)[1]).sort();

  assert.deepEqual(fnCodes, appCodes);
});
