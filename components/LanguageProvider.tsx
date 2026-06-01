'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import { motion, useScroll } from 'motion/react';

type Lang = 'en' | 'ar';
interface LanguageContextType {
  lang: Lang;
  setLang: (l: Lang) => void;
}

const LanguageContext = createContext<LanguageContextType>({ lang: 'en', setLang: () => {} });

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [lang, setLang] = useState<Lang>('en');
  const [isMounted, setIsMounted] = useState(false);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    setIsMounted(true);
    const saved = localStorage.getItem('mada-lang') as Lang | null;
    if (saved) setLang(saved);
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
    document.documentElement.setAttribute('lang', lang);
    localStorage.setItem('mada-lang', lang);
  }, [lang, isMounted]);

  if (!isMounted) return <div className="min-h-screen bg-brand-offwhite" />;

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      <div className={`min-h-screen flex flex-col bg-brand-offwhite text-brand-body ${lang === 'ar' ? 'font-cairo' : 'font-outfit'}`}>
        <motion.div
          className="fixed top-0 left-0 right-0 h-[4px] bg-gradient-to-r from-brand-pink to-brand-yellow z-[2000] origin-left"
          style={{ scaleX: scrollYProgress, transformOrigin: lang === 'ar' ? 'right' : 'left' }}
        />
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        
        {/* Floating WhatsApp */}
        <a
          href="https://wa.me/201000000000"
          target="_blank"
          rel="noopener noreferrer"
          title={lang === 'en' ? 'Chat with us' : 'راسلنا'}
          className="fixed bottom-6 right-6 w-14 h-14 md:w-16 md:h-16 bg-brand-whatsapp rounded-full flex items-center justify-center z-[1999] text-white shadow-xl hover:scale-110 transition-transform animate-pulse-whatsapp group"
        >
          <span className={`absolute -top-12 bg-white text-brand-body text-[11px] font-bold px-3 py-1.5 rounded-lg opacity-0 transition-opacity whitespace-nowrap shadow-md pointer-events-none group-hover:opacity-100 ${lang === 'ar' ? 'font-cairo' : 'font-outfit'}`}>
            {lang === 'en' ? "Chat with us" : "راسلنا"}
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-white rotate-45" />
          </span>
          <svg viewBox="0 0 24 24" width="30" height="30" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.488-1.761-1.663-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.82 9.82 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
          </svg>
        </a>
      </div>
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
