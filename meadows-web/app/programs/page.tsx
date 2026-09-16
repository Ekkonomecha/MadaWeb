'use client';

import React from 'react';
import Link from 'next/link';
import { useLang } from '@/components/LanguageProvider';
import { content, t, tList, type Accent, accentText, accentBg } from '@/lib/content';
import PageHero from '@/components/PageHero';
import Note, { Doodle } from '@/components/Note';
import { Parallax } from '@/components/Motion';

export default function ProgramsPage() {
  const { lang } = useLang();
  const page = content.pages.programs;

  return (
    <div>
      <PageHero
        annotation={t(page.annotation, lang)}
        heading={t(page.heading, lang)}
        intro={t(page.intro, lang)}
        annotationTone="annot-berry"
      />

      <section className="relative pb-16 md:pb-24 px-5 md:px-8">
        <Parallax
          speed={0.3}
          spin={14}
          className="hidden lg:block absolute top-32 end-[2%] -z-10"
        >
          <Doodle src="/assets/characters/rumble.webp" width="9rem" />
        </Parallax>

        <div className="relative mx-auto max-w-[1200px] grid md:grid-cols-2 gap-7 md:gap-8">
          {content.rooms.map((room) => {
            const accent = room.accent as Accent;

            return (
              <Note key={room.id} id={room.id} as="article" taped className="md:!p-10">
                <span
                  className={`block w-14 h-[4px] rounded-full mb-6 ${accentBg[accent]}`}
                  aria-hidden="true"
                />
                <h2 className="t-h2 text-ink">{t(room.name, lang)}</h2>
                <p className={`t-subheading mt-1.5 ${accentText[accent]}`}>
                  {t(room.age, lang)}
                </p>
                <p className="t-body text-ink/75 mt-5">{t(room.summary, lang)}</p>

                <dl className="mt-8 space-y-7">
                  <div>
                    <dt className="t-small font-medium text-ink/50">
                      {t(page.labels.ratio, lang)}
                    </dt>
                    <dd className="t-h3 text-ink mt-1">{t(room.ratio, lang)}</dd>
                  </div>

                  <div>
                    <dt className="t-small font-medium text-ink/50">
                      {t(page.labels.milestones, lang)}
                    </dt>
                    <dd className="mt-3">
                      <ul className="space-y-2.5">
                        {tList(room.milestones, lang).map((m) => (
                          <li key={m} className="flex gap-3.5 t-body text-ink">
                            <span
                              className={`mt-[0.62em] shrink-0 w-2 h-2 rounded-full ${accentBg[accent]}`}
                              aria-hidden="true"
                            />
                            {m}
                          </li>
                        ))}
                      </ul>
                    </dd>
                  </div>

                  <div>
                    <dt className="t-small font-medium text-ink/50">
                      {t(page.labels.comms, lang)}
                    </dt>
                    <dd className="t-body text-ink mt-1">{t(room.comms, lang)}</dd>
                  </div>
                </dl>

                <Link href="/admissions" className="btn btn-ghost mt-8">
                  {t(content.nav.cta, lang)}
                  <span className={`btn-dot ${accentBg[accent]}`} aria-hidden="true" />
                </Link>
              </Note>
            );
          })}
        </div>
      </section>
    </div>
  );
}
