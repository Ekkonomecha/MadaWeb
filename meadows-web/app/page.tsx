'use client';

import React, { FormEvent, useRef, useState } from 'react';
import Link from 'next/link';
import { useLang } from '@/components/LanguageProvider';
import { content, t, type Accent, accentText, accentBg } from '@/lib/content';
import { spread, jitter } from '@/lib/scatter';
import { AnnotationArrow } from '@/components/Drawn';
import Note, { Doodle } from '@/components/Note';
import { Field, SelectField } from '@/components/Form';
import TiltWords from '@/components/TiltWords';
import { useHeroSequence, Parallax } from '@/components/Motion';

export default function HomePage() {
  const { lang, isAr } = useLang();
  const home = content.home;
  const heroRef = useRef<HTMLElement>(null);

  useHeroSequence(heroRef);

  return (
    <div>
      {/* ───────── 1 · HERO ───────── */}
      <section ref={heroRef} className="relative overflow-hidden pt-8 md:pt-16">
        {/* Drawings drifting behind the headline, each on its own depth */}
        <Parallax
          speed={0.34}
          spin={10}
          className="hidden lg:block absolute top-10 end-[4%] -z-10"
        >
          <Doodle src="/assets/motifs/tree-pine.webp" width="8rem" />
        </Parallax>
        <Parallax
          speed={0.2}
          spin={-8}
          className="hidden lg:block absolute top-[22rem] end-[18%] -z-10"
        >
          <Doodle src="/assets/characters/breeze.webp" width="7rem" />
        </Parallax>

        <div className="relative mx-auto max-w-[1200px] px-5 md:px-8">
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
                <Link href="/admissions" className="btn btn-accent">
                  {t(home.hero.ctaPrimary, lang)}
                  <span className="btn-dot bg-sun" aria-hidden="true" />
                </Link>
                <Link href="/curriculum" className="btn btn-ghost">
                  {t(home.hero.ctaSecondary, lang)}
                  <span className="btn-dot bg-sky" aria-hidden="true" />
                </Link>
              </div>
            </div>

            <p data-hero-note className="flex items-start gap-2 lg:justify-self-end lg:pb-2">
              <AnnotationArrow className="w-9 h-7 text-teal/45 shrink-0 -scale-y-100 rtl:-scale-x-100 rtl:-scale-y-100" />
              <span className="annot">{t(home.hero.annotation, lang)}</span>
            </p>
          </div>
        </div>

        {/* The six friends, bobbing on the canvas and pokeable */}
        <div className="mt-12 md:mt-16">
          <ul className="mx-auto max-w-[1200px] px-5 md:px-8 grid grid-cols-3 sm:grid-cols-6 gap-x-4 gap-y-6 items-end">
            {content.characters.items.map((c) => (
              <li
                key={c.id}
                data-rise
                className="will-rise jiggle-on-hover cursor-pointer"
              >
                <span
                  className="block bob"
                  style={
                    {
                      '--bob-delay': `${spread(c.id, 4, 'd')}s`,
                      '--bob-rot': `${jitter(c.id, 2.5, 'r')}deg`,
                    } as React.CSSProperties
                  }
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={c.image}
                    alt={t(c.name, lang)}
                    className="jiggle-target w-full h-auto object-contain sticker"
                  />
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ───────── 2 · TRUST BAR — four notes pinned in a row ───────── */}
      <section className="pt-12 md:pt-20 px-5 md:px-8">
        <ul className="mx-auto max-w-[1200px] grid grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {home.trustBar.items.map((item) => (
            <Note key={item.id} id={item.id} as="li" taped className="!p-6 md:!p-7">
              <p className="t-h3 text-ink">{t(item.value, lang)}</p>
              <p className="t-small text-ink/70 mt-2">{t(item.label, lang)}</p>
            </Note>
          ))}
        </ul>
      </section>

      {/* ───────── 3 · ABOUT SNAPSHOT ───────── */}
      <section className="relative py-14 md:py-20 px-5 md:px-8">
        <div className="mx-auto max-w-[1200px] grid lg:grid-cols-[1fr_auto] gap-14 lg:gap-20 items-center">
          <div>
            <TiltWords as="h2" text={t(home.about.heading, lang)} className="t-h1 text-ink max-w-[16ch] block" />
            <p className="t-body measure-wide text-ink-soft mt-8">{t(home.about.body, lang)}</p>
            <p className="mt-9">
              <Link href="/about" className="t-subheading link-inline">
                {t(home.about.cta, lang)}
              </Link>
            </p>
          </div>

          {/* The copy's claim is that the founders are at the gate each
              morning, so show that rather than a tree. A card like any
              other — it lifts and straightens under the pointer. */}
          <Parallax
            speed={0.22}
            spin={-4}
            className="shrink-0 w-full max-w-[21rem] lg:max-w-[24rem] justify-self-center lg:justify-self-end"
          >
            <Note id="about-snapshot" taped className="!p-2.5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/photos/morning-welcome.webp"
                alt={
                  isAr
                    ? 'معلّمة تنحني عند الباب لتستقبل طفلًا وصل حاملًا حقيبته في الصباح'
                    : 'A teacher crouching at the door to greet a child arriving with their backpack'
                }
                loading="lazy"
                className="w-full h-auto rounded-[2px]"
              />
            </Note>
          </Parallax>
        </div>
      </section>

      {/* ───────── 4 · PROGRAMS — a room per note ───────── */}
      <section className="relative py-14 md:py-20 px-5 md:px-8">
        <Parallax
          speed={0.3}
          spin={12}
          className="hidden md:block absolute top-6 end-[6%] -z-10"
        >
          <Doodle src="/assets/characters/rumble.webp" width="9rem" />
        </Parallax>

        <div className="relative mx-auto max-w-[1200px]">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <TiltWords as="h2" text={t(home.programs.heading, lang)} className="t-h1 text-ink max-w-[14ch] block" />
            <p className="annot annot-berry">{t(home.programs.annotation, lang)}</p>
          </div>
          <p className="t-subheading text-ink-soft mt-8 measure-wide">
            {t(home.programs.body, lang)}
          </p>

          <ul className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-7 mt-14">
            {content.rooms.map((room) => {
              const accent = room.accent as Accent;
              return (
                <Note key={room.id} id={room.id} as="li">
                  <Link href="/programs" className="block group">
                    <span
                      className={`block w-11 h-[4px] rounded-full mb-5 transition-all duration-300 group-hover:w-16 ${accentBg[accent]}`}
                      aria-hidden="true"
                    />
                    <span className="block t-h3 text-ink">{t(room.name, lang)}</span>
                    <span className={`block t-small font-medium mt-1 ${accentText[accent]}`}>
                      {t(room.age, lang)}
                    </span>
                    <span className="block t-small text-ink/70 mt-4">
                      {t(room.summary, lang)}
                    </span>
                    <span className="block t-small text-ink/45 mt-4">
                      {t(room.ratio, lang)}
                    </span>
                  </Link>
                </Note>
              );
            })}
          </ul>

          <div className="mt-12">
            <Link href="/programs" className="btn btn-ghost">
              {t(home.programs.cta, lang)}
              <span className="btn-dot bg-teal" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* ───────── 5 · CHARACTERS ───────── */}
      <section className="py-14 md:py-20 px-5 md:px-8">
        <div className="mx-auto max-w-[1200px]">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <TiltWords as="h2" text={t(home.characters.heading, lang)} className="t-h1 text-ink max-w-[14ch] block" />
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
                  <Link href="/characters" className="group block jiggle-on-hover">
                    <span
                      className="block bob"
                      style={
                        {
                          '--bob-delay': `${spread(c.id, 4, 'g')}s`,
                          '--bob-rot': `${jitter(c.id, 3, 'h')}deg`,
                        } as React.CSSProperties
                      }
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={c.image}
                        alt=""
                        aria-hidden="true"
                        className="jiggle-target w-full aspect-square object-contain sticker"
                      />
                    </span>
                    <span className="block t-h3 text-ink mt-5">{t(c.name, lang)}</span>
                    <span
                      className={`block w-9 h-[4px] rounded-full my-3 transition-all duration-300 group-hover:w-16 ${accentBg[accent]}`}
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

          <div className="mt-14">
            <Link href="/characters" className="btn btn-ghost">
              {t(home.characters.cta, lang)}
              <span className="btn-dot bg-berry" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* ───────── 6 · FOUNDATIONS — four notes ───────── */}
      <section className="relative py-14 md:py-20 px-5 md:px-8">
        <Parallax
          speed={0.24}
          spin={-14}
          className="hidden md:block absolute bottom-10 start-[3%] -z-10"
        >
          <Doodle src="/assets/characters/comet.webp" width="8rem" />
        </Parallax>

        <div className="relative mx-auto max-w-[1200px]">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <TiltWords as="h2" text={t(home.why.heading, lang)} className="t-h1 text-ink max-w-[14ch] block" />
            <p className="annot">{t(home.why.annotation, lang)}</p>
          </div>
          <p className="t-subheading text-ink-soft mt-8 measure-wide">
            {t(home.why.body, lang)}
          </p>

          <ul className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-7 mt-14">
            {home.why.items.map((item) => (
              <Note key={item.id} id={item.id} as="li" live={false}>
                <h3 className="t-h3 text-ink">{t(item.title, lang)}</h3>
                <p className="t-small text-ink/70 mt-3">{t(item.body, lang)}</p>
              </Note>
            ))}
          </ul>
        </div>
      </section>

      {/* ───────── 7 · GALLERY ───────── */}
      <section className="py-14 md:py-20 px-5 md:px-8">
        <div className="mx-auto max-w-[1200px] grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          <div>
            <TiltWords as="h2" text={t(home.gallery.heading, lang)} className="t-h1 text-ink max-w-[14ch] block" />
            <p className="t-subheading text-ink-soft mt-8 measure">
              {t(home.gallery.body, lang)}
            </p>
            <Link href="/gallery" className="btn btn-action mt-9">
              {t(home.gallery.cta, lang)}
              <span className="btn-dot bg-sun" aria-hidden="true" />
            </Link>
          </div>

          {/* The first three gallery images, pinned up as prints. Read from
              content.json so this stays in step with the gallery page. */}
          <ul className="grid grid-cols-3 gap-4 lg:gap-5">
            {content.pages.gallery.items.slice(0, 3).map((item) => (
              <Note key={item.id} id={item.id} as="li" taped className="!p-2 aspect-[3/4]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.src}
                  alt={t(item.alt, lang)}
                  loading="lazy"
                  className="w-full h-full object-cover rounded-[2px]"
                />
              </Note>
            ))}
          </ul>
        </div>
      </section>

      {/* ───────── 8 · TESTIMONIALS — two big notes ───────── */}
      <section className="py-14 md:py-20 px-5 md:px-8">
        <div className="mx-auto max-w-[1200px]">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <TiltWords
              as="h2"
              text={t(home.testimonials.heading, lang)}
              className="t-h1 text-ink max-w-[14ch] block"
            />
            <p className="annot annot-berry">{t(home.testimonials.annotation, lang)}</p>
          </div>

          <ul className="grid md:grid-cols-2 gap-7 md:gap-8 mt-16">
            {home.testimonials.items.map((item) => (
              <Note key={item.id} id={item.id} as="li" taped className="md:!p-10">
                <blockquote>
                  <p className="t-h3 text-ink measure">{t(item.quote, lang)}</p>
                  <footer className="t-small text-ink/65 mt-7">
                    {t(item.author, lang)}
                  </footer>
                </blockquote>
              </Note>
            ))}
          </ul>
        </div>
      </section>

      {/* ───────── 9 · SUMMER CLUB ───────── */}
      <section className="relative px-5 md:px-8 py-14 md:py-20">
        <div className="relative mx-auto max-w-[1200px] bg-teal text-white rounded-[50px] px-8 md:px-14 py-16 md:py-20 overflow-hidden">
          <Parallax
            speed={0.22}
            spin={16}
            className="hidden md:block absolute -bottom-6 end-8 opacity-90"
          >
            <Doodle src="/assets/characters/pip.webp" width="11rem" />
          </Parallax>

          <div className="relative grid lg:grid-cols-[1.4fr_auto] gap-10 lg:gap-16 lg:items-end">
            <div>
              <TiltWords as="h2" text={t(home.summer.heading, lang)} className="t-h1 max-w-[14ch] block" />
              <p className="t-subheading text-white/80 mt-7 measure-wide">
                {t(home.summer.body, lang)}
              </p>
            </div>
            <div className="flex flex-col items-start gap-5 lg:items-end">
              <p className="annot annot-sun">{t(home.summer.annotation, lang)}</p>
              <Link href="/admissions" className="btn btn-ghost">
                {t(home.summer.cta, lang)}
                <span className="btn-dot bg-sun" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ───────── 10 · REQUEST A VISIT ───────── */}
      <VisitSection />
    </div>
  );
}

