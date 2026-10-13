import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase } from '@/lib/supabase';
import { ParkAlert, Trail, Trip } from '@/types';
import { getParkGuide } from '@/data/parkGuides';
import { parseLocalDate } from '@/utils/dates';

// Live NPS alerts. A Supabase function (supabase/functions/sync-nps-alerts)
// copies them from the NPS API into `park_alerts` every 30 minutes, so the
// app never calls NPS directly. The last copy is cached on the device so
// alerts still show offline, with their "updated" time.

const CACHE_KEY = 'parkpal.npsAlerts';
export const ALERTS_STALE_AFTER_MS = 24 * 60 * 60 * 1000;

export interface AlertsSnapshot {
  alerts: ParkAlert[];
  syncedAt: string | null;
}

interface AlertRow {
  id: string;
  park_code: string;
  category: string;
  title: string;
  description: string;
  url: string | null;
  last_indexed_date: string | null;
}

export async function loadCachedAlerts(): Promise<AlertsSnapshot | null> {
  try {
    const raw = await AsyncStorage.getItem(CACHE_KEY);
    return raw ? (JSON.parse(raw) as AlertsSnapshot) : null;
  } catch {
    return null;
  }
}

// Returns null when alerts couldn't be read (offline, table not set up yet),
// so the caller keeps whatever it already has.
export async function fetchAlerts(): Promise<AlertsSnapshot | null> {
  const [alertsRes, syncedRes] = await Promise.all([
    supabase.from('park_alerts').select('id, park_code, category, title, description, url, last_indexed_date'),
    supabase.from('app_config').select('value').eq('key', 'nps_alerts_synced_at').maybeSingle(),
  ]);
  if (alertsRes.error) return null;
  const syncedValue: unknown = syncedRes.data?.value;
  const snapshot: AlertsSnapshot = {
    alerts: (alertsRes.data as AlertRow[]).map((r) => ({
      id: r.id,
      parkCode: r.park_code,
      category: r.category,
      title: r.title,
      description: r.description,
      url: r.url ?? undefined,
      lastIndexedDate: r.last_indexed_date ?? undefined,
    })),
    syncedAt: typeof syncedValue === 'string' ? syncedValue : null,
  };
  try {
    await AsyncStorage.setItem(CACHE_KEY, JSON.stringify(snapshot));
  } catch {
    // Best-effort cache; the fetched alerts are still used this session.
  }
  return snapshot;
}

const SEVERITY: Record<string, number> = { Danger: 0, 'Park Closure': 1, Caution: 2, Information: 3 };

export function alertSeverity(category: string): number {
  return SEVERITY[category] ?? 3;
}

/** Danger and Park Closure — the ones worth flagging before a trip. */
export function isMajorAlert(alert: ParkAlert): boolean {
  return alertSeverity(alert.category) <= 1;
}

export function sortAlerts(alerts: ParkAlert[]): ParkAlert[] {
  return [...alerts].sort((a, b) => alertSeverity(a.category) - alertSeverity(b.category));
}

export function alertsForPark(alerts: ParkAlert[], parkId: string): ParkAlert[] {
  const code = getParkGuide(parkId)?.npsCode;
  return code ? sortAlerts(alerts.filter((a) => a.parkCode === code)) : [];
}

// Words too common in trail names to identify a trail on their own — "Rim
// Trail" must not match every alert that says "rim".
const GENERIC_WORDS = new Set([
  'trail', 'trails', 'loop', 'route', 'hike', 'path', 'nature', 'overlook', 'point', 'the', 'to', 'and', 'of',
  'canyon', 'falls', 'lake', 'rim', 'creek', 'river', 'mountain', 'peak', 'trailhead', 'via', 'spur', 'walk',
  'scenic', 'drive', 'road', 'upper', 'lower', 'north', 'south', 'east', 'west',
]);

// Drops accents and Hawaiian ʻokina/apostrophes so "Halemaʻumaʻu" in an NPS
// alert matches our "Halemaumau".
function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/['ʻ‘’]/g, '')
    .replace(/[^a-z0-9 ]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

// The trail's name, plus the part before " to " for names like "South Kaibab
// to Ooh Aah Point", since alerts usually name just the trail.
function trailKeys(name: string): string[] {
  const full = normalize(name).replace(/ (trail|trails|loop|route)$/, '');
  const keys = full.includes(' to ') ? [full, full.split(' to ')[0]] : [full];
  return keys.filter((k) => k.split(' ').filter((w) => !GENERIC_WORDS.has(w)).join('').length >= 5);
}

/** Alerts at the trail's park that name the trail, or one of its curated
 * alert keywords (from the trail's research detail). */
export function alertsForTrail(alerts: ParkAlert[], trail: Trail, alertKeywords: string[] = []): ParkAlert[] {
  const keys = trailKeys(trail.name);
  const extra = alertKeywords.map(normalize).filter(Boolean);
  if (keys.length === 0 && extra.length === 0) return [];
  return alertsForPark(alerts, trail.parkId).filter((a) => {
    const text = normalize(`${a.title} ${a.description}`);
    const squashed = text.replace(/ /g, '');
    if (extra.some((k) => ` ${text} `.includes(` ${k} `))) return true;
    return keys.some((k) => {
      if (` ${text} `.includes(` ${k} `)) return true;
      // "Kipuka Puaulu" vs "Kīpukapuaulu": compare without spaces, but only
      // for long keys so short ones can't match inside unrelated words.
      const sk = k.replace(/ /g, '');
      return sk.length >= 8 && squashed.includes(sk);
    });
  });
}

export function formatAlertsUpdated(syncedAt: string | null, now = Date.now()): string {
  if (!syncedAt) return 'Updated recently';
  const mins = Math.max(0, Math.round((now - new Date(syncedAt).getTime()) / 60000));
  if (mins < 60) return `Updated ${mins <= 1 ? 'just now' : `${mins} min ago`}`;
  const hours = Math.round(mins / 60);
  if (hours < 48) return `Updated ${hours} hr${hours === 1 ? '' : 's'} ago`;
  return `Updated ${Math.round(hours / 24)} days ago`;
}

const HEADS_UP_DAYS = 14;

/** A planned trip that starts within two weeks or is under way. */
export function isTripInAlertWindow(trip: Trip, now = new Date()): boolean {
  if (trip.tripType !== 'planned') return false;
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  const start = parseLocalDate(trip.startDate).getTime();
  const end = parseLocalDate(trip.endDate || trip.startDate).getTime();
  return today <= end && start - today <= HEADS_UP_DAYS * 24 * 60 * 60 * 1000;
}

/** Danger / Park Closure alerts worth a heads-up for an upcoming planned trip. */
export function tripHeadsUpAlerts(alerts: ParkAlert[], trip: Trip, now = new Date()): ParkAlert[] {
  return isTripInAlertWindow(trip, now) ? alertsForPark(alerts, trip.parkId).filter(isMajorAlert) : [];
}
