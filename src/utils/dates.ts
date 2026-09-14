// Trip dates are stored as plain "YYYY-MM-DD" strings with no time/timezone
// component. `new Date("YYYY-MM-DD")` parses that as UTC midnight, so
// formatting it in any timezone behind UTC rolls it back a day. Parsing the
// parts into a local Date sidesteps that entirely.
export function parseLocalDate(dateStr: string): Date {
  const [year, month, day] = dateStr.split('-').map(Number);
  return new Date(year, month - 1, day);
}

export function formatDateRange(start: string, end: string): string {
  const s = parseLocalDate(start);
  const e = parseLocalDate(end);
  const opts: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };
  if (start === end) {
    return e.toLocaleDateString('en-US', { ...opts, year: 'numeric' });
  }
  return `${s.toLocaleDateString('en-US', opts)} – ${e.toLocaleDateString('en-US', { ...opts, year: 'numeric' })}`;
}

// "Today" / "Tomorrow" / "In 12 days" / "12 days ago" — the last case covers
// a planned trip whose date quietly passed without being marked completed,
// since nothing auto-converts a plan to logged.
export function daysUntilLabel(dateStr: string): string {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = parseLocalDate(dateStr);
  target.setHours(0, 0, 0, 0);
  const diffDays = Math.round((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Tomorrow';
  if (diffDays === -1) return 'Yesterday';
  if (diffDays > 1) return `In ${diffDays} days`;
  return `${Math.abs(diffDays)} days ago`;
}
