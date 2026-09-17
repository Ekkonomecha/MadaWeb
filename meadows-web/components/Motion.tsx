'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { SplitText } from 'gsap/SplitText';
import { whenReady } from '@/lib/ready';
import { registerSplit } from '@/lib/text-splits';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, MotionPathPlugin, SplitText);

  /*
   * On a phone, scrolling shows and hides the browser's own chrome, which
   * changes the viewport height. Left alone, ScrollTrigger treats that as a
   * resize and re-measures every trigger mid-scroll — a visible stutter caused
   * by the scroll itself. Vertical resizes on touch devices are ignored.
   */
  ScrollTrigger.config({ ignoreMobileResize: true });
}

/**
 * One motion vocabulary for the whole site.
 *
 * These were five different scrub values and four different eases, tuned one
 * animation at a time, and the site felt inconsistent for it — a card settling
 * on one curve while the heading above it moved on another. Everything reads as
 * one hand now.
 */

/**
 * How far a scroll-linked animation lags the wheel before catching up. Lenis is
 * already easing the scroll itself; this eases the follow on top, so scrubbed
 * motion drifts toward where the page has got to rather than tracking it pixel
 * for pixel.
 */
export const SCRUB = 1.2;

/**
 * The site's deceleration curve. expo.out spends four fifths of its travel in
 * the first fifth of the tween, which reads as a snap followed by a crawl;
 * power3 decelerates over the whole distance instead.
 */
export const EASE_OUT = 'power3.out';

