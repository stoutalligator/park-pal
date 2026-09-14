// Gates account creation behind a shared "Beta User Key" while Park Pal is
// in a closed friends-and-family beta. The key itself lives only in this
// function's environment (set via `supabase secrets set BETA_SIGNUP_KEY=...`)
// — it is never shipped in the app bundle, so it can't be read out of a
// deployed build the way a client-side check could be.
import { createClient } from 'npm:@supabase/supabase-js@2';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: CORS_HEADERS });
  }
  if (req.method !== 'POST') {
    return json({ error: 'Method not allowed' }, 405);
  }

  let body: { email?: string; password?: string; betaKey?: string };
  try {
    body = await req.json();
  } catch {
    return json({ error: 'Invalid request body.' }, 400);
  }

  const email = body.email?.trim();
  const password = body.password;
  const betaKey = body.betaKey;
  const expectedKey = Deno.env.get('BETA_SIGNUP_KEY');

  if (!expectedKey) {
    return json({ error: 'Beta signup is not configured yet.' }, 500);
  }
  if (!email || !password) {
    return json({ error: 'Email and password are required.' }, 400);
  }
  if (!betaKey || betaKey !== expectedKey) {
    return json({ error: 'That beta key isn’t valid.' }, 403);
  }

  const admin = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  );

  const { error } = await admin.auth.admin.createUser({
    email,
    password,
    email_confirm: true, // closed beta — skip the confirmation-email step
  });

  if (error) {
    const message = error.message.includes('already been registered')
      ? 'An account with that email already exists.'
      : error.message;
    return json({ error: message }, 400);
  }

  return json({ ok: true }, 200);
});

function json(body: unknown, status: number) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
  });
}
