'use client';
import React from 'react';
import { useLanguage } from '@/components/LanguageProvider';
import { Reveal, Parallax, ParallaxImage } from '@/components/Motion';

export default function ProgramsPage() {
  const { lang } = useLanguage();
  const isAr = lang === 'ar';

  const programs = [
    {
      id: 'infants', icon: '👶',
      bg: 'bg-brand-salmon', soft: 'bg-brand-salmon/15', chip: 'bg-brand-salmon',
      enTitle: 'Infants', arTitle: 'الرضّع',
      enAge: '3 Months – 1 Year', arAge: '٣ شهور – ١ سنة',
      enDesc: "A safe, soothing, and highly sensory environment designed to make your baby's first moments away from home comfortable. Our expert caregivers focus on establishing routines, encouraging early milestones, and building secure attachments.",
      arDesc: 'بيئة آمنة ومهدئة وحسية للغاية مصممة لجعل لحظات طفلك الأولى بعيدًا عن المنزل مريحة. يركز مقدمو الرعاية الخبراء لدينا على تعزيز الروتين، وتشجيع الإنجازات المبكرة، وبناء مرفقات آمنة.',
    },
    {
      id: 'toddlers', icon: '🧒',
      bg: 'bg-brand-cyan', soft: 'bg-brand-cyan/15', chip: 'bg-brand-cyan',
      enTitle: 'Toddlers', arTitle: 'الأطفال الصغار',
      enAge: '1 Year – 2 Years', arAge: '١ سنة – ٢ سنة',
      enDesc: 'Active explorers need room to move. Our toddler program is designed around independent exploration, early language acquisition, and foundational social skills through guided play.',
      arDesc: 'يحتاج المستكشفون النشطون إلى مساحة للحركة. تم تصميم برنامج الأطفال الصغار لدينا حول الاستكشاف المستقل واكتساب اللغة المبكر والمهارات الاجتماعية الأساسية من خلال اللعب الموجه.',
    },
    {
      id: 'preschool', icon: '🎒',
      bg: 'bg-brand-palepink', soft: 'bg-brand-palepink/20', chip: 'bg-brand-palepink',
      enTitle: 'Preschool', arTitle: 'ما قبل المدرسة',
      enAge: '2 Years – 3 Years', arAge: '٢ سنة – ٣ سنوات',
      enDesc: 'Curiosity takes center stage. We introduce structured but highly engaging thematic learning. Children start building pre-literacy and pre-math skills while navigating social dynamics with peers.',
      arDesc: 'الفضول يحتل مركز الصدارة. نقدم تعلمًا موضوعيًا منظمًا ولكنه جذاب للغاية. يبدأ الأطفال في بناء مهارات ما قبل القراءة والكتابة وما قبل الرياضيات أثناء التنقل في الديناميكيات الاجتماعية مع أقرانهم.',
    },
    {
      id: 'kindergarten', icon: '🏫',
      bg: 'bg-brand-yellow', soft: 'bg-brand-yellow/20', chip: 'bg-brand-yellow',
      enTitle: 'Kindergarten', arTitle: 'رياض الأطفال',
      enAge: '3 Years – 5 Years', arAge: '٣ سنوات – ٥ سنوات',
      enDesc: 'The launchpad to big school. Focusing on interview readiness, emotional intelligence, bilingual fluency, and problem-solving. We guarantee your child leaves us confident and capable.',
      arDesc: 'منصة الانطلاق إلى المدرسة الكبيرة. التركيز على الاستعداد للمقابلة، والذكاء العاطفي، والطلاقة ثنائية اللغة، وحل المشكلات. نضمن أن يتركنا طفلك واثقًا وقادرًا.',
    },
  ];

  const blobs = ['blob-1', 'blob-2', 'blob-3', 'blob-1'];

  return (
    <div className="bg-brand-offwhite min-h-screen">
      <section className="relative py-28 px-6 overflow-hidden mesh-cream grain">
        <Parallax speed={0.5} className="absolute -top-10 left-[8%] -z-0 hidden md:block">
          <div className="w-56 h-56 bg-brand-blue/15 blob-2 animate-morph" />
        </Parallax>
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <Reveal>
            <span className="inline-block text-brand-pink text-xs tracking-[0.3em] uppercase font-bold mb-5 font-outfit">
              {isAr ? 'برامجنا' : 'Programs'}
            </span>
          </Reveal>
          <Reveal delay={0.05} as="h1" className={`text-brand-darkblue mb-6 text-balance ${isAr ? 'font-cairo font-bold text-[clamp(2.5rem,5vw,4rem)] leading-tight' : 'font-display font-light text-[clamp(2.6rem,5vw,4.5rem)] leading-[1.05]'}`}>
            {isAr ? 'برامج لكل مرحلة.' : 'Programs for every stage.'}
          </Reveal>
          <Reveal delay={0.12} as="p" className={`text-brand-body/70 text-xl max-w-2xl mx-auto leading-relaxed text-pretty ${isAr && 'font-cairo'}`}>
            {isAr
              ? 'من الأيام اللطيفة الأولى إلى التخرج من رياض الأطفال، صممنا بعناية بيئات مصممة خصيصًا لتناسب ما يحتاجه الأطفال في كل مرحلة نمو.'
              : 'From the first gentle days to kindergarten graduation, we have carefully designed environments tailored precisely to what children need at each developmental phase.'}
          </Reveal>
        </div>
      </section>

      <section className="py-28 px-6 bg-white">
        <div className="max-w-6xl mx-auto space-y-28">
          {programs.map((prog, idx) => (
            <div key={prog.id} className={`flex flex-col ${idx % 2 !== 0 ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-12 md:gap-20`}>
              <Reveal direction={idx % 2 !== 0 ? 'left' : 'right'} className="w-full md:w-1/2 flex justify-center">
                <div className={`w-[280px] md:w-[400px] h-[280px] md:h-[400px] ${prog.soft} ${blobs[idx]} flex items-center justify-center text-8xl md:text-[8rem] shadow-luxe hover:animate-morph hover:scale-105 transition-transform duration-500`}>
                  {prog.icon}
                </div>
              </Reveal>
              <Reveal direction={idx % 2 !== 0 ? 'right' : 'left'} delay={0.12} className="w-full md:w-1/2">
                <div className={`inline-block px-4 py-2 ${prog.chip} ${prog.id === 'kindergarten' ? 'text-brand-darkblue' : 'text-white'} font-bold rounded-full mb-4 text-sm ${isAr ? 'font-cairo' : 'font-outfit'}`}>
                  {isAr ? prog.arAge : prog.enAge}
                </div>
                <h2 className={`text-brand-darkblue mb-6 text-balance ${isAr ? 'font-cairo font-bold text-4xl lg:text-5xl' : 'font-display font-light text-4xl lg:text-5xl leading-tight'}`}>
                  {isAr ? prog.arTitle : prog.enTitle}
                </h2>
                <p className={`text-brand-body/70 text-lg leading-relaxed text-pretty ${isAr && 'font-cairo'}`}>
                  {isAr ? prog.arDesc : prog.enDesc}
                </p>
              </Reveal>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
