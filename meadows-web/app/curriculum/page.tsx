'use client';

import React, { useRef } from 'react';
import { useLang } from '@/components/LanguageProvider';
import { content, t, type Accent, accentSurface } from '@/lib/content';
import PageHero from '@/components/PageHero';
import Note, { Doodle } from '@/components/Note';
import TiltWords from '@/components/TiltWords';
import CardDeck, { DeckCard } from '@/components/CardDeck';
import { useJourneyCrawl, useCardTimeline, Parallax } from '@/components/Motion';
import { JourneyPath } from '@/components/Drawn';

/** A picture of each stage of the day, shown on its deck card. */
const STAGE_PHOTO: Record<string, { src: string; en: string; ar: string }> = {
  circle: {
    src: '/assets/photos/morning-circle.webp',
    en: 'Children sitting together on a round rug for the morning circle',
    ar: 'أطفال يجلسون معًا على سجادة مستديرة في حلقة الصباح',
  },
  academic: {
    src: '/assets/photos/one-to-one.webp',
    en: 'A teacher working one to one with a child at a low table',
    ar: 'معلّمة تعمل مع طفل بشكل فردي على طاولة منخفضة',
  },
  explore: {
    src: '/assets/photos/movement-room.webp',
    en: 'An indoor movement room with soft climbing shapes and a low slide',
    ar: 'غرفة حركة داخلية بأشكال تسلّق ناعمة وزحليقة منخفضة',
  },
  body: {
    src: '/assets/photos/snack-table.webp',
    en: 'A low table laid for snack time with fruit and small bowls',
    ar: 'طاولة منخفضة مجهّزة لوقت الوجبة بالفاكهة وأوعية صغيرة',
  },
};

export default function CurriculumPage() {
  const { lang, isAr } = useLang();
  const page = content.pages.curriculum;
  const journeyRef = useRef<HTMLElement>(null);
  const pageRef = useRef<HTMLDivElement>(null);

  useJourneyCrawl(journeyRef);
  useCardTimeline(pageRef);

  return (
    <div ref={pageRef}>
      <PageHero
        annotation={t(page.annotation, lang)}
        heading={t(page.heading, lang)}
        intro={t(page.intro, lang)}
        annotationTone="annot-sky"
      />

      {/* ── A day of discovery. The caterpillar rides the path as you scroll —
             the brochure calls the day a journey, so the motion says so too. ── */}
      <section ref={journeyRef} className="pb-8 md:pb-12 px-5 md:px-8 overflow-hidden">
        <div className="mx-auto max-w-[1200px]">
          <TiltWords
            as="h2"
            text={t(page.dayHeading, lang)}
            className="t-h1 text-ink max-w-[16ch] block"
          />

          <div className="relative mt-14 hidden md:block" aria-hidden="true">
            <div data-journey>
              <JourneyPath className="w-full h-40 text-teal/35" />
            </div>
            <div data-crawler className="absolute top-0 left-0 w-24">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/characters/nibble.webp"
                alt=""
                className="w-full h-auto sticker"
              />
            </div>
          </div>
        </div>
      </section>

      {/* The day dealt out one card at a time. Each stage pins at the same line
          and the one beneath tilts away as the next rises to cover it. */}
      <section className="px-5 md:px-8 pb-16 md:pb-24">
        <CardDeck className="mx-auto max-w-[1100px] space-y-6 md:space-y-8">
          {page.day.map((stage, i) => {
            const accent = stage.accent as Accent;
            return (
              <DeckCard key={stage.id} index={i} className={accentSurface[accent]}>
                <div className="grid md:grid-cols-[1fr_auto] gap-8 md:gap-12 items-center px-8 md:px-14 py-12 md:py-16">
                  <div>
                    <span className="t-small font-medium opacity-70">
                      {isAr ? `المرحلة ${i + 1}` : `Stage ${i + 1}`}
                    </span>
                    <h3 className="t-h1 mt-3">{t(stage.title, lang)}</h3>
                    <p className="t-subheading mt-6 measure opacity-85">
                      {t(stage.body, lang)}
                    </p>
                  </div>

                  {(() => {
                    const photo = STAGE_PHOTO[stage.id];
                    if (!photo) return null;
                    return (
                      <figure className="justify-self-center md:justify-self-end w-full max-w-[20rem] bg-white p-2 rounded-xl rotate-[1.2deg]">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={photo.src}
                          alt={isAr ? photo.ar : photo.en}
                          loading="lazy"
                          className="w-full aspect-[4/3] object-cover rounded-[3px]"
                        />
                      </figure>
                    );
                  })()}
                </div>
              </DeckCard>
            );
          })}
        </CardDeck>
      </section>

      {/* Bilingual + interview */}
      <section className="relative pb-14 md:pb-20 px-5 md:px-8">
        <Parallax
          speed={0.26}
          spin={-12}
          className="hidden lg:block absolute bottom-0 start-[1%] -z-10"
        >
          <Doodle src="/assets/characters/juniper.webp" width="8rem" />
        </Parallax>

        <div className="relative mx-auto max-w-[1200px] grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          <div className="lg:pt-6">
            <TiltWords
              as="h2"
              text={t(page.bilingualHeading, lang)}
              className="t-h1 text-ink max-w-[14ch] block"
            />
            <p className="t-body text-ink-soft mt-7 measure">{t(page.bilingualBody, lang)}</p>
          </div>

          <Note id="kg-interview" taped className="md:!p-10">
            <h2 className="t-h2 text-ink">{t(page.interviewHeading, lang)}</h2>
            <p className="t-body text-ink/75 mt-6">{t(page.interviewBody, lang)}</p>
          </Note>
        </div>
      </section>

      {/* Foundations, restated where a research-mode parent looks for proof */}
      <section className="pb-16 md:pb-24 px-5 md:px-8">
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
    </div>
  );
}
