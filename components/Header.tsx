'use client';
import { useLanguage } from './LanguageProvider';
import Link from 'next/link';
import { Camera, ThumbsUp, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
  const { lang, setLang } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const links = [
    { href: '/', en: 'Home', ar: 'الرئيسية' },
    { href: '/about', en: 'About Us', ar: 'من نحن' },
    { href: '/programs', en: 'Programs', ar: 'برامجنا' },
    { href: '/curriculum', en: 'Curriculum', ar: 'المنهج الدراسي' },
    { href: '/characters', en: 'Characters', ar: 'شخصياتنا' },
    { href: '/gallery', en: 'Gallery', ar: 'معرض الصور' },
  ];

  return (
    <>
      <div className="bg-brand-darkblue h-10 flex items-center justify-between px-6 z-[1010] relative">
        <div className="flex gap-2">
          <button
            onClick={() => setLang('en')}
            className={`px-3 py-0.5 text-xs rounded ${lang === 'en' ? 'bg-brand-yellow text-brand-darkblue font-bold' : 'text-white/80 hover:text-white'}`}
          >
            EN
          </button>
          <button
            onClick={() => setLang('ar')}
            className={`px-3 py-0.5 text-xs rounded font-cairo ${lang === 'ar' ? 'bg-brand-yellow text-brand-darkblue font-bold' : 'text-white/80 hover:text-white'}`}
          >
            عربي
          </button>
        </div>
        <div className="flex gap-4">
          <a href="#" className="text-white hover:text-brand-yellow transition-colors"><Camera size={16} /></a>
          <a href="#" className="text-white hover:text-brand-yellow transition-colors"><ThumbsUp size={16} /></a>
        </div>
      </div>
      <header className="bg-white/90 backdrop-blur-md sticky top-0 z-[1000] border-b border-brand-blue/10">
        <div className={`max-w-7xl mx-auto px-6 h-20 flex items-center justify-between`} dir={lang === 'ar' ? 'rtl' : 'ltr'}>
          <div className="flex items-center gap-8 md:gap-12">
            <Link href="/" className="inline-block bg-brand-yellow px-4 py-2 blob-1 shadow-sm hover:scale-105 transition-transform" onClick={() => setMobileMenuOpen(false)}>
              <span className="font-fredoka text-brand-darkblue text-2xl lowercase tracking-tight">mada</span>
            </Link>
            
            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
              {links.map((link) => (
                <Link key={link.en} href={link.href} className={`font-bold text-brand-darkblue hover:text-brand-pink transition-colors ${lang === 'ar' ? 'font-cairo' : 'font-outfit'}`}>
                  {lang === 'en' ? link.en : link.ar}
                </Link>
              ))}
            </nav>
          </div>

          <div className="hidden md:block">
            <Link href="/#apply-form" className={`bg-brand-pink text-white px-6 py-2.5 rounded-full font-bold hover:scale-105 transition-transform shadow-md shadow-brand-pink/20 ${lang === 'ar' ? 'font-cairo' : 'font-outfit'}`}>
              {lang === 'en' ? 'Contact Us' : 'اتصل بنا'}
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden text-brand-darkblue" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-20 left-0 right-0 bg-white border-b border-brand-blue/10 p-6 flex flex-col gap-4 shadow-xl" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
            {links.map((link) => (
              <Link 
                key={link.en} 
                href={link.href} 
                onClick={() => setMobileMenuOpen(false)}
                className={`font-bold text-brand-darkblue text-lg ${lang === 'ar' ? 'font-cairo' : 'font-outfit'}`}
              >
                {lang === 'en' ? link.en : link.ar}
              </Link>
            ))}
            <Link 
              href="#" 
              onClick={() => setMobileMenuOpen(false)}
              className={`bg-brand-pink text-white text-center px-6 py-3 rounded-full font-bold mt-2 ${lang === 'ar' ? 'font-cairo' : 'font-outfit'}`}
            >
              {lang === 'en' ? 'Contact Us' : 'اتصل بنا'}
            </Link>
          </div>
        )}
      </header>
    </>
  );
}
