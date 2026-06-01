'use client';
import React from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '@/components/LanguageProvider';

export default function CurriculumPage() {
  const { lang } = useLanguage();
  
  return (
    <div className="bg-brand-offwhite min-h-screen border-t border-gray-100">
      <section className="relative py-24 px-6 overflow-hidden bg-brand-indigo/10">
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`text-brand-darkblue mb-6 ${lang === 'en' ? 'font-fredoka text-[clamp(2.5rem,5vw,4.5rem)] leading-tight' : 'font-cairo font-bold text-[clamp(2.5rem,5vw,4rem)] leading-tight'}`}
          >
            {lang === 'en' ? 'How we learn.' : 'كيف نتعلم.'}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className={`text-brand-body/80 text-xl max-w-2xl mx-auto leading-relaxed ${lang === 'ar' && 'font-cairo'}`}
          >
            {lang === 'en' 
              ? 'Our curriculum is a beautiful blend of structured learning and child-led exploration. We prepare children for the top international schools through a holistic approach.'
              : 'منهجنا عبارة عن مزيج جميل من التعلم المنظم والاستكشاف الذي يقوده الطفل. نعد الأطفال لأفضل المدارس الدولية من خلال نهج شامل.'}
          </motion.p>
        </div>
      </section>

      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-24 items-center mb-24">
            <div>
              <div className="w-16 h-16 bg-brand-indigo/20 rounded-2xl flex items-center justify-center text-3xl mb-6">🏆</div>
              <h2 className={`text-brand-darkblue mb-4 ${lang === 'en' ? 'font-fredoka text-4xl' : 'font-cairo font-bold text-4xl'}`}>
                {lang === 'en' ? 'School Interview Prep' : 'التحضير للمقابلات المدرسية'}
              </h2>
              <p className={`text-brand-body/80 text-lg leading-relaxed ${lang === 'ar' && 'font-cairo'}`}>
                {lang === 'en' 
                  ? 'We reverse-engineer the admission requirements of the top international schools in Egypt. Through mock interviews and targeted skill-building, we ensure your child confidently passes their assessments.'
                  : 'نحن نقوم بعكس هندسة متطلبات القبول في أفضل المدارس الدولية في مصر. من خلال المقابلات الوهمية وبناء المهارات المستهدفة، نضمن لأطفالك اجتياز تقييماتهم بثقة.'}
              </p>
            </div>
            <div className="bg-brand-indigo/5 p-10 rounded-[40px] border border-brand-indigo/10 blob-2">
              <h3 className={`text-xl font-bold text-brand-darkblue mb-6 ${lang === 'en' ? 'font-fredoka' : 'font-cairo'}`}>
                {lang === 'en' ? 'Key Focus Areas:' : 'مجالات التركيز الرئيسية:'}
              </h3>
              <ul className="space-y-4">
                {[
                  { en: 'Phonics & Pre-Reading', ar: 'الصوتيات وما قبل القراءة', icon: '📖' },
                  { en: 'Early Numeracy & Logic', ar: 'الحساب المبكر والمنطق', icon: '🔢' },
                  { en: 'Fine & Gross Motor Skills', ar: 'المهارات الحركية الدقيقة والكبرى', icon: '✍️' },
                  { en: 'Expressive Language & Confidence', ar: 'اللغة التعبيرية والثقة بالنفس', icon: '🗣️' },
                ].map((item, i) => (
                  <li key={i} className="flex flex-wrap items-center gap-3">
                    <span className="text-xl">{item.icon}</span>
                    <span className={`text-brand-body font-bold ${lang === 'ar' && 'font-cairo'}`}>{lang === 'en' ? item.en : item.ar}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 lg:gap-24 items-center">
            <div className="order-2 md:order-1">
              <div className="grid grid-cols-2 gap-4">
                <div className="aspect-square bg-brand-pink/20 rounded-[32px] overflow-hidden"><img src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=400&auto=format&fit=crop" className="w-full h-full object-cover mix-blend-luminosity" /></div>
                <div className="aspect-square bg-brand-cyan/20 rounded-[32px] overflow-hidden translate-y-8"><img src="https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=400&auto=format&fit=crop" className="w-full h-full object-cover mix-blend-luminosity" /></div>
              </div>
            </div>
            <div className="order-1 md:order-2">
              <div className="w-16 h-16 bg-brand-cyan/20 rounded-2xl flex items-center justify-center text-3xl mb-6">🌍</div>
              <h2 className={`text-brand-darkblue mb-4 ${lang === 'en' ? 'font-fredoka text-4xl' : 'font-cairo font-bold text-4xl'}`}>
                {lang === 'en' ? 'Bilingual Immersion' : 'الانغماس ثنائي اللغة'}
              </h2>
              <p className={`text-brand-body/80 text-lg leading-relaxed mb-6 ${lang === 'ar' && 'font-cairo'}`}>
                {lang === 'en' 
                  ? 'Language is best learned naturally. Our classrooms feature native speakers who immerse children in both English and Arabic throughout the day—from storytelling and songs to everyday interactions.'
                  : 'يتم تعلم اللغة بشكل طبيعي. تتميز فصولنا بناطقين أصليين يغمرون الأطفال في كل من اللغتين الإنجليزية والعربية طوال اليوم - من سرد القصص والأغاني إلى التفاعلات اليومية.'}
              </p>
              <div className="flex gap-4">
                <span className="px-4 py-2 bg-brand-offwhite rounded-xl font-bold text-sm">EN</span>
                <span className="px-4 py-2 bg-brand-offwhite rounded-xl font-bold font-cairo text-sm">عربي</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-brand-darkblue text-white overflow-hidden">
         <div className="max-w-6xl mx-auto flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center text-3xl mb-6">📊</div>
            <h2 className={`mb-4 ${lang === 'en' ? 'font-fredoka text-4xl lg:text-5xl' : 'font-cairo font-bold text-4xl lg:text-5xl'}`}>
              {lang === 'en' ? 'Daily Progress & Reports' : 'التقدم اليومي والتقارير'}
            </h2>
            <p className="text-brand-cyan text-lg max-w-2xl mx-auto mb-12">
              {lang === 'en' ? "Because you never want to miss a moment." : "لأنك لا تريد أن تفوت لحظة واحدة."}
            </p>
            <div className="grid md:grid-cols-3 gap-8 w-full text-left" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
               <div className="bg-white/5 p-8 rounded-[32px]">
                 <div className="text-3xl mb-4">📱</div>
                 <h4 className={`text-xl font-bold mb-2 ${lang === 'en' ? 'font-fredoka' : 'font-cairo'}`}>
                   {lang === 'en' ? 'Live Updates App' : 'تطبيق التحديثات المباشرة'}
                 </h4>
                 <p className="text-white/70 text-sm">
                   {lang === 'en' ? 'Get photos, meal logs, and nap times sent directly to your phone every day.' : 'احصل على الصور، وسجلات الوجبات، وأوقات القيلولة المرسلة مباشرة إلى هاتفك كل يوم.'}
                 </p>
               </div>
               <div className="bg-white/5 p-8 rounded-[32px]">
                 <div className="text-3xl mb-4">📈</div>
                 <h4 className={`text-xl font-bold mb-2 ${lang === 'en' ? 'font-fredoka' : 'font-cairo'}`}>
                   {lang === 'en' ? 'Milestone Tracking' : 'تتبع الإنجازات'}
                 </h4>
                 <p className="text-white/70 text-sm">
                   {lang === 'en' ? 'Detailed termly reports charting your child’s emotional, physical, and cognitive growth.' : 'تقارير فصلية مفصلة ترسم نمو طفلك العاطفي والجسدي والمعرفي.'}
                 </p>
               </div>
               <div className="bg-white/5 p-8 rounded-[32px]">
                 <div className="text-3xl mb-4">🤝</div>
                 <h4 className={`text-xl font-bold mb-2 ${lang === 'en' ? 'font-fredoka' : 'font-cairo'}`}>
                   {lang === 'en' ? 'Teacher Consultations' : 'استشارات المعلمين'}
                 </h4>
                 <p className="text-white/70 text-sm">
                   {lang === 'en' ? 'Regular 1-on-1 meetings to align our goals with your expectations for home.' : 'اجتماعات فردية منتظمة لمواءمة أهدافنا مع توقعاتك في المنزل.'}
                 </p>
               </div>
            </div>
         </div>
      </section>
    </div>
  );
}
