'use client';

import React from 'react';
import Link from 'next/link';
import { useLang } from '@/components/LanguageProvider';
import { content, t, type Accent, accentText, accentBg } from '@/lib/content';
import { spread, jitter } from '@/lib/scatter';
import PageHero from '@/components/PageHero';
import { Parallax } from '@/components/Motion';

export default function CharactersPage() {
  const { lang } = useLang();
  const page = content.pages.characters;

  return (
    <>
      <PageHero
        annotation={t(page.annotation, lang)}
        heading={t(page.heading, lang)}
        intro={t(page.intro, lang)}
      />

      {/* The art is its own container — no frames, no rounded clipping.
          Each friend rides a slightly different parallax depth so the column
          never scrolls as one flat sheet. */}
      <section className="pb-16 md:pb-24 px-5 md:px-8">
        <div className="mx-auto max-w-[1200px]">
          <ul>
            {content.characters.items.map((c, i) => {
              const accent = c.accent as Accent;
              const flip = i % 2 === 1;

              return (
                <li key={c.id} className="border-t border-hairline">
                  <article className="grid md:grid-cols-[minmax(0,22rem)_1fr] gap-8 md:gap-16 items-center py-14 md:py-20">
                    <Parallax
                      speed={0.12 + spread(c.id, 0.14, 'p')}
                      spin={jitter(c.id, 9, 's')}
                      className={flip ? 'md:order-2' : ''}
                    >
                      <div className="jiggle-on-hover cursor-pointer">
                        <span
                          className="block bob"
                          style={
                            {
                              '--bob-delay': `${spread(c.id, 4, 'b')}s`,
                              '--bob-rot': `${jitter(c.id, 3, 'w')}deg`,
                            } as React.CSSProperties
                          }
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={c.image}
                            alt={t(c.name, lang)}
                            className="jiggle-target w-full max-w-[19rem] mx-auto h-auto object-contain sticker-lg"
                          />
                        </span>
                      </div>
                    </Parallax>

                    <div className={flip ? 'md:order-1' : ''}>
                      <h2 className="t-h1 text-ink">{t(c.name, lang)}</h2>
                      <span
                        className={`block w-16 h-[4px] rounded-full my-6 ${accentBg[accent]}`}
                        aria-hidden="true"
                      />
                      <p className="t-small text-ink/50">{t(page.pillarLabel, lang)}</p>
                      <p className={`t-h3 mt-1 ${accentText[accent]}`}>{t(c.pillar, lang)}</p>
                      <p className="t-body text-ink-soft mt-6 measure">{t(c.body, lang)}</p>
                    </div>
                  </article>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section className="pb-16 md:pb-24 px-5 md:px-8">
        <div className="mx-auto max-w-[1200px] bg-teal text-white rounded-[50px] px-8 md:px-14 py-14 md:py-16 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
          <p className="t-h2 max-w-[20ch]">{t(content.home.apply.heading, lang)}</p>
          <Link href="/admissions" className="btn btn-ghost shrink-0">
            {t(content.nav.cta, lang)}
            <span className="btn-dot bg-sun" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </>
  );
}
