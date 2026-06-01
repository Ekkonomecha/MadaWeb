'use client';
import React from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '@/components/LanguageProvider';

export default function GalleryPage() {
  const { lang } = useLanguage();
  
  const images = [
    { src: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800&auto=format&fit=crop', aspect: 'aspect-square', color: 'bg-brand-pink/20' },
    { src: 'https://images.unsplash.com/photo-1587691592099-24045742c181?q=80&w=800&auto=format&fit=crop', aspect: 'aspect-[4/3] md:col-span-2', color: 'bg-brand-yellow/20' },
    { src: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=800&auto=format&fit=crop', aspect: 'aspect-[3/4]', color: 'bg-brand-cyan/20' },
    { src: 'https://images.unsplash.com/photo-1545606626-dca682d33458?q=80&w=800&auto=format&fit=crop', aspect: 'aspect-square', color: 'bg-brand-salmon/20' },
    { src: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=800&auto=format&fit=crop', aspect: 'aspect-[4/3] md:col-span-2', color: 'bg-brand-purple/20' },
    { src: 'https://images.unsplash.com/photo-1533222481259-ce20eda1e20b?q=80&w=800&auto=format&fit=crop', aspect: 'aspect-square', color: 'bg-brand-blue/20' }
  ];

  return (
    <div className="bg-brand-offwhite min-h-screen">
      <section className="relative py-24 px-6 overflow-hidden bg-brand-pink/10">
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`text-brand-darkblue mb-6 ${lang === 'en' ? 'font-fredoka text-[clamp(2.5rem,5vw,4.5rem)] leading-tight' : 'font-cairo font-bold text-[clamp(2.5rem,5vw,4rem)] leading-tight'}`}
          >
            {lang === 'en' ? 'A peek inside.' : 'نظرة من الداخل.'}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className={`text-brand-body/80 text-xl max-w-2xl mx-auto leading-relaxed ${lang === 'ar' && 'font-cairo'}`}
          >
            {lang === 'en' 
              ? 'Our campus is designed to inspire. Bright, safe, and wildly engaging spaces where every corner is a new adventure.'
              : 'صُمم حرمنا ليكون ملهمًا. مساحات مشرقة وآمنة وجذابة للغاية حيث تمثل كل زاوية مغامرة جديدة.'}
          </motion.p>
        </div>
      </section>

      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Filters placeholder */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
            {['All', 'Classroom Life', 'Outdoor & Play', 'Events'].map((filter, i) => (
              <button 
                key={i}
                className={`px-6 py-2 rounded-full font-bold text-sm transition-colors ${i === 0 ? 'bg-brand-darkblue text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'} ${lang === 'ar' && 'font-cairo'}`}
              >
                 {lang === 'en' ? filter : (filter === 'All' ? 'الكل' : filter === 'Classroom Life' ? 'الحياة في الفصل' : filter === 'Outdoor & Play' ? 'اللعب بالخارج' : 'الفعاليات')}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-auto">
            {images.map((img, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`${img.aspect} ${img.color} rounded-[32px] overflow-hidden group cursor-pointer`}
              >
                <img 
                  src={img.src} 
                  alt="Gallery image" 
                  className="w-full h-full object-cover mix-blend-luminosity group-hover:mix-blend-normal group-hover:scale-105 transition-all duration-700" 
                />
              </motion.div>
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <button className={`bg-brand-pink text-white px-8 py-4 rounded-full font-bold shadow-lg hover:scale-105 transition-transform ${lang === 'en' ? 'font-fredoka' : 'font-cairo'}`}>
              {lang === 'en' ? 'Load More Moments' : 'تحميل المزيد من اللحظات'}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
