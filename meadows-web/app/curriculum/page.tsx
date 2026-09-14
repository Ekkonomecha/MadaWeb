'use client';

import React, { useRef } from 'react';
import { useLang } from '@/components/LanguageProvider';
import { content, t, type Accent, accentText, accentBg } from '@/lib/content';
import PageHero from '@/components/PageHero';
import { useJourneyCrawl } from '@/components/Motion';
import { JourneyPath, Squiggle } from '@/components/Drawn';

export default function CurriculumPage() {
  const { lang } = useLang();
  const page = content.pages.curriculum;
  const journeyRef = useRef<HTMLElement>(null);

  useJourneyCrawl(journeyRef);

  return (
    <>
      <PageHero
        annotation={t(page.annotation, lang)}
        heading={t(page.heading, lang)}
        intro={t(page.intro, lang)}
        annotationTone="annot-sky"
      />

      {/* ── A day of discovery. The caterpillar crawls the path as you scroll —
             the brochure calls the day a journey, so the motion says so too. ── */}
      <section ref={journeyRef} className="bg-chalk py-20 md:py-28 overflow-hidden">
        <div className="mx-auto max-w-[1180px] px-5 md:px-8">
          <div>
            <h2 className="t-h2 text-ink max-w-[20ch]">{t(page.dayHeading, lang)}</h2>
          </div>

          {/* The path, with the crawler riding it */}
          <div className="relative mt-14 hidden md:block" aria-hidden="true">
            <div data-journey>
              <JourneyPath className="w-full h-40 text-teal/40" />
            </div>
            <div data-crawler className="absolute top-0 left-0 w-24">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/characters/nibble.webp"
                alt=""
                className="w-full h-auto drop-shadow-[0_6px_10px_rgba(11,61,51,0.18)]"
              />
            </div>
          </div>

          <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10 md:mt-6">
            {page.day.map((stage, i) => {
              const accent = stage.accent as Accent;
              return (
                <li key={stage.id} className="sheet p-7">
                  <span
                    className={`inline-grid place-items-center w-8 h-8 rounded-full text-white t-small font-bold ${accentBg[accent]}`}
                  >
                    {i + 1}
                  </span>
                  <h3 className="t-h3 text-ink mt-4">{t(stage.title, lang)}</h3>
                  <p className="t-small text-ink-soft mt-2.5 leading-relaxed">
                    {t(stage.body, lang)}
                  </p>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* Bilingual */}
      <section className="py-20 md:py-28 paper-grain relative">
        <div className="relative mx-auto max-w-[1180px] px-5 md:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <div>
              <h2 className="t-h2 text-ink">{t(page.bilingualHeading, lang)}</h2>
              <p className="t-body text-ink-soft mt-5 measure">{t(page.bilingualBody, lang)}</p>
            </div>

            <div>
              <div className="sheet p-8 md:p-10" style={{ transform: 'rotate(0.7deg)' }}>
                <Squiggle className="w-24 h-3.5 text-berry mb-6" strokeWidth={4} />
                <h2 className="t-h2 text-ink">{t(page.interviewHeading, lang)}</h2>
                <p className="t-body text-ink-soft mt-5">{t(page.interviewBody, lang)}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Foundations, restated where a research-mode parent is looking for proof */}
      <section className="bg-teal-deep text-white py-20 md:py-28 paper-grain relative">
        <div className="relative mx-auto max-w-[1180px] px-5 md:px-8">
          <h2 className="t-h2 text-white max-w-[20ch]">{t(content.home.why.heading, lang)}</h2>
          <ul className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
            {content.home.why.items.map((item) => (
              <li key={item.id}>
                <h3 className="t-h3 text-sun">{t(item.title, lang)}</h3>
                <p className="t-small text-white/70 mt-2.5 leading-relaxed">
                  {t(item.body, lang)}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
