'use client';

import React from 'react';
import Link from 'next/link';
import { useLang } from '@/components/LanguageProvider';
import { content, t } from '@/lib/content';
import PageHero from '@/components/PageHero';
import Note, { Doodle } from '@/components/Note';
import { Parallax } from '@/components/Motion';

export default function AboutPage() {
  const { lang, isAr } = useLang();
  const page = content.pages.about;

  return (
    <div>
      <PageHero
        annotation={t(page.annotation, lang)}
        heading={t(page.heading, lang)}
        intro={t(page.intro, lang)}
      />

      {/* Founder story */}
      <section className="pb-14 md:pb-20 px-5 md:px-8">
        <div className="mx-auto max-w-[1200px] grid lg:grid-cols-[1.5fr_auto] gap-14 lg:gap-20 items-start">
          <Note id="founder-story" tint="sticky-teal" taped className="md:!p-12">
            <h2 className="t-h2 text-ink">{t(page.storyHeading, lang)}</h2>
            <div className="mt-7 space-y-5">
              {t(page.story, lang)
                .split('\n\n')
                .map((para, i) => (
                  <p key={i} className="t-body text-ink/75 measure-wide">
                    {para}
                  </p>
                ))}
            </div>
          </Note>

          {/* The whole class in one ring with their teacher — the founders'
              story is about a family nursery, and this is what that looks like. */}
          <Parallax
            speed={0.2}
            spin={-4}
            className="justify-self-center lg:justify-self-end lg:pt-10 w-full max-w-[26rem]"
          >
            <figure className="bg-white p-2.5 rounded-lg shadow-lift rotate-[1.5deg]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/photos/group-hug.webp"
                alt={
                  isAr
                    ? 'معلّمة وأطفال يقفون في حلقة وأذرعهم حول أكتاف بعضهم'
                    : 'A teacher and children standing in a ring with their arms around one another'
                }
                loading="lazy"
                className="w-full h-auto rounded-[2px]"
              />
            </figure>
          </Parallax>
        </div>
      </section>

      {/* What we hold to — an editorial list, so the page is not notes end to end */}
      <section className="relative pb-14 md:pb-20 px-5 md:px-8">
        <Parallax
          speed={0.3}
          spin={12}
          className="hidden lg:block absolute top-16 end-[2%] -z-10"
        >
          <Doodle src="/assets/characters/breeze.webp" width="8rem" />
        </Parallax>

        <div className="relative mx-auto max-w-[1200px]">
          <h2 className="t-h1 text-ink max-w-[14ch]">{t(page.valuesHeading, lang)}</h2>

          <ul className="mt-14">
            {page.values.map((value) => (
              <li
                key={value.id}
                className="border-t border-hairline grid md:grid-cols-[minmax(0,22rem)_1fr] gap-3 md:gap-10 py-9 md:py-11 items-baseline"
              >
                <h3 className="t-h2 text-ink">{t(value.title, lang)}</h3>
                <p className="t-body text-ink-soft measure">{t(value.body, lang)}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Closing invitation */}
      <section className="pb-16 md:pb-24 px-5 md:px-8">
        <div className="mx-auto max-w-[1200px] bg-teal text-white rounded-[50px] px-8 md:px-14 py-14 md:py-16 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
          <p className="t-h2 max-w-[20ch]">{t(content.home.apply.heading, lang)}</p>
          <Link href="/admissions" className="btn btn-ghost shrink-0">
            {t(content.nav.cta, lang)}
            <span className="btn-dot bg-sun" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </div>
  );
}
