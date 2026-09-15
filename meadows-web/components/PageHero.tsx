'use client';

import React from 'react';
import { AnnotationArrow } from './Drawn';

/**
 * Opening band for inner pages.
 *
 * The heading is the dominant element and sits directly on the canvas with no
 * card wrapper. The handwritten note is a margin annotation set beside the
 * intro, not a label stacked above the heading.
 */
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
    <section className="pt-8 pb-12 md:pt-14 md:pb-16">
      <div className="mx-auto max-w-[1200px] px-5 md:px-8">
        <h1 className="t-h1 text-ink max-w-[18ch] text-balance">{heading}</h1>

        {(intro || annotation) && (
          <div className="mt-10 md:mt-14 grid gap-8 lg:grid-cols-[minmax(0,46rem)_auto] lg:items-start">
            {intro && <p className="t-subheading text-ink-soft measure-wide">{intro}</p>}

            {annotation && (
              <p className="flex items-start gap-2 lg:justify-self-end lg:pt-1">
                <AnnotationArrow
                  className="w-8 h-6 text-teal/45 shrink-0 -scale-y-100 rtl:-scale-x-100 rtl:-scale-y-100"
                  strokeWidth={2}
                />
                <span className={`annot ${annotationTone}`}>{annotation}</span>
              </p>
            )}
          </div>
        )}

        {children}
      </div>
    </section>
  );
}
