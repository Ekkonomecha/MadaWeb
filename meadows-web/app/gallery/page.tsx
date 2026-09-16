'use client';

import React, { useMemo, useRef, useState } from 'react';
import { useLang } from '@/components/LanguageProvider';
import { content, t } from '@/lib/content';
import PageHero from '@/components/PageHero';
import Note from '@/components/Note';
import { useCardTimeline } from '@/components/Motion';

/**
 * The gallery reads its items from content.json, each tagged with the
 * categories it belongs to, so the filter selects real subsets rather than
 * restyling a button while showing the same grid.
 *
 * Every item is currently `kind: "artwork"` — the children's own drawings.
 * There is no photography in the supplied assets, and the parent research ties
 * stock imagery to a 91% drop-off, so the page shows what genuinely exists and
 * says plainly when photographs are coming. Adding a photo after the September
 * shoot is an entry in content.json; nothing here needs to change.
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

  // Re-keyed per category so the reveal replays when the selection changes.
  useCardTimeline(ref);

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
            {shown.map((item) => (
              <Note key={item.id} id={item.id} as="li" taped className="!p-6 aspect-square">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.src}
                  alt={t(item.alt, lang)}
                  className="w-full h-full object-contain"
                />
              </Note>
            ))}
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
