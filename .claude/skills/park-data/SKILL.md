---
name: park-data
description: Use when adding, editing, or auditing entries in src/data/parks.ts, src/data/trails.ts, or src/data/animals.ts (or the related badges.ts/trips.ts mock data), including filling in real content for a park stub or adding new trails/animals. Ensures entries stay shape-consistent with their types and each other.
---

# Park mock data conventions

`src/data/parks.ts` is a drop-in mock data layer standing in for a future NPS API call — the `Park` shape (`src/types/index.ts`) must stay stable, and every one of the 63 U.S. National Parks must always have an entry. Never remove a park; only edit its fields.

## Park shape

```ts
interface Park {
  id: string;            // kebab-case, matches existing convention (e.g. 'great-smoky', 'new-river-gorge')
  name: string;
  state: string;          // "State" or "State A / State B" for multi-state parks
  region: ParkRegion;      // 'Northeast' | 'Southeast' | 'Midwest' | 'SouthCentral' | 'Mountain' | 'Pacific' | 'Alaska' | 'Hawaii'
  description: string;     // one sentence, evocative not encyclopedic — match the tone of existing entries
  establishedYear: number;
  acres: number;
  image: string;           // local asset reference; '' if not yet illustrated
  status: ParkStatus;       // 'visited' | 'bucketList' | 'planned' | 'notVisited'
  isFavorite: boolean;
  visitedDates?: string[];  // only present when status is 'visited' and dates are known, ISO 'YYYY-MM-DD'
}
```

## Trail shape (`src/data/trails.ts`)

```ts
interface Trail {
  id: string;             // `${parkId}-${slug}`, e.g. 'zion-angels-landing'
  parkId: string;         // must match an id in src/data/parks.ts
  name: string;
  description: string;    // one evocative sentence, same tone as parks
  miles: number;          // one-way or loop distance, factually accurate
  elevationGainFt: number;
  difficulty: TrailDifficulty; // 'Easy' | 'Moderate' | 'Hard'
}
```

## Animal shape (`src/data/animals.ts`)

```ts
interface Animal {
  id: string;             // `${parkId}-${slug}`, e.g. 'channel-islands-island-fox'
  parkId: string;         // must match an id in src/data/parks.ts
  name: string;
  description: string;    // one sentence — what it is / where/when it's seen
  rarity: AnimalRarity;   // 'Common' | 'Uncommon' | 'Rare'
}
```

## Rules

- Keep entries grouped under their existing `// --- Region ---` (parks.ts) or `// --- Park Name ---` (trails.ts, animals.ts) comment blocks, in the current order — don't reshuffle.
- `description` should read like the existing ones: a single vivid sentence, no marketing fluff, no placeholder text like "TBD" — if real content isn't known yet, keep the existing stub rather than inventing inaccurate facts (acreage, mileage, elevation, establishment year, etc. must be factually correct).
- Don't change a park's `status` or `isFavorite` unless the user explicitly asks — these represent the mock "current user's" progress and are used to demo the whole app; changing them changes what the demo looks like.
- `image` stays `''` until a matching illustrated asset actually exists in `src/assets/` — don't point it at a path that doesn't exist yet. Coordinate with the `svg-creator` agent/`svg` skill when a park needs artwork.
- A new `Trail` or `Animal` entry only unlocks badges automatically if something in `badgeRules.ts` already references its exact `id` (e.g. `'zion-angels-landing'`, `'channel-islands-island-fox'`) — adding the data entry alone doesn't wire up a badge. See the `badge-dev` agent for that half.
- Never change the `Park`, `Trail`, or `Animal` interfaces themselves without a check-in — `AppContext` and every screen consuming this data depends on the shapes staying stable for the eventual real-API swap.
- Same conventions apply to `src/data/badges.ts` (`Badge` shape) and `src/data/trips.ts` (`Trip` shape) — match existing tone and don't add fields not in `src/types/index.ts`.

## Workflow

1. Find the park/trail/animal by `id` or name (or Grep for it).
2. Edit only the fields the task actually calls for; new trails/animals need a unique `id` following the `${parkId}-${slug}` convention and a valid `parkId`.
3. Run `npx tsc --noEmit` to confirm the arrays still satisfy their types.
