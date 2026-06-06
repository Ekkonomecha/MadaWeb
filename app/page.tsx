'use client';

import React, { useState, FormEvent } from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '@/components/LanguageProvider';
import { Reveal, Stagger, StaggerItem, Parallax, ParallaxImage, Magnetic } from '@/components/Motion';
import DoodleIcon from '@/components/DoodleIcon';

export default function MadaEarlyLearningAcademy() {
  const { lang } = useLanguage();
  const isAr = lang === 'ar';
  const [formSuccess, setFormSuccess] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setFormSuccess(true);
  };

  const Character = ({ id, nameEn, nameAr, tintClass }: any) => (
    <StaggerItem className="flex flex-col items-center gap-4 group cursor-pointer">
      <div className={`w-[150px] h-[150px] ${tintClass} blob-1 flex items-center justify-center shadow-soft group-hover:blob-2 group-hover:scale-105 transition-all duration-500 overflow-hidden`}>
        <img
          src={`/assets/characters/${id}.png`}
          alt={nameEn}
          className="w-[80%] h-[80%] object-contain group-hover:scale-110 transition-transform duration-500"
        />
      </div>
      <h4 className={`text-brand-darkblue text-lg text-center ${isAr ? 'font-cairo font-bold' : 'font-display font-semibold'}`}>
        {isAr ? nameAr : nameEn}
      </h4>
    </StaggerItem>
  );

  return (
    <>
      {/* SECTION 2: HERO */}
      <section className="relative min-h-[calc(100vh-120px)] flex flex-col md:flex-row items-center overflow-hidden mesh-cream grain">
        {/* Floating ambient blobs */}
        <div className="absolute top-20 left-[8%] w-40 h-40 bg-brand-cyan/30 blob-3 animate-float -z-0 hidden md:block" />
        <div className="absolute bottom-24 left-[40%] w-24 h-24 bg-brand-pink/20 blob-1 animate-float-delay -z-0 hidden md:block" />

        {/* TEXT COLUMN */}
        <div className="w-full md:w-1/2 flex flex-col justify-center px-8 md:px-16 lg:px-24 py-16 md:py-0 z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="inline-flex items-center gap-2 bg-white/70 backdrop-blur text-brand-darkblue font-bold px-4 py-2 rounded-full mb-7 text-sm border border-white/60 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-brand-pink animate-pulse"></span>
              {isAr ? 'باب القبول مفتوح ٢٠٢٦' : 'Admission Open 2026'}
            </div>

            <h1 className="logo-type font-fredoka text-brand-darkblue text-[4.5rem] md:text-[5.5rem] lg:text-[7rem] leading-[0.85] tracking-tighter mb-5 lowercase">
              mada<span className="text-brand-pink">.</span>
            </h1>

            <h2 className={`mb-6 text-balance ${isAr ? 'font-cairo font-bold text-[clamp(2rem,4vw,3.25rem)] leading-snug text-brand-darkblue' : 'font-display font-light text-[clamp(2.2rem,4vw,3.5rem)] leading-[1.05] text-brand-darkblue'}`}>
              {isAr ? 'حيث يزدهر كل طفل.' : (<>Where every child <span className="italic text-gradient">blooms.</span></>)}
            </h2>

            <p className={`text-lg md:text-xl text-brand-body/70 mb-10 max-w-lg leading-relaxed text-pretty ${isAr && 'font-cairo font-medium'}`}>
              {isAr
                ? 'حضانة دولية متميزة. اختبر بيئة حاضنة يديرها معلمون ذوو مستوى عالمي في السنوات المبكرة.'
                : 'A premium international preschool. Experience a nurturing environment guided by world-class early years educators.'}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Magnetic>
                <button
                  onClick={() => document.getElementById('apply-form')?.scrollIntoView({ behavior: 'smooth' })}
                  className={`group bg-brand-pink text-white px-9 py-4 rounded-full font-bold shadow-luxe text-lg flex items-center justify-center gap-2 ${isAr ? 'font-cairo' : 'font-outfit'}`}
                >
                  {isAr ? 'سجّل الآن' : 'Apply Now'}
                  <span className={`text-2xl leading-none -mt-1 transition-transform ${isAr ? 'group-hover:-translate-x-1' : 'group-hover:translate-x-1'}`}>
                    {isAr ? '←' : '→'}
                  </span>
                </button>
              </Magnetic>
              <Magnetic>
                <a
                  href="/about"
                  className={`bg-white/70 backdrop-blur border border-white/60 text-brand-darkblue px-9 py-4 rounded-full font-bold shadow-sm flex items-center justify-center ${isAr ? 'font-cairo' : 'font-outfit'}`}
                >
                  {isAr ? 'تعرّف علينا' : 'Discover Mada'}
                </a>
              </Magnetic>
            </div>
          </motion.div>
        </div>

        {/* IMAGE COLUMN with parallax */}
        <div className="w-full md:w-1/2 h-[55vh] md:h-[calc(100vh-120px)] relative flex justify-end items-stretch z-[5]">
          <div className="w-full h-full relative md:rounded-bl-[120px] overflow-hidden shadow-luxe">
            <ParallaxImage
              src="/assets/media/hero/child-playing-learning.jpg"
              alt="Child engaged in pretend-play learning at Mada"
              className="w-full h-full"
              intensity={12}
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-brand-darkblue/30 via-transparent to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-brand-offwhite via-transparent to-transparent md:hidden" />
          </div>

          {/* Floating glass stat card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, type: 'spring', stiffness: 120 }}
            className="absolute left-2 md:-left-10 top-1/4 glass rounded-3xl px-6 py-4 shadow-glow z-20 animate-float"
          >
            <div className="font-display font-semibold text-3xl text-brand-darkblue">15:1</div>
            <div className={`text-xs text-brand-body/60 ${isAr ? 'font-cairo' : 'font-outfit'}`}>
              {isAr ? 'نسبة الرعاية' : 'Care Ratio'}
            </div>
          </motion.div>

          <div className="absolute -left-6 bottom-16 hidden md:flex items-center justify-center w-24 h-24 bg-brand-yellow rounded-full shadow-xl z-20 animate-float-delay border-4 border-white">
            <span className="text-4xl text-brand-darkblue"><DoodleIcon name="star" /></span>
          </div>
        </div>

        {/* Scroll Arrow (Mobile only) */}
        <motion.button
          onClick={() => window.scrollBy({ top: window.innerHeight - 100, behavior: 'smooth' })}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="md:hidden absolute bottom-6 right-6 animate-arrow-bounce text-brand-pink glass p-3 rounded-full z-20 shadow-lg"
          aria-label="Scroll down"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M19 12l-7 7-7-7" /></svg>
        </motion.button>
      </section>

      {/* SECTION 3: TRUST BAR */}
      <section className="bg-brand-darkblue py-10 px-6 relative overflow-hidden">
        <Stagger className="max-w-7xl mx-auto flex flex-wrap md:flex-nowrap justify-between gap-y-8">
          {[
            { icon: 'lock' as const, color: 'text-brand-yellow', enT: 'Safe & Secure', enS: 'Full CCTV Coverage', arT: 'آمن ومحمي', arS: 'تغطية كاملة بالكاميرات' },
            { icon: 'shield' as const, color: 'text-brand-cyan', enT: 'Secure Environment', enS: 'Gated Community', arT: 'بيئة آمنة', arS: 'مجتمع سكني مغلق' },
            { icon: 'globe' as const, color: 'text-brand-lightblue', enT: 'Bilingual', enS: 'English + Arabic', arT: 'ثنائية اللغة', arS: 'إنجليزي + عربي' },
            { icon: 'cap' as const, color: 'text-brand-salmon', enT: 'Ages 3m – 5 Years', enS: 'All stages welcome', arT: 'من 3 شهور حتى 5 سنوات', arS: 'جميع المراحل' },
          ].map((item, i) => (
            <StaggerItem
              key={i}
              className="flex flex-col items-center text-center w-1/2 md:w-1/4 p-4 border-b md:border-b-0 md:border-r border-white/15 last:border-0"
            >
              <span className={`text-4xl mb-3 ${item.color}`}><DoodleIcon name={item.icon} /></span>
              <h3 className={`text-white font-bold text-sm md:text-base ${isAr ? 'font-cairo' : 'font-outfit'}`}>{isAr ? item.arT : item.enT}</h3>
              <p className={`text-brand-cyan text-xs mt-1 ${isAr ? 'font-cairo' : 'font-outfit'}`}>{isAr ? item.arS : item.enS}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* SECTION 3.5: ABOUT SNAPSHOT */}
      <section className="py-28 px-6 bg-white relative overflow-hidden">
        <Parallax speed={0.5} className="absolute -left-32 top-10 -z-0">
          <div className="w-[420px] h-[420px] bg-brand-cyan/10 blob-1 animate-morph" />
        </Parallax>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16 relative z-10">
          <Reveal direction="right" className="flex-1">
            <span className="inline-block text-brand-pink text-xs tracking-[0.3em] uppercase font-bold mb-4 font-outfit">
              {isAr ? 'من نحن' : 'Our Story'}
            </span>
            <h2 className={`text-brand-darkblue mb-6 text-balance ${isAr ? 'font-cairo font-bold text-[clamp(2.2rem,4vw,3.2rem)] leading-tight' : 'font-display font-light text-[clamp(2.4rem,4vw,3.5rem)] leading-[1.1]'}`}>
              {isAr ? 'أكثر من مجرد حضانة. إنه مجتمع.' : 'More than a preschool. A community.'}
            </h2>
            <p className={`text-brand-body/70 text-lg leading-relaxed mb-8 text-pretty ${isAr && 'font-cairo'}`}>
              {isAr
                ? 'ولدت مدى من الرغبة في خلق مساحة تعليمية عالمية المستوى ودافئة، لتكون بيتاً ثانياً لطفلك. نحن نجمع بين المعايير الدولية والدفء المحلي.'
                : 'Born from a desire to create a nurturing, world-class early education space, Mada is designed to be a second home for your child. We combine international standards with local warmth.'}
            </p>
            <a href="/about" className={`group inline-flex items-center gap-2 font-bold text-brand-pink hover:text-brand-darkblue transition-colors ${isAr ? 'font-cairo text-lg' : 'font-outfit text-lg'}`}>
              {isAr ? 'اقرأ قصتنا' : 'Read our story'}
              <span className={`transition-transform ${isAr ? 'group-hover:-translate-x-1' : 'group-hover:translate-x-1'}`}>{isAr ? '←' : '→'}</span>
            </a>
          </Reveal>
          <Reveal direction="left" delay={0.15} className="flex-1 relative w-full aspect-square max-w-[500px]">
            <div className="w-full h-full blob-3 overflow-hidden border-8 border-white shadow-luxe relative">
              <ParallaxImage src="https://images.unsplash.com/photo-1587691592099-24045742c181?q=80&w=900&auto=format&fit=crop" alt="Kids playing" className="w-full h-full" intensity={14} />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-brand-blue text-white w-32 h-32 blob-2 flex items-center justify-center text-center shadow-luxe animate-float">
              <span className={isAr ? 'font-cairo font-bold text-xl' : 'font-display font-semibold text-xl'}>
                {isAr ? 'تأسست ٢٠٢٦' : 'Est. 2026'}
              </span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* SECTION 4: PROGRAMS OVERVIEW */}
      <section className="py-28 px-6 bg-brand-offwhite relative">
        <Reveal className="max-w-6xl mx-auto text-center mb-16">
          <span className="inline-block text-brand-pink text-xs tracking-[0.3em] uppercase font-bold mb-4 font-outfit">
            {isAr ? 'برامجنا' : 'Programs'}
          </span>
          <h2 className={`text-brand-darkblue mb-4 ${isAr ? 'font-cairo font-bold text-[clamp(2.2rem,4vw,3.2rem)]' : 'font-display font-light text-[clamp(2.4rem,4vw,3.5rem)]'}`}>
            {isAr ? 'مرحلة لكل عمر.' : 'A stage for every age.'}
          </h2>
          <p className={`text-brand-body/60 text-lg max-w-2xl mx-auto text-pretty ${isAr ? 'font-cairo' : 'font-outfit'}`}>
            {isAr ? 'من الخطوات الأولى إلى الاستعداد لرياض الأطفال، لدينا بيئة مصممة خصيصاً لكل مرحلة.' : 'From first steps to kindergarten readiness, we have a perfectly tailored environment.'}
          </p>
        </Reveal>

        <Stagger className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { id: 1, slug: 'infants', tint: 'bg-brand-salmon/15', tEn: 'Infants', tAr: 'الرضّع', aEn: '3m – 1yr', aAr: '٣ شهور – ١ سنة' },
            { id: 2, slug: 'toddlers', tint: 'bg-brand-cyan/20', tEn: 'Toddlers', tAr: 'الأطفال الصغار', aEn: '1yr – 2yr', aAr: '١ سنة – ٢ سنة' },
            { id: 3, slug: 'preschool', tint: 'bg-brand-palepink/25', tEn: 'Preschool', tAr: 'ما قبل المدرسة', aEn: '2yr – 3yr', aAr: '٢ سنة – ٣ سنوات' },
            { id: 4, slug: 'kindergarten', tint: 'bg-brand-yellow/25', tEn: 'Kindergarten', tAr: 'رياض الأطفال', aEn: '3yr – 5yr', aAr: '٣ سنوات – ٥ سنوات' },
          ].map((prog) => (
            <StaggerItem key={prog.id}>
              <motion.a
                href="/programs"
                whileHover={{ y: -10 }}
                transition={{ type: 'spring', stiffness: 260, damping: 18 }}
                className="bg-white rounded-[32px] p-8 text-center shadow-soft border border-black/5 block group h-full"
              >
                <div className={`w-28 h-28 mx-auto ${prog.tint} blob-${(prog.id % 3) + 1} flex items-center justify-center mb-6 shadow-sm overflow-hidden group-hover:animate-morph group-hover:scale-110 transition-transform`}>
                  <img
                    src={`/assets/stages/${prog.slug}.png`}
                    alt={prog.tEn}
                    className="w-[80%] h-[80%] object-contain"
                  />
                </div>
                <h3 className={`text-2xl text-brand-darkblue mb-2 ${isAr ? 'font-cairo font-bold' : 'font-display font-semibold'}`}>
                  {isAr ? prog.tAr : prog.tEn}
                </h3>
                <p className={`text-brand-body/50 font-medium ${isAr && 'font-cairo'}`}>
                  {isAr ? prog.aAr : prog.aEn}
                </p>
              </motion.a>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* SECTION 5: CHARACTERS TEASER */}
      <section className="bg-brand-offwhite py-28 px-6 relative overflow-hidden">
        <Parallax speed={0.6} className="absolute top-1/2 left-0 -z-0 -translate-x-1/2 -translate-y-1/2">
          <div className="w-[420px] h-[420px] bg-brand-purple/5 blob-3" />
        </Parallax>

        <Reveal className="max-w-4xl mx-auto text-center mb-16 relative z-10">
          <span className="inline-block text-brand-pink text-xs tracking-[0.3em] uppercase font-bold mb-4 font-outfit">
            {isAr ? 'شخصياتنا' : 'Our Characters'}
          </span>
          <h2 className={`text-brand-darkblue mb-4 ${isAr ? 'font-cairo font-bold text-[clamp(2rem,4vw,3.2rem)]' : 'font-display font-light text-[clamp(2.2rem,4vw,3.5rem)]'}`}>
            {isAr ? 'تعرّف على ركائزنا الستة.' : 'Meet our 6 pillars.'}
          </h2>
          <p className={`text-brand-body/60 text-lg md:text-xl max-w-2xl mx-auto text-pretty ${isAr ? 'font-cairo' : 'font-outfit'}`}>
            {isAr ? 'يعتمد منهجنا على 6 ركائز أساسية، يقودها شخصيات ودودة تجعل من التعلم مغامرة ممتعة.' : 'Our curriculum relies on 6 core pillars, guided by friendly characters who make learning an adventure.'}
          </p>
        </Reveal>

        <Stagger className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-16 relative z-10">
          <Character id="brushi" nameEn="Brushi (Art)" nameAr="براشي (الفنون)" tintClass="bg-brand-salmon/15" />
          <Character id="ratio" nameEn="Ratio (Math)" nameAr="ريشيو (الرياضيات)" tintClass="bg-brand-blue/10" />
          <Character id="cuddies" nameEn="Cuddies (Empathy)" nameAr="كاديز (التعاطف)" tintClass="bg-brand-palepink/25" />
          <Character id="scopii" nameEn="Scopii (Science)" nameAr="سكوبي (العلوم)" tintClass="bg-brand-cyan/20" />
          <Character id="lingo" nameEn="Lingo (Languages)" nameAr="لنجو (اللغات)" tintClass="bg-brand-purple/10" />
          <Character id="akktiv" nameEn="Akktiv (Movement)" nameAr="أكتيف (الحركة)" tintClass="bg-brand-yellow/25" />
        </Stagger>
      </section>

      {/* SECTION 6: WHY US (6 PILLARS) */}
      <section className="bg-white py-28 px-6 relative overflow-hidden">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-16 items-center">
          <Stagger className="flex-1 w-full order-2 lg:order-1 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { icon: 'globe' as const, color: 'text-brand-blue', tEn: 'International Standards', tAr: 'معايير دولية' },
              { icon: 'handshake' as const, color: 'text-brand-pink', tEn: 'Parent Partnership', tAr: 'شراكة مع أولياء الأمور' },
              { icon: 'leaf' as const, color: 'text-brand-teal', tEn: 'Nature-Led Play', tAr: 'لعب مستوحى من الطبيعة' },
              { icon: 'brain' as const, color: 'text-brand-purple', tEn: 'Holistic Growth', tAr: 'نمو شامل' },
            ].map((feature, i) => (
              <StaggerItem key={i}>
                <div className="bg-brand-offwhite rounded-3xl p-7 border border-black/5 flex flex-col items-start gap-4 h-full hover:shadow-soft hover:-translate-y-1 transition-all">
                  <div className={`w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center text-2xl border border-black/5 ${feature.color}`}><DoodleIcon name={feature.icon} /></div>
                  <h4 className={`text-xl text-brand-darkblue ${isAr ? 'font-cairo font-bold' : 'font-display font-semibold'}`}>
                    {isAr ? feature.tAr : feature.tEn}
                  </h4>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
          <Reveal direction="left" className="flex-1 order-1 lg:order-2">
            <span className="inline-block text-brand-pink text-xs tracking-[0.3em] uppercase font-bold mb-4 font-outfit">
              {isAr ? 'لماذا مدى' : 'Why Mada'}
            </span>
            <h2 className={`text-brand-darkblue mb-6 text-balance ${isAr ? 'font-cairo font-bold text-[clamp(2.2rem,4vw,3.2rem)] leading-tight' : 'font-display font-light text-[clamp(2.4rem,4vw,3.5rem)] leading-[1.1]'}`}>
              {isAr ? 'لماذا مدى؟' : 'Why Mada?'}
            </h2>
            <p className={`text-brand-body/70 text-lg leading-relaxed text-pretty ${isAr && 'font-cairo'}`}>
              {isAr
                ? 'نحن لا نعتني بأطفالك فحسب؛ بل نوجه تطورهم بعناية عبر جميع مقاييس السنوات المبكرة الحاسمة، مما يضمن استعدادهم التام للمدرسة الكبيرة.'
                : "We don't just care for your children; we thoughtfully guide their development across all crucial early years metrics, ensuring they are more than ready for big school."}
            </p>
          </Reveal>
        </div>
      </section>

      {/* SECTION 7: GALLERY TEASER */}
      <section className="mesh-ink grain py-28 px-6 overflow-hidden relative">
        <div className="max-w-7xl mx-auto relative z-10">
          <Reveal className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div className="max-w-2xl">
              <span className="inline-block text-brand-cyan text-xs tracking-[0.3em] uppercase font-bold mb-4 font-outfit">
                {isAr ? 'المعرض' : 'Gallery'}
              </span>
              <h2 className={`text-white mb-4 ${isAr ? 'font-cairo font-bold text-[clamp(2.2rem,4vw,3.2rem)] leading-tight' : 'font-display font-light text-[clamp(2.4rem,4vw,3.5rem)] leading-[1.1]'}`}>
                {isAr ? 'نظرة من الداخل.' : 'A peek inside.'}
              </h2>
              <p className={`text-brand-cyan/90 text-lg ${isAr ? 'font-cairo' : 'font-outfit'}`}>
                {isAr ? 'مساحات مشرقة وآمنة وجذابة للغاية.' : 'Bright, safe, and wildly engaging spaces.'}
              </p>
            </div>
            <Magnetic>
              <a href="/gallery" className="glass-dark text-white px-6 py-3 rounded-full font-bold hover:bg-white/20 transition-colors inline-block">
                {isAr ? 'مشاهدة المعرض كاملاً' : 'View full gallery'}
              </a>
            </Magnetic>
          </Reveal>

          <Stagger className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[
              { src: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=600&auto=format&fit=crop', shift: '' },
              { src: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=600&auto=format&fit=crop', shift: 'md:translate-y-8' },
              { src: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=600&auto=format&fit=crop', shift: '' },
              { src: 'https://images.unsplash.com/photo-1545606626-dca682d33458?q=80&w=600&auto=format&fit=crop', shift: 'md:translate-y-8' },
            ].map((img, i) => (
              <StaggerItem key={i} className={img.shift}>
                <div className="aspect-square rounded-[32px] overflow-hidden group">
                  <img alt="" src={img.src} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* SECTION 8: TESTIMONIALS */}
      <section className="py-28 px-6 bg-brand-palepink/15">
        <Reveal className="max-w-5xl mx-auto text-center mb-14">
          <span className="inline-block text-brand-pink text-xs tracking-[0.3em] uppercase font-bold mb-4 font-outfit">
            {isAr ? 'آراء الآباء' : 'Testimonials'}
          </span>
          <h2 className={`text-brand-darkblue ${isAr ? 'font-cairo font-bold text-[clamp(2rem,4vw,3.2rem)]' : 'font-display font-light text-[clamp(2.2rem,4vw,3.2rem)]'}`}>
            {isAr ? 'ماذا يقول الآباء.' : 'What parents say.'}
          </h2>
        </Reveal>

        <Stagger className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
          {[
            { enText: 'Mada is exactly what we needed. The care, the hygiene, and the curriculum are unmatched.', arText: 'مدى هي بالضبط ما كنا نحتاجه. الرعاية، النظافة، والمنهج الدراسي لا مثيل لها.', enAuthor: 'Sarah T.', arAuthor: 'سارة ت.' },
            { enText: 'My son comes home so happy every day. The bilingual approach is fantastic.', arText: 'يعود ابني إلى المنزل سعيداً جداً كل يوم. نهج ثنائية اللغة رائع حقاً.', enAuthor: 'Ahmed M.', arAuthor: 'أحمد م.' },
          ].map((quote, i) => (
            <StaggerItem key={i}>
              <div className="bg-white p-8 md:p-10 rounded-[32px] shadow-soft relative h-full" dir={isAr ? 'rtl' : 'ltr'}>
                <span className="absolute top-5 right-7 text-7xl text-brand-salmon/20 font-display leading-none">”</span>
                <div className="flex gap-1 mb-5 text-brand-yellow text-lg">★★★★★</div>
                <p className={`text-brand-body/80 text-lg md:text-xl leading-relaxed mb-6 font-medium ${isAr ? 'font-cairo' : 'font-outfit'}`}>
                  {isAr ? quote.arText : quote.enText}
                </p>
                <div className={`font-bold text-brand-darkblue ${isAr ? 'font-cairo text-lg' : 'font-display text-lg'}`}>
                  — {isAr ? quote.arAuthor : quote.enAuthor}
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* SECTION 9: SUMMER CAMP TEASER */}
      <section className="py-28 px-6 bg-brand-yellow relative overflow-hidden grain">
        <Parallax speed={0.5} className="absolute right-0 bottom-0 -z-0 translate-x-1/4 translate-y-1/4">
          <div className="w-[500px] h-[500px] bg-brand-salmon/25 blob-2 animate-morph" />
        </Parallax>
        <Reveal className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12 glass rounded-[40px] p-8 md:p-12 shadow-luxe relative z-10">
          <div className="flex-1">
            <div className="inline-block bg-white text-brand-salmon font-bold text-[11px] tracking-[2px] uppercase px-4 py-2 rounded-full mb-6 font-outfit shadow-sm">
              <DoodleIcon name="sun" className="inline-block align-[-0.1em] mr-1" /> {isAr ? 'قريباً' : 'Upcoming'}
            </div>
            <h2 className={`text-brand-darkblue mb-4 text-balance ${isAr ? 'font-cairo font-bold text-[clamp(2rem,4vw,3rem)] leading-tight' : 'font-display font-light text-[clamp(2.2rem,4vw,3.2rem)] leading-[1.1]'}`}>
              {isAr ? "المعسكر الصيفي '٢٦" : "Summer Camp '26"}
            </h2>
            <p className={`text-brand-body/80 text-lg leading-relaxed mb-8 text-pretty ${isAr && 'font-cairo'}`}>
              {isAr
                ? 'حافظ على نشاط الصغار طوال الصيف. فنون، ألعاب مائية، رياضة، وصنع ذكريات لا تُنسى.'
                : 'Keep the little ones active and engaged all summer long. Art, water play, sports, and making memories.'}
            </p>
            <Magnetic>
              <a href="/camp" className={`bg-brand-darkblue text-white px-8 py-4 rounded-full inline-block font-bold shadow-luxe ${isAr ? 'font-cairo' : 'font-outfit'}`}>
                {isAr ? 'التسجيل المسبق للمعسكر' : 'Pre-register for Camp'}
              </a>
            </Magnetic>
          </div>
          <div className="w-full md:w-1/2 flex justify-center">
            <div className="w-[250px] h-[250px] bg-white blob-1 flex items-center justify-center text-7xl shadow-xl transform rotate-12 relative animate-float text-brand-salmon">
              <DoodleIcon name="tent" />
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-brand-cyan rounded-full flex items-center justify-center text-xl shadow-md animate-bounce text-white">
                <DoodleIcon name="droplet" />
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* SECTION 10: APPLY FORM */}
      <section id="apply-form" className="py-28 px-6 relative overflow-hidden bg-white">
        <Parallax speed={0.4} className="absolute top-0 right-0 -z-0 translate-x-1/3 -translate-y-1/3">
          <div className="w-[500px] h-[500px] bg-brand-pink/5 blob-2 animate-morph" />
        </Parallax>

        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-16 lg:gap-24 items-center relative z-10">
          <Reveal direction="right" className="flex-1 w-full relative">
            <div className="inline-block bg-brand-pink/10 text-brand-pink font-bold text-[11px] tracking-[2px] uppercase px-4 py-2 rounded-full mb-6 font-outfit">
              {isAr ? 'باب القبول مفتوح' : 'Admissions Open'}
            </div>
            <h2 className={`text-brand-darkblue mb-6 text-balance ${isAr ? 'font-cairo font-bold text-[clamp(2rem,4vw,3rem)] leading-tight' : 'font-display font-light text-[clamp(2.2rem,4vw,3.4rem)] leading-[1.05]'}`}>
              {isAr ? 'انضم إلى عائلة مدى اليوم.' : 'Join the Mada family today.'}
            </h2>
            <p className={`text-brand-body/70 text-lg leading-relaxed mb-12 max-w-lg text-pretty ${isAr && 'font-cairo'}`}>
              {isAr
                ? 'الأماكن محدودة. قدّم اليوم وسيتواصل معك فريقنا خلال 48 ساعة لتحديد موعد جولة.'
                : 'Spaces are limited. Apply today and our team will get back to you within 48 hours to schedule a tour.'}
            </p>

            <div className="flex items-center gap-6 animate-float">
              <div className="w-[100px] h-[100px] bg-brand-palepink blob-2 flex items-center justify-center text-4xl shadow-md hover:blob-1 transition-all duration-500 text-brand-pink">
                <DoodleIcon name="heart" />
              </div>
              <div className="bg-white px-5 py-3 rounded-2xl shadow-soft text-sm font-bold border border-black/5 relative">
                <span className={isAr ? 'font-cairo font-bold text-brand-pink' : 'font-display font-semibold text-brand-pink'}>
                  {isAr ? 'لا نستطيع الانتظار للقائكم!' : "We can't wait to meet you!"}
                </span>
              </div>
            </div>
          </Reveal>

          <Reveal direction="left" delay={0.15} className="w-full lg:w-[500px]">
            <div className="bg-white rounded-[28px] p-8 md:p-10 shadow-luxe relative z-10 w-full border border-black/5">
              {!formSuccess ? (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <div>
                    <label className="block text-sm font-bold text-brand-darkblue mb-1">
                      {isAr ? 'اسم الطفل كاملاً' : "Child's Full Name"}
                      <span className="block text-[11px] font-normal text-brand-body/50 font-cairo mt-0.5">
                        {isAr ? "Child's Full Name" : 'اسم الطفل كاملاً'}
                      </span>
                    </label>
                    <input required type="text" className="w-full h-12 px-4 rounded-xl border-2 border-[#E8E0F0] focus:border-brand-pink focus:ring-4 ring-brand-pink/15 outline-none transition-all bg-brand-offwhite/50" />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-brand-darkblue mb-1">
                        {isAr ? 'تاريخ الميلاد' : 'Date of Birth'}
                        <span className="block text-[11px] font-normal text-brand-body/50 font-cairo mt-0.5">
                          {isAr ? 'Date of Birth' : 'تاريخ الميلاد'}
                        </span>
                      </label>
                      <input required type="date" className="w-full h-12 px-4 rounded-xl border-2 border-[#E8E0F0] focus:border-brand-pink focus:ring-4 ring-brand-pink/15 outline-none transition-all bg-brand-offwhite/50 text-sm" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-brand-darkblue mb-1">
                        {isAr ? 'الفئة العمرية' : 'Age Group'}
                        <span className="block text-[11px] font-normal text-brand-body/50 font-cairo mt-0.5">
                          {isAr ? 'Age Group' : 'الفئة العمرية'}
                        </span>
                      </label>
                      <select required className="w-full h-12 px-4 rounded-xl border-2 border-[#E8E0F0] focus:border-brand-pink focus:ring-4 ring-brand-pink/15 outline-none transition-all bg-brand-offwhite/50 text-sm">
                        <option value="">{isAr ? 'اختر...' : 'Select...'}</option>
                        <option>3–12 Months / 3–12 شهراً</option>
                        <option>1–2 Years / 1–2 سنة</option>
                        <option>2–3 Years / 2–3 سنوات</option>
                        <option>3–5 Years / 3–5 سنوات</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-brand-darkblue mb-1">
                      {isAr ? 'اسم ولي الأمر' : 'Parent Name'}
                      <span className="block text-[11px] font-normal text-brand-body/50 font-cairo mt-0.5">
                        {isAr ? 'Parent Name' : 'اسم ولي الأمر'}
                      </span>
                    </label>
                    <input required type="text" className="w-full h-12 px-4 rounded-xl border-2 border-[#E8E0F0] focus:border-brand-pink focus:ring-4 ring-brand-pink/15 outline-none transition-all bg-brand-offwhite/50" />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-brand-darkblue mb-1">
                        {isAr ? 'رقم الواتساب' : 'WhatsApp Number'}
                        <span className="block text-[11px] font-normal text-brand-body/50 font-cairo mt-0.5">
                          {isAr ? 'WhatsApp Number' : 'رقم الواتساب'}
                        </span>
                      </label>
                      <div className="relative">
                        <span className="absolute top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center text-[#25D366]" style={{ [isAr ? 'right' : 'left']: '12px' }}>
                          <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.488-1.761-1.663-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.82 9.82 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" /></svg>
                        </span>
                        <input required type="tel" placeholder="+20 1XX XXX XXXX" className={`w-full h-12 ${isAr ? 'pr-10 pl-4' : 'pl-10 pr-4'} rounded-xl border-2 border-brand-whatsapp focus:border-brand-whatsapp focus:ring-4 ring-brand-whatsapp/20 outline-none transition-all bg-brand-offwhite/50 text-sm`} />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-brand-darkblue mb-1">
                        {isAr ? 'البريد الإلكتروني' : 'Email'}
                        <span className="block text-[11px] font-normal text-brand-body/50 font-cairo mt-0.5">
                          {isAr ? 'Email' : 'البريد الإلكتروني'}
                        </span>
                      </label>
                      <input required type="email" className="w-full h-12 px-4 rounded-xl border-2 border-[#E8E0F0] focus:border-brand-pink focus:ring-4 ring-brand-pink/15 outline-none transition-all bg-brand-offwhite/50" />
                    </div>
                  </div>

                  <Magnetic className="mt-4">
                    <button type="submit" className="w-full h-14 bg-brand-pink text-white rounded-full flex items-center justify-center font-bold text-lg md:text-xl shadow-luxe font-outfit">
                      {isAr ? 'سجّل الآن ←' : 'Apply Now →'}
                    </button>
                  </Magnetic>
                </form>
              ) : (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="py-16 flex flex-col items-center justify-center text-center">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-500 mb-6">
                    <motion.svg
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.5, ease: 'easeInOut' }}
                      className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </motion.svg>
                  </div>
                  <h3 className={`text-2xl text-brand-darkblue mb-3 ${isAr ? 'font-cairo font-bold' : 'font-display font-semibold'}`}>
                    {isAr ? 'استلمنا طلبك!' : 'Application Received!'}
                  </h3>
                  <p className="text-brand-body/70 text-lg inline-flex items-center gap-1.5">
                    {isAr ? 'سنتواصل معك قريباً.' : "We'll be in touch soon."}
                    <DoodleIcon name="leaf" className="text-brand-teal" />
                  </p>
                </motion.div>
              )}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
