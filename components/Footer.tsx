'use client';
import { useLanguage } from './LanguageProvider';
import { Instagram, Facebook, MapPin, Phone, Mail } from 'lucide-react';
import Link from 'next/link';
import { Reveal } from './Motion';

export default function Footer() {
  const { lang } = useLanguage();
  const isAr = lang === 'ar';

  const links = [
    { href: '/about', en: 'About Us', ar: 'من نحن' },
    { href: '/programs', en: 'Programs', ar: 'برامجنا' },
    { href: '/curriculum', en: 'Curriculum', ar: 'المنهج' },
    { href: '/characters', en: 'Characters', ar: 'شخصياتنا' },
    { href: '/gallery', en: 'Gallery', ar: 'المعرض' },
  ];

  return (
    <footer className="mesh-ink grain relative overflow-hidden text-white">
      <div className="absolute -top-24 -left-24 w-[420px] h-[420px] bg-brand-purple/30 blob-1 animate-morph -z-0" />
      <div className="absolute -bottom-32 -right-20 w-[360px] h-[360px] bg-brand-blue/30 blob-3 animate-float -z-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-10">
        <Reveal className="grid md:grid-cols-12 gap-12 mb-16" direction="up">
          {/* Brand */}
          <div className="md:col-span-5">
            <Link href="/" className="inline-block mb-6">
              <img src="/assets/logo/mada-logo-light.svg" alt="mada by saja" className="h-16 w-auto" />
            </Link>
            <p className={`text-white/60 leading-relaxed max-w-sm mb-8 ${isAr ? 'font-cairo' : 'font-outfit'}`}>
              {isAr
                ? 'حضانة دولية متميزة حيث يزدهر كل طفل في بيئة حاضنة وآمنة وثنائية اللغة.'
                : 'A premium international preschool where every child blooms in a nurturing, safe, bilingual environment.'}
            </p>
            <div className="flex gap-3">
              <a href="#" aria-label="Instagram" className="glass-dark w-11 h-11 rounded-full flex items-center justify-center hover:bg-brand-yellow hover:text-brand-darkblue transition-colors">
                <Instagram size={18} />
              </a>
              <a href="#" aria-label="Facebook" className="glass-dark w-11 h-11 rounded-full flex items-center justify-center hover:bg-brand-yellow hover:text-brand-darkblue transition-colors">
                <Facebook size={18} />
              </a>
            </div>
          </div>

          {/* Explore */}
          <div className="md:col-span-3">
            <h4 className={`text-brand-cyan text-xs tracking-[0.25em] uppercase mb-5 ${isAr ? 'font-cairo' : 'font-outfit'}`}>
              {isAr ? 'استكشف' : 'Explore'}
            </h4>
            <ul className="space-y-3">
              {links.map((l) => (
                <li key={l.en}>
                  <Link href={l.href} className={`text-white/70 hover:text-white transition-colors ${isAr ? 'font-cairo' : 'font-outfit'}`}>
                    {isAr ? l.ar : l.en}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-4">
            <h4 className={`text-brand-cyan text-xs tracking-[0.25em] uppercase mb-5 ${isAr ? 'font-cairo' : 'font-outfit'}`}>
              {isAr ? 'تواصل معنا' : 'Get in touch'}
            </h4>
            <ul className="space-y-4 text-white/70">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-brand-yellow mt-0.5 shrink-0" />
                <span className={isAr ? 'font-cairo' : 'font-outfit'}>
                  {isAr ? 'القاهرة الجديدة، مصر' : 'New Cairo, Egypt'}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-brand-yellow shrink-0" />
                <a href="tel:+201000000000" className="hover:text-white transition-colors font-outfit" dir="ltr">+20 100 000 0000</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-brand-yellow shrink-0" />
                <a href="mailto:hello@mada.academy" className="hover:text-white transition-colors font-outfit">hello@mada.academy</a>
              </li>
            </ul>
          </div>
        </Reveal>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm font-outfit">
            © 2026 Mada Early Learning Academy. {isAr ? 'جميع الحقوق محفوظة.' : 'All rights reserved.'}
          </p>
          <p className={`text-white/50 text-sm ${isAr ? 'font-cairo' : 'font-outfit'}`}>
            {isAr ? 'تابعونا @MadaEarlyAcademy' : 'Follow us @MadaEarlyAcademy'}
          </p>
        </div>
      </div>
    </footer>
  );
}
