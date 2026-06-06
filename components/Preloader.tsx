'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

/**
 * Preloader — a luxe intro screen shown on first load.
 * The rainbow "mada" swoosh draws itself left-to-right, the wordmark rises
 * in beneath it, a progress counter sweeps to 100%, then the screen splits
 * and curtains away. Shown once per browser session (sessionStorage), so
 * navigations between pages don't replay it.
 */
export default function Preloader() {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  // Decide whether to show (skip if already seen this session).
  useEffect(() => {
    const seen = sessionStorage.getItem('mada-preloaded');
    if (seen) return;
    setVisible(true);
    document.body.style.overflow = 'hidden';
  }, []);

  // Animate a faux progress counter, then dismiss.
  useEffect(() => {
    if (!visible) return;
    let frame = 0;
    const start = performance.now();
    const duration = 2200;

    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
      setProgress(Math.round(eased * 100));
      if (t < 1) {
        frame = requestAnimationFrame(tick);
      } else {
        sessionStorage.setItem('mada-preloaded', '1');
        document.body.style.overflow = '';
        setTimeout(() => setVisible(false), 500);
      }
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[5000] flex flex-col items-center justify-center mesh-ink grain overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Curtains that split open at the end */}
          <motion.div
            className="absolute inset-x-0 top-0 h-1/2 bg-brand-darkblue z-20"
            initial={{ y: 0 }}
            animate={progress >= 100 ? { y: '-100%' } : { y: 0 }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: 0.12 }}
          />
          <motion.div
            className="absolute inset-x-0 bottom-0 h-1/2 bg-brand-darkblue z-20"
            initial={{ y: 0 }}
            animate={progress >= 100 ? { y: '100%' } : { y: 0 }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: 0.12 }}
          />

          {/* Floating ambient blobs */}
          <div className="absolute top-[18%] left-[14%] w-40 h-40 bg-brand-purple/40 blob-1 animate-float blur-2xl" />
          <div className="absolute bottom-[18%] right-[14%] w-48 h-48 bg-brand-blue/40 blob-3 animate-float-delay blur-2xl" />

          {/* Logo lockup */}
          <div className="relative z-30 flex flex-col items-center gap-7">
            {/* Rainbow swoosh draws in left-to-right */}
            <motion.div
              initial={{ clipPath: 'inset(0 100% 0 0)', opacity: 0 }}
              animate={{ clipPath: 'inset(0 0% 0 0)', opacity: 1 }}
              transition={{ duration: 1.1, ease: [0.65, 0, 0.35, 1], delay: 0.15 }}
            >
              <motion.img
                src="/assets/logo/mada-mark.svg"
                alt=""
                aria-hidden="true"
                className="w-28 md:w-36 h-auto"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
              />
            </motion.div>

            {/* Wordmark rises in */}
            <motion.img
              src="/assets/logo/mada-logo-light.svg"
              alt="mada by saja"
              className="w-56 md:w-64 h-auto"
              initial={{ y: 26, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.85, ease: [0.22, 1, 0.36, 1] }}
            />

            <motion.p
              className="text-white/60 text-xl md:text-2xl font-display italic"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              Your child has it all!
            </motion.p>

            {/* Progress bar + counter */}
            <div className="w-52 md:w-64 mt-1 flex flex-col items-center gap-3">
              <div className="w-full h-[3px] rounded-full bg-white/15 overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    width: `${progress}%`,
                    background:
                      'linear-gradient(90deg,#54b282,#83a2d4,#8b77b7,#f59fbd,#feda3c,#f17756)',
                  }}
                />
              </div>
              <span className="font-outfit text-white/70 text-sm tabular-nums">{progress}%</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
