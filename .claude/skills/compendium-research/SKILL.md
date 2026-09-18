---
name: compendium-research
description: Use when researching and compiling enrichment data (elevation profiles, best season/time, tags, tips, facts) for trails and animals ahead of the Compendium detail-page upgrade, or when rechecking a previously-researched park for stale/changed facts. Produces one reviewable JSON file per park — only touches src/data/trails.ts when a clearly-better mileage/elevation figure is confirmed, never touches src/data/animals.ts or any type/interface.
---

# Compendium research pipeline

This skill produces the raw material for a planned upgrade to the Trail and Animal Compendium screens (detail pages with an elevation-profile trail map and richer animal info). Output is a plain JSON file per park, meant to be reviewed by a human before anything gets wired into the app or the `Trail`/`Animal` interfaces in `src/types/index.ts`.

## Scope discipline

- Only ever work one park at a time, driven by the exact `Trail`/`Animal` entries already in `src/data/trails.ts` and `src/data/animals.ts` for that `parkId` — never invent a trail or animal that isn't already in those files.
- Output is JSON only, written to `docs/compendium-research/<park-id>.json`. Never touch `src/types/index.ts` — this data is a superset staged for later, not a schema change.
- The one exception to "never edit source files": if research turns up a **clearly, unambiguously better** `miles` or `elevationGainFt` value for an existing `Trail` (not just a different-but-valid measurement convention — e.g. a route that can legitimately be measured with or without an approach spur), update it directly in `src/data/trails.ts` following the `park-data` skill's conventions, and call out exactly what changed and why in your final report. If the discrepancy could be explained by a different valid route definition rather than one being wrong, leave the existing value alone and just flag the spread instead of overwriting it.
- If you can't find a reliable real-world source for a field, leave it `null` rather than guessing — a missing fact is fine, a wrong one isn't (this app treats factual accuracy on real parks as a hard requirement, per the `park-data` skill).

## Dating and sourcing — required for anything that can go stale

Real-world facts like permit requirements, seasonal trail/wildlife closures, and access rules change over time. Anyone reading this data later (including a future recheck pass) needs to know **as of when** a volatile fact was true and **where it came from** — a fact with no date attached is undatable drift waiting to happen.

