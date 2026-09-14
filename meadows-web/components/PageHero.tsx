'use client';

import React from 'react';
import { Squiggle } from './Drawn';

/** Shared opening band for inner pages. Mirrors Mada's page structure. */
export default function PageHero({
  annotation,
  heading,
  intro,
  annotationTone = '',
  children,
}: {
  annotation: string;
  heading: string;
  intro?: string;
  annotationTone?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="relative paper-grain pt-16 pb-14 md:pt-24 md:pb-20 overflow-hidden">
      <div className="relative mx-auto max-w-[1180px] px-5 md:px-8">
        <p className={`annot mb-4 ${annotationTone}`}>{annotation}</p>
        <h1 className="t-h1 text-ink max-w-[24ch]">{heading}</h1>
        {intro && <p className="t-body text-ink-soft mt-6 measure-wide">{intro}</p>}
        {children}
        <Squiggle className="w-40 h-4 text-teal/35 mt-10" strokeWidth={3.5} />
      </div>
    </section>
  );
}
