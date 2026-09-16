'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLenis } from 'lenis/react';
import { useLang } from './LanguageProvider';
import { content, t } from '@/lib/content';

/**
 * Floating pill navigation.
 *
 * The reference's defining chrome: a single white pill at 50px radius sitting
 * on the paper canvas with generous margin, rather than a rectangular header
 * band. Its elevation is the white-on-paper colour step — no shadow.
 */
export default function Header() {
  const { lang, setLang, isAr } = useLang();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const { nav, global } = content;

  const lenis = useLenis();

  /*
   * Lock the page behind the mobile sheet. Lenis owns the scroll position, so
   * `overflow: hidden` on the body no longer stops it — the instance has to be
   * told to stop. The overflow is still set for the case where Lenis was
   * destroyed for reduced motion and the browser is scrolling natively.
   */
  useEffect(() => {
    if (open) {
      lenis?.stop();
      document.body.style.overflow = 'hidden';
    } else {
      lenis?.start();
      document.body.style.overflow = '';
    }
    return () => {
      lenis?.start();
      document.body.style.overflow = '';
    };
  }, [open, lenis]);

  return (
    <>
      {/* The opening announcement, quiet on the canvas above the pill. */}
      <p className="t-small pt-5 px-5 flex flex-wrap justify-center gap-x-6 gap-y-0.5 text-ink-soft">
        <span className="font-medium text-ink">{t(global.openingBadge, lang)}</span>
        <span>{t(global.address, lang)}</span>
      </p>

      <header className="sticky top-0 z-50 pt-4 pb-3 px-4 md:px-6">
        <div className="mx-auto max-w-[1200px]">
          <div className="bg-chalk rounded-[50px] px-4 md:px-6 h-16 md:h-[4.5rem] flex items-center justify-between gap-4">
            {/* Wordmark */}
            <Link
              href="/"
              className="shrink-0 ps-1 md:ps-2"
              aria-label={t(global.logoAlt, lang)}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/logo/meadows-logo.webp"
                alt={t(global.logoAlt, lang)}
                className="h-7 md:h-8 w-auto"
              />
            </Link>

            {/* Desktop navigation */}
            <nav className="hidden lg:flex items-center" aria-label="Main">
              {nav.links.map((link) => {
                const active = pathname === link.href;
                return (
                  <Link
                    key={link.id}
                    href={link.href}
                    aria-current={active ? 'page' : undefined}
                    className={`px-[17px] py-2 t-small transition-colors ${
                      active
                        ? 'text-teal font-medium'
                        : 'text-ink/75 hover:text-ink'
                    }`}
                  >
                    {t(link, lang)}
                  </Link>
                );
              })}
            </nav>

            <div className="flex items-center gap-2 md:gap-3">
              {/* Language */}
              <button
                type="button"
                onClick={() => setLang(isAr ? 'en' : 'ar')}
                className="px-3 py-1.5 t-small font-medium text-ink/70 hover:text-teal transition-colors"
                aria-label={isAr ? 'Switch to English' : 'التبديل إلى العربية'}
              >
                {isAr ? 'EN' : 'عربي'}
              </button>

              {/* Menu toggle — the reference's circular accent button */}
              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                className="lg:hidden w-10 h-10 rounded-full bg-teal text-white grid place-items-center shrink-0"
                aria-expanded={open}
                aria-controls="mobile-nav"
                aria-label={open ? t(nav.closeLabel, lang) : t(nav.menuLabel, lang)}
              >
                <span className="relative block w-4 h-3.5" aria-hidden="true">
                  <span
                    className={`absolute inset-x-0 h-[2px] bg-current rounded-full transition-all duration-300 ${
                      open ? 'top-1.5 rotate-45' : 'top-0'
                    }`}
                  />
                  <span
                    className={`absolute inset-x-0 top-1.5 h-[2px] bg-current rounded-full transition-opacity duration-200 ${
                      open ? 'opacity-0' : 'opacity-100'
                    }`}
                  />
                  <span
                    className={`absolute inset-x-0 h-[2px] bg-current rounded-full transition-all duration-300 ${
                      open ? 'top-1.5 -rotate-45' : 'top-3'
                    }`}
                  />
                </span>
              </button>

              {/* CTA — ghost pill carrying a single chromatic dot */}
              <Link
                href="/admissions"
                className="btn btn-ghost hidden sm:inline-flex bg-paper hover:bg-paper-deep"
              >
                {t(nav.cta, lang)}
                <span className="btn-dot bg-sky" aria-hidden="true" />
              </Link>
            </div>
          </div>

          {/* Mobile sheet — a second pill beneath the nav, not a dropdown panel */}
          <div
            id="mobile-nav"
            hidden={!open}
            className="lg:hidden mt-3 bg-chalk rounded-[32px] p-3"
          >
            <nav className="flex flex-col" aria-label="Main">
              {nav.links.map((link) => (
                <Link
                  key={link.id}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`px-4 py-3 rounded-[24px] t-subheading transition-colors ${
                    pathname === link.href
                      ? 'text-teal bg-paper'
                      : 'text-ink hover:bg-paper'
                  }`}
                >
                  {t(link, lang)}
                </Link>
              ))}
              <Link
                href="/admissions"
                onClick={() => setOpen(false)}
                className="btn btn-accent mt-2 w-full"
              >
                {t(nav.cta, lang)}
                <span className="btn-dot bg-sun" aria-hidden="true" />
              </Link>
            </nav>
          </div>
        </div>
      </header>
    </>
  );
}
