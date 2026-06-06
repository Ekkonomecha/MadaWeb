'use client';

import React from 'react';

/**
 * DoodleIcon — a small, brand-matched hand-drawn icon set.
 * Stroke-based (currentColor) with rounded, slightly loose paths to echo
 * Mada's marker-drawn characters & logo. Sized at 1em so the surrounding
 * text-size class controls scale (just like the emoji it replaces); color
 * is inherited from the text color.
 */

export type DoodleName =
  | 'lock' | 'shield' | 'globe' | 'cap' | 'handshake' | 'leaf' | 'brain'
  | 'tent' | 'droplet' | 'sun' | 'heart' | 'star' | 'sprout' | 'trophy'
  | 'book' | 'hash' | 'pencil' | 'speech' | 'phone' | 'chart-bar' | 'chart-up';

const paths: Record<DoodleName, React.ReactNode> = {
  lock: (
    <>
      <path d="M8 11V8.2C8 5.9 9.8 4 12 4s4 1.9 4 4.2V11" />
      <path d="M6.6 11.3h10.8c.9 0 1.4.6 1.4 1.5v5c0 .9-.6 1.6-1.5 1.6H6.6c-.9 0-1.5-.7-1.5-1.6v-5c0-.9.6-1.5 1.5-1.5Z" />
      <path d="M12 14.4v2.3" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3.5 19 6.3v4.8c0 4.6-3 7.7-7 9.4-4-1.7-7-4.8-7-9.4V6.3L12 3.5Z" />
      <path d="M9 12.2l2.1 2.1 4-4.2" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="8.4" />
      <path d="M12 3.6c-3 2.6-3 14.2 0 16.8" />
      <path d="M12 3.6c3 2.6 3 14.2 0 16.8" />
      <path d="M3.7 12h16.6" />
    </>
  ),
  cap: (
    <>
      <path d="M3.5 9 12 5.4 20.5 9 12 12.6 3.5 9Z" />
      <path d="M7.2 11v4.2c0 1.4 2.4 2.6 4.8 2.6s4.8-1.2 4.8-2.6V11" />
      <path d="M20.4 9.2v4" />
    </>
  ),
  handshake: (
    <>
      <circle cx="8" cy="8.2" r="2.3" />
      <circle cx="16" cy="8.2" r="2.3" />
      <path d="M3.6 18.4c0-3 1.8-4.8 4.4-4.8 1.5 0 2.7.6 3.5 1.7" />
      <path d="M20.4 18.4c0-3-1.8-4.8-4.4-4.8-1.5 0-2.7.6-3.5 1.7" />
      <path d="M9.4 16.6c.8.8 1.7 1.2 2.6 1.2s1.8-.4 2.6-1.2" />
    </>
  ),
  leaf: (
    <>
      <path d="M5 19C5 11 11 5 19 5c0 8-6 14-14 14Z" />
      <path d="M8 16 16 8" />
    </>
  ),
  brain: (
    <>
      <path d="M12 6.2C10.5 4.3 7.6 4.8 7 7.1 5 7.1 4.4 10 6.4 11.1 5.4 13 7.4 15.4 9.9 14.6 10.4 16.1 13.5 16.1 14.1 14.6 16.6 15.4 18.6 13 17.6 11.1 19.6 10 19 7.1 17 7.1 16.4 4.8 13.5 4.3 12 6.2Z" />
      <path d="M12 6.4V15" />
    </>
  ),
  tent: (
    <>
      <path d="M3 19.2h18" />
      <path d="M12 5 4.5 19.2" />
      <path d="M12 5 19.5 19.2" />
      <path d="M12 19.2 9 12.4" />
      <path d="M12 19.2 15 12.4" />
    </>
  ),
  droplet: (
    <>
      <path d="M12 4.2C8.2 9 6.2 12 6.2 15a5.8 5.8 0 0 0 11.6 0c0-3-2-6-5.8-10.8Z" />
    </>
  ),
  sun: (
    <>
      <circle cx="12" cy="12" r="3.6" />
      <path d="M12 3.4v2.3M12 18.3v2.3M3.4 12h2.3M18.3 12h2.3M5.8 5.8l1.7 1.7M16.5 16.5l1.7 1.7M18.2 5.8l-1.7 1.7M7.5 16.5l-1.7 1.7" />
    </>
  ),
  heart: (
    <>
      <path d="M12 20C5 14 4 9.3 7.4 7.2c2-1.2 3.7.1 4.6 1.6.9-1.5 2.6-2.8 4.6-1.6C20 9.3 19 14 12 20Z" />
    </>
  ),
  star: (
    <>
      <path d="M12 3.6l2.5 5.1 5.6.8-4.1 3.9 1 5.6L12 16.3 6.9 19l1-5.6-4.1-3.9 5.6-.8L12 3.6Z" />
    </>
  ),
  sprout: (
    <>
      <path d="M12 20.2V10.6" />
      <path d="M12 13C9 13 6 11 6 8c3 0 6 2 6 5Z" />
      <path d="M12 11.4c3 0 6-2 6-5-3 0-6 2-6 5Z" />
      <path d="M7.5 20.2h9" />
    </>
  ),
  trophy: (
    <>
      <path d="M7 5h10v3.2a5 5 0 0 1-10 0V5Z" />
      <path d="M7 6.2C4 6.2 4 10.4 7 10.4" />
      <path d="M17 6.2c3 0 3 4.2 0 4.2" />
      <path d="M12 13.4v2.6" />
      <path d="M9 19.4h6" />
      <path d="M10.4 16h3.2v3.4h-3.2Z" />
    </>
  ),
  book: (
    <>
      <path d="M12 6.2C9.2 4.4 5.4 4.4 3.2 5.4v12.4c2.2-1 6-1 8.8.8 2.8-1.8 6.6-1.8 8.8-.8V5.4c-2.2-1-6-1-8.8.8Z" />
      <path d="M12 6.2v12.4" />
    </>
  ),
  hash: (
    <>
      <path d="M9.2 4.5 7.4 19.5M16.6 4.5 14.8 19.5" />
      <path d="M5 9.4h14.2M4.8 14.6H19" />
    </>
  ),
  pencil: (
    <>
      <path d="M14.4 5.4 18.6 9.6l-9 9-4.4 1.2 1.2-4.4 9-9.4Z" />
      <path d="M13 7 17 11" />
      <path d="M6.4 15.4 8.6 17.6" />
    </>
  ),
  speech: (
    <>
      <path d="M4 6h15.5c.9 0 1.5.6 1.5 1.5V14c0 .9-.6 1.5-1.5 1.5H10.5l-4 3v-3H4c-.9 0-1.5-.6-1.5-1.5V7.5C2.5 6.6 3.1 6 4 6Z" />
      <path d="M7.5 10.7h.01M11.7 10.7h.01M15.9 10.7h.01" />
    </>
  ),
  phone: (
    <>
      <path d="M8 3.2h8c.9 0 1.5.6 1.5 1.5v14.6c0 .9-.6 1.5-1.5 1.5H8c-.9 0-1.5-.6-1.5-1.5V4.7c0-.9.6-1.5 1.5-1.5Z" />
      <path d="M10.2 5.4h3.6" />
      <path d="M12 17.8h.01" />
    </>
  ),
  'chart-bar': (
    <>
      <path d="M4 20h16" />
      <path d="M7 20v-5.5M12 20V8.5M17 20v-8.5" />
    </>
  ),
  'chart-up': (
    <>
      <path d="M4 4v16h16" />
      <path d="M7 15.5l4-3.2 3 2 5-6" />
      <path d="M19 8.3v3.4M19 8.3h-3.4" />
    </>
  ),
};

export default function DoodleIcon({
  name,
  className = '',
  strokeWidth = 1.7,
}: {
  name: DoodleName;
  className?: string;
  strokeWidth?: number;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {paths[name]}
    </svg>
  );
}
