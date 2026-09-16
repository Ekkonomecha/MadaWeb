'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { useLenis } from 'lenis/react';
import { useLang } from './LanguageProvider';
import { content, t } from '@/lib/content';
import { JourneyPath } from './Drawn';
import { prefersReducedMotion } from './Motion';
import { markReady } from '@/lib/ready';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(MotionPathPlugin);
}

/** Long enough to be a moment rather than a flicker. */
const MIN_MS = 1100;
/** However slow the network is, the page is never held longer than this. */
const MAX_MS = 4000;

/**
 * The loading panel.
 *
 * The caterpillar crawls the day's journey while the document finishes, which
 * is the same figure the curriculum page uses — the day as a journey, not a
 * schedule — so the wait says something about the school rather than spinning
 * a generic ring.
 *
 * Rendered on the server, so it is painted with the first frame and there is no
 * flash of an unstyled page behind it. That puts the burden the other way: it
 * must never be able to trap the page. Three things stop it —
 *   1. a CSS failsafe that fades it out even if this component never hydrates,
 *   2. MAX_MS, which finishes the crawl however slow the load is,
 *   3. unmount, which releases the scroll lock in its cleanup.
 *
 * The curtain lifts upward, so the top of the page — the hero — is revealed
 * last. markReady() fires as the lift begins, which gives the hero intro the
 * length of the curtain to already be in motion by the time it is uncovered.
 */
export default function LoadingScreen() {
  const { lang } = useLang();
  const lenis = useLenis();
  const [gone, setGone] = useState(false);

  const panel = useRef<HTMLDivElement>(null);
  const crawler = useRef<HTMLImageElement>(null);
  const path = useRef<SVGPathElement>(null);
  const count = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const root = panel.current;
    if (!root) return;

    const release = () => {
      document.body.style.overflow = '';
      lenis?.start();
      setGone(true);
    };

    // Nothing to watch for anyone who asked for less motion: hand over the page.
    if (prefersReducedMotion()) {
      markReady();
      release();
      return;
    }

    // Held still underneath, so the page is where it should be when uncovered.
    document.body.style.overflow = 'hidden';
    lenis?.stop();

    const startedAt = performance.now();
    let timer: number | undefined;
    let settled = false;

    const ctx = gsap.context(() => {
      /*
       * One normalised timeline for the crawl, scrubbed by a progress value
       * rather than played. Loading is not a fixed-length animation — it is
       * however long the document takes — so the position has to be driven.
       */
      const crawl = gsap.timeline({ paused: true });
      if (crawler.current && path.current) {
        crawl.to(
          crawler.current,
          {
            motionPath: {
              path: path.current,
              align: path.current,
              alignOrigin: [0.5, 0.85],
              start: 0,
              end: 1,
            },
            ease: 'none',
            duration: 1,
          },
          0,
        );
      }

      const state = { p: 0 };
      const paint = () => {
        crawl.progress(state.p);
        if (count.current) count.current.textContent = String(Math.round(state.p * 100));
      };
      paint();

      const lift = () => {
        if (settled) return;
        settled = true;
        gsap.killTweensOf(state);

        gsap
          .timeline({ onComplete: release })
          // Run the count out to 100 rather than cutting it off mid-number.
          .to(state, { p: 1, duration: 0.4, ease: 'power2.inOut', onUpdate: paint })
          .to(
            '[data-loader-content]',
            { opacity: 0, y: -16, duration: 0.3, ease: 'power2.in' },
            '-=0.12',
          )
          .to(
            root,
            {
              yPercent: -100,
              duration: 0.9,
              ease: 'expo.inOut',
              // The hero starts here, under a curtain that is already moving.
              onStart: markReady,
            },
            '-=0.05',
          );
      };

      /*
       * Runs out to 92% on its own and waits there. Claiming 100% before the
       * document is done would be a lie the last frame exposes.
       */
      gsap.to(state, { p: 0.92, duration: 1.5, ease: 'power2.out', onUpdate: paint });

      const finish = () => {
        const waited = performance.now() - startedAt;
        timer = window.setTimeout(lift, Math.max(0, MIN_MS - waited));
      };

      if (document.readyState === 'complete') finish();
      else window.addEventListener('load', finish, { once: true });

      // The ceiling. A slow connection delays the page, it does not hold it.
      const ceiling = window.setTimeout(lift, MAX_MS);

      return () => {
        window.removeEventListener('load', finish);
        window.clearTimeout(ceiling);
      };
    }, root);

    return () => {
      window.clearTimeout(timer);
      ctx.revert();
      document.body.style.overflow = '';
      lenis?.start();
    };
  }, [lenis]);

  if (gone) return null;

  return (
    <div
      ref={panel}
      className="loader-panel fixed inset-0 z-[60] bg-paper flex flex-col items-center justify-center gap-10 px-6 rounded-b-[50px] overflow-hidden"
      role="status"
      aria-label={t(content.global.loading, lang)}
    >
      <div data-loader-content className="flex flex-col items-center gap-9 w-full">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/logo/meadows-logo.webp"
          alt={t(content.global.logoAlt, lang)}
          className="h-9 md:h-11 w-auto"
        />

        {/* The day as a journey, crawled rather than counted down. */}
        <div className="relative w-[min(30rem,76vw)]" aria-hidden="true">
          <JourneyPath className="w-full h-20 md:h-24 text-teal/30" pathRef={path} />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            ref={crawler}
            src="/assets/characters/nibble.webp"
            alt=""
            className="absolute top-0 left-0 w-14 md:w-16 h-auto sticker"
          />
        </div>

        <p className="annot annot-soft">{t(content.global.loading, lang)}</p>
      </div>

      <span
        data-loader-content
        className="absolute bottom-7 end-8 t-h2 text-teal/70 tabular-nums"
        aria-hidden="true"
      >
        <span ref={count}>0</span>
      </span>
    </div>
  );
}
