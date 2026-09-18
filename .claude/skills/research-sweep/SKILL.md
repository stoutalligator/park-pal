---
name: research-sweep
description: Use to run the automated trail/animal research pipeline from the top-level session or a scheduled routine — a single park, a single trail/animal, or a full sweep across all 63 parks fanned out to `content-researcher` workers, consolidated into one review report. Use when asked to "run the weekly research", "sweep the parks for stale data", or "check whether <park/trail/animal> is still accurate". This skill coordinates; the per-scope research itself is done by the `content-researcher` agent.
---

# Research sweep

Keeps Park Pal's trail and animal data current without anything going live unreviewed. Workers propose; a human reads the report and the git diff; only then does anything reach the database.

**Why this runs from the top-level session:** subagents can't spawn other subagents, so the fan-out has to be driven from here (or a scheduled routine), not from inside a worker.

## Modes

| Mode | Invocation | Workers |
|---|---|---|
| Park | `park <park-id>` | 1 × `content-researcher` (`park <park-id>`) |
| Entry | `trail <trail-id>` or `animal <animal-id>` | 1 × `content-researcher` (that scope) |
| Sweep | `sweep [--limit N] [--stale-days D] [--parks a,b,c]` | 1 worker per park, in waves |

For park/entry modes, skip to **Run** with a single worker; the review steps below still apply.

## Sweep worklist

1. Read every `docs/compendium-research/*.json` and note each park's `researchedOn` and the oldest `lastVerified` among its entries (parks with permit/closure/access entries are the volatile ones).
2. Rank parks: (a) any park whose oldest `lastVerified` is older than `--stale-days` (default 90), stalest first; then (b) the rest by oldest `researchedOn`. `--parks` overrides ranking with an explicit list.
3. Take the top `--limit` parks (default 12 — at a weekly cadence that rotates through all 63 in roughly five to six weeks, while volatile parks come around sooner). `--limit 63` is a true full sweep.

## Run

1. **Preflight.** Confirm the working tree has no uncommitted changes under `docs/compendium-research/` or `src/data/`. Create and switch to a review branch: `research/<YYYY-MM-DD>-<mode>`. Never work on `main`.
2. **Fan out in waves.** One `content-researcher` per park, at most 5 running at once; start the next park as each finishes. Each worker owns exactly one `docs/compendium-research/<park-id>.json`, so parallel runs never write the same file. Give each worker its scope (`park <id>`), and remind it that its report format is fixed. Don't paste one worker's findings into another's prompt.
3. **Collect.** Keep each worker's report verbatim. If a worker fails, times out, or returns no report, record the park as "did not complete" and continue; never fake a result.
4. **Gate each result** before accepting it: the JSON parses, the ids match that park's ids in `trails.ts`/`animals.ts`, and no file outside `docs/compendium-research/` changed (`git status`). A park that fails a gate is reverted (`git checkout -- <file>`) and listed as failed in the report rather than kept.
5. **Commit per park** on the review branch (`research(<park-id>): <one-line summary>`), so each park's changes are a separate, revertable diff.
6. **Write the report** to `docs/research-reports/<YYYY-MM-DD>-<mode>.md` (create the folder if needed) and commit it. Structure: run summary (mode, date, parks attempted / changed / unchanged / failed) → **priority flags first** (any permit, closure, or access change a visitor could act on) → base-data proposals, grouped by park → suggested additions → unverifiable items → the per-park worker reports.
7. **Preview the database impact:** run `npm run db:diff` and paste its summary into the report, so the reviewer sees exactly what a seed would change.

## Hard rules for the coordinator

- Never merge the review branch, never touch `main`, never run `npm run seed:supabase`, never edit `src/`. Publishing is a human decision after review.
- Base-data proposals (mileage, elevation, difficulty, rarity, wrong or missing entries) are applied only by a person, via the `content-adder` agent, in a separate change.
- Push the branch or open a PR only if this run has been explicitly set up to (e.g. a scheduled routine with that permission); otherwise leave the branch local and say so.
- A sweep's value is trustworthy "unchanged" and "couldn't verify" results as much as changes. Don't pad the report, and don't turn an unverifiable item into a guess.

## After review (human steps, for the report's footer)

1. Read the report and `git diff main...research/<branch>`; edit or drop anything doubtful.
2. Merge what's approved.
3. `npm run db:diff` — confirm the only differences are the ones you approved (and that no DB hotfix is about to be overwritten).
4. `npm run seed:supabase`. Users get the update on their next app launch; no app release needed.
5. Apply any approved base-data proposals through `content-adder`, then repeat steps 3–4.

## Scheduling

To automate the weekly run, set up a scheduled routine (the `schedule` skill) whose prompt is: "Run the research-sweep skill in sweep mode with --limit 12 and leave the review branch for me." Start it manually a few times first so the report format and the worker output can be tuned before it runs unattended.
