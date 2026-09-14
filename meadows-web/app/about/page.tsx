'use client';

import React from 'react';
import Link from 'next/link';
import { useLang } from '@/components/LanguageProvider';
import { content, t } from '@/lib/content';
import PageHero from '@/components/PageHero';
import { Drift } from '@/components/Motion';
import { DrawnRing } from '@/components/Drawn';

export default function AboutPage() {
  const { lang } = useLang();
  const page = content.pages.about;

  return (
    <>
      <PageHero
        annotation={t(page.annotation, lang)}
        heading={t(page.heading, lang)}
        intro={t(page.intro, lang)}
      />

      {/* Founder story */}
      <section className="bg-chalk py-20 md:py-28">
        <div className="mx-auto max-w-[1180px] px-5 md:px-8">
          <div className="grid lg:grid-cols-[1.4fr_1fr] gap-14 items-start">
            <div>
              <h2 className="t-h2 text-ink">{t(page.storyHeading, lang)}</h2>
              <div className="mt-6 space-y-5">
                {t(page.story, lang)
                  .split('\n\n')
                  .map((para, i) => (
                    <p key={i} className="t-body text-ink-soft measure-wide">
                      {para}
                    </p>
                  ))}
              </div>
            </div>

            <Drift className="justify-self-center lg:justify-self-end" amount={26}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/motifs/face-blue.webp"
                alt=""
                aria-hidden="true"
                className="w-52 md:w-64 h-auto mix-blend-multiply"
              />
            </Drift>
          </div>
        </div>
      </section>

      {/* What we hold to */}
      <section className="py-20 md:py-28 paper-grain relative">
        <div className="relative mx-auto max-w-[1180px] px-5 md:px-8">
          <div>
            <h2 className="t-h2 text-ink">{t(page.valuesHeading, lang)}</h2>
          </div>

          <ul className="grid md:grid-cols-2 gap-x-14 gap-y-10 mt-12">
            {page.values.map((value, i) => (
              <li key={value.id} className="flex gap-5">
                <span className="relative shrink-0 w-12 h-12 grid place-items-center">
                  <DrawnRing className="absolute inset-0 w-full h-full text-berry/35" />
                  <span className="t-h3 text-berry leading-none">{i + 1}</span>
                </span>
                <div>
                  <h3 className="t-h3 text-ink">{t(value.title, lang)}</h3>
                  <p className="t-body text-ink-soft mt-2 measure">{t(value.body, lang)}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-teal text-white py-16 md:py-20 paper-grain relative">
        <div className="relative mx-auto max-w-[1180px] px-5 md:px-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <p className="t-h2 max-w-[22ch]">{t(content.home.apply.heading, lang)}</p>
          <Link href="/#visit" className="btn btn-sun shrink-0">
            {t(content.nav.cta, lang)}
          </Link>
        </div>
      </section>
    </>
  );
}
