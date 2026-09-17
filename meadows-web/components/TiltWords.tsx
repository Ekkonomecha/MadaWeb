'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { jitter } from '@/lib/scatter';
import { prefersReducedMotion, SCRUB } from './Motion';

/**
 * A heading whose words tilt as the page moves.
 *
 * Each word rocks from one angle to its opposite across the time the heading
 * is on screen, so the line is never quite still — the trick the reference
 * site uses to keep big type feeling alive rather than set in stone.
 *
 * Angles come from the same deterministic hash as the sticky notes, keyed on
 * the word and its position, so the server and the client agree and a reload
 * produces the same line.
 */
export default function TiltWords({
  text,
  className = '',
  amount = 3,
  as: Tag = 'span',
}: {
  text: string;
  className?: string;
  /** Peak tilt in degrees. */
  amount?: number;
  as?: React.ElementType;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const words = gsap.utils.toArray<HTMLElement>('[data-tilt-word]', root);
      if (!words.length) return;

      const anim = gsap.to(words, {
        rotate: (i: number) => Number(words[i].dataset.to ?? 0),
        ease: 'none',
        scrollTrigger: {
          trigger: root,
          start: 'top bottom',
          end: 'bottom top',
          scrub: SCRUB,
          invalidateOnRefresh: true,
        },
      });

      return () => {
        anim.scrollTrigger?.kill();
        anim.kill();
      };
    }, root);

    return () => ctx.revert();
  }, []);

  const words = text.split(' ');

  return (
    <Tag ref={ref} className={className}>
      {words.map((word, i) => {
        const from = jitter(`${word}-${i}`, amount, 'from');
        return (
          <React.Fragment key={`${word}-${i}`}>
            <span
              data-tilt-word
              data-to={(-from).toFixed(2)}
              className="inline-block will-change-transform"
              style={{ transform: `rotate(${from}deg)` }}
            >
              {word}
            </span>
            {i < words.length - 1 ? ' ' : null}
          </React.Fragment>
        );
      })}
    </Tag>
  );
}
