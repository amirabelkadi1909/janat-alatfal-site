import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, ArrowLeft } from 'lucide-react';
import aboutClassImg from '../assets/about-class.jpg';

export default function Hero() {
  const { language, t } = useLanguage();

  const handleCTA = () => {
    const el = document.getElementById('registration');
    if (el) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section 
      id="home" 
      className="relative min-h-[92svh] pt-32 pb-20 flex items-center justify-center bg-gradient-to-b from-blue-50 via-rose-50/30 to-amber-50/20 overflow-hidden"
    >
      {/* --- Floating Background Elements --- */}
      
      {/* Clouds */}
      <div className="absolute top-20 left-[10%] w-28 opacity-45 pointer-events-none animate-float-slow">
        <svg viewBox="0 0 100 60" fill="#ffffff" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 40c0-6.6 5.4-12 12-12 .6 0 1.2 0 1.8.1C26.1 19 34.3 12 44 12c11.6 0 21 9.4 21 21v1c1.5-.7 3.2-1 5-1 7.2 0 13 5.8 13 13s-5.8 13-13 13H22c-6.6 0-12-5.4-12-12z" />
        </svg>
      </div>
      <div className="absolute top-44 right-[8%] w-36 opacity-35 pointer-events-none animate-float">
        <svg viewBox="0 0 100 60" fill="#ffffff" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 40c0-6.6 5.4-12 12-12 .6 0 1.2 0 1.8.1C26.1 19 34.3 12 44 12c11.6 0 21 9.4 21 21v1c1.5-.7 3.2-1 5-1 7.2 0 13 5.8 13 13s-5.8 13-13 13H22c-6.6 0-12-5.4-12-12z" />
        </svg>
      </div>

     
      {/* Stars */}
      <div className="absolute top-24 left-[35%] w-6 h-6 text-yellow-300 opacity-60 animate-spin-slow">
        <svg fill="currentColor" viewBox="0 0 24 24"><path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.787 1.4 8.168L12 18.896l-7.334 3.857 1.4-8.168L.132 9.21l8.2-1.192L12 .587z"/></svg>
      </div>
      <div className="absolute bottom-[35%] left-[15%] w-8 h-8 text-indigo-200 opacity-65 animate-pulse-slow">
        <svg fill="currentColor" viewBox="0 0 24 24"><path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.787 1.4 8.168L12 18.896l-7.334 3.857 1.4-8.168L.132 9.21l8.2-1.192L12 .587z"/></svg>
      </div>
      
      {/* Floating Leaves */}
      <div className="absolute top-[60%] right-[3%] w-8 h-8 text-emerald-300 opacity-55 animate-sway">
        <svg fill="currentColor" viewBox="0 0 24 24"><path d="M17 8C8 10 5 17 5 17s7-3 9-11c0 0-1 3-3 5 .3.2.7.2 1 .1 1.7-.7 3.3-3.6 5-6.1.1-.1.1-.1 0 0z"/></svg>
      </div>

      {/* --- Main Content Grid --- */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero Texts Column (Takes 7/12 on large screens) */}
          <div className="lg:col-span-7 text-center lg:text-start flex flex-col items-center lg:items-start select-none">
            
            {/* Playful Pill Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-50 border border-rose-100 text-rose-500 font-bold text-xs sm:text-sm mb-6"
            >
              <Sparkles className="w-4.5 h-4.5 animate-pulse-slow" />
              <span>{t.hero.stats_label}</span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-slate-800 tracking-tight leading-[1.2] lg:leading-[1.15]"
            >
              {language === 'ar' ? (
                <>
                  مرحبًا بكم في
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-yellow-400 to-emerald-400 font-extrabold drop-shadow-sm">
                    روضة جنة الأطفال لشقر
                  </span>
                </>
              ) : (
                <>
                  Bienvenue au
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-yellow-500 to-emerald-400 font-black">
                    Jardin d'enfants
                  </span>
                  <br />
                  <span className="text-slate-800 text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-wide">
                    Jannat Al-Atfal Lachgar
                  </span>
                </>
              )}
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 text-lg sm:text-xl text-slate-500 font-semibold max-w-xl leading-relaxed"
            >
              {t.hero.subtitle}
            </motion.p>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-10"
            >
              <button
                onClick={handleCTA}
                className="group flex items-center gap-2 px-8 py-4 rounded-full bg-rose-400 hover:bg-rose-500 text-white font-extrabold text-lg shadow-xl shadow-rose-200 hover:shadow-2xl hover:shadow-rose-300 transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
              >
                <span>{t.hero.cta}</span>
                {language === 'ar' ? (
                  <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1.5 transition-transform stroke-[2.5]" />
                ) : (
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform stroke-[2.5]" />
                )}
              </button>
            </motion.div>
          </div>

          {/* Hero Illustration Column (Takes 5/12 on large screens) */}
          <div className="lg:col-span-5 flex justify-center items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2, type: 'spring' }}
              className="w-full max-w-[420px] lg:max-w-none relative aspect-square"
            >
              {/* Playful rounded frame with floating effects */}
              <div className="absolute inset-2 rounded-[2.5rem] bg-gradient-to-tr from-rose-100 to-amber-100/50 -z-10 rotate-3 scale-95 border-2 border-white shadow-md animate-pulse-slow"></div>
              
              <img 
                src={aboutClassImg} 
                alt="Jardin d'enfants Jannat Al-Atfal" 
                className="w-full h-auto rounded-[2rem] object-cover border-4 border-white shadow-xl relative z-10"
              />
            </motion.div>
          </div>

        </div>
      </div>

      {/* Playful wave divider at bottom */}
      <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none pointer-events-none select-none">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[50px] fill-[#fafaf9]">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V0C26.9,8.75,55.05,18,83.19,26.09,157.06,47.7,233.1,69.57,321.39,56.44Z" />
        </svg>
      </div>
    </section>
  );
}
