'use client';

import React from 'react';
import Link from 'next/link';
import { useLang } from '@/components/LanguageProvider';
import { content, t, type Accent, accentText, accentBg, accentWash } from '@/lib/content';
import PageHero from '@/components/PageHero';

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

      <section className="bg-chalk py-16 md:py-24">
        <div className="mx-auto max-w-[1180px] px-5 md:px-8">
          <ul className="space-y-14 md:space-y-20">
            {content.characters.items.map((c, i) => {
              const accent = c.accent as Accent;
              const flip = i % 2 === 1;

              return (
                <li key={c.id}>
                  <div>
                    <article className="grid md:grid-cols-[minmax(0,18rem)_1fr] gap-8 md:gap-12 items-center">
                      <div
                        className={`rounded-[28px] p-8 grid place-items-center ${accentWash[accent]} ${
                          flip ? 'md:order-2' : ''
                        }`}
                        style={{ transform: `rotate(${flip ? 1.4 : -1.4}deg)` }}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={c.image}
                          alt={t(c.name, lang)}
                          className="w-full max-w-[15rem] h-auto object-contain"
                        />
                      </div>

                      <div className={flip ? 'md:order-1' : ''}>
                        <h2 className="t-h1 text-ink">{t(c.name, lang)}</h2>
                        <p className="t-small text-ink/50 mt-4">{t(page.pillarLabel, lang)}</p>
                        <p className={`t-h3 mt-0.5 ${accentText[accent]}`}>{t(c.pillar, lang)}</p>
                        <span
                          className={`block w-16 h-1.5 rounded-full my-6 ${accentBg[accent]}`}
                          aria-hidden="true"
                        />
                        <p className="t-body text-ink-soft measure">{t(c.body, lang)}</p>
                      </div>
                    </article>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section className="bg-teal text-white py-16 md:py-20 paper-grain relative">
        <div className="relative mx-auto max-w-[1180px] px-5 md:px-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <p className="t-h2 max-w-[24ch]">{t(content.home.apply.heading, lang)}</p>
          <Link href="/#visit" className="btn btn-sun shrink-0">
            {t(content.nav.cta, lang)}
          </Link>
        </div>
      </section>
    </>
  );
}
