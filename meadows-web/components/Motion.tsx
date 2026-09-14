'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);
}

/** True when the visitor has asked the system for less motion. */
export function prefersReducedMotion() {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * The home page's single orchestrated moment.
 *
 * The crayon horizon draws itself across the page, then the six characters rise
 * from behind it in sequence. It runs once, on load. Everything below the fold
 * is deliberately quiet — no fade-up per section.
 */
export function useHeroSequence(
  scope: React.RefObject<HTMLElement | null>,
  enabled = true,
) {
  useEffect(() => {
    if (!enabled || !scope.current) return;

    const root = scope.current;
    const reduced = prefersReducedMotion();

    let stopWaiting: (() => void) | undefined;

    const ctx = gsap.context(() => {
      const horizon = root.querySelector<SVGPathElement>('[data-horizon] path');
      const risers = gsap.utils.toArray<HTMLElement>('[data-rise]', root);
      const words = gsap.utils.toArray<HTMLElement>('[data-hero-line]', root);
      const all = [...risers, ...words];

      /** Final, fully visible state — what the page looks like with no animation. */
      const settle = () => {
        gsap.set(all, { clearProps: 'all' });
        if (horizon) gsap.set(horizon, { strokeDasharray: 'none', strokeDashoffset: 0 });
      };

      if (reduced) {
        settle();
        return;
      }

      /*
       * requestAnimationFrame does not fire in a background tab, so an intro
       * started there would freeze part-played and leave the hero invisible.
       * Stay visible instead, and play the intro the first time the tab is seen.
       */
      if (document.hidden) {
        settle();
        const onVisible = () => {
          if (document.hidden) return;
          document.removeEventListener('visibilitychange', onVisible);
          stopWaiting = undefined;
          play();
        };
        document.addEventListener('visibilitychange', onVisible);
        stopWaiting = () => document.removeEventListener('visibilitychange', onVisible);
        return;
      }

      play();

      function play() {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

        tl.from(words, { yPercent: 115, opacity: 0, duration: 0.85, stagger: 0.09 }, 0);

        if (horizon) {
          const len = horizon.getTotalLength();
          gsap.set(horizon, { strokeDasharray: len, strokeDashoffset: len });
          tl.to(horizon, { strokeDashoffset: 0, duration: 1.25, ease: 'power2.inOut' }, 0.35);
          // Drop the dash pattern once drawn, so the line is a plain stroke afterwards.
          tl.set(horizon, { strokeDasharray: 'none' });
        }

        tl.from(
          risers,
          {
            y: 64,
            opacity: 0,
            scale: 0.86,
            rotate: (i: number) => (i % 2 ? 7 : -7),
            duration: 0.72,
            stagger: 0.085,
            ease: 'back.out(1.6)',
          },
          0.75,
        );
      }
    }, root);

    return () => {
      stopWaiting?.();
      ctx.revert();
    };
  }, [scope, enabled]);
}

/**
 * The curriculum page's moment: the caterpillar crawls the day's journey path
 * as you scroll through the four stages. Motion that means something — the
 * brochure calls the day a journey rather than a schedule.
 */
export function useJourneyCrawl(
  scope: React.RefObject<HTMLElement | null>,
) {
  useEffect(() => {
    const root = scope.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      const crawler = root.querySelector<HTMLElement>('[data-crawler]');
      const path = root.querySelector<SVGPathElement>('[data-journey] path');
      if (!crawler || !path) return;

      if (prefersReducedMotion()) {
        gsap.set(crawler, { opacity: 1, xPercent: 0 });
        return;
      }

      gsap.to(crawler, {
        motionPath: { path, align: path, alignOrigin: [0.5, 0.85], start: 0, end: 1 },
        ease: 'none',
        scrollTrigger: {
          trigger: root,
          start: 'top 68%',
          end: 'bottom 72%',
          scrub: 0.8,
        },
      });
    }, root);

    return () => ctx.revert();
  }, [scope]);
}

/** Gentle parallax on a drawn motif. Opt-in, one or two per page at most. */
export function Drift({
  children,
  className = '',
  amount = 44,
}: {
  children: React.ReactNode;
  className?: string;
  amount?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    const anim = gsap.to(el, {
      y: -amount,
      ease: 'none',
      scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: 1 },
    });
    return () => {
      anim.scrollTrigger?.kill();
      anim.kill();
    };
  }, [amount]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
