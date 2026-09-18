// Shared by scripts/seed-supabase.mjs and scripts/db-diff.mjs so the rows the
// seed writes and the rows the diff compares against come from one place —
// if the mapping changes, both change together.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const ROOT = path.resolve(__dirname, '..', '..');

// Pulls the runtime array literal out of a `export const NAME: Type[] = [...]`
// TS file without needing a TypeScript loader — the literal itself (strings,
// numbers, nested arrays) is plain JS, only the surrounding type annotation
// is TS-specific, so we can `Function()` just the extracted literal.
export function extractArrayLiteral(filePath, exportName) {
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

// Reads the per-park research files directly (the actual authoring source),
// rather than the generated src/data/trailDetails.ts / animalDetails.ts,
// which exist to serve the bundled-app fallback, not the database.
export function readCompendiumFiles() {
  const dir = path.join(ROOT, 'docs/compendium-research');
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.json'))
    .map((f) => JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8')));
}

// The four content tables the app reads at launch (see src/data/contentService.ts),
// as database rows built from the local source files.
export function buildContentRows() {
  const trails = extractArrayLiteral(path.join(ROOT, 'src/data/trails.ts'), 'ALL_TRAILS');
  const animals = extractArrayLiteral(path.join(ROOT, 'src/data/animals.ts'), 'ALL_ANIMALS');
  const parksData = readCompendiumFiles();

  return {
    trails: trails.map((t) => ({
      id: t.id,
      park_id: t.parkId,
      name: t.name,
      description: t.description,
      miles: t.miles,
      elevation_gain_ft: t.elevationGainFt,
      difficulty: t.difficulty,
    })),
    animals: animals.map((a) => ({
      id: a.id,
      park_id: a.parkId,
      name: a.name,
      description: a.description,
      rarity: a.rarity,
    })),
    trail_details: parksData.flatMap((park) =>
      (park.trails ?? []).map((t) => ({
        id: t.id,
        estimated_time: t.estimatedTime,
        best_season: t.bestSeason,
        tags: t.tags,
        trail_tip: t.trailTip,
        did_you_know: t.didYouKnow,
        elevation_profile: t.elevationProfile,
        last_verified: t.lastVerified ?? null,
      }))
    ),
    animal_details: parksData.flatMap((park) =>
      (park.animals ?? []).map((a) => ({
        id: a.id,
        scientific_name: a.scientificName,
        best_time_of_day: a.bestTimeOfDay,
        best_season: a.bestSeason,
        where_to_look: a.whereToLook,
        tags: a.tags,
        viewing_tip: a.viewingTip,
        did_you_know: a.didYouKnow,
        last_verified: a.lastVerified ?? null,
      }))
    ),
  };
}
