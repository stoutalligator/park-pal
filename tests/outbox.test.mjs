import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';

// outboxCore.ts has no runtime imports (only erased type imports), so it can be
// transpiled and loaded directly without a TypeScript loader.
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const source = fs.readFileSync(path.join(root, 'src/data/outboxCore.ts'), 'utf8');
const js = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2020 },
}).outputText;
const core = await import(`data:text/javascript;base64,${Buffer.from(js).toString('base64')}`);
const { enqueueOp, isNetworkError, overlayTrips, overlayParkStatus, overlayTrailCompletions, overlayProfile, describeOp } = core;

let counter = 0;
const meta = () => ({ id: `op-${++counter}`, createdAt: '2026-09-18T00:00:00.000Z' });
const enqueue = (ops, op) => enqueueOp(ops, op, meta());
const trip = (id, notes = '') => ({ id, parkId: 'acadia', notes, photos: [], activities: [], startDate: '2026-08-10', endDate: '2026-08-10', tripType: 'logged' });
const types = (ops) => ops.map((o) => o.type);

test('trip.edit replaces an earlier edit of the same trip with a fresh id', () => {
  let ops = enqueue([], { type: 'trip.edit', trip: trip('t1', 'first') });
  const firstId = ops[0].id;
  ops = enqueue(ops, { type: 'trip.edit', trip: trip('t1', 'second') });
  assert.equal(ops.length, 1);
  assert.equal(ops[0].trip.notes, 'second');
  assert.notEqual(ops[0].id, firstId);
});

test('edits to different trips are both kept', () => {
  let ops = enqueue([], { type: 'trip.edit', trip: trip('t1') });
  ops = enqueue(ops, { type: 'trip.edit', trip: trip('t2') });
  assert.equal(ops.length, 2);
});

test('trip.delete drops that trip\'s queued edit and is not duplicated', () => {
  let ops = enqueue([], { type: 'trip.edit', trip: trip('t1') });
  ops = enqueue(ops, { type: 'trip.delete', tripId: 't1' });
  assert.deepEqual(types(ops), ['trip.delete']);
  ops = enqueue(ops, { type: 'trip.delete', tripId: 't1' });
  assert.equal(ops.length, 1);
});

test('a queued delete cannot be undone by a later edit', () => {
  let ops = enqueue([], { type: 'trip.delete', tripId: 't1' });
  ops = enqueue(ops, { type: 'trip.edit', trip: trip('t1') });
  assert.deepEqual(types(ops), ['trip.delete']);
});

test('park.status is last-write-wins per park', () => {
  let ops = enqueue([], { type: 'park.status', parkId: 'acadia', status: 'visited', isFavorite: false });
  ops = enqueue(ops, { type: 'park.status', parkId: 'zion', status: 'planned', isFavorite: true });
  ops = enqueue(ops, { type: 'park.status', parkId: 'acadia', status: 'visited', isFavorite: true });
  assert.equal(ops.length, 2);
  assert.equal(ops.find((o) => o.parkId === 'acadia').isFavorite, true);
});

test('profile patches merge into a single op, later fields winning', () => {
  let ops = enqueue([], { type: 'profile.patch', patch: { name: 'A', avatar: 'hiking' } });
  ops = enqueue(ops, { type: 'profile.patch', patch: { avatar: 'camping', units: 'km' } });
  assert.equal(ops.length, 1);
  assert.deepEqual(ops[0].patch, { name: 'A', avatar: 'camping', units: 'km' });
});

test('repeating the same trail action is deduped, but opposite actions are both kept in order', () => {
  const row = { trail_id: 'zion-angels-landing', trip_id: null, park_id: 'zion', name: 'Angels Landing', miles: 0, elevation_gain_ft: 0 };
  let ops = enqueue([], { type: 'trail.complete', row });
  ops = enqueue(ops, { type: 'trail.complete', row });
  assert.equal(ops.length, 1);
  ops = enqueue(ops, { type: 'trail.uncomplete', trailId: 'zion-angels-landing' });
  ops = enqueue(ops, { type: 'trail.complete', row });
  assert.deepEqual(types(ops), ['trail.complete', 'trail.uncomplete', 'trail.complete']);
});

test('identical reports are deduped, different reasons are not', () => {
  const report = { entryType: 'trail', entryId: 'x', entryName: 'X', parkId: 'p', reason: 'difficulty' };
  let ops = enqueue([], { type: 'report.submit', report });
  ops = enqueue(ops, { type: 'report.submit', report });
  assert.equal(ops.length, 1);
  ops = enqueue(ops, { type: 'report.submit', report: { ...report, reason: 'other' } });
  assert.equal(ops.length, 2);
});

