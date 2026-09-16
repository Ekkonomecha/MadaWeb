'use client';

import React from 'react';
import { note, type StickyTint } from '@/lib/scatter';

/**
 * A sticky note on the pinboard.
 *
 * The angle, tint and tape position all come from a hash of `id`, so the board
 * looks hand-arranged while rendering identically on the server and the client.
 *
 * Cards carry no animation at all — no transition, no hover motion, no scroll
 * reveal. The board is hand-arranged and then it holds still.
 *
 * Two elements, deliberately: the outer one holds the scatter rotation as an
 * inline transform, the inner one carries `data-note` for the scroll hooks to
 * recognise and skip.
 */
export default function Note({
  id,
  tint,
  taped = false,
  className = '',
  as: Tag = 'div',
  children,
}: {
  /** Stable key — the item's id. Drives angle, tint and tape offset. */
  id: string;
  /** Force a tint instead of letting the hash choose. */
  tint?: StickyTint;
  taped?: boolean;
  className?: string;
  as?: React.ElementType;
  children: React.ReactNode;
}) {
  const n = note(id, tint);

  return (
    <Tag
      className="note-tilt"
      style={{ transform: `rotate(${n.rotate}deg)` } as React.CSSProperties}
    >
      <div
        data-note
        className={`note ${n.tint} ${taped ? 'note-taped' : ''} ${className}`}
        style={{ '--tape-shift': `${n.tape}%` } as React.CSSProperties}
      >
        {children}
      </div>
    </Tag>
  );
}

/**
 * A drawing tucked into the margin of a section, riding its own parallax layer.
 * Decorative only — always aria-hidden, never carries meaning.
 */
export function Doodle({
  src,
  className = '',
  width = '9rem',
}: {
  src: string;
  className?: string;
  width?: string;
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt=""
      aria-hidden="true"
      style={{ width }}
      className={`pointer-events-none select-none h-auto sticker ${className}`}
    />
  );
}
