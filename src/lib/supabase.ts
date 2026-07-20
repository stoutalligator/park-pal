import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

// NOTE: not imported anywhere in the app yet (this pass only proves the
// schema/storage work via scripts/test-supabase-connection.mjs). When a
// later pass actually wires a screen to this client, Supabase's React
// Native setup commonly also needs `react-native-url-polyfill` (Hermes
// lacks a full URL implementation) and an AppState listener calling
// supabase.auth.startAutoRefresh()/stopAutoRefresh() — add both then,
// rather than now, to keep this pass's dependency list to what was agreed.

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Missing EXPO_PUBLIC_SUPABASE_URL / EXPO_PUBLIC_SUPABASE_ANON_KEY — copy .env.example to .env and fill them in.'
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
