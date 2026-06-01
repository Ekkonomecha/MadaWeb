'use client';
import React from 'react';
import { useLanguage } from '@/components/LanguageProvider';
import { Reveal, Stagger, StaggerItem, Parallax, ParallaxImage } from '@/components/Motion';

export default function CurriculumPage() {
  const { lang } = useLanguage();
  const isAr = lang === 'ar';

  return (
    <div className="bg-brand-offwhite min-h-screen">
      <section className="relative py-28 px-6 overflow-hidden mesh-cream grain">
        <Parallax speed={0.5} className="absolute -top-10 right-[10%] -z-0 hidden md:block">
          <div className="w-56 h-56 bg-brand-purple/15 blob-3 animate-morph" />
        </Parallax>
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <Reveal>
            <span className="inline-block text-brand-pink text-xs tracking-[0.3em] uppercase font-bold mb-5 font-outfit">
              {isAr ? 'المنهج الدراسي' : 'Curriculum'}
            </span>
          </Reveal>
          <Reveal delay={0.05} as="h1" className={`text-brand-darkblue mb-6 text-balance ${isAr ? 'font-cairo font-bold text-[clamp(2.5rem,5vw,4rem)] leading-tight' : 'font-display font-light text-[clamp(2.6rem,5vw,4.5rem)] leading-[1.05]'}`}>
            {isAr ? 'كيف نتعلم.' : 'How we learn.'}
          </Reveal>
          <Reveal delay={0.12} as="p" className={`text-brand-body/70 text-xl max-w-2xl mx-auto leading-relaxed text-pretty ${isAr && 'font-cairo'}`}>
            {isAr
              ? 'منهجنا عبارة عن مزيج جميل من التعلم المنظم والاستكشاف الذي يقوده الطفل. نعد الأطفال لأفضل المدارس الدولية من خلال نهج شامل.'
              : 'Our curriculum is a beautiful blend of structured learning and child-led exploration. We prepare children for the top international schools through a holistic approach.'}
          </Reveal>
        </div>
      </section>

      <section className="py-28 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-24 items-center mb-28">
            <Reveal direction="right">
              <div className="w-16 h-16 bg-brand-purple/15 rounded-2xl flex items-center justify-center text-3xl mb-6">🏆</div>
              <h2 className={`text-brand-darkblue mb-4 text-balance ${isAr ? 'font-cairo font-bold text-4xl' : 'font-display font-light text-[clamp(2rem,3vw,2.8rem)] leading-tight'}`}>
                {isAr ? 'التحضير للمقابلات المدرسية' : 'School Interview Prep'}
              </h2>
              <p className={`text-brand-body/70 text-lg leading-relaxed text-pretty ${isAr && 'font-cairo'}`}>
                {isAr
                  ? 'نحن نقوم بعكس هندسة متطلبات القبول في أفضل المدارس الدولية في مصر. من خلال المقابلات الوهمية وبناء المهارات المستهدفة، نضمن لأطفالك اجتياز تقييماتهم بثقة.'
                  : 'We reverse-engineer the admission requirements of the top international schools in Egypt. Through mock interviews and targeted skill-building, we ensure your child confidently passes their assessments.'}
              </p>
            </Reveal>
            <Reveal direction="left" delay={0.12}>
              <div className="bg-brand-purple/5 p-10 rounded-[40px] border border-brand-purple/10 shadow-soft">
                <h3 className={`text-xl font-bold text-brand-darkblue mb-6 ${isAr ? 'font-cairo' : 'font-display'}`}>
                  {isAr ? 'مجالات التركيز الرئيسية:' : 'Key Focus Areas:'}
                </h3>
                <Stagger className="space-y-4">
                  {[
                    { en: 'Phonics & Pre-Reading', ar: 'الصوتيات وما قبل القراءة', icon: '📖' },
                    { en: 'Early Numeracy & Logic', ar: 'الحساب المبكر والمنطق', icon: '🔢' },
                    { en: 'Fine & Gross Motor Skills', ar: 'المهارات الحركية الدقيقة والكبرى', icon: '✍️' },
                    { en: 'Expressive Language & Confidence', ar: 'اللغة التعبيرية والثقة بالنفس', icon: '🗣️' },
                  ].map((item, i) => (
                    <StaggerItem key={i}>
                      <div className="flex items-center gap-3 bg-white rounded-2xl px-4 py-3 shadow-sm">
                        <span className="text-xl">{item.icon}</span>
                        <span className={`text-brand-body font-bold ${isAr && 'font-cairo'}`}>{isAr ? item.ar : item.en}</span>
                      </div>
                    </StaggerItem>
                  ))}
                </Stagger>
              </div>
            </Reveal>
          </div>

          <div className="grid md:grid-cols-2 gap-12 lg:gap-24 items-center">
            <Reveal direction="right" className="order-2 md:order-1">
              <div className="grid grid-cols-2 gap-4">
                <div className="aspect-square rounded-[32px] overflow-hidden shadow-soft">
                  <ParallaxImage src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=500&auto=format&fit=crop" className="w-full h-full" intensity={16} />
                </div>
                <div className="aspect-square rounded-[32px] overflow-hidden translate-y-8 shadow-soft">
                  <ParallaxImage src="https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=500&auto=format&fit=crop" className="w-full h-full" intensity={16} />
                </div>
              </div>
            </Reveal>
            <Reveal direction="left" delay={0.12} className="order-1 md:order-2">
              <div className="w-16 h-16 bg-brand-cyan/20 rounded-2xl flex items-center justify-center text-3xl mb-6">🌍</div>
              <h2 className={`text-brand-darkblue mb-4 text-balance ${isAr ? 'font-cairo font-bold text-4xl' : 'font-display font-light text-[clamp(2rem,3vw,2.8rem)] leading-tight'}`}>
                {isAr ? 'الانغماس ثنائي اللغة' : 'Bilingual Immersion'}
              </h2>
              <p className={`text-brand-body/70 text-lg leading-relaxed mb-6 text-pretty ${isAr && 'font-cairo'}`}>
                {isAr
                  ? 'يتم تعلم اللغة بشكل طبيعي. تتميز فصولنا بناطقين أصليين يغمرون الأطفال في كل من اللغتين الإنجليزية والعربية طوال اليوم - من سرد القصص والأغاني إلى التفاعلات اليومية.'
                  : 'Language is best learned naturally. Our classrooms feature native speakers who immerse children in both English and Arabic throughout the day—from storytelling and songs to everyday interactions.'}
              </p>
              <div className="flex gap-4">
                <span className="px-5 py-2.5 bg-brand-offwhite rounded-xl font-bold text-sm shadow-sm">EN</span>
                <span className="px-5 py-2.5 bg-brand-offwhite rounded-xl font-bold font-cairo text-sm shadow-sm">عربي</span>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="py-28 px-6 mesh-ink grain text-white overflow-hidden relative">
        <div className="max-w-6xl mx-auto flex flex-col items-center text-center relative z-10">
          <Reveal>
            <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center text-3xl mb-6 mx-auto">📊</div>
            <h2 className={`mb-4 ${isAr ? 'font-cairo font-bold text-4xl lg:text-5xl' : 'font-display font-light text-4xl lg:text-5xl'}`}>
              {isAr ? 'التقدم اليومي والتقارير' : 'Daily Progress & Reports'}
            </h2>
            <p className={`text-brand-cyan/90 text-lg max-w-2xl mx-auto mb-12 ${isAr ? 'font-cairo' : 'font-outfit'}`}>
              {isAr ? 'لأنك لا تريد أن تفوت لحظة واحدة.' : 'Because you never want to miss a moment.'}
            </p>
          </Reveal>
          <Stagger className="grid md:grid-cols-3 gap-8 w-full text-left" >
            {[
              { icon: '📱', enT: 'Live Updates App', arT: 'تطبيق التحديثات المباشرة', enD: 'Get photos, meal logs, and nap times sent directly to your phone every day.', arD: 'احصل على الصور، وسجلات الوجبات، وأوقات القيلولة المرسلة مباشرة إلى هاتفك كل يوم.' },
              { icon: '📈', enT: 'Milestone Tracking', arT: 'تتبع الإنجازات', enD: "Detailed termly reports charting your child's emotional, physical, and cognitive growth.", arD: 'تقارير فصلية مفصلة ترسم نمو طفلك العاطفي والجسدي والمعرفي.' },
              { icon: '🤝', enT: 'Teacher Consultations', arT: 'استشارات المعلمين', enD: 'Regular 1-on-1 meetings to align our goals with your expectations for home.', arD: 'اجتماعات فردية منتظمة لمواءمة أهدافنا مع توقعاتك في المنزل.' },
            ].map((c, i) => (
              <StaggerItem key={i}>
                <div className="glass-dark p-8 rounded-[32px] h-full hover:-translate-y-2 transition-transform" dir={isAr ? 'rtl' : 'ltr'}>
                  <div className="text-3xl mb-4">{c.icon}</div>
                  <h4 className={`text-xl font-bold mb-2 ${isAr ? 'font-cairo' : 'font-display'}`}>
                    {isAr ? c.arT : c.enT}
                  </h4>
                  <p className={`text-white/70 text-sm leading-relaxed ${isAr ? 'font-cairo' : 'font-outfit'}`}>
                    {isAr ? c.arD : c.enD}
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
