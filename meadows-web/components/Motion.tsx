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
 * The home page's single authored moment.
 *
 * The display headline lifts line by line, then the six characters rise from
 * the bottom edge of the viewport and settle onto the canvas — the reference's
 * "illustration bleeding from the bottom edge into the next section", arriving
 * rather than sitting there. It runs once, on load. Nothing below the fold
 * animates in; scattered per-section entrances are the generic default.
 *
 * Everything animates FROM an already-visible layout, so if the timeline never
 * runs the page is simply the finished page.
 */
export function useHeroSequence(
  scope: React.RefObject<HTMLElement | null>,
  enabled = true,
) {
  useEffect(() => {
    if (!enabled || !scope.current) return;

    const root = scope.current;
    let stopWaiting: (() => void) | undefined;

    const ctx = gsap.context(() => {
      const risers = gsap.utils.toArray<HTMLElement>('[data-rise]', root);
      const lines = gsap.utils.toArray<HTMLElement>('[data-hero-line]', root);
      const note = root.querySelector<HTMLElement>('[data-hero-note]');
      const all = [...risers, ...lines, ...(note ? [note] : [])];

      /** The finished page, with nothing left applied. */
      const settle = () => gsap.set(all, { clearProps: 'all' });

      if (prefersReducedMotion()) {
        settle();
        return;
      }

      const play = () => {
        const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });

        tl.from(lines, { yPercent: 108, opacity: 0, duration: 1.1, stagger: 0.075 }, 0);

        tl.from(
          risers,
          {
            yPercent: 42,
            opacity: 0,
            duration: 1.15,
            stagger: { each: 0.07, from: 'center' },
          },
          0.42,
        );

        if (note) {
          tl.from(note, { opacity: 0, rotate: -9, duration: 0.7, ease: 'power2.out' }, 0.95);
        }
      };

      /*
       * requestAnimationFrame does not run in a background tab, so an intro
       * started there would freeze part-played. Stay finished instead, and
       * play the moment the first time the tab is actually looked at.
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
    }, root);

    return () => {
      stopWaiting?.();
      ctx.revert();
    };
  }, [scope, enabled]);
}

/**
 * The curriculum page's moment: the caterpillar crawls the day's journey path
 * as you scroll the four stages. Motion that carries meaning — the brochure
 * calls the day a journey rather than a schedule.
 */
export function useJourneyCrawl(scope: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const root = scope.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      const crawler = root.querySelector<HTMLElement>('[data-crawler]');
      const path = root.querySelector<SVGPathElement>('[data-journey] path');
      if (!crawler || !path) return;

      if (prefersReducedMotion()) {
        gsap.set(crawler, { opacity: 1 });
        return;
      }

      gsap.to(crawler, {
        motionPath: { path, align: path, alignOrigin: [0.5, 0.85], start: 0, end: 1 },
        ease: 'none',
        scrollTrigger: { trigger: root, start: 'top 68%', end: 'bottom 72%', scrub: 0.8 },
      });
    }, root);

    return () => ctx.revert();
  }, [scope]);
}

/**
 * Parallax layer.
 *
 * Depth comes from speed: a near layer travels further against the scroll than
 * a far one, so the drawings separate from the page as you move. Translation
 * and rotation only — a parallax layer never changes opacity, so nothing it
 * holds can end up invisible if the animation fails to run.
 *
 * `speed` is a fraction of the element's travel through the viewport.
 * Negative values move with the scroll instead of against it.
 */
export function Parallax({
  children,
  className = '',
  speed = 0.18,
  spin = 0,
  as: Tag = 'div',
}: {
  children: React.ReactNode;
  className?: string;
  speed?: number;
  spin?: number;
  as?: React.ElementType;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    const distance = (window.innerHeight + el.offsetHeight) * speed;

    const anim = gsap.fromTo(
      el,
      { y: distance * 0.5, rotate: spin * -0.5 },
      {
        y: -distance * 0.5,
        rotate: spin * 0.5,
        ease: 'none',
        scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: 1 },
      },
    );

    return () => {
      anim.scrollTrigger?.kill();
      anim.kill();
    };
  }, [speed, spin]);

  return (
    <Tag ref={ref} className={`will-drift ${className}`}>
      {children}
    </Tag>
  );
}

/** Kept for existing call sites — a Parallax with a fixed, gentle travel. */
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

/**
 * Cards settling onto the board, as one timeline per group.
 *
 * Notes are grouped by the list or section that holds them, so a row staggers
 * together instead of each card firing on its own trigger. Each group gets a
 * timeline whose ScrollTrigger is created once; the tweens inside are cleared
 * and rebuilt whenever ScrollTrigger refreshes, which is how a resize or a
 * breakpoint change gets fresh measurements rather than stale ones layered on
 * top of each other.
 *
 * A group that has already played is skipped on rebuild. Clearing a finished
 * timeline would re-apply its `from` state — hiding those cards again — and
 * with `once: true` the trigger is already dead, so nothing would ever reveal
 * them.
 */
export function useCardTimeline(scope: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const root = scope.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      const notes = gsap.utils.toArray<HTMLElement>('[data-note]', root);
      if (!notes.length) return;

      // No animation at all — the cards are simply already there.
      if (prefersReducedMotion()) {
        gsap.set(notes, { clearProps: 'all' });
        return;
      }

      // Group each card with the siblings it should stagger alongside.
      const groups = new Map<Element, HTMLElement[]>();
      notes.forEach((el) => {
        const key = el.closest('ul, ol, section') ?? root;
        const list = groups.get(key);
        if (list) list.push(el);
        else groups.set(key, [el]);
      });

      type Entry = { els: HTMLElement[]; tl: gsap.core.Timeline; played: boolean };

      const entries: Entry[] = [...groups].map(([trigger, els]) => {
        const entry: Entry = {
          els,
          played: false,
          tl: gsap.timeline({
            scrollTrigger: {
              trigger: trigger as HTMLElement,
              start: 'top 85%',
              once: true,
              invalidateOnRefresh: true,
            },
          }),
        };
        entry.tl.eventCallback('onComplete', () => {
          entry.played = true;
        });
        return entry;
      });

      const build = () => {
        entries.forEach((entry) => {
          if (entry.played) return;
          entry.tl.clear();
          entry.tl.from(entry.els, {
            yPercent: 12,
            opacity: 0,
            scale: 0.95,
            duration: 0.8,
            ease: 'expo.out',
            stagger: 0.09,
            // Hand the element back to CSS once it has landed.
            clearProps: 'transform,opacity',
          });
        });
      };

      build();
      ScrollTrigger.addEventListener('refreshInit', build);

      // gsap.context runs whatever the callback returns on revert.
      return () => ScrollTrigger.removeEventListener('refreshInit', build);
    }, root);

    return () => ctx.revert();
  }, [scope]);
}
