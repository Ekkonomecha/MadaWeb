'use client';

import React from 'react';
import Link from 'next/link';
import { useLang } from './LanguageProvider';
import { content, t } from '@/lib/content';
import { Squiggle } from './Drawn';

export default function Footer() {
  const { lang } = useLang();
  const { footer, nav, global } = content;

  return (
    <footer className="relative bg-teal-deep text-white/85 overflow-hidden paper-grain">
      {/* Drawn seam between the page and the footer */}
      <Squiggle
        className="absolute -top-2 left-0 w-[160%] md:w-full h-5 text-paper"
        strokeWidth={4}
      />

      <div className="relative mx-auto max-w-[1180px] px-5 md:px-8 pt-20 pb-10">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1.2fr]">
          {/* Identity */}
          <div>
            <Link href="/" className="inline-block mb-5" aria-label={t(global.logoAlt, lang)}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/logo/meadows-logo-white.webp"
                alt={t(global.logoAlt, lang)}
                className="h-10 w-auto"
              />
            </Link>
            <p className="t-body measure text-white/72">{t(footer.tagline, lang)}</p>
            <p className="annot annot-sun mt-6">{t(global.branchNote, lang)}</p>
          </div>

          {/* Explore */}
          <nav aria-label="Footer">
            <h2 className="t-h3 text-white mb-4">{t(footer.exploreHeading, lang)}</h2>
            <ul className="space-y-2.5">
              {nav.links.map((link) => (
                <li key={link.id}>
                  <Link
                    href={link.href}
                    className="t-body text-white/72 hover:text-white transition-colors"
                  >
                    {t(link, lang)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Visit */}
          <div>
            <h2 className="t-h3 text-white mb-4">{t(footer.visitHeading, lang)}</h2>
            <address className="not-italic space-y-2.5 t-body text-white/72">
              <p>{t(global.address, lang)}</p>
              <p>
                <a
                  href={`tel:${global.phoneHref}`}
                  dir="ltr"
                  className="hover:text-white transition-colors"
                >
                  {global.phone}
                </a>
              </p>
              <p>
                <a
                  href={`mailto:${global.email}`}
                  className="hover:text-white transition-colors"
                >
                  {global.email}
                </a>
              </p>
            </address>

            <a
              href={`https://wa.me/${global.whatsappHref}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-sun mt-6"
            >
              {t(footer.whatsappLabel, lang)}
            </a>
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-white/12 flex flex-col sm:flex-row gap-3 justify-between t-small text-white/55">
          <p>{t(global.copyright, lang)}</p>
          <p>{t(global.socialHandle, lang)}</p>
        </div>
      </div>
    </footer>
  );
}
