'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

/**
 * Preloader — a luxe intro screen shown on first load.
 * The `mada` logo blob morphs while the wordmark draws in, a progress
 * counter sweeps to 100%, then the screen splits and curtains away.
 * Shown once per browser session (sessionStorage), so navigations
 * between pages don't replay it.
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
    const duration = 2000;

    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      // easeOutCubic for a natural deceleration
      const eased = 1 - Math.pow(1 - t, 3);
      setProgress(Math.round(eased * 100));
      if (t < 1) {
        frame = requestAnimationFrame(tick);
      } else {
        sessionStorage.setItem('mada-preloaded', '1');
        document.body.style.overflow = '';
        setTimeout(() => setVisible(false), 450);
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
          {/* Curtain that splits open at the end */}
          <motion.div
            className="absolute inset-x-0 top-0 h-1/2 bg-brand-darkblue z-20"
            initial={{ y: 0 }}
            animate={progress >= 100 ? { y: '-100%' } : { y: 0 }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
          />
          <motion.div
            className="absolute inset-x-0 bottom-0 h-1/2 bg-brand-darkblue z-20"
            initial={{ y: 0 }}
            animate={progress >= 100 ? { y: '100%' } : { y: 0 }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
          />

          {/* Floating ambient blobs */}
          <div className="absolute top-[18%] left-[14%] w-40 h-40 bg-brand-purple/40 blob-1 animate-float blur-2xl" />
          <div className="absolute bottom-[18%] right-[14%] w-48 h-48 bg-brand-blue/40 blob-3 animate-float-delay blur-2xl" />

          {/* Logo lockup */}
          <div className="relative z-30 flex flex-col items-center gap-8">
            <motion.div
              className="relative"
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="w-28 h-28 md:w-32 md:h-32 bg-brand-yellow blob-1 animate-morph flex items-center justify-center shadow-[0_20px_60px_-15px_rgba(255,218,59,0.5)]">
                <span className="font-fredoka text-brand-darkblue text-5xl md:text-6xl leading-none lowercase">m</span>
              </div>
              {/* orbiting dot */}
              <motion.span
                className="absolute top-1/2 left-1/2 w-3 h-3 -ml-1.5 -mt-1.5 rounded-full bg-brand-pink shadow-lg"
                animate={{ rotate: 360 }}
                transition={{ duration: 2.4, repeat: Infinity, ease: 'linear' }}
                style={{ transformOrigin: '6px 78px' }}
              />
            </motion.div>

            {/* Wordmark draws in letter by letter */}
            <div className="flex items-end overflow-hidden">
              {'mada'.split('').map((ch, i) => (
                <motion.span
                  key={i}
                  className="font-display font-semibold text-white text-5xl md:text-6xl lowercase tracking-tight"
                  initial={{ y: '110%', opacity: 0 }}
                  animate={{ y: '0%', opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.35 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                >
                  {ch}
                </motion.span>
              ))}
              <motion.span
                className="font-display font-semibold text-brand-pink text-5xl md:text-6xl"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.75, type: 'spring', stiffness: 300 }}
              >
                .
              </motion.span>
            </div>

            <motion.p
              className="text-white/50 text-xs tracking-[0.4em] uppercase font-outfit"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
            >
              Early Learning Academy
            </motion.p>

            {/* Progress bar + counter */}
            <div className="w-52 md:w-64 mt-2 flex flex-col items-center gap-3">
              <div className="w-full h-[3px] rounded-full bg-white/15 overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-brand-pink via-brand-yellow to-brand-cyan"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span className="font-display text-white/70 text-sm tabular-nums">{progress}%</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
