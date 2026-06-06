'use client';
import { useLanguage } from './LanguageProvider';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Instagram, Facebook, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function Header() {
  const { lang, setLang } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { href: '/', en: 'Home', ar: 'الرئيسية' },
    { href: '/about', en: 'About Us', ar: 'من نحن' },
    { href: '/programs', en: 'Programs', ar: 'برامجنا' },
    { href: '/curriculum', en: 'Curriculum', ar: 'المنهج الدراسي' },
    { href: '/characters', en: 'Characters', ar: 'شخصياتنا' },
    { href: '/gallery', en: 'Gallery', ar: 'معرض الصور' },
  ];

  const isAr = lang === 'ar';

  return (
    <>
      {/* Top utility bar */}
      <div className="bg-brand-darkblue h-10 flex items-center justify-between px-6 z-[1010] relative text-white">
        <div className="flex gap-1.5">
          <button
            onClick={() => setLang('en')}
            className={`px-3 py-0.5 text-xs rounded-full transition-colors ${lang === 'en' ? 'bg-brand-yellow text-brand-darkblue font-bold' : 'text-white/70 hover:text-white'}`}
          >
            EN
          </button>
          <button
            onClick={() => setLang('ar')}
            className={`px-3 py-0.5 text-xs rounded-full font-cairo transition-colors ${lang === 'ar' ? 'bg-brand-yellow text-brand-darkblue font-bold' : 'text-white/70 hover:text-white'}`}
          >
            عربي
          </button>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-white/50 font-outfit">
          {isAr ? 'حضانة دولية متميزة' : 'Premium International Preschool'}
        </div>
        <div className="flex gap-3">
          <a href="#" aria-label="Instagram" className="text-white/70 hover:text-brand-yellow transition-colors"><Instagram size={15} /></a>
          <a href="#" aria-label="Facebook" className="text-white/70 hover:text-brand-yellow transition-colors"><Facebook size={15} /></a>
        </div>
      </div>

      {/* Floating glass header */}
      <header className="sticky top-0 z-[1000] px-3 md:px-6 pt-3">
        <motion.div
          initial={false}
          animate={{
            paddingTop: scrolled ? 8 : 14,
            paddingBottom: scrolled ? 8 : 14,
          }}
          className={`max-w-7xl mx-auto rounded-[26px] px-5 md:px-7 flex items-center justify-between transition-shadow duration-500 ${
            scrolled ? 'glass shadow-soft' : 'bg-white/55 backdrop-blur-md border border-white/40'
          }`}
          dir={isAr ? 'rtl' : 'ltr'}
        >
          <div className="flex items-center gap-8 md:gap-12">
            <Link
              href="/"
              className="group inline-flex items-center"
              onClick={() => setMobileMenuOpen(false)}
            >
              <img
                src="/assets/logo/mada-logo.svg"
                alt="mada by saja"
                className="h-11 md:h-12 w-auto group-hover:scale-105 transition-transform origin-left"
              />
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-7">
              {links.map((link) => {
                const active = pathname === link.href;
                return (
                  <Link
                    key={link.en}
                    href={link.href}
                    className={`relative text-sm font-semibold transition-colors group ${
                      active ? 'text-brand-pink' : 'text-brand-darkblue/80 hover:text-brand-darkblue'
                    } ${isAr ? 'font-cairo' : 'font-outfit'}`}
                  >
                    {isAr ? link.ar : link.en}
                    <span
                      className={`absolute -bottom-1.5 left-0 h-[2px] rounded-full bg-brand-pink transition-all duration-300 ${
                        active ? 'w-full' : 'w-0 group-hover:w-full'
                      }`}
                    />
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="hidden lg:block">
            <Link
              href="/#apply-form"
              className={`bg-brand-darkblue text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-brand-pink hover:scale-105 transition-all shadow-md ${isAr ? 'font-cairo' : 'font-outfit'}`}
            >
              {isAr ? 'اتصل بنا' : 'Contact Us'}
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden text-brand-darkblue p-1"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </motion.div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
              className="lg:hidden max-w-7xl mx-auto mt-3 glass rounded-[26px] p-6 flex flex-col gap-1 shadow-luxe"
              dir={isAr ? 'rtl' : 'ltr'}
            >
              {links.map((link) => (
                <Link
                  key={link.en}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`font-bold text-brand-darkblue text-lg py-2.5 px-3 rounded-xl hover:bg-white/60 transition-colors ${isAr ? 'font-cairo' : 'font-outfit'}`}
                >
                  {isAr ? link.ar : link.en}
                </Link>
              ))}
              <Link
                href="/#apply-form"
                onClick={() => setMobileMenuOpen(false)}
                className={`bg-brand-pink text-white text-center px-6 py-3 rounded-full font-bold mt-3 ${isAr ? 'font-cairo' : 'font-outfit'}`}
              >
                {isAr ? 'اتصل بنا' : 'Contact Us'}
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
