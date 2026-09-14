'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLang } from './LanguageProvider';
import { content, t } from '@/lib/content';

export default function Header() {
  const { lang, setLang, isAr } = useLang();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const { nav, global } = content;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock the page behind the mobile sheet
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      {/* Announcement strip — the brand's actual moment, not a decorative tagline */}
      <div className="bg-teal text-white text-center py-2 px-4">
        <p className="t-small font-medium tracking-wide">
          {t(global.openingBadge, lang)}
          <span className="mx-2 opacity-40">·</span>
          <span className="opacity-85">{t(global.address, lang)}</span>
        </p>
      </div>

      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-paper/92 backdrop-blur-md shadow-[0_1px_0_rgba(11,61,51,0.08)]'
            : 'bg-paper'
        }`}
      >
        <div className="mx-auto max-w-[1180px] px-5 md:px-8">
          <div
            className={`flex items-center justify-between gap-6 transition-all duration-300 ${
              scrolled ? 'h-16' : 'h-20 md:h-24'
            }`}
          >
            {/* Wordmark */}
            <Link href="/" className="shrink-0" aria-label={t(global.logoAlt, lang)}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/logo/meadows-logo.webp"
                alt={t(global.logoAlt, lang)}
                className={`w-auto transition-all duration-300 ${scrolled ? 'h-7' : 'h-9 md:h-11'}`}
              />
            </Link>

            {/* Desktop navigation */}
            <nav className="hidden lg:flex items-center gap-1" aria-label="Main">
              {nav.links.map((link) => {
                const active = pathname === link.href;
                return (
                  <Link
                    key={link.id}
                    href={link.href}
                    aria-current={active ? 'page' : undefined}
                    className={`relative px-3.5 py-2 t-small font-medium rounded-full transition-colors ${
                      active ? 'text-teal' : 'text-ink/72 hover:text-ink'
                    }`}
                  >
                    {t(link, lang)}
                    {active && (
                      <span
                        aria-hidden="true"
                        className="absolute left-3.5 right-3.5 -bottom-0.5 h-[2.5px] rounded-full bg-teal"
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            <div className="flex items-center gap-2 md:gap-3">
              {/* Language */}
              <button
                type="button"
                onClick={() => setLang(isAr ? 'en' : 'ar')}
                className="px-3 py-1.5 t-small font-semibold rounded-full text-ink/70 hover:text-teal hover:bg-teal/8 transition-colors"
                aria-label={isAr ? 'Switch to English' : 'التبديل إلى العربية'}
              >
                {isAr ? 'EN' : 'عربي'}
              </button>

              <Link href="/#visit" className="btn btn-primary hidden sm:inline-flex">
                {t(nav.cta, lang)}
              </Link>

              {/* Mobile trigger */}
              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                className="lg:hidden w-10 h-10 grid place-items-center rounded-full hover:bg-teal/8 transition-colors"
                aria-expanded={open}
                aria-controls="mobile-nav"
                aria-label={open ? t(nav.closeLabel, lang) : t(nav.menuLabel, lang)}
              >
                <span className="relative block w-5 h-4" aria-hidden="true">
                  <span
                    className={`absolute inset-x-0 h-[2.5px] bg-ink rounded-full transition-all duration-300 ${
                      open ? 'top-[7px] rotate-45' : 'top-0'
                    }`}
                  />
                  <span
                    className={`absolute inset-x-0 top-[7px] h-[2.5px] bg-ink rounded-full transition-all duration-200 ${
                      open ? 'opacity-0' : 'opacity-100'
                    }`}
                  />
                  <span
                    className={`absolute inset-x-0 h-[2.5px] bg-ink rounded-full transition-all duration-300 ${
                      open ? 'top-[7px] -rotate-45' : 'top-[14px]'
                    }`}
                  />
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile sheet */}
        <div
          id="mobile-nav"
          hidden={!open}
          className="lg:hidden border-t border-ink/8 bg-paper"
        >
          <nav className="px-5 py-4 flex flex-col" aria-label="Main">
            {/* Closing on click keeps the sheet in step with navigation without
                an effect that sets state on every route change. */}
            {nav.links.map((link) => (
              <Link
                key={link.id}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`py-3 text-lg font-medium border-b border-ink/6 last:border-0 ${
                  pathname === link.href ? 'text-teal' : 'text-ink'
                }`}
              >
                {t(link, lang)}
              </Link>
            ))}
            <Link
              href="/#visit"
              onClick={() => setOpen(false)}
              className="btn btn-primary mt-5 w-full"
            >
              {t(nav.cta, lang)}
            </Link>
          </nav>
        </div>
      </header>
    </>
  );
}
