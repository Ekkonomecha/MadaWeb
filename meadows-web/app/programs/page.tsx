'use client';

import React from 'react';
import Link from 'next/link';
import { useLang } from '@/components/LanguageProvider';
import { content, t, tList, type Accent, accentText, accentBg } from '@/lib/content';
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

      <section className="pb-10 md:pb-16 px-5 md:px-8">
        <div className="mx-auto max-w-[1200px] space-y-6">
          {content.rooms.map((room, i) => {
            const accent = room.accent as Accent;
            const flip = i % 2 === 1;

            return (
              <article
                key={room.id}
                className="surface-card grid lg:grid-cols-[1fr_1.35fr] gap-8 lg:gap-16 items-start"
              >
                {/* Identity */}
                <div className={flip ? 'lg:order-2' : ''}>
                  <span
                    className={`block w-14 h-[3px] rounded-full mb-6 ${accentBg[accent]}`}
                    aria-hidden="true"
                  />
                  <h2 className="t-h1 text-ink">{t(room.name, lang)}</h2>
                  <p className={`t-subheading mt-2 ${accentText[accent]}`}>
                    {t(room.age, lang)}
                  </p>
                  <p className="t-body text-ink-soft mt-6 measure">{t(room.summary, lang)}</p>
                </div>

                {/* Detail */}
                <dl className={`space-y-8 ${flip ? 'lg:order-1' : ''}`}>
                  <div>
                    <dt className="t-small font-medium text-ink/55">
                      {t(page.labels.ratio, lang)}
                    </dt>
                    <dd className="t-h3 text-ink mt-1.5">{t(room.ratio, lang)}</dd>
                  </div>

                  <div>
                    <dt className="t-small font-medium text-ink/55">
                      {t(page.labels.milestones, lang)}
                    </dt>
                    <dd className="mt-3">
                      <ul className="space-y-2.5">
                        {tList(room.milestones, lang).map((m) => (
                          <li key={m} className="flex gap-3.5 t-body text-ink">
                            <span
                              className={`mt-[0.62em] shrink-0 w-1.5 h-1.5 rounded-full ${accentBg[accent]}`}
                              aria-hidden="true"
                            />
                            {m}
                          </li>
                        ))}
                      </ul>
                    </dd>
                  </div>

                  <div>
                    <dt className="t-small font-medium text-ink/55">
                      {t(page.labels.comms, lang)}
                    </dt>
                    <dd className="t-body text-ink mt-1.5">{t(room.comms, lang)}</dd>
                  </div>

                  <div className="pt-2">
                    <Link href="/#visit" className="btn btn-ghost bg-paper hover:bg-paper-deep">
                      {t(content.nav.cta, lang)}
                      <span className={`btn-dot ${accentBg[accent]}`} aria-hidden="true" />
                    </Link>
                  </div>
                </dl>
              </article>
            );
          })}
        </div>
      </section>
    </>
  );
}