/** True when the visitor has asked the system for less motion. */
export function prefersReducedMotion() {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Marks a subtree whose scroll animations should be left alone.
 * Put `data-scroll-ignore` on anything that must not be animated by the
 * page-level scroll hooks.
 */
const IGNORE = '[data-scroll-ignore]';

/**
 * True when this element sits inside something that is itself scroll-animated.
 *
 * Nested scroll animation is a bug, not a feature. An element that animates writes
 * a transform on itself, so a ScrollTrigger belonging to a descendant measures
 * a position that is still moving — it fires at the wrong scroll offset and the
 * two transforms compound into a jitter. The outermost animated element wins
 * and everything inside it rides along.
 */
function hasAnimatedAncestor(el: Element, selector: string): boolean {
  const parent = el.parentElement;
  if (!parent) return false;
  return !!parent.closest(`${selector}, ${IGNORE}`);
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
    let stopWaitingForCurtain: (() => void) | undefined;

    const ctx = gsap.context(() => {
      const risers = gsap.utils
        .toArray<HTMLElement>('[data-rise]', root)
        .filter((el) => !hasAnimatedAncestor(el, '[data-rise]'));
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
        const tl = gsap.timeline({ defaults: { ease: EASE_OUT } });

        tl.from(lines, { yPercent: 108, opacity: 0, duration: 1.3, stagger: 0.09 }, 0);

        tl.from(
          risers,
          {
            yPercent: 42,
            opacity: 0,
            duration: 1.35,
            stagger: { each: 0.085, from: 'center' },
          },
          0.42,
        );

        if (note) {
          tl.from(note, { opacity: 0, rotate: -9, duration: 0.9, ease: EASE_OUT }, 1.05);
        }
      };

      const begin = () => {
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
      };

      /*
       * The loading panel covers this section until its curtain lifts. Playing
       * underneath it would spend the whole intro on a hidden element; waiting
       * for the signal means the headline is already rising as it is uncovered.
       */
      stopWaitingForCurtain = whenReady(begin);
    }, root);

    return () => {
      stopWaiting?.();
      stopWaitingForCurtain?.();
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
        scrollTrigger: { trigger: root, start: 'top 68%', end: 'bottom 72%', scrub: SCRUB },
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

    /*
     * Cards do not move, so nothing on a card may drift either — a lone
     * parallax layer inside a still card reads as a glitch rather than depth.
     */
    if (hasAnimatedAncestor(el, '[data-note]')) return;

    const distance = (window.innerHeight + el.offsetHeight) * speed;

    const anim = gsap.fromTo(
      el,
      { y: distance * 0.5, rotate: spin * -0.5 },
      {
        y: -distance * 0.5,
        rotate: spin * 0.5,
        ease: 'none',
        scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: SCRUB },
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
      scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: SCRUB },
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
 * Cards dealt onto the board as you scroll into them.
 *
 * Scrubbed, not played. A fire-and-forget tween is over before you arrive —
 * the trigger fires while the row is still near the bottom edge, and by the
 * time it is in front of you there is nothing left to see. Tying the reveal to
 * the scroll position instead means it advances only as you move, so it cannot
 * be missed and it reads as one card arriving after another rather than a row
 * blinking into place.
 *
 * Cards are grouped by the list or section holding them, so a row is one
 * timeline with one trigger. Within it each card has its own slot, which is
 * what staggers them.
 *
 * Nothing ever animates to invisible: opacity runs from 0.35, not 0, and the
 * rest is transform. If a trigger ever mismeasures, the worst case is a card
 * sitting slightly low and slightly pale — never a blank page.
 *
 * `[data-scroll-ignore]` opts a subtree out. The curriculum deck carries it,
 * and animates itself.
 *
 * Pass `resetKey` where the cards themselves are swapped rather than scrolled
 * past — the gallery's filter remounts its tiles, and the triggers have to be
 * rebuilt against the new elements or the new set arrives with no reveal.
 */
export function useCardReveal(
  scope: React.RefObject<HTMLElement | null>,
  resetKey?: string | number,
) {
  useEffect(() => {
    const root = scope.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils
        .toArray<HTMLElement>('[data-reveal]', root)
        .filter((el) => !hasAnimatedAncestor(el, '[data-reveal]'));

      if (!cards.length) return;

      // No reveal at all — the cards are simply already there.
      if (prefersReducedMotion()) {
        gsap.set(cards, { clearProps: 'all' });
        return;
      }

      const groups = new Map<Element, HTMLElement[]>();
      cards.forEach((el) => {
        const key = el.closest('ul, ol, section') ?? root;
        const list = groups.get(key);
        if (list) list.push(el);
        else groups.set(key, [el]);
      });

      groups.forEach((els, trigger) => {
        gsap.timeline({
          scrollTrigger: {
            trigger: trigger as HTMLElement,
            /*
             * A long range is most of what makes this feel smooth: the same
             * movement spread over more scroll is a glide rather than a jump.
             * From just below the fold to well above centre, so a row has the
             * better part of a viewport to arrive in.
             */
            start: 'top 95%',
            end: 'top 30%',
            /*
             * How far the animation lags the wheel before catching up. Lenis is
             * already easing the scroll itself; this eases the follow on top, so
             * the cards drift into place instead of tracking every pixel.
             */
            scrub: SCRUB,
            invalidateOnRefresh: true,
          },
        }).from(els, {
          /*
           * Gentler than it was. Under a scrub the ease maps onto scroll
           * distance rather than time, so a front-loaded curve like expo or
           * power2 reads as a lurch followed by a crawl. power1 keeps the
           * velocity close to the scroll's own.
           */
          y: 64,
          scale: 0.965,
          // Alternating, so a row fans onto the board instead of marching.
          rotate: (i: number) => (i % 2 === 0 ? -4 : 4),
          opacity: 0.4,
          ease: EASE_OUT,
          duration: 1,
          // Overlapping rather than queued — the row moves as one wave.
          stagger: { each: 0.3, from: 'start' },
          /*
           * Hold the layer on the compositor for the whole scrub. Left to
           * decide for itself, GSAP promotes at the start and drops it at the
           * end, and that hand-back is a visible hitch on the last frame.
           */
          force3D: true,
        });
      });
    }, root);

    return () => ctx.revert();
  }, [scope, resetKey]);
}

