'use client';
import React from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '@/components/LanguageProvider';

export default function AboutPage() {
  const { lang } = useLanguage();
  
  return (
    <div className="bg-brand-offwhite min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 px-6 overflow-hidden bg-brand-teal/10">
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`text-brand-darkblue mb-6 ${lang === 'en' ? 'font-fredoka text-[clamp(2.5rem,5vw,4.5rem)] leading-tight' : 'font-cairo font-bold text-[clamp(2.5rem,5vw,4rem)] leading-tight'}`}
          >
            {lang === 'en' ? 'Our Story & Philosophy.' : 'قصتنا وفلسفتنا.'}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className={`text-brand-body/80 text-xl max-w-2xl mx-auto leading-relaxed ${lang === 'ar' && 'font-cairo'}`}
          >
            {lang === 'en' 
              ? 'Born from a desire to create a nurturing, world-class early education space. Mada translates an international vision into local warmth.'
              : 'ولدت مدى من الرغبة في خلق مساحة تعليمية عالمية المستوى ودافئة. نترجم الرؤية الدولية إلى دفء محلي.'}
          </motion.p>
        </div>
      </section>

      {/* Meet the Founder / Story */}
      <section className="py-24 px-6 bg-white relative">
        <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-brand-yellow/10 blob-2 -z-10 translate-x-1/3 -translate-y-1/2" />
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16">
          <div className="w-full md:w-1/2">
            <div className="w-full aspect-[4/5] bg-brand-pink/20 rounded-[40px] overflow-hidden blob-1 relative">
              <img src="https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=800&auto=format&fit=crop" alt="Founder" className="w-full h-full object-cover mix-blend-luminosity hover:mix-blend-normal transition-all duration-700" />
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <h2 className={`text-brand-darkblue mb-6 ${lang === 'en' ? 'font-fredoka text-4xl' : 'font-cairo font-bold text-4xl'}`}>
              {lang === 'en' ? 'A vision for the future.' : 'رؤية للمستقبل.'}
            </h2>
            <p className={`text-brand-body/80 text-lg leading-relaxed mb-6 ${lang === 'ar' && 'font-cairo'}`}>
              {lang === 'en' 
                ? "Mada was created by a collective of passionate educators and parents who saw a gap. We wanted a preschool that didn't just 'watch' children, but actively cultivated their curiosity and readiness for the best international schools."
                : "تم إنشاء مدى من قبل مجموعة من المعلمين وأولياء الأمور الشغوفين الذين رأوا فجوة. أردنا حضانة لا 'تراقب' الأطفال فحسب، بل تنمي فضولهم واستعدادهم لأفضل المدارس الدولية بنشاط."}
            </p>
            <p className={`text-brand-body/80 text-lg leading-relaxed ${lang === 'ar' && 'font-cairo'}`}>
              {lang === 'en'
                ? "Our team consists of certified early-years specialists who understand how to structure days that blend play, learning, and rest in perfect harmony."
                : "يتكون فريقنا من متخصصين معتمدين في السنوات المبكرة يفهمون كيفية تنظيم الأيام التي تمزج بين اللعب والتعلم والراحة في انسجام تام."}
            </p>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-24 px-6 bg-brand-darkblue text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-[50vh] h-[50vh] bg-brand-yellow opacity-10 blob-3 -z-0 translate-x-1/2 -translate-y-1/2" />
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className={`mb-4 ${lang === 'en' ? 'font-fredoka text-4xl lg:text-5xl' : 'font-cairo font-bold text-4xl lg:text-5xl'}`}>
              {lang === 'en' ? 'Our Values' : 'قيمنا'}
            </h2>
            <p className="text-brand-cyan text-lg max-w-2xl mx-auto">
              {lang === 'en' ? 'The principles that guide every interaction at Mada.' : 'المبادئ التي توجه كل تفاعل في مدى.'}
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: '🌱', enTitle: 'Growth Mindset', arTitle: 'عقلية النمو', enDesc: 'We praise effort, not just results. Every mistake is a learning opportunity.', arDesc: 'نحن نشيد بالجهد، وليس النتائج فقط. كل خطأ هو فرصة للتعلم.' },
              { icon: '🤝', enTitle: 'Partnership', arTitle: 'الشراكة', enDesc: 'Parents are our co-educators. We build strong, transparent relationships based on trust.', arDesc: 'الآباء هم شركاؤنا في التعليم. نبني علاقات قوية وشفافة مبنية على الثقة.' },
              { icon: '🌍', enTitle: 'Global Citizens', arTitle: 'مواطنون عالميون', enDesc: 'While grounded in our local culture, we prepare children to navigate diverse environments.', arDesc: 'بينما نعتز بثقافتنا المحلية، نعد الأطفال للتنقل في بيئات متنوعة.' }
            ].map((val, idx) => (
              <div key={idx} className="bg-white/10 p-8 rounded-[32px] backdrop-blur-md border border-white/10 hover:-translate-y-2 transition-transform">
                <div className="text-4xl mb-6">{val.icon}</div>
                <h3 className={`text-2xl mb-3 ${lang === 'en' ? 'font-fredoka' : 'font-cairo font-bold'}`}>
                  {lang === 'en' ? val.enTitle : val.arTitle}
                </h3>
                <p className="text-white/70 leading-relaxed">
                  {lang === 'en' ? val.enDesc : val.arDesc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
