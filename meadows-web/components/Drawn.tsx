'use client';

/**
 * Drawn marks.
 *
 * Deliberately small. The reference is emphatic that the UI chrome stays
 * minimal so the artwork leads, and decorative SVG that imitates a picture —
 * drawn horizons, suns, hand-sketched rings — reads as pastiche next to the
 * client's real crayon illustrations. What survives is geometry doing a job:
 * a motion path, and an arrow that points a margin note at what it refers to.
 */

type MarkProps = {
  className?: string;
  color?: string;
  strokeWidth?: number;
};

/**
 * The journey path on the curriculum page. The caterpillar rides this as you
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
        strokeWidth={3}
        strokeLinecap="round"
        strokeDasharray="1 14"
        fill="none"
      />
    </svg>
  );
}

/** Points a margin note at the thing it annotates. */
export function AnnotationArrow({
  className = '',
  color = 'currentColor',
  strokeWidth = 2,
}: MarkProps) {
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
