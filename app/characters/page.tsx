'use client';
import React from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '@/components/LanguageProvider';

export default function CharactersPage() {
  const { lang } = useLanguage();
  
  const characters = [
    {
      id: "brushi", emoji: "🎨", color: "bg-brand-salmon",
      enName: "Brushi", arName: "براشي",
      enDomain: "Creativity & Art", arDomain: "الإبداع والفنون",
      enDesc: "Brushi sees the world as a blank canvas. She encourages children to express their feelings through colors, building fine motor skills and creative confidence.",
      arDesc: "ترى براشي العالم كقماش أبيض. تشجع الأطفال على التعبير عن مشاعرهم من خلال الألوان، وبناء المهارات الحركية الدقيقة والثقة الإبداعية."
    },
    {
      id: "ratio", emoji: "🔢", color: "bg-brand-blue text-white",
      enName: "Ratio", arName: "ريشيو",
      enDomain: "Logic & Math", arDomain: "المنطق والرياضيات",
      enDesc: "Ratio loves counting blocks, sorting shapes, and finding patterns. He makes foundational numeracy fun and engaging.",
      arDesc: "يحب ريشيو عد الكتل، وفرز الأشكال، والعثور على الأنماط. إنه يجعل الحساب الأساسي ممتعًا وجذابًا."
    },
    {
      id: "lingo", emoji: "🗣️", color: "bg-brand-purple text-white",
      enName: "Lingo", arName: "لنجو",
      enDomain: "Languages & Phonics", arDomain: "اللغات والصوتيات",
      enDesc: "Chatty and bilingual, Lingo helps children navigate words. From early phonics to expressing complex thoughts in English and Arabic.",
      arDesc: "ثرثار وثنائي اللغة، يساعد لنجو الأطفال على التنقل في الكلمات. من الصوتيات المبكرة إلى التعبير عن الأفكار المعقدة باللغتين الإنجليزية والعربية."
    },
    {
      id: "akktiv", emoji: "⚡", color: "bg-brand-yellow",
      enName: "Akktiv", arName: "أكتيف",
      enDomain: "Physical & Movement", arDomain: "الرياضة والحركة",
      enDesc: "Akktiv has endless energy! He guides children through outdoor play, balance exercises, and gross motor skill development.",
      arDesc: "أكتيف لديه طاقة لا نهاية لها! يوجه الأطفال عبر اللعب في الهواء الطلق، وتمارين التوازن، وتنمية المهارات الحركية الكبرى."
    },
    {
      id: "cuddies", emoji: "❤️", color: "bg-brand-palepink",
      enName: "Cuddies", arName: "كاديز",
      enDomain: "Emotional IQ", arDomain: "الذكاء العاطفي",
      enDesc: "Cuddies is all about empathy. She teaches children how to identify their feelings, self-soothe, and show kindness to friends.",
      arDesc: "كاديز تدور حول التعاطف. إنها تعلم الأطفال كيفية تحديد مشاعرهم، وتهدئة أنفسهم، وإظهار اللطف للأصدقاء."
    },
    {
      id: "scopii", emoji: "🌿", color: "bg-brand-cyan",
      enName: "Scopii", arName: "سكوبي",
      enDomain: "Science & Discovery", arDomain: "العلوم والاكتشاف",
      enDesc: "Scopii is a nature explorer with a magnifying glass. He turns the garden into a laboratory, fostering a deep curiosity for the natural world.",
      arDesc: "سكوبي مستكشف طبيعة يحمل عدسة مكبرة. يحول الحديقة إلى مختبر، ويثير فضولًا عميقًا حول العالم الطبيعي."
    }
  ];

  return (
    <div className="bg-brand-offwhite min-h-screen">
      <section className="relative py-24 px-6 overflow-hidden bg-brand-purple/10">
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`text-brand-darkblue mb-6 ${lang === 'en' ? 'font-fredoka text-[clamp(2.5rem,5vw,4.5rem)] leading-tight' : 'font-cairo font-bold text-[clamp(2.5rem,5vw,4rem)] leading-tight'}`}
          >
            {lang === 'en' ? 'Our Characters.' : 'شخصياتنا.'}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className={`text-brand-body/80 text-xl max-w-2xl mx-auto leading-relaxed ${lang === 'ar' && 'font-cairo'}`}
          >
            {lang === 'en' 
              ? 'Meet the 6 friendly pillars of our curriculum. These characters act as learning companions, making abstract concepts accessible and fun.'
              : 'تعرف على الركائز الستة الودية لمنهجنا. تعمل هذه الشخصيات كرفقاء في التعلم، وتجعل المفاهيم المجردة سهلة الوصول وممتعة.'}
          </motion.p>
        </div>
      </section>

      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {characters.map((char, i) => (
            <motion.div 
              key={char.id}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="bg-white rounded-[40px] p-8 text-center shadow-sm border border-gray-100 hover:-translate-y-2 transition-transform duration-300"
            >
              <div className={`w-32 h-32 mx-auto ${char.color} blob-${(i % 3) + 1} flex items-center justify-center text-6xl shadow-inner mb-8`}>
                {char.emoji}
              </div>
              <h3 className={`text-2xl text-brand-darkblue mb-2 ${lang === 'en' ? 'font-fredoka' : 'font-cairo font-bold'}`}>
                {lang === 'en' ? char.enName : char.arName}
              </h3>
              <div className="inline-block px-4 py-1.5 bg-gray-100 rounded-full text-xs font-bold text-gray-600 mb-6 uppercase tracking-wider">
                {lang === 'en' ? char.enDomain : char.arDomain}
              </div>
              <p className={`text-brand-body/80 leading-relaxed ${lang === 'ar' ? 'font-cairo' : 'font-outfit'}`}>
                {lang === 'en' ? char.enDesc : char.arDesc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
