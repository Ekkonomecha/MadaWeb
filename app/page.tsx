'use client';

import React, { useState, FormEvent } from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '@/components/LanguageProvider';

export default function MadaEarlyLearningAcademy() {
  const { lang } = useLanguage();
  const [formSuccess, setFormSuccess] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setFormSuccess(true);
  };

  const TrustItem = ({ icon, enTitle, enSub, arTitle, arSub }: any) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="flex flex-col items-center text-center w-1/2 md:w-1/4 p-4 border-b md:border-b-0 md:border-r border-brand-blue/30 last:border-0"
    >
      <span className="text-3xl mb-3 text-white">{icon}</span>
      <h3 className={`text-white font-bold text-sm md:text-base ${lang === 'en' ? 'font-outfit' : 'hidden'}`}>{enTitle}</h3>
      <h3 className={`text-white font-bold text-sm md:text-base ${lang === 'ar' ? 'font-cairo' : 'hidden'}`}>{arTitle}</h3>
      <p className={`text-brand-cyan text-xs mt-1 ${lang === 'en' ? 'font-outfit' : 'hidden'}`}>{enSub}</p>
      <p className={`text-brand-cyan text-xs mt-1 ${lang === 'ar' ? 'font-cairo' : 'hidden'}`}>{arSub}</p>
    </motion.div>
  );

  const Character = ({ nameEn, nameAr, emoji, colorClass, delay = 0 }: any) => (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay }}
      className="flex flex-col items-center gap-3 character-card group cursor-pointer"
    >
      <div className={`w-[140px] h-[140px] ${colorClass} blob-1 flex items-center justify-center text-5xl shadow-lg group-hover:blob-2 transition-all duration-500`}>
        {emoji}
      </div>
      <div className="text-center">
        <h4 className={`text-brand-darkblue text-xl uppercase ${lang === 'en' ? 'font-fredoka' : 'hidden'}`}>{nameEn}</h4>
        <h4 className={`text-brand-darkblue text-xl font-bold ${lang === 'ar' ? 'font-cairo' : 'hidden'}`}>{nameAr}</h4>
      </div>
    </motion.div>
  );

  return (
    <>
      {/* SECTION 2: HERO */}
      <section className="relative min-h-[calc(100vh-120px)] flex flex-col md:flex-row items-center overflow-hidden bg-brand-offwhite">
        
        {/* TEXT COLUMN */}
        <div className="w-full md:w-1/2 flex flex-col justify-center px-8 md:px-16 lg:px-24 py-16 md:py-0 z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="inline-flex items-center gap-2 bg-brand-yellow/20 text-brand-yellow font-bold px-4 py-2 rounded-full mb-6 text-sm border border-brand-yellow/30 bg-white shadow-sm">
              <span className="w-2 h-2 rounded-full bg-brand-yellow animate-pulse"></span>
              {lang === 'en' ? 'Admission Open 2026' : 'باب القبول مفتوح ٢٠٢٦'}
            </div>
            
            <h1 className="font-fredoka text-brand-darkblue text-[5rem] md:text-[6rem] lg:text-[8rem] leading-none tracking-tighter mb-4 lowercase">
              mada.
            </h1>
            
            <h2 className={`text-brand-darkblue mb-6 ${lang === 'en' ? 'font-fredoka text-[clamp(2.5rem,4vw,3.5rem)] leading-tight' : 'font-cairo font-bold text-[clamp(2.5rem,4vw,3.5rem)] leading-tight'}`}>
              {lang === 'en' ? "Where every child blooms." : "حيث يزدهر كل طفل."}
            </h2>
            
            <p className={`text-lg md:text-xl text-brand-body/80 mb-10 max-w-lg leading-relaxed ${lang === 'ar' && 'font-cairo font-medium'}`}>
              {lang === 'en' 
                ? "A premium international preschool. Experience a nurturing environment guided by world-class early years educators." 
                : "حضانة دولية متميزة. اختبر بيئة حاضنة يديرها معلمون ذوو مستوى عالمي في السنوات المبكرة."}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => document.getElementById('apply-form')?.scrollIntoView({ behavior: 'smooth' })}
                className={`group bg-brand-pink text-white px-8 py-4 rounded-full font-bold shadow-lg shadow-brand-pink/30 hover:scale-105 active:scale-95 transition-transform text-lg flex items-center justify-center gap-2 ${lang === 'en' ? 'font-fredoka' : 'font-cairo'}`}
              >
                {lang === 'en' ? "Apply Now" : "سجّل الآن"}
                <span className={`text-2xl leading-none -mt-1 transition-transform ${lang === 'ar' ? 'group-hover:-translate-x-1' : 'group-hover:translate-x-1'}`}>
                  {lang === 'ar' ? '←' : '→'}
                </span>
              </button>
            </div>
          </motion.div>
        </div>

        {/* IMAGE COLUMN */}
        <div className="w-full md:w-1/2 h-[50vh] md:h-[calc(100vh-120px)] relative flex justify-end items-stretch opacity-90 md:opacity-100">
          <div className="w-full h-full relative overflow-hidden md:rounded-bl-[120px] shadow-2xl">
             <img 
               src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1600&auto=format&fit=crop" 
               alt="Nursery children with teacher" 
               className="w-full h-full object-cover origin-center hover:scale-105 transition-transform duration-[20s]"
             />
             <div className="absolute inset-0 bg-gradient-to-r from-brand-offwhite via-transparent to-transparent md:hidden"></div>
             <div className="absolute inset-0 bg-brand-darkblue/10"></div>
          </div>
          
           {/* Decorative element over image */}
          <div className="absolute -left-12 top-1/4 hidden md:flex items-center justify-center w-24 h-24 bg-brand-yellow rounded-full shadow-xl z-20 animate-float border-4 border-white">
             <span className="text-4xl">🌟</span>
          </div>
        </div>

        {/* Scroll Arrow (Mobile only) */}
        <motion.button
          onClick={() => window.scrollBy({ top: window.innerHeight - 100, behavior: 'smooth' })}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="md:hidden absolute bottom-6 right-6 animate-arrow-bounce text-brand-pink opacity-80 hover:opacity-100 hover:scale-110 transition-all cursor-pointer bg-white/80 backdrop-blur p-3 rounded-full z-20 shadow-lg"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M19 12l-7 7-7-7"/></svg>
        </motion.button>
      </section>

      {/* SECTION 3: TRUST BAR */}
      <section className="bg-brand-darkblue py-10 px-6">
        <div className="max-w-7xl mx-auto flex flex-wrap md:flex-nowrap justify-between gap-y-8">
          <TrustItem icon="🔒" enTitle="Safe & Secure" enSub="Full CCTV Coverage" arTitle="آمن ومحمي" arSub="تغطية كاملة بالكاميرات" />
          <TrustItem icon="🛡️" enTitle="Secure Environment" enSub="Gated Community" arTitle="بيئة آمنة" arSub="مجتمع سكني مغلق" />
          <TrustItem icon="🌍" enTitle="Bilingual" enSub="English + Arabic" arTitle="ثنائية اللغة" arSub="إنجليزي + عربي" />
          <TrustItem icon="🎓" enTitle="Ages 3m – 5 Years" enSub="All stages welcome" arTitle="من 3 شهور حتى 5 سنوات" arSub="جميع المراحل" />
        </div>
      </section>

      {/* SECTION 3.5: ABOUT SNAPSHOT */}
      <section className="py-24 px-6 bg-white relative overflow-hidden">
        <div className="absolute -left-32 top-10 w-[400px] h-[400px] bg-brand-cyan opacity-10 blob-1 -z-10" />
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1">
            <h2 className={`text-brand-darkblue mb-6 ${lang === 'en' ? 'font-fredoka text-[clamp(2.5rem,4vw,3.5rem)] leading-tight' : 'font-cairo font-bold text-[clamp(2.2rem,4vw,3.2rem)] leading-tight'}`}>
              {lang === 'en' ? "More than a preschool. A community." : "أكثر من مجرد حضانة. إنه مجتمع."}
            </h2>
            <p className={`text-brand-body/80 text-lg leading-relaxed mb-8 ${lang === 'ar' && 'font-cairo'}`}>
              {lang === 'en' 
                ? "Born from a desire to create a nurturing, world-class early education space, Mada is designed to be a second home for your child. We combine international standards with local warmth."
                : "ولدت مدى من الرغبة في خلق مساحة تعليمية عالمية المستوى ودافئة، لتكون بيتاً ثانياً لطفلك. نحن نجمع بين المعايير الدولية والدفء المحلي."}
            </p>
            <a href="/about" className={`inline-flex items-center gap-2 font-bold text-brand-pink hover:text-brand-darkblue transition-colors ${lang === 'en' ? 'font-fredoka text-lg' : 'font-cairo text-xl'}`}>
              {lang === 'en' ? "Read our story →" : "اقرأ قصتنا ←"}
            </a>
          </div>
          <div className="flex-1 relative w-full aspect-square max-w-[500px]">
             <div className="w-full h-full bg-brand-yellow blob-3 overflow-hidden border-8 border-white shadow-xl relative isolate">
               <img src="https://images.unsplash.com/photo-1587691592099-24045742c181?q=80&w=800&auto=format&fit=crop" alt="Kids playing" className="w-full h-full object-cover mix-blend-overlay opacity-80" />
             </div>
             <div className="absolute -bottom-6 -right-6 bg-brand-blue text-white w-32 h-32 blob-2 flex items-center justify-center font-bold text-center shadow-lg -z-0">
               <span className={lang === 'en' ? 'font-fredoka text-xl' : 'font-cairo text-xl'}>
                 {lang === 'en' ? "Est. 2026" : "تأسست ٢٠٢٦"}
               </span>
             </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: PROGRAMS OVERVIEW */}
      <section className="py-24 px-6 bg-brand-offwhite relative">
        <div className="max-w-6xl mx-auto text-center mb-16">
          <h2 className={`text-brand-darkblue mb-4 ${lang === 'en' ? 'font-fredoka text-[clamp(2.5rem,4vw,3.5rem)]' : 'font-cairo font-bold text-[clamp(2.2rem,4vw,3.2rem)]'}`}>
            {lang === 'en' ? "A stage for every age." : "مرحلة لكل عمر."}
          </h2>
          <p className={`text-brand-body/70 text-lg max-w-2xl mx-auto ${lang === 'en' ? 'font-outfit' : 'font-cairo'}`}>
            {lang === 'en' ? "From first steps to kindergarten readiness, we have a perfectly tailored environment." : "من الخطوات الأولى إلى الاستعداد لرياض الأطفال، لدينا بيئة مصممة خصيصاً لكل مرحلة."}
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { id: 1, color: 'bg-brand-salmon', icon: '👶', titleEn: 'Infants', titleAr: 'الرضّع', ageEn: '3m – 1yr', ageAr: '٣ شهور – ١ سنة' },
            { id: 2, color: 'bg-brand-cyan', icon: '🧒', titleEn: 'Toddlers', titleAr: 'الأطفال الصغار', ageEn: '1yr – 2yr', ageAr: '١ سنة – ٢ سنة' },
            { id: 3, color: 'bg-brand-palepink', icon: '🎒', titleEn: 'Preschool', titleAr: 'ما قبل المدرسة', ageEn: '2yr – 3yr', ageAr: '٢ سنة – ٣ سنوات' },
            { id: 4, color: 'bg-brand-yellow', icon: '🏫', titleEn: 'Kindergarten', titleAr: 'رياض الأطفال', ageEn: '3yr – 5yr', ageAr: '٣ سنوات – ٥ سنوات' },
          ].map(prog => (
            <motion.a 
              href="/programs" 
              key={prog.id}
              whileHover={{ y: -10 }}
              className="bg-white rounded-[32px] p-8 text-center shadow-[0_4px_20px_rgba(5,12,90,0.04)] border border-gray-100 block group"
            >
              <div className={`w-24 h-24 mx-auto ${prog.color} blob-${(prog.id % 3) + 1} flex items-center justify-center text-4xl mb-6 shadow-sm group-hover:scale-110 transition-transform`}>
                {prog.icon}
              </div>
              <h3 className={`text-2xl text-brand-darkblue mb-2 ${lang === 'en' ? 'font-fredoka' : 'font-cairo font-bold'}`}>
                {lang === 'en' ? prog.titleEn : prog.titleAr}
              </h3>
              <p className={`text-brand-body/60 font-medium ${lang === 'ar' && 'font-cairo'}`}>
                {lang === 'en' ? prog.ageEn : prog.ageAr}
              </p>
            </motion.a>
          ))}
        </div>
      </section>

      {/* SECTION 5: CHARACTERS TEASER */}
      <section className="bg-brand-offwhite py-24 px-6 relative overflow-hidden">
        <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-brand-purple opacity-5 blob-3 -z-10 -translate-x-1/2 -translate-y-1/2" />
        
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className={`text-brand-darkblue mb-4 ${lang === 'en' ? 'font-fredoka text-[clamp(2rem,4vw,3.5rem)]' : 'font-cairo font-bold text-[clamp(2rem,4vw,3.5rem)]'}`}>
            {lang === 'en' ? "Meet our 6 pillars." : "تعرّف على ركائزنا الستة."}
          </h2>
          <p className={`text-brand-body/70 text-lg md:text-xl max-w-2xl mx-auto ${lang === 'en' ? 'font-outfit' : 'font-cairo'}`}>
            {lang === 'en' ? "Our curriculum relies on 6 core pillars, guided by friendly characters who make learning an adventure." : "يعتمد منهجنا على 6 ركائز أساسية، يقودها شخصيات ودودة تجعل من التعلم مغامرة ممتعة."}
          </p>
        </div>

        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-16">
          <Character nameEn="Brushi (Art)" nameAr="براشي (الفنون)" emoji="🎨" colorClass="bg-brand-salmon" delay={0.1} />
          <Character nameEn="Ratio (Math)" nameAr="ريشيو (الرياضيات)" emoji="🔢" colorClass="bg-brand-blue" delay={0.2} />
          <Character nameEn="Cuddies (Empathy)" nameAr="كاديز (التعاطف)" emoji="❤️" colorClass="bg-brand-palepink" delay={0.3} />
          <Character nameEn="Scopii (Science)" nameAr="سكوبي (العلوم)" emoji="🌿" colorClass="bg-brand-cyan" delay={0.4} />
          <Character nameEn="Lingo (Languages)" nameAr="لنجو (اللغات)" emoji="🗣️" colorClass="bg-brand-purple" delay={0.5} />
          <Character nameEn="Akktiv (Movement)" nameAr="أكتيف (الحركة)" emoji="⚡" colorClass="bg-brand-yellow text-brand-darkblue" delay={0.6} />
        </div>
      </section>

      {/* SECTION 6: WHY US (6 PILLARS) */}
      <section className="bg-white py-24 px-6 relative overflow-hidden">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-16 items-center">
          <div className="flex-1 w-full order-2 lg:order-1 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { icon: '🌍', tEn: 'International Standards', tAr: 'معايير دولية' },
              { icon: '🤝', tEn: 'Parent Partnership', tAr: 'شراكة مع أولياء الأمور' },
              { icon: '🌿', tEn: 'Nature-Led Play', tAr: 'لعب مستوحى من الطبيعة' },
              { icon: '🧠', tEn: 'Holistic Growth', tAr: 'نمو شامل' }
            ].map((feature, i) => (
               <div key={i} className="bg-gray-50 rounded-3xl p-6 border border-gray-100 flex flex-col items-start gap-4">
                 <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center text-2xl border border-gray-100">{feature.icon}</div>
                 <h4 className={`text-xl text-brand-darkblue ${lang === 'en' ? 'font-fredoka' : 'font-cairo font-bold'}`}>
                   {lang === 'en' ? feature.tEn : feature.tAr}
                 </h4>
               </div>
            ))}
          </div>
          <div className="flex-1 order-1 lg:order-2">
            <h2 className={`text-brand-darkblue mb-6 ${lang === 'en' ? 'font-fredoka text-[clamp(2.5rem,4vw,3.5rem)] leading-tight' : 'font-cairo font-bold text-[clamp(2.2rem,4vw,3.2rem)] leading-tight'}`}>
              {lang === 'en' ? "Why Mada?" : "لماذا مدى؟"}
            </h2>
            <p className={`text-brand-body/80 text-lg leading-relaxed mb-8 ${lang === 'ar' && 'font-cairo'}`}>
              {lang === 'en' 
                ? "We don't just care for your children; we thoughtfully guide their development across all crucial early years metrics, ensuring they are more than ready for big school."
                : "نحن لا نعتني بأطفالك فحسب؛ بل نوجه تطورهم بعناية عبر جميع مقاييس السنوات المبكرة الحاسمة، مما يضمن استعدادهم التام للمدرسة الكبيرة."}
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 7: GALLERY TEASER */}
      <section className="bg-brand-darkblue py-24 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div className="max-w-2xl">
              <h2 className={`text-white mb-4 ${lang === 'en' ? 'font-fredoka text-[clamp(2.5rem,4vw,3.5rem)] leading-tight' : 'font-cairo font-bold text-[clamp(2.2rem,4vw,3.2rem)] leading-tight'}`}>
                {lang === 'en' ? "A peek inside." : "نظرة من الداخل."}
              </h2>
              <p className={`text-brand-cyan text-lg ${lang === 'en' ? 'font-outfit' : 'font-cairo'}`}>
                {lang === 'en' ? "Bright, safe, and wildly engaging spaces." : "مساحات مشرقة وآمنة وجذابة للغاية."}
              </p>
            </div>
            <a href="/gallery" className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-full font-bold transition-colors">
              {lang === 'en' ? "View full gallery" : "مشاهدة المعرض كاملاً"}
            </a>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            <div className="aspect-square bg-brand-pink/20 rounded-[32px] overflow-hidden"><img alt="" src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=600&auto=format&fit=crop" className="w-full h-full object-cover mix-blend-luminosity hover:mix-blend-normal transition-all" /></div>
            <div className="aspect-square bg-brand-yellow/20 rounded-[32px] overflow-hidden md:translate-y-8"><img alt="" src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=600&auto=format&fit=crop" className="w-full h-full object-cover mix-blend-luminosity hover:mix-blend-normal transition-all" /></div>
            <div className="aspect-square bg-brand-cyan/20 rounded-[32px] overflow-hidden"><img alt="" src="https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=600&auto=format&fit=crop" className="w-full h-full object-cover mix-blend-luminosity hover:mix-blend-normal transition-all" /></div>
            <div className="aspect-square bg-brand-salmon/20 rounded-[32px] overflow-hidden md:translate-y-8"><img alt="" src="https://images.unsplash.com/photo-1545606626-dca682d33458?q=80&w=600&auto=format&fit=crop" className="w-full h-full object-cover mix-blend-luminosity hover:mix-blend-normal transition-all" /></div>
          </div>
        </div>
      </section>

      {/* SECTION 8: TESTIMONIALS */}
      <section className="py-24 px-6 bg-brand-palepink/20">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className={`text-brand-darkblue mb-16 ${lang === 'en' ? 'font-fredoka text-[clamp(2rem,4vw,3rem)]' : 'font-cairo font-bold text-[clamp(2rem,4vw,3.2rem)]'}`}>
            {lang === 'en' ? "What parents say." : "ماذا يقول الآباء."}
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                enText: "Mada is exactly what we needed. The care, the hygiene, and the curriculum are unmatched.",
                arText: "مدى هي بالضبط ما كنا نحتاجه. الرعاية، النظافة، والمنهج الدراسي لا مثيل لها.",
                enAuthor: "Sarah T.",
                arAuthor: "سارة ت."
              },
              {
                enText: "My son comes home so happy every day. The bilingual approach is fantastic.",
                arText: "يعود ابني إلى المنزل سعيداً جداً كل يوم. نهج ثنائية اللغة رائع حقاً.",
                enAuthor: "Ahmed M.",
                arAuthor: "أحمد م."
              }
            ].map((quote, i) => (
              <div key={i} className="bg-white p-8 md:p-10 rounded-[32px] shadow-sm text-left relative">
                <span className="absolute top-6 right-6 text-6xl text-brand-salmon/20 font-serif">"</span>
                <p className={`text-brand-body/80 text-lg md:text-xl leading-relaxed mb-6 font-medium ${lang === 'ar' ? 'font-cairo' : 'font-outfit'}`} dir={lang === 'ar' ? 'rtl' : 'ltr'}>
                  "{lang === 'en' ? quote.enText : quote.arText}"
                </p>
                <div className={`font-bold text-brand-darkblue ${lang === 'ar' ? 'font-cairo text-lg' : 'font-fredoka text-lg'}`} dir={lang === 'ar' ? 'rtl' : 'ltr'}>
                  - {lang === 'en' ? quote.enAuthor : quote.arAuthor}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 9: SUMMER CAMP TEASER */}
      <section className="py-24 px-6 bg-brand-yellow relative overflow-hidden">
        <div className="absolute right-0 bottom-0 w-[500px] h-[500px] bg-brand-salmon opacity-20 blob-2 -z-10 translate-x-1/4 translate-y-1/4" />
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12 bg-white/40 p-8 md:p-12 rounded-[40px] backdrop-blur-sm border border-white/50 shadow-xl">
          <div className="flex-1">
             <div className="inline-block bg-white text-brand-salmon font-bold text-[11px] tracking-[2px] uppercase px-4 py-2 rounded-full mb-6 font-outfit shadow-sm">
                ☀ {lang === 'en' ? 'Upcoming' : 'قريباً'}
              </div>
            <h2 className={`text-brand-darkblue mb-4 ${lang === 'en' ? 'font-fredoka text-[clamp(2rem,4vw,3.2rem)] leading-tight' : 'font-cairo font-bold text-[clamp(2rem,4vw,3rem)] leading-tight'}`}>
              {lang === 'en' ? "Summer Camp '26" : "المعسكر الصيفي '٢٦"}
            </h2>
            <p className={`text-brand-body/90 text-lg leading-relaxed mb-8 ${lang === 'ar' && 'font-cairo'}`}>
              {lang === 'en' 
                ? "Keep the little ones active and engaged all summer long. Art, water play, sports, and making memories."
                : "حافظ على نشاط الصغار طوال الصيف. فنون، ألعاب مائية، رياضة، وصنع ذكريات لا تُنسى."}
            </p>
            <a href="/camp" className={`bg-brand-darkblue text-white px-8 py-4 rounded-full inline-block font-bold shadow-lg hover:scale-105 transition-transform ${lang === 'en' ? 'font-fredoka' : 'font-cairo'}`}>
              {lang === 'en' ? "Pre-register for Camp" : "التسجيل المسبق للمعسكر"}
            </a>
          </div>
          <div className="w-full md:w-1/2 flex justify-center">
             <div className="w-[250px] h-[250px] bg-white blob-1 flex items-center justify-center text-7xl shadow-xl transform rotate-12 relative animate-float">
               🏕️
               <div className="absolute -top-4 -left-4 w-12 h-12 bg-brand-cyan rounded-full flex items-center justify-center text-xl shadow-md animate-bounce">💦</div>
             </div>
          </div>
        </div>
      </section>

      {/* SECTION 10: APPLY FORM */}
      <section id="apply-form" className="py-24 px-6 relative overflow-hidden bg-white">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-pink opacity-5 blob-2 -z-10 translate-x-1/3 -translate-y-1/3" />
        
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
          
          <div className="flex-1 w-full relative">
            <div className="inline-block bg-brand-pink/10 text-brand-pink font-bold text-[11px] tracking-[2px] uppercase px-4 py-2 rounded-full mb-6 font-outfit">
              {lang === 'en' ? 'Admissions Open' : 'باب القبول مفتوح'}
            </div>
            
            <h2 className={`text-brand-darkblue mb-6 ${lang === 'en' ? 'font-fredoka text-[clamp(2rem,4vw,3.2rem)] leading-[1.1]' : 'font-cairo font-bold text-[clamp(2rem,4vw,3rem)] leading-tight'}`}>
              {lang === 'en' ? "Join the Mada family today." : "انضم إلى عائلة مدى اليوم."}
            </h2>
            
            <p className={`text-brand-body/80 text-lg leading-relaxed mb-12 max-w-lg ${lang === 'ar' && 'font-cairo'}`}>
              {lang === 'en' 
                ? "Spaces are limited. Apply today and our team will get back to you within 48 hours to schedule a tour."
                : "الأماكن محدودة. قدّم اليوم وسيتواصل معك فريقنا خلال 48 ساعة لتحديد موعد جولة."}
            </p>

            <div className="flex items-center gap-6 animate-float">
              <div className="w-[100px] h-[100px] bg-brand-palepink blob-2 flex items-center justify-center text-4xl shadow-md cursor-pointer hover:blob-1 transition-all duration-500">
                ❤️
              </div>
              <div className="bg-white px-5 py-3 rounded-2xl shadow-sm text-sm font-bold border border-gray-100 relative">
                <div className="absolute top-1/2 -left-2 w-4 h-4 bg-white transform -translate-y-1/2 rotate-45 border-l border-b border-gray-100" style={{ [lang === 'ar' ? 'right' : 'left']: '-8px', borderRight: lang === 'ar' ? '1px solid #f3f4f6' : 'none' }}></div>
                <span className={lang === 'en' ? 'font-fredoka text-brand-pink' : 'font-cairo font-bold text-brand-pink'}>
                  {lang === 'en' ? "We can't wait to meet you!" : "لا نستطيع الانتظار للقائكم!"}
                </span>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-[500px]">
             <div className="bg-white rounded-[24px] p-8 md:p-10 shadow-[0_8px_40px_rgba(5,12,90,0.06)] relative z-10 w-full border border-gray-50/50">
              {!formSuccess ? (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <div>
                    <label className="block text-sm font-bold text-brand-darkblue mb-1">
                      {lang === 'en' ? "Child's Full Name" : "اسم الطفل كاملاً"}
                      <span className="block text-[11px] font-normal text-brand-body/60 font-cairo mt-0.5">
                        {lang === 'en' ? "اسم الطفل كاملاً" : "Child's Full Name"}
                      </span>
                    </label>
                    <input required type="text" className="w-full h-12 px-4 rounded-xl border-2 border-[#E8E0F0] focus:border-brand-pink focus:ring-4 ring-brand-pink/15 outline-none transition-all bg-gray-50/50" />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-brand-darkblue mb-1">
                        {lang === 'en' ? "Date of Birth" : "تاريخ الميلاد"}
                        <span className="block text-[11px] font-normal text-brand-body/60 font-cairo mt-0.5">
                          {lang === 'en' ? "تاريخ الميلاد" : "Date of Birth"}
                        </span>
                      </label>
                      <input required type="date" className="w-full h-12 px-4 rounded-xl border-2 border-[#E8E0F0] focus:border-brand-pink focus:ring-4 ring-brand-pink/15 outline-none transition-all bg-gray-50/50 text-sm" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-brand-darkblue mb-1">
                        {lang === 'en' ? "Age Group" : "الفئة العمرية"}
                        <span className="block text-[11px] font-normal text-brand-body/60 font-cairo mt-0.5">
                          {lang === 'en' ? "الفئة العمرية" : "Age Group"}
                        </span>
                      </label>
                      <select required className="w-full h-12 px-4 rounded-xl border-2 border-[#E8E0F0] focus:border-brand-pink focus:ring-4 ring-brand-pink/15 outline-none transition-all bg-gray-50/50 text-sm">
                        <option value="">{lang === 'en' ? 'Select...' : 'اختر...'}</option>
                        <option>3–12 Months / 3–12 شهراً</option>
                        <option>1–2 Years / 1–2 سنة</option>
                        <option>2–3 Years / 2–3 سنوات</option>
                        <option>3–5 Years / 3–5 سنوات</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-brand-darkblue mb-1">
                      {lang === 'en' ? "Parent Name" : "اسم ولي الأمر"}
                      <span className="block text-[11px] font-normal text-brand-body/60 font-cairo mt-0.5">
                        {lang === 'en' ? "اسم ولي الأمر" : "Parent Name"}
                      </span>
                    </label>
                    <input required type="text" className="w-full h-12 px-4 rounded-xl border-2 border-[#E8E0F0] focus:border-brand-pink focus:ring-4 ring-brand-pink/15 outline-none transition-all bg-gray-50/50" />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-brand-darkblue mb-1">
                        {lang === 'en' ? "WhatsApp Number" : "رقم الواتساب"}
                        <span className="block text-[11px] font-normal text-brand-body/60 font-cairo mt-0.5">
                          {lang === 'en' ? "رقم الواتساب" : "WhatsApp Number"}
                        </span>
                      </label>
                      <div className="relative">
                        <span className="absolute top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center text-[#25D366]" style={{ [lang==='ar'?'right':'left']: '12px' }}>
                          <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.488-1.761-1.663-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.82 9.82 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
                        </span>
                        <input required type="tel" placeholder="+20 1XX XXX XXXX" className={`w-full h-12 ${lang==='ar'?'pr-10 pl-4':'pl-10 pr-4'} rounded-xl border-2 border-brand-whatsapp focus:border-brand-whatsapp focus:ring-4 ring-brand-whatsapp/20 outline-none transition-all bg-gray-50/50 text-sm`} />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-brand-darkblue mb-1">
                        {lang === 'en' ? "Email" : "البريد الإلكتروني"}
                        <span className="block text-[11px] font-normal text-brand-body/60 font-cairo mt-0.5">
                          {lang === 'en' ? "البريد الإلكتروني" : "Email"}
                        </span>
                      </label>
                      <input required type="email" className="w-full h-12 px-4 rounded-xl border-2 border-[#E8E0F0] focus:border-brand-pink focus:ring-4 ring-brand-pink/15 outline-none transition-all bg-gray-50/50" />
                    </div>
                  </div>

                  <button type="submit" className="w-full h-14 mt-4 bg-brand-pink text-white rounded-full flex items-center justify-center font-bold text-lg md:text-xl shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-transform font-fredoka shadow-brand-pink/30">
                    {lang === 'en' ? "Apply Now →" : "سجّل الآن ←"}
                  </button>
                </form>
              ) : (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="py-16 flex flex-col items-center justify-center text-center">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-500 mb-6 relative">
                    <motion.svg
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                      className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </motion.svg>
                  </div>
                  <h3 className={`text-2xl text-brand-darkblue mb-3 ${lang === 'en' ? 'font-fredoka' : 'font-cairo font-bold'}`}>
                    {lang === 'en' ? "Application Received!" : "استلمنا طلبك!"}
                  </h3>
                  <p className="text-brand-body/80 text-lg">
                    {lang === 'en' ? "We'll be in touch soon. 🌿" : "سنتواصل معك قريباً. 🌿"}
                  </p>
                </motion.div>
              )}
             </div>
          </div>
        </div>
      </section>
    </>
  );
}
