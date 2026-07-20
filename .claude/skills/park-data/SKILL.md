---
name: park-data
description: Use when adding, editing, or auditing entries in src/data/parks.ts (or the related badges.ts/trips.ts mock data), including filling in real content for a park stub. Ensures all 63 park entries stay shape-consistent with the Park type and each other.
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

## Rules

- Keep parks grouped under their existing `// --- Region ---` comment blocks, in the current order — don't reshuffle.
- `description` should read like the existing ones: a single vivid sentence, no marketing fluff, no placeholder text like "TBD" — if real content isn't known yet, keep the existing stub rather than inventing inaccurate facts (acreage, establishment year, etc. must be factually correct).
- Don't change `status` or `isFavorite` for a park unless the user explicitly asks — these represent the mock "current user's" progress and are used to demo the whole app; changing them changes what the demo looks like.
- `image` stays `''` until a matching illustrated asset actually exists in `src/assets/` — don't point it at a path that doesn't exist yet. Coordinate with the `svg-creator` agent/`svg` skill when a park needs artwork.
- Never change the `Park` interface itself without a check-in — `AppContext` and every screen consuming parks depends on this shape staying stable for the eventual real-API swap.
- Same conventions apply to `src/data/badges.ts` (`Badge` shape) and `src/data/trips.ts` (`Trip` shape) — match existing tone and don't add fields not in `src/types/index.ts`.

## Workflow

1. Find the park by `id` or name in `src/data/parks.ts` (or Grep for it).
2. Edit only the fields the task actually calls for.
3. Run `npx tsc --noEmit` to confirm the array still satisfies `Park[]`.
