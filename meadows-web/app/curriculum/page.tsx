'use client';

import React, { useRef } from 'react';
import { useLang } from '@/components/LanguageProvider';
import { content, t, type Accent, accentText, accentBg } from '@/lib/content';
import PageHero from '@/components/PageHero';
import { useJourneyCrawl } from '@/components/Motion';
import { JourneyPath } from '@/components/Drawn';

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

      {/* ── A day of discovery. The caterpillar rides the path as you scroll —
             the brochure calls the day a journey, so the motion says so too.
             These four are a genuine sequence, so they are numbered. ── */}
      <section ref={journeyRef} className="pb-10 md:pb-16 px-5 md:px-8 overflow-hidden">
        <div className="mx-auto max-w-[1200px]">
          <h2 className="t-h1 text-ink max-w-[16ch]">{t(page.dayHeading, lang)}</h2>

          <div className="relative mt-14 hidden md:block" aria-hidden="true">
            <div data-journey>
              <JourneyPath className="w-full h-40 text-teal/35" />
            </div>
            <div data-crawler className="absolute top-0 left-0 w-24">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/assets/characters/nibble.webp" alt="" className="w-full h-auto" />
            </div>
          </div>

          <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10 md:mt-8">
            {page.day.map((stage, i) => {
              const accent = stage.accent as Accent;
              return (
                <li key={stage.id} className="surface-card !p-8">
                  <span className={`t-h3 ${accentText[accent]}`}>{i + 1}</span>
                  <span
                    className={`block w-9 h-[3px] rounded-full my-4 ${accentBg[accent]}`}
                    aria-hidden="true"
                  />
                  <h3 className="t-h3 text-ink">{t(stage.title, lang)}</h3>
                  <p className="t-small text-ink-soft mt-3">{t(stage.body, lang)}</p>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* Bilingual + interview */}
      <section className="pb-10 md:pb-16 px-5 md:px-8">
        <div className="mx-auto max-w-[1200px] grid lg:grid-cols-2 gap-8 lg:gap-10 items-start">
          <div className="lg:pt-4">
            <h2 className="t-h1 text-ink max-w-[14ch]">{t(page.bilingualHeading, lang)}</h2>
            <p className="t-body text-ink-soft mt-7 measure">{t(page.bilingualBody, lang)}</p>
          </div>

          <div className="surface-card">
            <h2 className="t-h2 text-ink">{t(page.interviewHeading, lang)}</h2>
            <p className="t-body text-ink-soft mt-6">{t(page.interviewBody, lang)}</p>
          </div>
        </div>
      </section>

      {/* Foundations, restated where a research-mode parent looks for proof */}
      <section className="pb-10 md:pb-16 px-5 md:px-8">
        <div className="mx-auto max-w-[1200px] bg-teal text-white rounded-[50px] px-8 md:px-14 py-16 md:py-20">
          <h2 className="t-h1 max-w-[16ch]">{t(content.home.why.heading, lang)}</h2>
          <ul className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-10 mt-14">
            {content.home.why.items.map((item) => (
              <li key={item.id}>
                <h3 className="t-h3 text-sun">{t(item.title, lang)}</h3>
                <p className="t-small text-white/75 mt-3">{t(item.body, lang)}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
