'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefersReducedMotion } from './Motion';

/**
 * A deck of cards dealt over one another.
 *
 * Every card pins at the same offset. As the next one rises to cover it, the
 * card underneath scales down and tilts away, so the section reads as a hand
 * being dealt rather than a list being scrolled.
 *
 * The whole deck carries `data-scroll-ignore`, which keeps the page-level
 * staggered reveal off these cards — they animate themselves, and two owners
 * writing the same transform is the compounding bug the guard exists to stop.
 */
export default function CardDeck({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>('[data-deck-card]', root);
      if (cards.length < 2 || prefersReducedMotion()) return;

      /*
       * Each card retreats while the NEXT one travels from the bottom of the
       * viewport up to the pin line. Triggering on the incoming card is what
       * ties the two together: the card underneath is always exactly as far
       * back as its successor is forward.
       */
      cards.forEach((card, i) => {
        if (i === cards.length - 1) return; // the last card never retreats
        const next = cards[i + 1];

        /*
         * Scale and rotate only. An earlier version also tweened
         * `filter: brightness()`, but with no starting filter declared GSAP
         * interpolates from brightness(0) — black — so a yellow card turned
         * dark olive halfway through the scrub. Depth comes from the card
         * shrinking behind its successor instead.
         */
        gsap.to(card, {
          scale: 0.88,
          rotate: i % 2 === 0 ? -3.5 : 3.5,
          ease: 'none',
          scrollTrigger: {
            trigger: next,
            start: 'top bottom',
            end: 'top 8rem',
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        });
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} data-scroll-ignore className={className}>
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
      data-deck-card
      className={`sticky rounded-[40px] md:rounded-[50px] origin-top will-change-transform ${className}`}
      style={{ top: `calc(6rem + ${index * 1.1}rem)` }}
    >
      {children}
    </div>
  );
}
