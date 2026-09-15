'use client';

import React, { FormEvent, useRef, useState } from 'react';
import Link from 'next/link';
import { useLang } from '@/components/LanguageProvider';
import { content, t, type Accent, accentText, accentBg } from '@/lib/content';
import { AnnotationArrow } from '@/components/Drawn';
import { useHeroSequence, Drift } from '@/components/Motion';

export default function HomePage() {
  const { lang, isAr } = useLang();
  const home = content.home;
  const heroRef = useRef<HTMLElement>(null);

  useHeroSequence(heroRef);

  return (
    <>
      {/* ───────── 1 · HERO ─────────
          Headline dominant, sitting straight on the canvas with no wrapper.
          The artwork bleeds in from the bottom edge into the band below. */}
      <section ref={heroRef} className="relative overflow-hidden pt-8 md:pt-16">
        <div className="mx-auto max-w-[1200px] px-5 md:px-8">
          <h1 className="t-display text-ink max-w-[14ch]">
            {t(home.hero.headline, lang)
              .split(' ')
              .reduce<string[][]>((lines, word, i) => {
                const per = isAr ? 3 : 2;
                const idx = Math.floor(i / per);
                (lines[idx] ||= []).push(word);
                return lines;
              }, [])
              .map((words, i) => (
                <span key={i} className="block overflow-hidden pb-[0.06em]">
                  <span data-hero-line className="block will-rise">
                    {words.join(' ')}
                  </span>
                </span>
              ))}
          </h1>

          <div className="mt-10 md:mt-14 grid gap-8 lg:grid-cols-[minmax(0,42rem)_auto] lg:items-end">
            <div>
              <p className="t-subheading text-ink-soft measure-wide">
                {t(home.hero.body, lang)}
              </p>

              <div className="flex flex-wrap gap-3 mt-9">
                <Link href="#visit" className="btn btn-accent">
                  {t(home.hero.ctaPrimary, lang)}
                  <span className="btn-dot bg-sun" aria-hidden="true" />
                </Link>
                <Link href="/curriculum" className="btn btn-ghost">
                  {t(home.hero.ctaSecondary, lang)}
                  <span className="btn-dot bg-sky" aria-hidden="true" />
                </Link>
              </div>
            </div>

            {/* Margin note — set beside the copy, never stacked as a label */}
            <p data-hero-note className="flex items-start gap-2 lg:justify-self-end lg:pb-2">
              <AnnotationArrow
                className="w-9 h-7 text-teal/45 shrink-0 -scale-y-100 rtl:-scale-x-100 rtl:-scale-y-100"
              />
              <span className="annot">{t(home.hero.annotation, lang)}</span>
            </p>
          </div>
        </div>

        {/* The six friends, bare on the canvas — the art is its own container.
            Three across on a phone so the crayon work stays legible; six in a
            row once there is width for it. */}
        <div className="mt-12 md:mt-16">
          <ul className="mx-auto max-w-[1200px] px-5 md:px-8 grid grid-cols-3 sm:grid-cols-6 gap-x-4 gap-y-6 items-end">
            {content.characters.items.map((c) => (
              <li key={c.id} data-rise className="will-rise">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={c.image}
                  alt={t(c.name, lang)}
                  className="w-full h-auto object-contain"
                />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ───────── 2 · TRUST BAR ───────── */}
      <section className="pt-10 md:pt-16 px-5 md:px-8">
        <div className="mx-auto max-w-[1200px] surface-card">
          <dl className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10">
            {home.trustBar.items.map((item) => (
              <div key={item.id}>
                <dt className="sr-only">{t(item.label, lang)}</dt>
                <dd>
                  <span className="block t-h3 text-teal">{t(item.value, lang)}</span>
                  <span className="block t-small text-ink-soft mt-2 max-w-[16rem]">
                    {t(item.label, lang)}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ───────── 3 · ABOUT SNAPSHOT ───────── */}
      <section className="py-10 md:py-16 px-5 md:px-8">
        <div className="mx-auto max-w-[1200px] grid lg:grid-cols-[1fr_auto] gap-14 lg:gap-20 items-center">
          <div>
            <h2 className="t-h1 text-ink max-w-[16ch]">{t(home.about.heading, lang)}</h2>
            <p className="t-body measure-wide text-ink-soft mt-8">{t(home.about.body, lang)}</p>
            <p className="mt-9">
              <Link href="/about" className="t-subheading link-inline">
                {t(home.about.cta, lang)}
              </Link>
            </p>
          </div>

          <Drift className="hidden lg:block shrink-0" amount={30}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/motifs/tree-round.webp"
              alt=""
              aria-hidden="true"
              className="w-64 h-auto mix-blend-multiply"
            />
          </Drift>
        </div>
      </section>

      {/* ───────── 4 · PROGRAMS OVERVIEW ─────────
          An editorial list rather than four identical cards — the room name
          carries the scale, and the accent rule tells you which room. */}
      <section className="py-10 md:py-16 px-5 md:px-8">
        <div className="mx-auto max-w-[1200px]">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 className="t-h1 text-ink max-w-[14ch]">{t(home.programs.heading, lang)}</h2>
            <p className="annot annot-berry">{t(home.programs.annotation, lang)}</p>
          </div>
          <p className="t-subheading text-ink-soft mt-8 measure-wide">
            {t(home.programs.body, lang)}
          </p>

          <ul className="mt-16">
            {content.rooms.map((room) => {
              const accent = room.accent as Accent;
              return (
                <li key={room.id} className="border-t border-hairline">
                  <Link
                    href="/programs"
                    className="group grid md:grid-cols-[minmax(0,22rem)_1fr] gap-4 md:gap-10 py-8 md:py-10 items-baseline"
                  >
                    <div className="flex items-baseline gap-4">
                      <span
                        className={`w-10 h-[3px] rounded-full shrink-0 translate-y-[-0.35em] transition-all duration-300 group-hover:w-14 ${accentBg[accent]}`}
                        aria-hidden="true"
                      />
                      <span className="t-h2 text-ink transition-colors duration-300 group-hover:text-teal">
                        {t(room.name, lang)}
                      </span>
                    </div>
                    <div>
                      <span className={`block t-subheading ${accentText[accent]}`}>
                        {t(room.age, lang)}
                      </span>
                      <span className="block t-body text-ink-soft mt-2 measure">
                        {t(room.summary, lang)}
                      </span>
                      <span className="block t-small text-ink/50 mt-3">
                        {t(room.ratio, lang)}
                      </span>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="border-t border-hairline pt-10">
            <Link href="/programs" className="btn btn-ghost">
              {t(home.programs.cta, lang)}
              <span className="btn-dot bg-teal" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* ───────── 5 · CHARACTERS TEASER ─────────
          Art on bare canvas, no frames. Colour moves to the name rule. */}
      <section className="py-10 md:py-16 px-5 md:px-8">
        <div className="mx-auto max-w-[1200px]">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 className="t-h1 text-ink max-w-[14ch]">{t(home.characters.heading, lang)}</h2>
            <p className="annot annot-sky">{t(home.characters.annotation, lang)}</p>
          </div>
          <p className="t-subheading text-ink-soft mt-8 measure-wide">
            {t(home.characters.body, lang)}
          </p>

          <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-5 gap-y-12 mt-16">
            {content.characters.items.map((c) => {
              const accent = c.accent as Accent;
              return (
                <li key={c.id}>
                  <Link href="/characters" className="group block">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={c.image}
                      alt=""
                      aria-hidden="true"
                      className="w-full aspect-square object-contain transition-transform duration-500 ease-out group-hover:-translate-y-2"
                    />
                    <span className="block t-h3 text-ink mt-5">{t(c.name, lang)}</span>
                    <span
                      className={`block w-9 h-[3px] rounded-full my-3 transition-all duration-300 group-hover:w-14 ${accentBg[accent]}`}
                      aria-hidden="true"
                    />
                    <span className={`block t-small ${accentText[accent]}`}>
                      {t(c.pillar, lang)}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="mt-16">
            <Link href="/characters" className="btn btn-ghost">
              {t(home.characters.cta, lang)}
              <span className="btn-dot bg-berry" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* ───────── 6 · FOUNDATIONS ───────── */}
      <section className="py-10 md:py-16 px-5 md:px-8">
        <div className="mx-auto max-w-[1200px]">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 className="t-h1 text-ink max-w-[14ch]">{t(home.why.heading, lang)}</h2>
            <p className="annot">{t(home.why.annotation, lang)}</p>
          </div>
          <p className="t-subheading text-ink-soft mt-8 measure-wide">
            {t(home.why.body, lang)}
          </p>

          <ul className="grid md:grid-cols-2 gap-x-16 gap-y-14 mt-16">
            {home.why.items.map((item) => (
              <li key={item.id}>
                <h3 className="t-h3 text-ink">{t(item.title, lang)}</h3>
                <p className="t-body text-ink-soft mt-3 measure">{t(item.body, lang)}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ───────── 7 · GALLERY TEASER ───────── */}
      <section className="py-10 md:py-16 px-5 md:px-8">
        <div className="mx-auto max-w-[1200px] grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          <div>
            <h2 className="t-h1 text-ink max-w-[14ch]">{t(home.gallery.heading, lang)}</h2>
            <p className="t-subheading text-ink-soft mt-8 measure">
              {t(home.gallery.body, lang)}
            </p>
            <Link href="/gallery" className="btn btn-action mt-9">
              {t(home.gallery.cta, lang)}
              <span className="btn-dot bg-sun" aria-hidden="true" />
            </Link>
          </div>

          <ul className="grid grid-cols-3 gap-4 lg:gap-6">
            {['tree-pine', 'face-blue', 'tree-round'].map((m) => (
              <li key={m} className="surface-card !p-5 aspect-[3/4] grid place-items-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`/assets/motifs/${m}.webp`}
                  alt=""
                  aria-hidden="true"
                  className="w-full h-full object-contain"
                />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ───────── 8 · TESTIMONIALS ───────── */}
      <section className="py-10 md:py-16 px-5 md:px-8">
        <div className="mx-auto max-w-[1200px]">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 className="t-h1 text-ink max-w-[14ch]">
              {t(home.testimonials.heading, lang)}
            </h2>
            <p className="annot annot-berry">{t(home.testimonials.annotation, lang)}</p>
          </div>

          <ul className="grid md:grid-cols-2 gap-6 mt-16">
            {home.testimonials.items.map((item) => (
              <li key={item.id} className="surface-card">
                <blockquote>
                  <p className="t-h3 text-ink measure">{t(item.quote, lang)}</p>
                  <footer className="t-small text-ink-soft mt-7">
                    {t(item.author, lang)}
                  </footer>
                </blockquote>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ───────── 9 · SUMMER CLUB ───────── */}
      <section className="px-5 md:px-8 pb-10 md:pb-16">
        <div className="mx-auto max-w-[1200px] bg-teal text-white rounded-[50px] px-8 md:px-14 py-16 md:py-20">
          <div className="grid lg:grid-cols-[1.4fr_auto] gap-10 lg:gap-16 lg:items-end">
            <div>
              <h2 className="t-h1 max-w-[14ch]">{t(home.summer.heading, lang)}</h2>
              <p className="t-subheading text-white/80 mt-7 measure-wide">
                {t(home.summer.body, lang)}
              </p>
            </div>
            <div className="flex flex-col items-start gap-5 lg:items-end">
              <p className="annot annot-sun">{t(home.summer.annotation, lang)}</p>
              <Link href="#visit" className="btn btn-ghost">
                {t(home.summer.cta, lang)}
                <span className="btn-dot bg-sun" aria-hidden="true" />
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
    // No backend yet — wired to a handler so the success state and copy are
    // reviewable. Point this at the CRM before launch.
    setSent(true);
  };

  return (
    <section id="visit" className="pb-16 md:pb-24 px-5 md:px-8 scroll-mt-28">
      <div className="mx-auto max-w-[1200px] grid lg:grid-cols-[1fr_1.1fr] gap-14 lg:gap-20 items-start">
        {/* Reassurance */}
        <div>
          <h2 className="t-h1 text-ink max-w-[13ch]">{t(apply.heading, lang)}</h2>
          <p className="t-subheading text-ink-soft mt-8 measure">{t(apply.body, lang)}</p>

          <p className="annot mt-10">{t(apply.annotation, lang)}</p>

          <ol className="mt-8 space-y-4">
            {apply.steps.map((step) => (
              <li key={step.id} className="flex gap-4 items-baseline">
                <span
                  className="w-2 h-2 rounded-full bg-teal shrink-0 translate-y-[-0.15em]"
                  aria-hidden="true"
                />
                <span className="t-body text-ink">{t(step, lang)}</span>
              </li>
            ))}
          </ol>
        </div>

        {/* Form */}
        <div className="surface-card">
          {sent ? (
            <div className="py-12 text-center">
              <h3 className="t-h2 text-ink">{t(apply.successTitle, lang)}</h3>
              <p className="t-body text-ink-soft mt-4 measure mx-auto">
                {t(apply.successBody, lang)}
              </p>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="grid sm:grid-cols-2 gap-5">
              <Field id="childName" label={t(apply.fields.childName, lang)} required />
              <Field id="dob" label={t(apply.fields.dob, lang)} type="date" required />

              <div className="sm:col-span-2">
                <label htmlFor="room" className="block t-small font-medium text-ink mb-2">
                  {t(apply.fields.room, lang)}
                </label>
                <select id="room" name="room" required className="field" defaultValue="">
                  <option value="" disabled>
                    {t(apply.fields.roomPlaceholder, lang)}
                  </option>
                  {content.rooms.map((room) => (
                    <option key={room.id} value={room.id}>
                      {t(room.name, lang)} — {t(room.age, lang)}
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

              <button type="submit" className="btn btn-accent sm:col-span-2 mt-2">
                {t(apply.submit, lang)}
                <span className="btn-dot bg-sun" aria-hidden="true" />
              </button>
            </form>
          )}
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
      <label htmlFor={id} className="block t-small font-medium text-ink mb-2">
        {label}
      </label>
      <input id={id} name={id} type={type} required={required} dir={dir} className="field" />
    </div>
  );
}
