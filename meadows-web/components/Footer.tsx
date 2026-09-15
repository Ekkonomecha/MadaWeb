'use client';

import React from 'react';
import Link from 'next/link';
import { useLang } from './LanguageProvider';
import { content, t } from '@/lib/content';

/**
 * Footer accent band.
 *
 * The reference closes the page on a solid vivid yellow that contrasts sharply
 * with the canvas above. Meadows' own sun yellow carries it, with ink text —
 * secondary copy is tinted from the foreground rather than dropped to grey.
 */
export default function Footer() {
  const { lang } = useLang();
  const { footer, nav, global } = content;

  return (
    <footer className="bg-sun text-ink">
      <div className="mx-auto max-w-[1200px] px-5 md:px-8 pt-20 pb-12 md:pt-28 md:pb-16">
        <div className="grid gap-14 lg:grid-cols-[1.5fr_1fr_1.2fr]">
          {/* Identity */}
          <div>
            <Link href="/" className="inline-block mb-6" aria-label={t(global.logoAlt, lang)}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/logo/meadows-logo.webp"
                alt={t(global.logoAlt, lang)}
                className="h-10 md:h-12 w-auto"
              />
            </Link>
            <p className="t-body measure text-ink/80">{t(footer.tagline, lang)}</p>
            <p className="annot annot-ink mt-7">{t(global.branchNote, lang)}</p>
          </div>

          {/* Explore */}
          <nav aria-label="Footer">
            <h2 className="t-small font-medium text-ink/60 mb-5">
              {t(footer.exploreHeading, lang)}
            </h2>
            <ul className="space-y-3">
              {nav.links.map((link) => (
                <li key={link.id}>
                  <Link
                    href={link.href}
                    className="t-subheading text-ink hover:text-teal transition-colors"
                  >
                    {t(link, lang)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Visit */}
          <div>
            <h2 className="t-small font-medium text-ink/60 mb-5">
              {t(footer.visitHeading, lang)}
            </h2>
            <address className="not-italic space-y-3 t-subheading">
              <p className="text-ink/80">{t(global.address, lang)}</p>
              <p>
                <a href={`tel:${global.phoneHref}`} dir="ltr" className="link-inline">
                  {global.phone}
                </a>
              </p>
              <p>
                <a href={`mailto:${global.email}`} className="link-inline">
                  {global.email}
                </a>
              </p>
            </address>

            <a
              href={`https://wa.me/${global.whatsappHref}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost mt-7"
            >
              {t(footer.whatsappLabel, lang)}
              <span className="btn-dot bg-whatsapp" aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="mt-16 pt-6 border-t border-ink/15 flex flex-col sm:flex-row gap-3 justify-between t-small text-ink/70">
          <p>{t(global.copyright, lang)}</p>
          <p>{t(global.socialHandle, lang)}</p>
        </div>
      </div>
    </footer>
  );
}
