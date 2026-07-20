#!/usr/bin/env node
// End-to-end proof that the Supabase schema/storage/RLS setup works:
// signs up a throwaway user, inserts a trip with 3 photos (should succeed),
// tries a 4th photo (should be rejected by the slot check constraint),
// uploads a real image to Storage (should succeed), tries uploading a video
// (should be rejected by the bucket's allowed_mime_types), reads everything
// back, then cleans up.
//
// Usage:
//   node --env-file=.env scripts/test-supabase-connection.mjs
// (requires SUPABASE_URL, SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY —
// see .env.example. Run scripts/seed-supabase.mjs first.)

import WebSocket from 'ws';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.SUPABASE_URL || process.env.EXPO_PUBLIC_SUPABASE_URL;
const ANON_KEY = process.env.SUPABASE_ANON_KEY || process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !ANON_KEY || !SERVICE_ROLE_KEY) {
  console.error('Missing SUPABASE_URL / SUPABASE_ANON_KEY / SUPABASE_SERVICE_ROLE_KEY env vars. See .env.example.');
  process.exit(1);
}

// supabase-js always spins up a Realtime sub-client, which needs a global
// WebSocket — Node 20 (unlike Node 22+ or React Native) doesn't have one
// built in, even though this script never uses realtime features.
const admin = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false },
  realtime: { transport: WebSocket },
});
const anon = createClient(SUPABASE_URL, ANON_KEY, {
  auth: { autoRefreshToken: false, persistSession: false },
  realtime: { transport: WebSocket },
});

// A minimal valid 1x1 transparent PNG, so we can test a real Storage upload
// without needing an external image file.
const TEST_PNG = Buffer.from(
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=',
  'base64'
);

const results = [];
function record(label, ok, detail) {
  results.push({ label, ok, detail });
  console.log(`${ok ? 'PASS' : 'FAIL'} — ${label}${detail ? `: ${detail}` : ''}`);
}

async function main() {
  const email = `test-${Date.now()}@parkpal.test`;
  const password = `Test-${Date.now()}!`;
  let userId;
  let tripId;

  try {
    // 1. Create + auto-confirm a test user (admin bypasses email confirmation).
    const { data: created, error: createErr } = await admin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
    });
    if (createErr) throw createErr;
    userId = created.user.id;
    record('create test user', true, userId);

    // 2. Sign in as that user with the anon client, exactly like the app would.
    const { data: signIn, error: signInErr } = await anon.auth.signInWithPassword({ email, password });
    if (signInErr) throw signInErr;
    record('sign in as test user', true);

    // 3. Confirm the profile row was auto-created by the trigger.
    const { data: profile, error: profileErr } = await anon.from('profiles').select('*').single();
    if (profileErr) throw profileErr;
    record('profile auto-created by trigger', !!profile, profile?.id);

    // 4. Grab any seeded park to attach the test trip to.
    const { data: park, error: parkErr } = await anon.from('parks').select('id').limit(1).single();
    if (parkErr || !park) {
      throw new Error('No parks found — run scripts/seed-supabase.mjs first.');
    }

    // 5. Insert a trip as this user.
    const { data: trip, error: tripErr } = await anon
      .from('trips')
      .insert({
        park_id: park.id,
        start_date: '2024-06-01',
        end_date: '2024-06-03',
        activities: ['Hiking', 'Camping'],
        notes: 'Automated connectivity test trip.',
      })
      .select()
      .single();
    if (tripErr) throw tripErr;
    tripId = trip.id;
    record('insert trip', true, tripId);

    // 6. Insert 3 trip_photos rows (slots 0,1,2) — should all succeed.
    for (const slot of [0, 1, 2]) {
      const { error } = await anon
        .from('trip_photos')
        .insert({ trip_id: tripId, slot, storage_path: `${userId}/${tripId}/${slot}.jpg` });
      if (error) throw new Error(`slot ${slot} insert failed: ${error.message}`);
    }
    record('insert 3 trip photos (slots 0-2)', true);

    // 7. Attempt a 4th photo at slot 3 — must be rejected by the check constraint.
    const { error: fourthErr } = await anon
      .from('trip_photos')
      .insert({ trip_id: tripId, slot: 3, storage_path: `${userId}/${tripId}/3.jpg` });
    record('4th photo (slot 3) rejected', !!fourthErr, fourthErr?.message);

    // 8. Upload a real image to Storage — should succeed.
    const imagePath = `${userId}/${tripId}/0.png`;
    const { error: uploadErr } = await anon.storage
      .from('trip-photos')
      .upload(imagePath, TEST_PNG, { contentType: 'image/png', upsert: true });
    record('upload real image to storage', !uploadErr, uploadErr?.message);

    // 9. Attempt to upload a "video" — must be rejected by allowed_mime_types.
    const { error: videoErr } = await anon.storage
      .from('trip-photos')
      .upload(`${userId}/${tripId}/video.mp4`, Buffer.from('not a real video'), {
        contentType: 'video/mp4',
      });
    record('video upload rejected', !!videoErr, videoErr?.message);

    // 10. Read everything back.
    const { data: readBack, error: readErr } = await anon
      .from('trips')
      .select('*, trip_photos(*)')
      .eq('id', tripId)
      .single();
    if (readErr) throw readErr;
    record('read trip + photos back', readBack.trip_photos.length === 3, `${readBack.trip_photos.length} photos`);
  } catch (err) {
    record('unexpected error', false, err.message);
  } finally {
    // Cleanup: delete the storage object, then the auth user (cascades the
    // rest via ON DELETE CASCADE on every per-user table).
    if (userId && tripId) {
      await admin.storage.from('trip-photos').remove([`${userId}/${tripId}/0.png`]);
    }
    if (userId) {
      const { error } = await admin.auth.admin.deleteUser(userId);
      record('cleanup: delete test user', !error, error?.message);
    }
  }

  const failed = results.filter((r) => !r.ok);
  console.log(`\n${results.length - failed.length}/${results.length} checks passed.`);
  process.exit(failed.length > 0 ? 1 : 0);
}

main();
