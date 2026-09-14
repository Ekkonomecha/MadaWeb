'use client';

/**
 * Drawn marks.
 *
 * The supplied Meadows artwork is children's crayon drawing, so every structural
 * mark on this site is drawn too — dividers, the horizon, the journey path.
 * These are authored SVG paths (not the client PNGs) so they can be stroke-animated.
 */

type MarkProps = {
  className?: string;
  color?: string;
  strokeWidth?: number;
};

/** The meadow horizon under the hero — a wobbly ground line with grass tufts. */
export function MeadowHorizon({
  className = '',
  color = 'currentColor',
  pathRef,
}: MarkProps & { pathRef?: React.Ref<SVGPathElement> }) {
  return (
    <svg
      viewBox="0 0 1200 90"
      fill="none"
      preserveAspectRatio="none"
      className={className}
      aria-hidden="true"
    >
      <path
        ref={pathRef}
        d="M2 58 C 70 44, 118 68, 186 54 S 312 40, 388 58 S 520 72, 596 52 S 728 36, 806 56 S 944 70, 1022 52 S 1140 42, 1198 56"
        stroke={color}
        strokeWidth={5}
        strokeLinecap="round"
        fill="none"
      />
      {/* grass tufts, deliberately uneven */}
      {[
        [96, 55], [242, 50], [352, 56], [498, 58], [648, 47],
        [762, 55], [900, 60], [1058, 50], [1150, 55],
      ].map(([x, y], i) => (
        <path
          key={i}
          d={`M${x} ${y} l${i % 2 ? -5 : 4} -${12 + (i % 3) * 5} M${x} ${y} l${i % 2 ? 6 : -5} -${8 + (i % 4) * 4}`}
          stroke={color}
          strokeWidth={3.4}
          strokeLinecap="round"
        />
      ))}
    </svg>
  );
}

/** Section divider — a single hand-drawn squiggle, replacing a hairline rule. */
export function Squiggle({ className = '', color = 'currentColor', strokeWidth = 3.5 }: MarkProps) {
  return (
    <svg viewBox="0 0 320 20" fill="none" className={className} aria-hidden="true">
      <path
        d="M3 12 C 28 2, 46 18, 72 11 S 118 3, 146 12 S 196 19, 224 10 S 276 3, 317 12"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    </svg>
  );
}

/** A drawn circle used to ring a number or an icon. */
export function DrawnRing({ className = '', color = 'currentColor', strokeWidth = 3 }: MarkProps) {
  return (
    <svg viewBox="0 0 100 100" fill="none" className={className} aria-hidden="true">
      <path
        d="M50 6 C 76 6, 95 26, 94 51 C 93 76, 74 95, 49 94 C 24 93, 6 74, 7 49 C 8 26, 26 7, 50 6 C 58 6, 66 8, 72 12"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

/**
 * The journey path on the curriculum page. The caterpillar crawls this as you
 * scroll, because the brochure describes the day as a journey, not a schedule.
 */
export function JourneyPath({
  className = '',
  color = 'currentColor',
  pathRef,
}: MarkProps & { pathRef?: React.Ref<SVGPathElement> }) {
  return (
    <svg
      viewBox="0 0 1000 220"
      fill="none"
      className={className}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        ref={pathRef}
        d="M20 176 C 140 176, 150 54, 268 54 S 396 176, 512 176 S 640 54, 756 54 S 884 176, 980 176"
        stroke={color}
        strokeWidth={3.5}
        strokeLinecap="round"
        strokeDasharray="1 14"
        fill="none"
      />
    </svg>
  );
}

/** A drawn arrow for the annotation voice — points from a margin note at a thing. */
export function DrawnArrow({ className = '', color = 'currentColor', strokeWidth = 2.6 }: MarkProps) {
  return (
    <svg viewBox="0 0 80 60" fill="none" className={className} aria-hidden="true">
      <path
        d="M6 8 C 26 12, 48 22, 62 44"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      <path
        d="M62 44 L 49 40 M62 44 L 58 31"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Ray endpoints, precomputed and rounded.
 * Computing these with Math.cos/sin at render time makes the server and client
 * disagree on the last floating-point digit, which React reports as a
 * hydration mismatch. Fixed values keep both sides identical.
 */
const SUN_RAYS: [number, number, number, number][] = [
  [94, 60, 110, 60],
  [89.93, 81.75, 103.68, 91.73],
  [71.43, 95.22, 76.68, 106.5],
  [48.57, 95.22, 41.88, 108.09],
  [30.07, 81.75, 19.55, 89.39],
  [26, 60, 10, 60],
  [30.07, 38.25, 16.32, 28.27],
  [48.57, 24.78, 43.32, 13.5],
  [71.43, 24.78, 78.12, 11.91],
  [89.93, 38.25, 100.45, 30.61],
];

/** Drawn sun — used once, on the summer band. */
export function DrawnSun({ className = '', color = 'currentColor', strokeWidth = 3 }: MarkProps) {
  return (
    <svg viewBox="0 0 120 120" fill="none" className={className} aria-hidden="true">
      <circle cx="60" cy="60" r="24" stroke={color} strokeWidth={strokeWidth} />
      {SUN_RAYS.map(([x1, y1, x2, y2], i) => (
        <line
          key={i}
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
      ))}
    </svg>
  );
}
