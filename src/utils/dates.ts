// Trip dates are stored as plain "YYYY-MM-DD" strings with no time/timezone
// component. `new Date("YYYY-MM-DD")` parses that as UTC midnight, so
// formatting it in any timezone behind UTC rolls it back a day. Parsing the
// parts into a local Date sidesteps that entirely.
export function parseLocalDate(dateStr: string): Date {
  const [year, month, day] = dateStr.split('-').map(Number);
  return new Date(year, month - 1, day);
}