/**
 * Text arriving line by line, then handing the markup back.
 *
 * SplitText cuts a block into one element per rendered line, each behind a mask
 * so a line rises out of nothing rather than sliding over its neighbour. The
 * moment a block finishes, `split.revert()` puts the original markup back —
 * which is the whole point of doing it this way. While text is split it is a
 * pile of divs: selecting across lines is awkward, a screen reader meets
 * fragments, and a resize leaves the lines cut where they no longer break. None
 * of that outlives the animation.
 *
 * Lines, never characters. This site is bilingual, and Arabic is cursive —
 * splitting inside a word breaks the joins and the text stops being readable.
 * Lines keep every word whole in both languages.
 *
 * Two things have to be waited for. Fonts, because lines split before the real
 * face loads are measured against fallback metrics and break in the wrong
 * places; and the loading curtain, so a block above the fold is not already
 * finished by the time it is uncovered.
 */
export function useTextReveal(
  scope: React.RefObject<HTMLElement | null>,
  resetKey?: string | number,
) {
  useEffect(() => {
    const root = scope.current;
    if (!root || prefersReducedMotion()) return;

    /*
     * Text that belongs to something else. A block inside a card rides the
     * card; a TiltWords heading is already split into words; the hero headline
     * belongs to the intro sequence; and chrome — nav, buttons, labels, links —
     * is not prose and reads as broken when it stutters in.
     */
    const OWNED_ELSEWHERE =
      '[data-reveal], [data-scroll-ignore], [data-no-split], header, footer, nav, form, a, button, label';
    const CONTAINS_OWNED = 'a, button, [data-tilt-word], [data-hero-line], [data-hero-note]';

    const splits: SplitText[] = [];
    const tweens: gsap.core.Tween[] = [];
    let cancelled = false;
    let ctx: gsap.Context | undefined;
    let failsafe: number | undefined;

    const build = () => {
      if (cancelled || !scope.current) return;

      ctx = gsap.context(() => {
        const blocks = gsap.utils
          .toArray<HTMLElement>('h1, h2, h3, p', root)
          .filter(
            (el) =>
              !el.closest(OWNED_ELSEWHERE) &&
              !el.querySelector(CONTAINS_OWNED) &&
              !!el.textContent?.trim(),
          );

        blocks.forEach((el) => {
          const split = new SplitText(el, { type: 'lines', mask: 'lines' });
          splits.push(split);

          const tween = gsap.from(split.lines, {
            yPercent: 115,
            opacity: 0,
            duration: 1,
            ease: EASE_OUT,
            stagger: 0.11,
            force3D: true,
            scrollTrigger: { trigger: el, start: 'top 88%', once: true },
            // Revert after animation: the markup goes back to what it was.
            onComplete: () => {
              split.revert();
              unregister();
            },
          });
          tweens.push(tween);

          /*
           * Listed as still-split until it finishes, so anything about to
           * rewrite this text — the language toggle — can put the markup back
           * before it does, rather than having its work undone by the revert.
           */
          const unregister = registerSplit(() => {
            tween.scrollTrigger?.kill();
            tween.kill();
            split.revert();
          });
        });

        // Splitting changed every one of these blocks' heights.
        ScrollTrigger.refresh();
      }, root);

      /*
       * The one way this could bite: a line starts at opacity 0 and plays once,
       * so a trigger that mismeasures would leave that text invisible for good.
       * Anything on screen that should have played and has not is finished by
       * hand — which also reverts it, since that runs on complete.
       */
      failsafe = window.setTimeout(() => {
        tweens.forEach((tween) => {
          if (tween.progress() > 0) return;
          const el = tween.scrollTrigger?.trigger as HTMLElement | undefined;
          if (!el) return;
          const box = el.getBoundingClientRect();
          if (box.top < window.innerHeight && box.bottom > 0) tween.progress(1);
        });
      }, 6000);
    };

    const fonts = document.fonts?.ready ?? Promise.resolve();
    const stopWaiting = whenReady(() => {
      fonts.then(build);
    });

    return () => {
      cancelled = true;
      stopWaiting();
      window.clearTimeout(failsafe);
      // Anything still mid-flight, or never reached, is put back by hand.
      splits.forEach((split) => split.revert());
      ctx?.revert();
    };
  }, [scope, resetKey]);
}
