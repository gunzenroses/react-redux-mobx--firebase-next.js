const units: { unit: Intl.RelativeTimeFormatUnit; ms: number }[] = [
  { unit: 'year', ms: 31536000000 },
  { unit: 'month', ms: 2628000000 },
  { unit: 'day', ms: 86400000 },
  { unit: 'hour', ms: 3600000 },
  { unit: 'minute', ms: 60000 },
  { unit: 'second', ms: 1000 },
];

const rtf = new Intl.RelativeTimeFormat('ru', { numeric: 'auto' });

/**
 * Get language-sensitive relative time message from elapsed time.
 * @param elapsed   - the elapsed time in milliseconds
 */
function relativeTimeFromElapsed(elapsed: number): string {
  const relativeTimesList = units.map(({ unit, ms }) => {
    const time = (Math.abs(elapsed) >= ms || unit === 'second') ?
      rtf.format(Math.round(elapsed / ms), unit) 
      : null;
    return time;
  });
  const relativeTime = relativeTimesList.find((rTime) => rTime !== null);
  return relativeTime || '';
}

/**
 * Get language-sensitive relative time message from Dates.
 * @param relative  - the relative dateTime, generally is in the past or future
 * @param pivot     - the dateTime of reference, generally is the current time
 */
function relativeTimeFromDates(
  relative: Date | null,
  pivot: Date = new Date()
): string {
  if (!relative) return '';
  const elapsed = relative.getTime() - pivot.getTime();
  return relativeTimeFromElapsed(elapsed);
}

export { relativeTimeFromDates };