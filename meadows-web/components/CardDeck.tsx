'use client';

import React from 'react';

/**
 * A deck of cards dealt over one another.
 *
 * Every card pins at the same offset, one rising to cover the last, so the
 * section reads as a hand being dealt rather than a list being scrolled. The
 * stacking is `position: sticky` and nothing else — cards carry no animation.
 *
 * `data-scroll-ignore` marks the subtree as off limits to the page-level
 * scroll hooks, so no layer inside a card starts drifting on its own.
 */
export default function CardDeck({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div data-scroll-ignore className={className}>
      {children}
    </div>
  );
}

/**
 * One card in the deck. `index` sets how far down it pins, so the stack shows
 * a sliver of each card behind the one on top.
 */
export function DeckCard({
  index,
  className = '',
  children,
}: {
  index: number;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`sticky rounded-[40px] md:rounded-[50px] ${className}`}
      style={{ top: `calc(6rem + ${index * 1.1}rem)` }}
    >
      {children}
    </div>
  );
}