/* ══════════════════ Visit request ══════════════════ */

function VisitSection() {
  const { lang } = useLang();
  const apply = content.home.apply;
  const [sent, setSent] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // No backend yet — wired so the success state and copy are reviewable.
    setSent(true);
  };

  return (
    <section id="visit" className="relative pb-24 md:pb-32 pt-4 px-5 md:px-8 scroll-mt-28">
      <Parallax
        speed={0.28}
        spin={-10}
        className="hidden lg:block absolute top-20 start-[2%] -z-10"
      >
        <Doodle src="/assets/characters/juniper.webp" width="8rem" />
      </Parallax>

      <div className="relative mx-auto max-w-[1200px] grid lg:grid-cols-[1fr_1.1fr] gap-14 lg:gap-20 items-start">
        <div>
          <TiltWords as="h2" text={t(apply.heading, lang)} className="t-h1 text-ink max-w-[13ch] block" />
          <p className="t-subheading text-ink-soft mt-8 measure">{t(apply.body, lang)}</p>

          <p className="annot mt-10">{t(apply.annotation, lang)}</p>

          <ol className="mt-8 space-y-4">
            {apply.steps.map((step) => (
              <li key={step.id} className="flex gap-4 items-baseline">
                <span
                  className="w-2.5 h-2.5 rounded-full bg-teal shrink-0 translate-y-[-0.1em]"
                  aria-hidden="true"
                />
                <span className="t-body text-ink">{t(step, lang)}</span>
              </li>
            ))}
          </ol>

          {/* The visit request asks for three things. Anyone past that point
              wants the application, so say where it is. */}
          <p className="t-body text-ink-soft mt-9">
            <Link href="/admissions" className="link-inline">
              {t(apply.applyLink, lang)}
            </Link>
          </p>
        </div>

        <Note id="visit-form" tint="sticky-sun" live={false} taped className="md:!p-10">
          {sent ? (
            <div className="py-12 text-center">
              <h3 className="t-h2 text-ink">{t(apply.successTitle, lang)}</h3>
              <p className="t-body text-ink/75 mt-4 measure mx-auto">
                {t(apply.successBody, lang)}
              </p>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="grid sm:grid-cols-2 gap-5">
              <Field id="childName" label={t(apply.fields.childName, lang)} required />
              <Field id="dob" label={t(apply.fields.dob, lang)} type="date" required />

              <div className="sm:col-span-2">
                <SelectField
                  id="room"
                  label={t(apply.fields.room, lang)}
                  placeholder={t(apply.fields.roomPlaceholder, lang)}
                  options={content.rooms.map((room) => ({
                    value: room.id,
                    label: `${t(room.name, lang)} — ${t(room.age, lang)}`,
                  }))}
                  required
                />
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
        </Note>
      </div>
    </section>
  );
}
