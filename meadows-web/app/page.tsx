'use client';

import React, { FormEvent, useRef, useState } from 'react';
import Link from 'next/link';
import { useLang } from '@/components/LanguageProvider';
import { content, t, type Accent, accentText, accentBg, accentWash } from '@/lib/content';
import { MeadowHorizon, Squiggle, DrawnArrow, DrawnSun, DrawnRing } from '@/components/Drawn';
import { useHeroSequence, Drift } from '@/components/Motion';

export default function HomePage() {
  const { lang, isAr } = useLang();
  const home = content.home;
  const heroRef = useRef<HTMLElement>(null);

  useHeroSequence(heroRef);

  return (
    <>
      {/* ───────── 1 · HERO ───────── */}
      <section ref={heroRef} className="relative overflow-hidden paper-grain pt-16 md:pt-24">
        <div className="relative mx-auto max-w-[1180px] px-5 md:px-8">
          <div className="max-w-[46rem]">
            {/* The annotation voice replaces an all-caps eyebrow */}
            <div className="flex items-start gap-2 mb-5">
              <span className="annot">{t(home.hero.annotation, lang)}</span>
              <DrawnArrow className="w-9 h-7 text-teal/60 mt-1 rtl:-scale-x-100" />
            </div>

            <h1 className="t-display text-ink">
              {/* Each line masked, so the hero sequence can lift them in */}
              {t(home.hero.headline, lang)
                .split(' ')
                .reduce<string[][]>((lines, word, i) => {
                  const per = isAr ? 3 : 2;
                  const idx = Math.floor(i / per);
                  (lines[idx] ||= []).push(word);
                  return lines;
                }, [])
                .map((words, i) => (
                  <span key={i} className="block overflow-hidden">
                    <span data-hero-line className="block will-rise">
                      {words.join(' ')}
                    </span>
                  </span>
                ))}
            </h1>

            <p className="t-body measure-wide text-ink-soft mt-7">{t(home.hero.body, lang)}</p>

            <div className="flex flex-wrap gap-3 mt-9">
              <Link href="#visit" className="btn btn-primary">
                {t(home.hero.ctaPrimary, lang)}
              </Link>
              <Link href="/curriculum" className="btn btn-ghost">
                {t(home.hero.ctaSecondary, lang)}
              </Link>
            </div>
          </div>
        </div>

        {/* The orchestrated moment: horizon draws, then the six friends rise behind it */}
        <div className="relative mt-14 md:mt-20">
          <div className="mx-auto max-w-[1180px] px-5 md:px-8">
            <ul className="flex items-end justify-between gap-1 sm:gap-3 pb-1">
              {content.characters.items.map((c) => (
                <li key={c.id} data-rise className="will-rise flex-1 max-w-[9.5rem]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={c.image}
                    alt={t(c.name, lang)}
                    className="w-full h-auto object-contain drop-shadow-[0_10px_18px_rgba(11,61,51,0.14)]"
                  />
                </li>
              ))}
            </ul>
          </div>

          <div data-horizon className="relative -mt-3">
            <MeadowHorizon className="w-full h-16 md:h-20 text-grass" />
          </div>
        </div>
      </section>

      {/* ───────── 2 · TRUST BAR ───────── */}
      <section className="bg-teal text-white paper-grain relative">
        <div className="relative mx-auto max-w-[1180px] px-5 md:px-8 py-12 md:py-14">
          <dl className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-9">
            {home.trustBar.items.map((item) => (
              <div key={item.id}>
                <dt className="sr-only">{t(item.label, lang)}</dt>
                <dd>
                  <span className="block text-3xl md:text-4xl font-semibold tracking-tight leading-none">
                    {t(item.value, lang)}
                  </span>
                  <span className="block t-small text-white/75 mt-2.5 max-w-[15rem]">
                    {t(item.label, lang)}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ───────── 3 · ABOUT SNAPSHOT ───────── */}
      <section className="bg-chalk py-24 md:py-32">
        <div className="mx-auto max-w-[1180px] px-5 md:px-8">
          <div className="grid lg:grid-cols-[1fr_auto] gap-14 lg:gap-20 items-center">
            <div>
              <p className="annot mb-4">{t(home.about.annotation, lang)}</p>
              <h2 className="t-h1 text-ink measure">{t(home.about.heading, lang)}</h2>
              <p className="t-body measure-wide text-ink-soft mt-6">{t(home.about.body, lang)}</p>
              <Link
                href="/about"
                className="inline-block mt-8 t-body font-semibold text-teal mark-underline"
              >
                {t(home.about.cta, lang)}
              </Link>
            </div>

            <Drift className="hidden lg:block shrink-0" amount={30}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/motifs/tree-round.webp"
                alt=""
                aria-hidden="true"
                className="w-56 h-auto mix-blend-multiply"
              />
            </Drift>
          </div>
        </div>
      </section>

      {/* ───────── 4 · PROGRAMS OVERVIEW ───────── */}
      <section className="py-24 md:py-32 paper-grain relative">
        <div className="relative mx-auto max-w-[1180px] px-5 md:px-8">
          <div className="max-w-[40rem]">
            <p className="annot annot-berry mb-4">{t(home.programs.annotation, lang)}</p>
            <h2 className="t-h1 text-ink">{t(home.programs.heading, lang)}</h2>
            <p className="t-body text-ink-soft mt-5 measure-wide">{t(home.programs.body, lang)}</p>
          </div>

          <ul className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-14">
            {content.rooms.map((room, i) => {
              const accent = room.accent as Accent;
              return (
                <li key={room.id}>
                  <Link
                    href="/programs"
                    className="sheet sheet-hover block h-full p-7 group"
                    style={{ transform: `rotate(${i % 2 ? 0.7 : -0.7}deg)` }}
                  >
                    <span
                      className={`block w-11 h-1.5 rounded-full mb-6 ${accentBg[accent]}`}
                      aria-hidden="true"
                    />
                    <h3 className="t-h3 text-ink">{t(room.name, lang)}</h3>
                    <p className={`t-small font-semibold mt-1 ${accentText[accent]}`}>
                      {t(room.age, lang)}
                    </p>
                    <p className="t-small text-ink-soft mt-4 leading-relaxed">
                      {t(room.summary, lang)}
                    </p>
                    <p className="t-small text-ink/50 mt-5">{t(room.ratio, lang)}</p>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* ───────── 5 · CHARACTERS TEASER ───────── */}
      <section className="bg-paper-deep py-24 md:py-32 paper-grain relative">
        <div className="relative mx-auto max-w-[1180px] px-5 md:px-8">
          <div className="max-w-[40rem]">
            <p className="annot annot-sky mb-4">{t(home.characters.annotation, lang)}</p>
            <h2 className="t-h1 text-ink">{t(home.characters.heading, lang)}</h2>
            <p className="t-body text-ink-soft mt-5 measure-wide">{t(home.characters.body, lang)}</p>
          </div>

          <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-5 mt-14">
            {content.characters.items.map((c) => {
              const accent = c.accent as Accent;
              return (
                <li key={c.id} className="text-center">
                  <Link href="/characters" className="group block">
                    <span
                      className={`block aspect-square rounded-[22px] grid place-items-center p-4 transition-transform duration-500 group-hover:-translate-y-1.5 ${accentWash[accent]}`}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={c.image}
                        alt=""
                        aria-hidden="true"
                        className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                      />
                    </span>
                    <span className="block t-h3 text-ink mt-3">{t(c.name, lang)}</span>
                    <span className={`block t-small mt-0.5 ${accentText[accent]}`}>
                      {t(c.pillar, lang)}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="text-center mt-12">
            <Link href="/characters" className="btn btn-ghost">
              {t(home.characters.cta, lang)}
            </Link>
          </div>
        </div>
      </section>

      {/* ───────── 6 · WHY MEADOWS — FOUNDATIONS ───────── */}
      <section className="bg-chalk py-24 md:py-32">
        <div className="mx-auto max-w-[1180px] px-5 md:px-8">
          <div className="max-w-[40rem]">
            <p className="annot mb-4">{t(home.why.annotation, lang)}</p>
            <h2 className="t-h1 text-ink">{t(home.why.heading, lang)}</h2>
            <p className="t-body text-ink-soft mt-5 measure-wide">{t(home.why.body, lang)}</p>
          </div>

          {/* Four foundations, set as a list with drawn rings — not four identical cards */}
          <ul className="grid md:grid-cols-2 gap-x-14 gap-y-10 mt-14">
            {home.why.items.map((item, i) => (
              <li key={item.id} className="flex gap-5">
                <span className="relative shrink-0 w-12 h-12 grid place-items-center">
                  <DrawnRing className="absolute inset-0 w-full h-full text-teal/35" />
                  <span className="t-h3 text-teal leading-none">{i + 1}</span>
                </span>
                <div>
                  <h3 className="t-h3 text-ink">{t(item.title, lang)}</h3>
                  <p className="t-body text-ink-soft mt-2 measure">{t(item.body, lang)}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ───────── 7 · GALLERY TEASER ───────── */}
      <section className="bg-teal-deep text-white py-24 md:py-32 paper-grain relative overflow-hidden">
        <div className="relative mx-auto max-w-[1180px] px-5 md:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="annot annot-sun mb-4">{t(home.gallery.annotation, lang)}</p>
              <h2 className="t-h1 text-white">{t(home.gallery.heading, lang)}</h2>
              <p className="t-body text-white/70 mt-5 measure">{t(home.gallery.body, lang)}</p>
              <Link href="/gallery" className="btn btn-sun mt-8">
                {t(home.gallery.cta, lang)}
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {/* Children's drawings as prints pinned on the wall — there is no
                  photography yet, and stock images lose 91% of parents. */}
              {['tree-pine', 'face-blue', 'tree-round'].map((m, i) => (
                <div
                  key={m}
                  className="aspect-[3/4] rounded-lg bg-white p-3 shadow-lift grid place-items-center"
                  style={{ transform: `rotate(${i === 1 ? 0 : i === 0 ? -2.5 : 2.5}deg)` }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`/assets/motifs/${m}.webp`}
                    alt=""
                    aria-hidden="true"
                    className="w-full h-full object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ───────── 8 · TESTIMONIALS ───────── */}
      <section className="py-24 md:py-32 paper-grain relative">
        <div className="relative mx-auto max-w-[1180px] px-5 md:px-8">
          <div className="max-w-[40rem]">
            <p className="annot annot-berry mb-4">{t(home.testimonials.annotation, lang)}</p>
            <h2 className="t-h1 text-ink">{t(home.testimonials.heading, lang)}</h2>
          </div>

          <ul className="grid md:grid-cols-2 gap-6 mt-12">
            {home.testimonials.items.map((item, i) => (
              <li
                key={item.id}
                className="sheet p-8 md:p-10"
                style={{ transform: `rotate(${i % 2 ? 0.6 : -0.6}deg)` }}
              >
                <Squiggle className="w-20 h-3 text-sun mb-5" strokeWidth={4} />
                <blockquote>
                  <p className="text-xl md:text-[1.35rem] leading-[1.5] text-ink font-medium measure">
                    {t(item.quote, lang)}
                  </p>
                  <footer className="t-small text-ink-soft mt-6">{t(item.author, lang)}</footer>
                </blockquote>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ───────── 9 · SUMMER CLUB ───────── */}
      <section className="bg-sun text-ink py-20 md:py-24 paper-grain relative overflow-hidden">
        <DrawnSun className="absolute -top-8 end-6 w-40 h-40 text-ink/12" />
        <div className="relative mx-auto max-w-[1180px] px-5 md:px-8">
          <div className="grid lg:grid-cols-[1.3fr_1fr] gap-10 items-center">
            <div>
              <p className="annot annot-soft mb-3">{t(home.summer.annotation, lang)}</p>
              <h2 className="t-h1">{t(home.summer.heading, lang)}</h2>
              <p className="t-body mt-5 measure-wide text-ink/78">{t(home.summer.body, lang)}</p>
            </div>
            <div className="lg:justify-self-end">
              <Link href="#visit" className="btn bg-ink text-sun hover:bg-teal-deep">
                {t(home.summer.cta, lang)}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ───────── 10 · REQUEST A VISIT ───────── */}
      <VisitSection />
    </>
  );
}

/* ══════════════════ Visit request ══════════════════ */

function VisitSection() {
  const { lang } = useLang();
  const apply = content.home.apply;
  const [sent, setSent] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // No backend yet — the form is wired to a submit handler so the success
    // state and copy are reviewable. Point this at the CRM before launch.
    setSent(true);
  };

  return (
    <section id="visit" className="bg-chalk py-24 md:py-32 scroll-mt-24">
      <div className="mx-auto max-w-[1180px] px-5 md:px-8">
        <div className="grid lg:grid-cols-[1fr_1.15fr] gap-14 lg:gap-20">
          {/* Reassurance column */}
          <div>
            <p className="annot mb-4">{t(apply.annotation, lang)}</p>
            <h2 className="t-h1 text-ink">{t(apply.heading, lang)}</h2>
            <p className="t-body text-ink-soft mt-5 measure">{t(apply.body, lang)}</p>

            <ol className="mt-10 space-y-5">
              {apply.steps.map((step, i) => (
                <li key={step.id} className="flex gap-4 items-start">
                  <span className="shrink-0 w-7 h-7 rounded-full bg-teal/12 text-teal grid place-items-center t-small font-bold">
                    {i + 1}
                  </span>
                  <span className="t-body text-ink">{t(step, lang)}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Form */}
          <div className="sheet p-7 md:p-10">
            {sent ? (
              <div className="py-10 text-center">
                <Squiggle className="w-28 h-4 text-teal mx-auto mb-6" strokeWidth={4} />
                <h3 className="t-h2 text-ink">{t(apply.successTitle, lang)}</h3>
                <p className="t-body text-ink-soft mt-3 measure mx-auto">
                  {t(apply.successBody, lang)}
                </p>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="grid sm:grid-cols-2 gap-5">
                <Field id="childName" label={t(apply.fields.childName, lang)} required />
                <Field id="dob" label={t(apply.fields.dob, lang)} type="date" required />

                <div className="sm:col-span-2">
                  <label htmlFor="room" className="block t-small font-semibold text-ink mb-1.5">
                    {t(apply.fields.room, lang)}
                  </label>
                  <select id="room" name="room" required className="field" defaultValue="">
                    <option value="" disabled>
                      {t(apply.fields.roomPlaceholder, lang)}
                    </option>
                    {content.rooms.map((room) => (
                      <option key={room.id} value={room.id}>
                        {t(room.name, lang)} · {t(room.age, lang)}
                      </option>
                    ))}
                  </select>
                </div>

                <Field id="parentName" label={t(apply.fields.parentName, lang)} required />
                <Field
                  id="whatsapp"
                  label={t(apply.fields.whatsapp, lang)}
                  type="tel"
                  dir="ltr"
                  required
                />
                <div className="sm:col-span-2">
                  <Field id="email" label={t(apply.fields.email, lang)} type="email" dir="ltr" />
                </div>

                <button type="submit" className="btn btn-primary sm:col-span-2 mt-1">
                  {t(apply.submit, lang)}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({
  id,
  label,
  type = 'text',
  required = false,
  dir,
}: {
  id: string;
  label: string;
  type?: string;
  required?: boolean;
  dir?: 'ltr' | 'rtl';
}) {
  return (
    <div>
      <label htmlFor={id} className="block t-small font-semibold text-ink mb-1.5">
        {label}
      </label>
      <input id={id} name={id} type={type} required={required} dir={dir} className="field" />
    </div>
  );
}