test('isNetworkError separates a dropped connection from a server rejection', () => {
  assert.equal(isNetworkError({ message: 'TypeError: Failed to fetch', code: '' }), true);
  assert.equal(isNetworkError(new TypeError('Network request failed')), true);
  assert.equal(isNetworkError({ message: 'fetch failed' }), true);
  assert.equal(isNetworkError({ message: 'upstream error', status: 503 }), true);
  assert.equal(isNetworkError({ message: 'new row violates row-level security policy', code: '42501' }), false);
  assert.equal(isNetworkError({ message: 'duplicate key value', code: '23505' }), false);
  assert.equal(isNetworkError({ message: 'Bad request', status: 400 }), false);
  assert.equal(isNetworkError(null), false);
});

test('overlayTrips re-applies queued edits and hides queued deletes', () => {
  const fetched = [trip('t1', 'server'), trip('t2', 'server'), trip('t3', 'server')];
  let ops = enqueue([], { type: 'trip.edit', trip: trip('t1', 'local edit') });
  ops = enqueue(ops, { type: 'trip.delete', tripId: 't2' });
  const result = overlayTrips(fetched, ops);
  assert.deepEqual(result.map((t) => t.id), ['t1', 't3']);
  assert.equal(result[0].notes, 'local edit');
});

test('overlayParkStatus overrides and adds queued statuses', () => {
  const rows = [{ parkId: 'acadia', status: 'notVisited', isFavorite: false }];
  let ops = enqueue([], { type: 'park.status', parkId: 'acadia', status: 'visited', isFavorite: true });
  ops = enqueue(ops, { type: 'park.status', parkId: 'zion', status: 'planned', isFavorite: false });
  const result = overlayParkStatus(rows, ops);
  assert.equal(result.find((r) => r.parkId === 'acadia').status, 'visited');
  assert.equal(result.find((r) => r.parkId === 'zion').status, 'planned');
});

test('overlayTrailCompletions applies queued marks/unmarks without touching trip-linked rows', () => {
  const tripRow = { trail_id: 'a', trip_id: 'trip-1', park_id: 'p', name: 'A', miles: 2, elevation_gain_ft: 100 };
  const manualRow = { trail_id: 'b', trip_id: null, park_id: 'p', name: 'B', miles: 0, elevation_gain_ft: 0 };
  const newRow = { trail_id: 'c', trip_id: null, park_id: 'p', name: 'C', miles: 0, elevation_gain_ft: 0 };
  let ops = enqueue([], { type: 'trail.uncomplete', trailId: 'b' });
  ops = enqueue(ops, { type: 'trail.uncomplete', trailId: 'a' });
  ops = enqueue(ops, { type: 'trail.complete', row: newRow });
  const result = overlayTrailCompletions([tripRow, manualRow], ops);
  assert.deepEqual(result.map((r) => r.trail_id).sort(), ['a', 'c']);
});

test('overlayProfile applies queued patches over the fetched profile', () => {
  const profile = { name: 'John', avatar: 'hiking', units: 'mi', onboardingComplete: true, profileBackground: 'forest' };
  const ops = enqueue([], { type: 'profile.patch', patch: { avatar: 'camping' } });
  assert.deepEqual(overlayProfile(profile, ops), { ...profile, avatar: 'camping' });
});

test('describeOp gives every queued change a readable title and detail', () => {
  const lookup = { parkName: (id) => ({ acadia: 'Acadia', zion: 'Zion' }[id] ?? id), trailName: (id) => `Trail ${id}`, badgeName: (id) => `Badge ${id}` };
  const d = (op) => describeOp(enqueue([], op)[0], lookup);
  assert.deepEqual(d({ type: 'trip.edit', trip: trip('t1') }), { title: 'Trip changes', detail: 'Acadia · 2026-08-10' });
  assert.deepEqual(d({ type: 'trip.delete', tripId: 't1', label: 'Zion · 2026-07-04' }), { title: 'Delete trip', detail: 'Zion · 2026-07-04' });
  assert.deepEqual(d({ type: 'trail.uncomplete', trailId: 'x' }), { title: 'Unmark trail', detail: 'Trail x' });
  assert.deepEqual(d({ type: 'park.status', parkId: 'zion', status: 'visited', isFavorite: true }), { title: 'Park update', detail: 'Zion · Visited · Bucket list' });
  assert.deepEqual(d({ type: 'badge.earn', badges: [{ badgeId: 'a', earnedAt: 'x', progress: 1 }, { badgeId: 'b', earnedAt: 'x', progress: 1 }] }), { title: 'Badge earned', detail: 'Badge a, Badge b' });
  assert.equal(d({ type: 'profile.patch', patch: { avatar: 'camping', units: 'km' } }).detail, 'avatar, units');
});
