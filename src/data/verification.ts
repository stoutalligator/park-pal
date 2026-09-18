// The tag vocabulary in the research data isn't normalized ("Day Use Only" vs
// "Day-Use Only", "Fly-In Access" vs "Fly-In Access Only"), so volatility is
// detected by phrase rather than an exact list. Only tags that state a rule a
// visitor must follow count — descriptive tags like "Cliff Nester",
// "Wheelchair Accessible" or "Self-Guided" don't go stale the same way.
const VOLATILE_TAG = new RegExp(
  [
    'clos(?:ure|ed)',
    'permit',
    'reservation',
    'timed entry',
    '(?:fly-in|boat) (?:tour|access)',
    'access (?:only|restricted)',
    '(?:^|\\s)guided',
    'ranger-(?:led|guided)',
    'orientation',
    'reroute',
    'construction',
    'gate hours',
    'day.?use',
    'permission',
    'hard to reach',
    'do not enter',
  ].join('|'),
  'i'
);

export function isVolatileTag(tag: string): boolean {
  return VOLATILE_TAG.test(tag);
}

export type VerificationStatus = 'none' | 'fresh' | 'aging' | 'stale' | 'unverified';

const FRESH_MAX_DAYS = 60;
const AGING_MAX_DAYS = 120;
const MS_PER_DAY = 24 * 60 * 60 * 1000;

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// lastVerified is a plain "YYYY-MM-DD" string; parse it as a local date so the
// month never shifts by a timezone offset.
function parseIsoDate(iso: string): Date | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})/.exec(iso);
  if (!match) return null;
  return new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
}

export function formatVerified(iso: string): string {
  const date = parseIsoDate(iso);
  return date ? `${MONTHS[date.getMonth()]} ${date.getFullYear()}` : iso;
}

// Entries with a volatile rule (permits, closures, access) age into warnings;
// entries that were merely date-stamped without one just read as "verified".
export function verificationStatus(
  lastVerified: string | undefined,
  hasVolatileTag: boolean,
  now: Date = new Date()
): VerificationStatus {
  const date = lastVerified ? parseIsoDate(lastVerified) : null;
  if (!date) return hasVolatileTag ? 'unverified' : 'none';
  if (!hasVolatileTag) return 'fresh';
  const ageDays = Math.floor((now.getTime() - date.getTime()) / MS_PER_DAY);
  if (ageDays <= FRESH_MAX_DAYS) return 'fresh';
  if (ageDays <= AGING_MAX_DAYS) return 'aging';
  return 'stale';
}
