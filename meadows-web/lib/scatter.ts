/**
 * Deterministic scatter.
 *
 * The pinboard look needs every note to sit at its own angle and tint, but a
 * real Math.random() would produce different values on the server and in the
 * browser and React would report a hydration mismatch. So the "randomness" is
 * an FNV-1a hash of a stable key — the item's id — which gives the same value
 * on both sides, on every reload, forever.
 *
 * Values are rounded, because a float that formats differently across
 * environments causes the same mismatch by another route.
 */

function hash(key: string): number {
  let h = 2166136261;
  for (let i = 0; i < key.length; i += 1) {
    h ^= key.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return (h >>> 0) / 4294967296; // 0..1
}

/** A signed value in [-range, range], stable for this key. */
export function jitter(key: string, range: number, salt = ''): number {
  return Number(((hash(key + salt) * 2 - 1) * range).toFixed(2));
}

/** An unsigned value in [0, range], stable for this key. */
export function spread(key: string, range: number, salt = ''): number {
  return Number((hash(key + salt) * range).toFixed(2));
}

/** Pick one of a list, stable for this key. */
export function pick<T>(key: string, options: readonly T[], salt = ''): T {
  return options[Math.floor(hash(key + salt) * options.length) % options.length];
}

/** The sticky-note tints, all mixed down from the brand palette. */
export const STICKY_TINTS = [
  'sticky-sun',
  'sticky-teal',
  'sticky-berry',
  'sticky-sky',
  'sticky-grass',
] as const;

export type StickyTint = (typeof STICKY_TINTS)[number];

/**
 * Everything a note needs to sit on the board: an angle, a tint, and a small
 * vertical offset so a row of them never lines up perfectly.
 */
export function note(key: string, tint?: StickyTint) {
  return {
    tint: tint ?? pick(key, STICKY_TINTS, 'tint'),
    rotate: jitter(key, 2.6, 'rot'),
    lift: jitter(key, 10, 'lift'),
    /** How far the tape strip sits from centre, in percent. */
    tape: jitter(key, 18, 'tape'),
  };
}
