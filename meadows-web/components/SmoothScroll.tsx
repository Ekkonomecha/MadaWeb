'use client';

import React, { useEffect } from 'react';
import { ReactLenis, useLenis } from 'lenis/react';
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
        lerp: 0.085,        // weight of the glide; lower is heavier
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
  const lenis = useLenis(() => {
    // Runs on every Lenis scroll — this is what keeps the parallax layers and
    // the caterpillar locked to the page rather than trailing it.
    ScrollTrigger.update();
  });

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
    // Measurements taken before Lenis took over are stale.
    ScrollTrigger.refresh();

    if (process.env.NODE_ENV !== 'production') {
      (window as unknown as { __lenis?: unknown }).__lenis = lenis;
    }
  }, [lenis]);

  return null;
}
