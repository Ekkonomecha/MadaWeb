'use client';

import React, { useEffect } from 'react';
import { ReactLenis, useLenis } from 'lenis/react';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefersReducedMotion } from './Motion';

/**
 * Smooth scrolling (Lenis).
 *
 * Lenis intercepts the wheel and drives the scroll position itself, which makes
 * one failure mode catastrophic: if whatever is meant to step its animation
 * frame never runs, Lenis still swallows the wheel and the page cannot be
 * scrolled at all.
 *
 * So Lenis runs its OWN rAF loop (autoRaf, the default). An earlier version
 * stepped it from gsap.ticker — the integration GSAP documents — but that made
 * scrolling depend on a ref being populated before a mount effect read it. When
 * it wasn't, nothing stepped Lenis and the page froze. A frame of parallax lag
 * is a far cheaper price than an unscrollable page.
 *
 * ScrollTrigger is kept in step through the useLenis callback below, because
 * the native scroll event no longer describes where the page actually is.
 */
export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        anchors: true,      // in-page anchor links glide instead of jumping
        lerp: 0.075,        // weight of the glide; lower is heavier
        wheelMultiplier: 1,
        touchMultiplier: 1.6,
        syncTouch: false,   // leave touch devices with their native momentum
      }}
    >
      <LenisBridge />
      {children}
    </ReactLenis>
  );
}

/**
 * Keeps GSAP and Lenis agreeing about the scroll position, and hands the page
 * back to the browser for anyone who asked for less motion.
 *
 * This lives in a child so it reads the instance from context rather than from
 * a ref that may not be assigned yet.
 */
function LenisBridge() {
  const pathname = usePathname();
  const lenis = useLenis(() => {
    // Runs on every Lenis scroll — this is what keeps the parallax layers and
    // the caterpillar locked to the page rather than trailing it.
    ScrollTrigger.update();
  });

  /*
   * Every page opens at the top, however you arrived at it.
   *
   * Following a link already did — Next scrolls to the top itself. Back and
   * forward did not: scrollRestoration is manual, so the browser no longer
   * restores a position, and nothing was putting one back, which left the new
   * page sitting at wherever the old one had been scrolled to. Reacting to the
   * route covers every case, link and history alike.
   *
   * A hash is a request for a particular place in the page, so it is left
   * alone. Instant rather than eased — a new page should already be at the top,
   * not travel there.
   */
  useEffect(() => {
    if (window.location.hash) return;

    window.scrollTo(0, 0);
    // Destroyed under reduced motion, in which case the line above is enough.
    lenis?.scrollTo(0, { immediate: true, force: true });

    // New page, new measurements.
    ScrollTrigger.refresh();
  }, [lenis, pathname]);

  useEffect(() => {
    if (!lenis) return;

    /*
     * Someone who asked for less motion gets the browser's own scrolling.
     * Lenis has to be destroyed rather than left idle: an idle instance still
     * intercepts the wheel, and the page would not scroll.
     *
     * Decided in an effect, never during render, so server and client markup
     * stay identical.
     */
    if (prefersReducedMotion()) {
      lenis.destroy();
      return;
    }

    gsap.ticker.lagSmoothing(0);

    /*
     * The head script stops the browser restoring the old offset; this is the
     * other half. Lenis keeps its own idea of the scroll position, and starting
     * anywhere but zero would leave it disagreeing with the document. A hash in
     * the URL is a request for a particular place, so it is left alone.
     */
    if (!window.location.hash) {
      window.scrollTo(0, 0);
      lenis.scrollTo(0, { immediate: true, force: true });
    }

    // Measurements taken before Lenis took over are stale.
    ScrollTrigger.refresh();

    if (process.env.NODE_ENV !== 'production') {
      (window as unknown as { __lenis?: unknown }).__lenis = lenis;
    }
  }, [lenis]);

  return null;
}
