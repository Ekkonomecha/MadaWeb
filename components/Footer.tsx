'use client';
import { useLanguage } from './LanguageProvider';
import { Camera, ThumbsUp } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  const { lang } = useLanguage();

  return (
    <footer className="bg-brand-yellow py-16 px-6 relative overflow-hidden">
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center relative z-10">
          <Link href="/" className="inline-block bg-white px-6 py-3 blob-1 shadow-sm hover:scale-105 transition-transform mb-8">
            <span className="font-fredoka text-brand-darkblue text-3xl lowercase tracking-tight">mada</span>
          </Link>
          
          <h2 className={`text-brand-darkblue mb-8 ${lang === 'en' ? 'font-fredoka text-2xl' : 'font-cairo font-bold text-2xl'}`}>
            {lang === 'en' ? "Follow our journey" : "تابعوا رحلتنا"}
          </h2>
          <div className="flex gap-4 mb-10">
            <a href="#" className="bg-brand-darkblue text-white p-4 rounded-full hover:scale-110 transition-transform shadow-lg">
              <Camera size={24} />
            </a>
            <a href="#" className="bg-brand-darkblue text-white p-4 rounded-full hover:scale-110 transition-transform shadow-lg">
              <ThumbsUp size={24} />
            </a>
          </div>
          <p className={`text-brand-darkblue/80 font-bold mb-4 ${lang === 'ar' && 'font-cairo'}`}>
            {lang === 'en' ? "Tag us @MadaEarlyAcademy" : "@MadaEarlyAcademy تابعونا"}
          </p>
          <p className="text-brand-darkblue/60 text-sm font-outfit">
            © 2026 Mada Early Learning Academy
          </p>
        </div>

        {/* Footer Blob */}
        <div className="absolute -bottom-10 -right-10 w-[160px] h-[160px] bg-[#E5C12A] blob-3 flex items-center justify-center text-4xl shadow-inner -z-0">
          ⚡
        </div>
    </footer>
  );
}