- Any `tags` value that signals a time-sensitive or actionable rule — `"Seasonal Closure"`, `"Permit Required"`, or anything in that family — requires:
  1. An inline citation baked directly into the `trailTip`/`viewingTip` sentence itself, in the form `as of <Month Year>, per <source>` (e.g. *"As of September 2026, NPS.gov confirms this trail closes annually from roughly March through mid-August for peregrine falcon nesting..."*). The citation travels with the text even if it's later shown standalone, out of the JSON's context.
  2. A `"lastVerified": "YYYY-MM-DD"` field on that specific entry (only entries carrying a volatile fact need this — don't stamp every entry, just the ones where staleness actually matters).
- Every output file also carries two whole-file fields: `"researchedOn": "YYYY-MM-DD"` (the date this research pass was run) and `"sources": [...]` (a short general bibliography of what was used across the pass, e.g. `["NPS.gov", "AllTrails", "Earthtrekkers"]`) — this covers the non-volatile facts (trivia, typical trail character) without needing per-entry citations everywhere.
- When **rechecking** a park (see Recheck workflow below), re-verify every entry that has a `lastVerified` date, update that date and the inline citation if the fact is confirmed unchanged, or update the fact/tags/citation together if it's changed.

## Per-trail fields

```json
{
  "id": "acadia-precipice",              // must match an existing Trail.id exactly
  "estimatedTime": "2-3 hrs",            // realistic round-trip time for an average hiker
  "bestSeason": "May-Oct",               // when the trail is typically open/hikeable (note seasonal closures, e.g. raptor nesting)
  "tags": ["Exposure", "Iron Rungs", "Permit Required"],  // short terrain/hazard tags, Title Case, 1-4 per trail
  "trailTip": "One practical sentence — permits, water, footing, timing, closures.",
  "didYouKnow": "One memorable, factual, non-obvious detail.",
  "elevationProfile": [
    { "mile": 0, "elevationFt": 0, "label": "Trailhead" },
    { "mile": 0.8, "elevationFt": 450 },
    { "mile": 1.6, "elevationFt": 950, "label": "Iron rung section" },
    { "mile": 2.1, "elevationFt": 1058, "label": "Summit" }
  ]
}
```

- `elevationProfile`: 6-12 points, monotonically increasing `mile` from 0 to the trail's **full hiked distance** — i.e. `mile` must reach the trail's existing `miles` value in `trails.ts`, not just the one-way distance to a landmark. `elevationFt` is relative to the trailhead (mile 0 is always `elevationFt: 0`) and is **not** required to be monotonically increasing — it must follow the real terrain, including descents. This is a **stylized approximation** for a drag-to-explore elevation chart, not GPS/survey data — round numbers are fine. Add a `label` only at genuinely notable points (summit, major landmark, junction, water crossing, turnaround point) — most points don't need one.
- **Determine the route shape first, from the trail's `name`/`description` and real-world knowledge (research if uncertain) — never assume ascending-and-done:**
  - **Loop**: profile runs mile 0 → full loop distance, rising and falling to match the actual terrain around the loop; it does not need to return to `elevationFt: 0` at the end unless the loop genuinely ends at the trailhead's exact elevation.
  - **Out-and-back**: profile must cover the full round-trip distance in `trails.ts` (typically 2x the one-way distance to the destination). Plot the real one-way terrain out to the turnaround point (which may mean **descending** below 0 — e.g. a trail dropping into a canyon from the rim — not just climbing), then mirror the same elevation change back down (or up) to end at approximately `elevationFt: 0` at the final mile. A trail that goes down to a point and back up must show a down-then-up "V" or "U" shape across its full mileage, never a single monotonic climb.
  - **Point-to-point** (different trailhead/endpoint, no return leg): profile runs mile 0 → full one-way distance in `trails.ts`; no mirroring needed.
- Before finalizing, sanity-check the shape against the trail's own `didYouKnow`/`trailTip` text and description (e.g. "drops nearly 6,000 feet from the rim," "steep descent to the point") — if the profile's direction contradicts what the trail is known for, fix the profile.
- The **implied elevation change** (peak minus trough of the profile, not just the endpoint) should roughly match the trail's existing `elevationGainFt` in `trails.ts`; if your research finds the existing figure is wrong, flag it in your final report rather than silently overriding it.

## Wildlife viewing ethics — non-negotiable

Every `viewingTip` must model responsible, low-impact wildlife viewing. This app is telling real people how to go find real wild animals, so a careless tip here isn't just bad copy — it can get an animal or a person hurt. Never write a tip that:

- Suggests baiting, calling, feeding, or otherwise luring an animal.
- Encourages approaching, entering, or lingering at a den, burrow, or nest to get a better look — track/sign spotting is fine ("look for tracks near..."), closing in on the den itself is not.
- Tells someone to touch, handle, corner, or provoke an animal — including "harmless" ones. For anything venomous or otherwise dangerous, the tip should explicitly say to give it space rather than only framing it as a safety-for-the-hiker note.
- Implies getting close is necessary or good practice ("get up close for a great photo," etc.) — always frame proximity via optics (binoculars, a spotting scope, a zoom lens) instead of physical distance.
- Omits an explicit distance/space cue for anything nesting, denning, rutting, or otherwise easily disturbed, even if the species itself isn't dangerous to humans (a flushed nesting bird or a spooked rutting elk is a real harm even when the animal poses no threat back).

When in doubt, default to the NPS's own framing: enough distance that the animal's behavior doesn't change because you're there, no feeding ever, and binoculars/scopes over proximity.

## Per-animal fields

```json
{
  "id": "acadia-peregrine-falcon",       // must match an existing Animal.id exactly
  "scientificName": "Falco peregrinus",
  "bestTimeOfDay": "Dawn / Dusk",
  "bestSeason": "Apr-Aug",               // nesting/mating/migration season as relevant
  "whereToLook": "Precipice and Jordan Cliffs nesting ledges",
  "tags": ["Cliff Nester", "Seasonal Closure"],  // behavior/habitat tags, Title Case, 1-3 per animal
  "viewingTip": "One practical, species-appropriate sentence — safe distance, best gear, timing, or a closure to respect.",
  "didYouKnow": "One memorable, factual, non-obvious detail."
}
```

## Output format

One file per park: `docs/compendium-research/<park-id>.json`

```json
{
  "parkId": "acadia",
  "researchedOn": "2026-09-15",
  "sources": ["NPS.gov", "AllTrails", "Earthtrekkers"],
  "trails": [ /* one object per existing trail entry for this park, per shape above */ ],
  "animals": [ /* one object per existing animal entry for this park, per shape above */ ]
}
```

Every trail and animal already in `trails.ts`/`animals.ts` for the park must have exactly one corresponding entry in the output — no more, no fewer.

## Sourcing

Use real, current information (NPS.gov park pages, NPS trail-condition pages, reputable hiking/wildlife references). Prefer NPS's own site as the primary source for permits, closures, and seasonal access since those change and the app must not tell someone to hike something that's currently closed or misrepresent a permit requirement.

## Workflow — first-time research on a park

1. Read the park's existing entries from `src/data/trails.ts` and `src/data/animals.ts` (filter by `parkId`) — this is your exact worklist, don't add or skip any.
2. Research each trail and animal individually.
3. Write `docs/compendium-research/<park-id>.json` matching the schema above, including the dating/sourcing rules above for any volatile fact.
4. Validate the JSON parses and every `id` matches an existing entry — report the counts (trails researched / animals researched), any change made to `trails.ts`, and flag anything uncertain, missing, or where existing data looks incorrect.

## Recheck workflow — re-verifying a previously-researched park

Used when a park already has a `docs/compendium-research/<park-id>.json` file and it's time to confirm nothing volatile has drifted out of date (permits change, closures shift, trails get rerouted).

1. Read the existing `docs/compendium-research/<park-id>.json`.
2. Identify every entry carrying a `lastVerified` date — that's the recheck worklist (entries without one only had non-volatile facts and don't need rechecking unless the human running this asks for a full re-pass).
3. Re-research each flagged fact against current sources.
4. If unchanged: bump `lastVerified` to today's date and refresh the inline citation's month/year.
5. If changed: update the fact, `tags`, `trailTip`/`viewingTip` text, and `lastVerified` together — never update just the date without re-checking the fact itself.
6. Update the file's top-level `researchedOn` to today's date if anything in the file changed.
7. Report exactly what changed vs. what was confirmed unchanged, park by park.
