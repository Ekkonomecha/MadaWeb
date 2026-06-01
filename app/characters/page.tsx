'use client';
import React from 'react';
import { useLanguage } from '@/components/LanguageProvider';
import { Reveal, Stagger, StaggerItem, Parallax } from '@/components/Motion';

export default function CharactersPage() {
  const { lang } = useLanguage();
  const isAr = lang === 'ar';

  const characters = [
    { id: 'brushi', emoji: '🎨', color: 'bg-brand-salmon', text: 'text-white',
      enName: 'Brushi', arName: 'براشي', enDomain: 'Creativity & Art', arDomain: 'الإبداع والفنون',
      enDesc: 'Brushi sees the world as a blank canvas. She encourages children to express their feelings through colors, building fine motor skills and creative confidence.',
      arDesc: 'ترى براشي العالم كقماش أبيض. تشجع الأطفال على التعبير عن مشاعرهم من خلال الألوان، وبناء المهارات الحركية الدقيقة والثقة الإبداعية.' },
    { id: 'ratio', emoji: '🔢', color: 'bg-brand-blue', text: 'text-white',
      enName: 'Ratio', arName: 'ريشيو', enDomain: 'Logic & Math', arDomain: 'المنطق والرياضيات',
      enDesc: 'Ratio loves counting blocks, sorting shapes, and finding patterns. He makes foundational numeracy fun and engaging.',
      arDesc: 'يحب ريشيو عد الكتل، وفرز الأشكال، والعثور على الأنماط. إنه يجعل الحساب الأساسي ممتعًا وجذابًا.' },
    { id: 'lingo', emoji: '🗣️', color: 'bg-brand-purple', text: 'text-white',
      enName: 'Lingo', arName: 'لنجو', enDomain: 'Languages & Phonics', arDomain: 'اللغات والصوتيات',
      enDesc: 'Chatty and bilingual, Lingo helps children navigate words. From early phonics to expressing complex thoughts in English and Arabic.',
      arDesc: 'ثرثار وثنائي اللغة، يساعد لنجو الأطفال على التنقل في الكلمات. من الصوتيات المبكرة إلى التعبير عن الأفكار المعقدة باللغتين الإنجليزية والعربية.' },
    { id: 'akktiv', emoji: '⚡', color: 'bg-brand-yellow', text: 'text-brand-darkblue',
      enName: 'Akktiv', arName: 'أكتيف', enDomain: 'Physical & Movement', arDomain: 'الرياضة والحركة',
      enDesc: 'Akktiv has endless energy! He guides children through outdoor play, balance exercises, and gross motor skill development.',
      arDesc: 'أكتيف لديه طاقة لا نهاية لها! يوجه الأطفال عبر اللعب في الهواء الطلق، وتمارين التوازن، وتنمية المهارات الحركية الكبرى.' },
    { id: 'cuddies', emoji: '❤️', color: 'bg-brand-palepink', text: 'text-brand-darkblue',
      enName: 'Cuddies', arName: 'كاديز', enDomain: 'Emotional IQ', arDomain: 'الذكاء العاطفي',
      enDesc: 'Cuddies is all about empathy. She teaches children how to identify their feelings, self-soothe, and show kindness to friends.',
      arDesc: 'كاديز تدور حول التعاطف. إنها تعلم الأطفال كيفية تحديد مشاعرهم، وتهدئة أنفسهم، وإظهار اللطف للأصدقاء.' },
    { id: 'scopii', emoji: '🌿', color: 'bg-brand-cyan', text: 'text-brand-darkblue',
      enName: 'Scopii', arName: 'سكوبي', enDomain: 'Science & Discovery', arDomain: 'العلوم والاكتشاف',
      enDesc: 'Scopii is a nature explorer with a magnifying glass. He turns the garden into a laboratory, fostering a deep curiosity for the natural world.',
      arDesc: 'سكوبي مستكشف طبيعة يحمل عدسة مكبرة. يحول الحديقة إلى مختبر، ويثير فضولًا عميقًا حول العالم الطبيعي.' },
  ];

  const blobs = ['blob-1', 'blob-2', 'blob-3'];

  return (
    <div className="bg-brand-offwhite min-h-screen">
      <section className="relative py-28 px-6 overflow-hidden mesh-cream grain">
        <Parallax speed={0.5} className="absolute -top-10 left-[10%] -z-0 hidden md:block">
          <div className="w-56 h-56 bg-brand-salmon/15 blob-1 animate-morph" />
        </Parallax>
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <Reveal>
            <span className="inline-block text-brand-pink text-xs tracking-[0.3em] uppercase font-bold mb-5 font-outfit">
              {isAr ? 'شخصياتنا' : 'Our Characters'}
            </span>
          </Reveal>
          <Reveal delay={0.05} as="h1" className={`text-brand-darkblue mb-6 text-balance ${isAr ? 'font-cairo font-bold text-[clamp(2.5rem,5vw,4rem)] leading-tight' : 'font-display font-light text-[clamp(2.6rem,5vw,4.5rem)] leading-[1.05]'}`}>
            {isAr ? 'شخصياتنا.' : 'Our Characters.'}
          </Reveal>
          <Reveal delay={0.12} as="p" className={`text-brand-body/70 text-xl max-w-2xl mx-auto leading-relaxed text-pretty ${isAr && 'font-cairo'}`}>
            {isAr
              ? 'تعرف على الركائز الستة الودية لمنهجنا. تعمل هذه الشخصيات كرفقاء في التعلم، وتجعل المفاهيم المجردة سهلة الوصول وممتعة.'
              : 'Meet the 6 friendly pillars of our curriculum. These characters act as learning companions, making abstract concepts accessible and fun.'}
          </Reveal>
        </div>
      </section>

      <section className="py-28 px-6">
        <Stagger className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {characters.map((char, i) => (
            <StaggerItem key={char.id}>
              <div className="bg-white rounded-[40px] p-8 text-center shadow-soft border border-black/5 hover:-translate-y-2 hover:shadow-luxe transition-all duration-300 group h-full">
                <div className={`w-32 h-32 mx-auto ${char.color} ${char.text} ${blobs[i % 3]} flex items-center justify-center text-6xl shadow-inner mb-8 group-hover:animate-morph transition-all`}>
                  {char.emoji}
                </div>
                <h3 className={`text-2xl text-brand-darkblue mb-2 ${isAr ? 'font-cairo font-bold' : 'font-display font-semibold'}`}>
                  {isAr ? char.arName : char.enName}
                </h3>
                <div className="inline-block px-4 py-1.5 bg-brand-offwhite rounded-full text-xs font-bold text-brand-body/60 mb-6 uppercase tracking-wider">
                  {isAr ? char.arDomain : char.enDomain}
                </div>
                <p className={`text-brand-body/70 leading-relaxed text-pretty ${isAr ? 'font-cairo' : 'font-outfit'}`}>
                  {isAr ? char.arDesc : char.enDesc}
                </p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </section>
    </div>
  );
}
