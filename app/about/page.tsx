'use client';
import React from 'react';
import { useLanguage } from '@/components/LanguageProvider';
import { Reveal, Stagger, StaggerItem, ParallaxImage, Parallax } from '@/components/Motion';
import DoodleIcon from '@/components/DoodleIcon';

export default function AboutPage() {
  const { lang } = useLanguage();
  const isAr = lang === 'ar';

  return (
    <div className="bg-brand-offwhite min-h-screen">
      {/* Hero Section */}
      <section className="relative py-28 px-6 overflow-hidden mesh-cream grain">
        <Parallax speed={0.5} className="absolute -top-10 right-[8%] -z-0 hidden md:block">
          <div className="w-56 h-56 bg-brand-yellow/30 blob-1 animate-morph" />
        </Parallax>
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <Reveal>
            <span className="inline-block text-brand-pink text-xs tracking-[0.3em] uppercase font-bold mb-5 font-outfit">
              {isAr ? 'من نحن' : 'About Us'}
            </span>
          </Reveal>
          <Reveal delay={0.05} as="h1" className={`text-brand-darkblue mb-6 text-balance ${isAr ? 'font-cairo font-bold text-[clamp(2.5rem,5vw,4rem)] leading-tight' : 'font-display font-light text-[clamp(2.6rem,5vw,4.5rem)] leading-[1.05]'}`}>
            {isAr ? 'قصتنا وفلسفتنا.' : 'Our Story & Philosophy.'}
          </Reveal>
          <Reveal delay={0.12} as="p" className={`text-brand-body/70 text-xl max-w-2xl mx-auto leading-relaxed text-pretty ${isAr && 'font-cairo'}`}>
            {isAr
              ? 'ولدت مدى من الرغبة في خلق مساحة تعليمية عالمية المستوى ودافئة. نترجم الرؤية الدولية إلى دفء محلي.'
              : 'Born from a desire to create a nurturing, world-class early education space. Mada translates an international vision into local warmth.'}
          </Reveal>
        </div>
      </section>

      {/* Meet the Founder / Story */}
      <section className="py-28 px-6 bg-white relative overflow-hidden">
        <Parallax speed={0.5} className="absolute top-1/2 right-0 -z-0 translate-x-1/3 -translate-y-1/2">
          <div className="w-[420px] h-[420px] bg-brand-yellow/10 blob-2 animate-morph" />
        </Parallax>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16 relative z-10">
          <Reveal direction="right" className="w-full md:w-1/2">
            <div className="w-full aspect-[4/5] blob-1 overflow-hidden border-8 border-white shadow-luxe relative">
              <ParallaxImage src="https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=900&auto=format&fit=crop" alt="Founder" className="w-full h-full" intensity={14} />
            </div>
          </Reveal>
          <Reveal direction="left" delay={0.15} className="w-full md:w-1/2">
            <h2 className={`text-brand-darkblue mb-6 text-balance ${isAr ? 'font-cairo font-bold text-4xl' : 'font-display font-light text-[clamp(2rem,3vw,2.8rem)] leading-tight'}`}>
              {isAr ? 'رؤية للمستقبل.' : 'A vision for the future.'}
            </h2>
            <p className={`text-brand-body/70 text-lg leading-relaxed mb-6 text-pretty ${isAr && 'font-cairo'}`}>
              {isAr
                ? "تم إنشاء مدى من قبل مجموعة من المعلمين وأولياء الأمور الشغوفين الذين رأوا فجوة. أردنا حضانة لا 'تراقب' الأطفال فحسب، بل تنمي فضولهم واستعدادهم لأفضل المدارس الدولية بنشاط."
                : "Mada was created by a collective of passionate educators and parents who saw a gap. We wanted a preschool that didn't just 'watch' children, but actively cultivated their curiosity and readiness for the best international schools."}
            </p>
            <p className={`text-brand-body/70 text-lg leading-relaxed text-pretty ${isAr && 'font-cairo'}`}>
              {isAr
                ? 'يتكون فريقنا من متخصصين معتمدين في السنوات المبكرة يفهمون كيفية تنظيم الأيام التي تمزج بين اللعب والتعلم والراحة في انسجام تام.'
                : 'Our team consists of certified early-years specialists who understand how to structure days that blend play, learning, and rest in perfect harmony.'}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-28 px-6 mesh-ink grain text-white overflow-hidden relative">
        <div className="max-w-6xl mx-auto relative z-10">
          <Reveal className="text-center mb-16">
            <span className="inline-block text-brand-cyan text-xs tracking-[0.3em] uppercase font-bold mb-4 font-outfit">
              {isAr ? 'قيمنا' : 'Our Values'}
            </span>
            <h2 className={`mb-4 ${isAr ? 'font-cairo font-bold text-4xl lg:text-5xl' : 'font-display font-light text-4xl lg:text-5xl'}`}>
              {isAr ? 'المبادئ التي توجهنا' : 'The principles that guide us'}
            </h2>
            <p className={`text-brand-cyan/90 text-lg max-w-2xl mx-auto ${isAr ? 'font-cairo' : 'font-outfit'}`}>
              {isAr ? 'المبادئ التي توجه كل تفاعل في مدى.' : 'The principles that guide every interaction at Mada.'}
            </p>
          </Reveal>

          <Stagger className="grid md:grid-cols-3 gap-8">
            {[
              { icon: 'sprout' as const, color: 'text-brand-cyan', enTitle: 'Growth Mindset', arTitle: 'عقلية النمو', enDesc: 'We praise effort, not just results. Every mistake is a learning opportunity.', arDesc: 'نحن نشيد بالجهد، وليس النتائج فقط. كل خطأ هو فرصة للتعلم.' },
              { icon: 'handshake' as const, color: 'text-brand-yellow', enTitle: 'Partnership', arTitle: 'الشراكة', enDesc: 'Parents are our co-educators. We build strong, transparent relationships based on trust.', arDesc: 'الآباء هم شركاؤنا في التعليم. نبني علاقات قوية وشفافة مبنية على الثقة.' },
              { icon: 'globe' as const, color: 'text-brand-palepink', enTitle: 'Global Citizens', arTitle: 'مواطنون عالميون', enDesc: 'While grounded in our local culture, we prepare children to navigate diverse environments.', arDesc: 'بينما نعتز بثقافتنا المحلية، نعد الأطفال للتنقل في بيئات متنوعة.' },
            ].map((val, idx) => (
              <StaggerItem key={idx}>
                <div className="glass-dark p-8 rounded-[32px] hover:-translate-y-2 transition-transform h-full">
                  <div className={`w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-3xl mb-6 ${val.color}`}><DoodleIcon name={val.icon} /></div>
                  <h3 className={`text-2xl mb-3 ${isAr ? 'font-cairo font-bold' : 'font-display font-semibold'}`}>
                    {isAr ? val.arTitle : val.enTitle}
                  </h3>
                  <p className={`text-white/70 leading-relaxed ${isAr ? 'font-cairo' : 'font-outfit'}`}>
                    {isAr ? val.arDesc : val.enDesc}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>
    </div>
  );
}
