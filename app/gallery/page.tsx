'use client';
import React, { useState } from 'react';
import { useLanguage } from '@/components/LanguageProvider';
import { Reveal, Stagger, StaggerItem, Parallax } from '@/components/Motion';

export default function GalleryPage() {
  const { lang } = useLanguage();
  const isAr = lang === 'ar';
  const [active, setActive] = useState(0);

  const images = [
    { src: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800&auto=format&fit=crop', aspect: 'aspect-square' },
    { src: 'https://images.unsplash.com/photo-1587691592099-24045742c181?q=80&w=800&auto=format&fit=crop', aspect: 'aspect-[4/3] md:col-span-2' },
    { src: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=800&auto=format&fit=crop', aspect: 'aspect-[3/4]' },
    { src: 'https://images.unsplash.com/photo-1545606626-dca682d33458?q=80&w=800&auto=format&fit=crop', aspect: 'aspect-square' },
    { src: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=800&auto=format&fit=crop', aspect: 'aspect-[4/3] md:col-span-2' },
    { src: 'https://images.unsplash.com/photo-1533222481259-ce20eda1e20b?q=80&w=800&auto=format&fit=crop', aspect: 'aspect-square' },
  ];

  const filters = [
    { en: 'All', ar: 'الكل' },
    { en: 'Classroom Life', ar: 'الحياة في الفصل' },
    { en: 'Outdoor & Play', ar: 'اللعب بالخارج' },
    { en: 'Events', ar: 'الفعاليات' },
  ];

  return (
    <div className="bg-brand-offwhite min-h-screen">
      <section className="relative py-28 px-6 overflow-hidden mesh-cream grain">
        <Parallax speed={0.5} className="absolute -top-10 right-[10%] -z-0 hidden md:block">
          <div className="w-56 h-56 bg-brand-pink/15 blob-2 animate-morph" />
        </Parallax>
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <Reveal>
            <span className="inline-block text-brand-pink text-xs tracking-[0.3em] uppercase font-bold mb-5 font-outfit">
              {isAr ? 'معرض الصور' : 'Gallery'}
            </span>
          </Reveal>
          <Reveal delay={0.05} as="h1" className={`text-brand-darkblue mb-6 text-balance ${isAr ? 'font-cairo font-bold text-[clamp(2.5rem,5vw,4rem)] leading-tight' : 'font-display font-light text-[clamp(2.6rem,5vw,4.5rem)] leading-[1.05]'}`}>
            {isAr ? 'نظرة من الداخل.' : 'A peek inside.'}
          </Reveal>
          <Reveal delay={0.12} as="p" className={`text-brand-body/70 text-xl max-w-2xl mx-auto leading-relaxed text-pretty ${isAr && 'font-cairo'}`}>
            {isAr
              ? 'صُمم حرمنا ليكون ملهمًا. مساحات مشرقة وآمنة وجذابة للغاية حيث تمثل كل زاوية مغامرة جديدة.'
              : 'Our campus is designed to inspire. Bright, safe, and wildly engaging spaces where every corner is a new adventure.'}
          </Reveal>
        </div>
      </section>

      <section className="py-28 px-6">
        <div className="max-w-7xl mx-auto">
          <Reveal className="flex flex-wrap items-center justify-center gap-3 mb-16">
            {filters.map((filter, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`px-6 py-2.5 rounded-full font-bold text-sm transition-all ${active === i ? 'bg-brand-darkblue text-white shadow-soft scale-105' : 'bg-white text-brand-body/60 hover:bg-brand-offwhite border border-black/5'} ${isAr && 'font-cairo'}`}
              >
                {isAr ? filter.ar : filter.en}
              </button>
            ))}
          </Reveal>

          <Stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-auto">
            {images.map((img, i) => (
              <StaggerItem key={i} className={`${img.aspect}`}>
                <div className="w-full h-full rounded-[32px] overflow-hidden group cursor-pointer shadow-soft relative">
                  <img
                    src={img.src}
                    alt="Gallery"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-darkblue/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal className="mt-16 text-center">
            <button className={`bg-brand-pink text-white px-8 py-4 rounded-full font-bold shadow-luxe hover:scale-105 transition-transform ${isAr ? 'font-cairo' : 'font-outfit'}`}>
              {isAr ? 'تحميل المزيد من اللحظات' : 'Load More Moments'}
            </button>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
