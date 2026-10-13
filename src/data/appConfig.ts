import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase } from '@/lib/supabase';

// Remote switches read from the Supabase `app_config` table, so things like a
// newly designated park can be turned on for everyone without an app update.
// Each switch falls back to the last value this device saw, then to off.

const ENABLED_UPCOMING_PARKS_KEY = 'enabled_upcoming_parks';
const CACHE_KEY = 'parkpal.appConfig.enabledUpcomingParks';

function parseIds(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((v): v is string => typeof v === 'string') : [];
}

export async function loadCachedEnabledUpcomingParks(): Promise<string[]> {
  try {
    const raw = await AsyncStorage.getItem(CACHE_KEY);
    return raw ? parseIds(JSON.parse(raw)) : [];
  } catch {
    return [];
  }
}

// Returns null when the switch couldn't be read (offline, table missing), so
// the caller keeps whatever value it already has.
export async function fetchEnabledUpcomingParks(): Promise<string[] | null> {
  const { data, error } = await supabase
    .from('app_config')
    .select('value')
    .eq('key', ENABLED_UPCOMING_PARKS_KEY)
    .maybeSingle();
  if (error) return null;
  const ids = parseIds(data?.value);
  try {
    await AsyncStorage.setItem(CACHE_KEY, JSON.stringify(ids));
  } catch {
    // Cache is best-effort; the fetched value is still used this session.
  }
  return ids;
}
