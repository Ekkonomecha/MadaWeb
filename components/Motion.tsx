'use client';

import React, { useRef } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  type Variants,
} from 'motion/react';

/* ------------------------------------------------------------------ *
 * Reveal — fade + slide in when the element scrolls into view.
 * Use `as` to render a different tag and `delay` to stagger siblings.
 * ------------------------------------------------------------------ */
type Direction = 'up' | 'down' | 'left' | 'right' | 'none';

const offsetFor = (dir: Direction, distance: number) => {
  switch (dir) {
    case 'up': return { y: distance };
    case 'down': return { y: -distance };
    case 'left': return { x: distance };
    case 'right': return { x: -distance };
    default: return {};
  }
};

export function Reveal({
  children,
  className,
  delay = 0,
  direction = 'up',
  distance = 32,
  once = true,
  as = 'div',
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: Direction;
  distance?: number;
  once?: boolean;
  as?: keyof typeof motion;
}) {
  const Tag = motion[as] as typeof motion.div;
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, ...offsetFor(direction, distance) }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, margin: '-80px' }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Tag>
  );
}

/* ------------------------------------------------------------------ *
 * Stagger — container that reveals its <StaggerItem> children in
 * sequence as it enters the viewport.
 * ------------------------------------------------------------------ */
const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
};

export function Stagger({
  children,
  className,
  once = true,
}: {
  children: React.ReactNode;
  className?: string;
  once?: boolean;
}) {
  return (
    <motion.div
      className={className}
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin: '-80px' }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div className={className} variants={itemVariants}>
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ *
 * Parallax — translates content on the Y axis relative to scroll.
 * `speed` > 0 moves slower (background), giving depth.
 * ------------------------------------------------------------------ */
export function Parallax({
  children,
  className,
  speed = 0.3,
}: {
  children: React.ReactNode;
  className?: string;
  speed?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const range = 140 * speed;
  const y = useTransform(scrollYProgress, [0, 1], [range, -range]);
  const smooth = useSpring(y, { stiffness: 80, damping: 22, mass: 0.4 });

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y: smooth }} className="will-change-transform">
        {children}
      </motion.div>
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * ParallaxImage — image that subtly zooms/pans within a fixed frame
 * as it travels through the viewport. Great for hero & feature shots.
 * ------------------------------------------------------------------ */
export function ParallaxImage({
  src,
  alt = '',
  className,
  intensity = 18,
}: {
  src: string;
  alt?: string;
  className?: string;
  intensity?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [`-${intensity}%`, `${intensity}%`]);
  const smooth = useSpring(y, { stiffness: 90, damping: 24, mass: 0.4 });

  return (
    <div ref={ref} className={`overflow-hidden ${className ?? ''}`}>
      <motion.img
        src={src}
        alt={alt}
        style={{ y: smooth }}
        className="w-full h-[124%] -mt-[12%] object-cover will-change-transform"
      />
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Magnetic — buttons/cards that lean toward the cursor on hover.
 * ------------------------------------------------------------------ */
export function Magnetic({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 300, damping: 18 }}
    >
      {children}
    </motion.div>
  );
}
