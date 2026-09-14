'use client';

import React from 'react';
import Link from 'next/link';
import { useLang } from '@/components/LanguageProvider';
import { content, t, tList, type Accent, accentText, accentBg, accentWash } from '@/lib/content';
import PageHero from '@/components/PageHero';

export default function ProgramsPage() {
  const { lang } = useLang();
  const page = content.pages.programs;

  return (
    <>
      <PageHero
        annotation={t(page.annotation, lang)}
        heading={t(page.heading, lang)}
        intro={t(page.intro, lang)}
        annotationTone="annot-berry"
      />

      <section className="bg-chalk py-16 md:py-24">
        <div className="mx-auto max-w-[1180px] px-5 md:px-8 space-y-16 md:space-y-24">
          {content.rooms.map((room, i) => {
            const accent = room.accent as Accent;
            const flip = i % 2 === 1;

            return (
              <article key={room.id}>
                <div
                  className={`grid lg:grid-cols-[1fr_1.5fr] gap-8 lg:gap-14 items-start ${
                    flip ? 'lg:[direction:rtl]' : ''
                  }`}
                >
                  {/* Identity block */}
                  <div className={flip ? 'lg:[direction:ltr] rtl:lg:[direction:rtl]' : ''}>
                    <span
                      className={`block w-14 h-1.5 rounded-full mb-5 ${accentBg[accent]}`}
                      aria-hidden="true"
                    />
                    <h2 className="t-h1 text-ink">{t(room.name, lang)}</h2>
                    <p className={`t-h3 mt-1.5 ${accentText[accent]}`}>{t(room.age, lang)}</p>
                    <p className="t-body text-ink-soft mt-5 measure">{t(room.summary, lang)}</p>
                  </div>

                  {/* Detail block */}
                  <div
                    className={`sheet p-7 md:p-9 ${flip ? 'lg:[direction:ltr] rtl:lg:[direction:rtl]' : ''}`}
                  >
                    <dl className="space-y-7">
                      <div>
                        <dt className="t-small font-semibold text-ink/55">
                          {t(page.labels.ratio, lang)}
                        </dt>
                        <dd className="t-h3 text-ink mt-1">{t(room.ratio, lang)}</dd>
                      </div>

                      <div>
                        <dt className="t-small font-semibold text-ink/55">
                          {t(page.labels.milestones, lang)}
                        </dt>
                        <dd className="mt-2.5">
                          <ul className="space-y-2">
                            {tList(room.milestones, lang).map((m) => (
                              <li key={m} className="flex gap-3 t-body text-ink">
                                <span
                                  className={`mt-2.5 shrink-0 w-1.5 h-1.5 rounded-full ${accentBg[accent]}`}
                                  aria-hidden="true"
                                />
                                {m}
                              </li>
                            ))}
                          </ul>
                        </dd>
                      </div>

                      <div>
                        <dt className="t-small font-semibold text-ink/55">
                          {t(page.labels.comms, lang)}
                        </dt>
                        <dd className="t-body text-ink mt-1">{t(room.comms, lang)}</dd>
                      </div>
                    </dl>

                    <div className={`mt-8 -mx-1 rounded-2xl p-5 ${accentWash[accent]}`}>
                      <Link
                        href="/#visit"
                        className={`t-body font-semibold ${accentText[accent]}`}
                      >
                        {t(content.nav.cta, lang)}
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </>
  );
}
