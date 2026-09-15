'use client';

import React, { useState } from 'react';
import { useLang } from '@/components/LanguageProvider';
import { content, t } from '@/lib/content';
import PageHero from '@/components/PageHero';

/**
 * No photography exists in the supplied assets, and the parent research flags
 * stock imagery as a 91% drop-off risk. So this page shows the children's own
 * drawings and says plainly when photographs are coming — rather than filling
 * the grid with stock pictures of somebody else's nursery.
 */
const ARTWORK = [
  '/assets/motifs/tree-round.webp',
  '/assets/motifs/face-blue.webp',
  '/assets/motifs/tree-pine.webp',
  '/assets/motifs/motif-32.webp',
  '/assets/motifs/motif-34.webp',
  '/assets/motifs/motif-35.webp',
  '/assets/motifs/motif-37.webp',
  '/assets/motifs/motif-38.webp',
];

export default function GalleryPage() {
  const { lang } = useLang();
  const page = content.pages.gallery;
  const [active, setActive] = useState(page.categories[0].id);

  return (
    <>
      <PageHero
        annotation={t(page.annotation, lang)}
        heading={t(page.heading, lang)}
        intro={t(page.intro, lang)}
      />

      <section className="pb-10 md:pb-16 px-5 md:px-8">
        <div className="mx-auto max-w-[1200px]">
          {/* Category filter */}
          <div
            role="tablist"
            aria-label={t(page.heading, lang)}
            className="flex gap-2.5 overflow-x-auto no-scrollbar pb-2"
          >
            {page.categories.map((cat) => {
              const selected = cat.id === active;
              return (
                <button
                  key={cat.id}
                  role="tab"
                  aria-selected={selected}
                  onClick={() => setActive(cat.id)}
                  className={`btn shrink-0 ${
                    selected ? 'btn-accent' : 'btn-ghost'
                  }`}
                >
                  {t(cat, lang)}
                </button>
              );
            })}
          </div>

          {/* Children's artwork */}
          <ul className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-6 mt-12">
            {ARTWORK.map((src) => (
              <li
                key={src}
                className="surface-card !p-7 aspect-square grid place-items-center transition-transform duration-500 ease-out hover:-translate-y-1.5"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={src}
                  alt=""
                  aria-hidden="true"
                  className="w-full h-full object-contain"
                />
              </li>
            ))}
          </ul>

          {/* Honest state, rather than stock photography */}
          <p className="annot annot-soft mt-14 block text-center">
            {t(page.emptyState, lang)}
          </p>
        </div>
      </section>
    </>
  );
}
