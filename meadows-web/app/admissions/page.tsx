'use client';

import React, { FormEvent, useRef, useState } from 'react';
import { useLang } from '@/components/LanguageProvider';
import { content, t } from '@/lib/content';
import PageHero from '@/components/PageHero';
import Note, { Doodle } from '@/components/Note';
import { Parallax, useCardReveal } from '@/components/Motion';
import { Field, SelectField, TextField, FieldSet } from '@/components/Form';

/**
 * The admission form — where every "Join Meadows" button on the site lands.
 *
 * Longer than the visit request on the home page, and deliberately so: this is
 * the application, and a parent filling it in has already decided to be taken
 * seriously. It asks nothing the school would not ask on the first call.
 *
 * Nothing is submitted anywhere yet. The success state is real, the delivery is
 * not — content.json carries that as a note against the launch checklist.
 */
export default function AdmissionsPage() {
  const { lang } = useLang();
  const page = content.pages.admissions;
  const global = content.global;
  const [sent, setSent] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useCardReveal(ref);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // No backend yet — wired so the success state and the copy are reviewable.
    setSent(true);
  };

  return (
    <div ref={ref}>
      <PageHero
        annotation={t(page.annotation, lang)}
        heading={t(page.heading, lang)}
        intro={t(page.intro, lang)}
      />

      <section className="relative pb-16 md:pb-24 px-5 md:px-8">
        <Parallax
          speed={0.24}
          spin={-8}
          className="hidden xl:block absolute top-32 start-[1.5%] -z-10"
        >
          <Doodle src="/assets/characters/pip.webp" width="8rem" />
        </Parallax>

        <div className="relative mx-auto max-w-[1200px] grid lg:grid-cols-[minmax(0,20rem)_1fr] gap-12 lg:gap-16 items-start">
          {/* What happens after you press send */}
          <div className="lg:sticky lg:top-28">
            <h2 className="t-h2 text-ink">{t(page.stepsHeading, lang)}</h2>
            <ol className="mt-7 space-y-4">
              {page.steps.map((step, i) => (
                <li key={step.id} className="flex gap-4 items-baseline">
                  <span className="t-small font-medium text-teal shrink-0" aria-hidden="true">
                    {i + 1}.
                  </span>
                  <span className="t-body text-ink">{t(step, lang)}</span>
                </li>
              ))}
            </ol>

            <div className="mt-10 pt-8 border-t border-hairline">
              <h3 className="t-h3 text-ink">{t(page.helpHeading, lang)}</h3>
              <p className="t-body text-ink-soft mt-3 measure">{t(page.helpBody, lang)}</p>
              <a
                href={`https://wa.me/${global.whatsappHref}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost mt-6"
              >
                {t(content.footer.whatsappLabel, lang)}
                <span className="btn-dot bg-grass" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* The application itself */}
          <Note id="admission-form" tint="sticky-sun" live={false} taped className="md:!p-10 lg:!p-12">
            {sent ? (
              <div className="py-16 text-center">
                <h2 className="t-h2 text-ink">{t(page.successTitle, lang)}</h2>
                <p className="t-body text-ink/75 mt-4 measure mx-auto">
                  {t(page.successBody, lang)}
                </p>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-10">
                <FieldSet legend={t(page.sections.child, lang)}>
                  <Field
                    id="childName"
                    label={t(page.fields.childName, lang)}
                    autoComplete="off"
                    required
                  />
                  <Field id="dob" label={t(page.fields.dob, lang)} type="date" required />
                  <SelectField
                    id="room"
                    label={t(page.fields.room, lang)}
                    placeholder={t(page.fields.roomPlaceholder, lang)}
                    options={content.rooms.map((room) => ({
                      value: room.id,
                      label: `${t(room.name, lang)} — ${t(room.age, lang)}`,
                    }))}
                    required
                  />
                  <Field
                    id="startDate"
                    label={t(page.fields.startDate, lang)}
                    type="month"
                    required
                  />
                  <div className="sm:col-span-2">
                    <Field id="homeLanguage" label={t(page.fields.homeLanguage, lang)} />
                  </div>
                </FieldSet>

                <FieldSet legend={t(page.sections.family, lang)}>
                  <Field
                    id="parentName"
                    label={t(page.fields.parentName, lang)}
                    autoComplete="name"
                    required
                  />
                  <SelectField
                    id="relationship"
                    label={t(page.fields.relationship, lang)}
                    placeholder={t(page.fields.relationshipPlaceholder, lang)}
                    options={page.relationships.map((option) => ({
                      value: option.id,
                      label: t(option, lang),
                    }))}
                    required
                  />
                  <Field
                    id="whatsapp"
                    label={t(page.fields.whatsapp, lang)}
                    type="tel"
                    dir="ltr"
                    autoComplete="tel"
                    required
                  />
                  <Field
                    id="email"
                    label={t(page.fields.email, lang)}
                    type="email"
                    dir="ltr"
                    autoComplete="email"
                    required
                  />
                </FieldSet>

                <FieldSet legend={t(page.sections.extra, lang)}>
                  <div className="sm:col-span-2">
                    <SelectField
                      id="hearAbout"
                      label={t(page.fields.hearAbout, lang)}
                      placeholder={t(page.fields.hearAboutPlaceholder, lang)}
                      options={page.hearAboutOptions.map((option) => ({
                        value: option.id,
                        label: t(option, lang),
                      }))}
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <TextField id="notes" label={t(page.fields.notes, lang)} rows={4} />
                  </div>
                </FieldSet>

                {/* Consent, asked plainly rather than buried under the button. */}
                <label className="flex gap-3 items-start cursor-pointer">
                  <input
                    type="checkbox"
                    name="consent"
                    required
                    className="mt-1 w-4 h-4 accent-[var(--color-teal)] shrink-0"
                  />
                  <span className="t-small text-ink/75">{t(page.consent, lang)}</span>
                </label>

                <button type="submit" className="btn btn-accent w-full sm:w-auto">
                  {t(page.submit, lang)}
                  <span className="btn-dot bg-sun" aria-hidden="true" />
                </button>
              </form>
            )}
          </Note>
        </div>
      </section>
    </div>
  );
}
