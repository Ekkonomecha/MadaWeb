'use client';

import React, { useState } from 'react';
import { useLang } from '@/components/LanguageProvider';
import { content, t } from '@/lib/content';
import PageHero from '@/components/PageHero';
import { Squiggle } from '@/components/Drawn';

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

      <section className="bg-chalk py-14 md:py-20">
        <div className="mx-auto max-w-[1180px] px-5 md:px-8">
          {/* Category filter */}
          <div
            role="tablist"
            aria-label={t(page.heading, lang)}
            className="flex gap-2 overflow-x-auto no-scrollbar pb-2"
          >
            {page.categories.map((cat) => {
              const selected = cat.id === active;
              return (
                <button
                  key={cat.id}
                  role="tab"
                  aria-selected={selected}
                  onClick={() => setActive(cat.id)}
                  className={`btn shrink-0 ${selected ? 'btn-primary' : 'btn-ghost'}`}
                >
                  {t(cat, lang)}
                </button>
              );
            })}
          </div>

          {/* Children's artwork, pinned up */}
          <ul className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5 mt-10">
            {ARTWORK.map((src, i) => (
              <li
                key={src}
                className="sheet sheet-hover aspect-square grid place-items-center p-6"
                style={{ transform: `rotate(${i % 3 === 0 ? -1.3 : i % 3 === 1 ? 0.9 : -0.4}deg)` }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={src}
                  alt=""
                  aria-hidden="true"
                  className="w-full h-full object-contain mix-blend-multiply"
                />
              </li>
            ))}
          </ul>

          {/* Honest state, rather than stock photography */}
          <div className="mt-14 text-center">
            <Squiggle className="w-28 h-4 text-teal/40 mx-auto mb-5" strokeWidth={3.5} />
            <p className="annot annot-soft">{t(page.emptyState, lang)}</p>
          </div>
        </div>
      </section>
    </>
  );
}
