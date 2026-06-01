'use client';
import React from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '@/components/LanguageProvider';

export default function ProgramsPage() {
  const { lang } = useLanguage();
  
  const programs = [
    {
      id: "infants",
      icon: "👶",
      color: "brand-salmon",
      enTitle: "Infants",
      arTitle: "الرضّع",
      enAge: "3 Months – 1 Year",
      arAge: "٣ شهور – ١ سنة",
      enDesc: "A safe, soothing, and highly sensory environment designed to make your baby's first moments away from home comfortable. Our expert caregivers focus on establishing routines, encouraging early milestones, and building secure attachments.",
      arDesc: "بيئة آمنة ومهدئة وحسية للغاية مصممة لجعل لحظات طفلك الأولى بعيدًا عن المنزل مريحة. يركز مقدمو الرعاية الخبراء لدينا على تعزيز الروتين، وتشجيع الإنجازات المبكرة، وبناء مرفقات آمنة."
    },
    {
      id: "toddlers",
      icon: "🧒",
      color: "brand-cyan",
      enTitle: "Toddlers",
      arTitle: "الأطفال الصغار",
      enAge: "1 Year – 2 Years",
      arAge: "١ سنة – ٢ سنة",
      enDesc: "Active explorers need room to move. Our toddler program is designed around independent exploration, early language acquisition, and foundational social skills through guided play.",
      arDesc: "يحتاج المستكشفون النشطون إلى مساحة للحركة. تم تصميم برنامج الأطفال الصغار لدينا حول الاستكشاف المستقل واكتساب اللغة المبكر والمهارات الاجتماعية الأساسية من خلال اللعب الموجه."
    },
    {
      id: "preschool",
      icon: "🎒",
      color: "brand-palepink",
      enTitle: "Preschool",
      arTitle: "ما قبل المدرسة",
      enAge: "2 Years – 3 Years",
      arAge: "٢ سنة – ٣ سنوات",
      enDesc: "Curiosity takes center stage. We introduce structured but highly engaging thematic learning. Children start building pre-literacy and pre-math skills while navigating social dynamics with peers.",
      arDesc: "الفضول يحتل مركز الصدارة. نقدم تعلمًا موضوعيًا منظمًا ولكنه جذاب للغاية. يبدأ الأطفال في بناء مهارات ما قبل القراءة والكتابة وما قبل الرياضيات أثناء التنقل في الديناميكيات الاجتماعية مع أقرانهم."
    },
    {
      id: "kindergarten",
      icon: "🏫",
      color: "brand-yellow",
      enTitle: "Kindergarten",
      arTitle: "رياض الأطفال",
      enAge: "3 Years – 5 Years",
      arAge: "٣ سنوات – ٥ سنوات",
      enDesc: "The launchpad to big school. Focusing on interview readiness, emotional intelligence, bilingual fluency, and problem-solving. We guarantee your child leaves us confident and capable.",
      arDesc: "منصة الانطلاق إلى المدرسة الكبيرة. التركيز على الاستعداد للمقابلة، والذكاء العاطفي، والطلاقة ثنائية اللغة، وحل المشكلات. نضمن أن يتركنا طفلك واثقًا وقادرًا."
    }
  ];

  return (
    <div className="bg-brand-offwhite min-h-screen">
      <section className="relative py-24 px-6 overflow-hidden bg-brand-blue/10">
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`text-brand-darkblue mb-6 ${lang === 'en' ? 'font-fredoka text-[clamp(2.5rem,5vw,4.5rem)] leading-tight' : 'font-cairo font-bold text-[clamp(2.5rem,5vw,4rem)] leading-tight'}`}
          >
            {lang === 'en' ? 'Programs for every stage.' : 'برامج لكل مرحلة.'}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className={`text-brand-body/80 text-xl max-w-2xl mx-auto leading-relaxed ${lang === 'ar' && 'font-cairo'}`}
          >
            {lang === 'en' 
              ? 'From the first gentle days to kindergarten graduation, we have carefully designed environments tailored precisely to what children need at each developmental phase.'
              : 'من الأيام اللطيفة الأولى إلى التخرج من رياض الأطفال، صممنا بعناية بيئات مصممة خصيصًا لتناسب ما يحتاجه الأطفال في كل مرحلة نمو.'}
          </motion.p>
        </div>
      </section>

      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto space-y-24">
          {programs.map((prog, idx) => (
            <div key={prog.id} className={`flex flex-col ${idx % 2 !== 0 ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-12 md:gap-20`}>
              <div className="w-full md:w-1/2 flex justify-center">
                <div className={`w-[280px] md:w-[400px] h-[280px] md:h-[400px] bg-${prog.color}/20 rounded-full flex items-center justify-center text-8xl md:text-[8rem] blob-${(idx % 3) + 1} shadow-xl hover:scale-105 transition-transform duration-500`}>
                  {prog.icon}
                </div>
              </div>
              <div className="w-full md:w-1/2">
                <div className={`inline-block px-4 py-2 bg-${prog.color} text-white font-bold rounded-full mb-4 text-sm ${lang === 'ar' ? 'font-cairo' : 'font-outfit'}`}>
                  {lang === 'en' ? prog.enAge : prog.arAge}
                </div>
                <h2 className={`text-brand-darkblue mb-6 ${lang === 'en' ? 'font-fredoka text-4xl lg:text-5xl' : 'font-cairo font-bold text-4xl lg:text-5xl'}`}>
                  {lang === 'en' ? prog.enTitle : prog.arTitle}
                </h2>
                <p className={`text-brand-body/80 text-lg leading-relaxed ${lang === 'ar' && 'font-cairo'}`}>
                  {lang === 'en' ? prog.enDesc : prog.arDesc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
