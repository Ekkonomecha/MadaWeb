'use client';

import React, { useMemo, useRef, useState } from 'react';
import { useLang } from '@/components/LanguageProvider';
import { content, t } from '@/lib/content';
import PageHero from '@/components/PageHero';
import Note from '@/components/Note';
import { useCardReveal } from '@/components/Motion';

/**
 * The gallery reads its items from content.json, each tagged with the
 * categories it belongs to, so the filter selects real subsets rather than
 * restyling a button while showing the same grid.
 *
 * Every item is currently `kind: "generated"` — AI imagery of a generic
 * Montessori setting, not the real campus, which does not open until
 * September. Only a `kind: "photo"` entry clears the "photographs are coming"
 * line below, so these never present themselves as a record of the real place.
 * Adding the real shoot is an entry in content.json; nothing here changes.
 */
export default function GalleryPage() {
  const { lang } = useLang();
  const page = content.pages.gallery;
  const [active, setActive] = useState(page.categories[0].id);
  const ref = useRef<HTMLDivElement>(null);

  const shown = useMemo(
    () => page.items.filter((item) => item.categories.includes(active)),
    [active, page.items],
  );

  const photoCount = shown.filter((i) => i.kind === 'photo').length;

  // Rebuilt per category: the grid is re-keyed below, so the tiles the
  // triggers were measured against no longer exist.
  useCardReveal(ref, active);

  return (
    <div ref={ref}>
      <PageHero
        annotation={t(page.annotation, lang)}
        heading={t(page.heading, lang)}
        intro={t(page.intro, lang)}
      />

      <section className="pb-16 md:pb-24 px-5 md:px-8">
        <div className="mx-auto max-w-[1200px]">
          {/* Category filter */}
          <div
            role="tablist"
            aria-label={t(page.heading, lang)}
            className="flex gap-2.5 overflow-x-auto no-scrollbar pb-2"
          >
            {page.categories.map((cat) => {
              const selected = cat.id === active;
              const count = page.items.filter((i) => i.categories.includes(cat.id)).length;
              return (
                <button
                  key={cat.id}
                  role="tab"
                  aria-selected={selected}
                  aria-controls="gallery-grid"
                  onClick={() => setActive(cat.id)}
                  className={`btn shrink-0 ${selected ? 'btn-accent' : 'btn-ghost'}`}
                >
                  {t(cat, lang)}
                  <span className={selected ? 'opacity-70' : 'opacity-45'}>{count}</span>
                </button>
              );
            })}
          </div>

          <ul
            id="gallery-grid"
            key={active}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-7 mt-14"
          >
            {shown.map((item) => {
              /*
               * A drawing sits padded on the note, the way a picture is pinned
               * up. A photograph fills the note like a print in a frame —
               * padding round a photo reads as a mistake.
               */
              const isPicture = item.kind !== 'artwork';
              return (
                <Note
                  key={item.id}
                  id={item.id}
                  as="li"
                  taped
                  className={isPicture ? '!p-2.5 aspect-square' : '!p-6 aspect-square'}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.src}
                    alt={t(item.alt, lang)}
                    loading="lazy"
                    className={`w-full h-full ${
                      isPicture ? 'object-cover rounded-[2px]' : 'object-contain'
                    }`}
                  />
                </Note>
              );
            })}
          </ul>

          {/* Honest about what these are, and what is still to come. */}
          {photoCount === 0 && (
            <p className="annot annot-soft mt-16 block text-center">
              {t(page.emptyState, lang)}
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
