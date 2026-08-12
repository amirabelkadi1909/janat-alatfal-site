import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'framer-motion';
import { Shield, Users, Trophy, BookOpen, Star } from 'lucide-react';
import logoImg from '../assets/logo.png';

export default function About() {
  const { language, t } = useLanguage();

  // Define icons mapping for the 5 pillars
  const pillarIconItems = [
    { icon: Shield, color: 'text-sky-500' },
    { icon: Users, color: 'text-emerald-500' },
    { icon: Trophy, color: 'text-yellow-500' },
    { icon: BookOpen, color: 'text-rose-500' },
    { icon: Star, color: 'text-purple-500' }
  ];

  // Define pastel background accents for the pillars
  const pillarBgAccents = [
    'bg-sky-50 border-sky-100',
    'bg-emerald-50 border-emerald-100',
    'bg-amber-50 border-amber-100',
    'bg-rose-50 border-rose-100',
    'bg-purple-50 border-purple-100'
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section id="about" className="py-24 bg-white relative overflow-hidden">
      {/* Decorative absolute background shape */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-pastel-blue/20 rounded-full blur-3xl pointer-events-none -z-10"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-pastel-peach/25 rounded-full blur-3xl pointer-events-none -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 select-none">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl font-extrabold text-slate-800 tracking-tight"
          >
            {t.about.title}
          </motion.h2>
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="h-1.5 bg-rose-300 rounded-full mx-auto my-4"
          />
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg sm:text-xl text-slate-500 font-semibold leading-relaxed"
          >
            {t.about.subtitle}
          </motion.p>
        </div>

        {/* Introduction Paragraph & Playful graphic overlay */}
        <div dir="ltr" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          <motion.div 
            dir={language === 'ar' ? 'rtl' : 'ltr'}
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className={`lg:col-span-7 text-center ${language === 'ar' ? 'lg:text-right' : 'lg:text-left'}`}
          >
            <p className="text-lg text-slate-600 leading-relaxed font-semibold">
              {t.about.description}
            </p>
            <div className="mt-8 flex justify-center lg:justify-start gap-4">
              <span className="w-12 h-2 rounded-full bg-pastel-blue inline-block"></span>
              <span className="w-6 h-2 rounded-full bg-pastel-green inline-block"></span>
              <span className="w-3 h-2 rounded-full bg-pastel-yellow inline-block"></span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 flex justify-center"
          >
            <img 
              src={logoImg} 
              alt="روضة جنة الأطفال لشقر logo" 
              className="w-full max-w-[320px] h-auto object-contain drop-shadow-xl animate-float-slow"
            />
          </motion.div>
        </div>

        {/* Pillars Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center"
        >
          {t.about.pillars.map((pillar, idx) => {
            const IconComponent = pillarIconItems[idx]?.icon || Shield;
            const iconColor = pillarIconItems[idx]?.color || 'text-sky-500';
            return (
              <motion.div
                key={idx}
                variants={itemVariants}
                whileHover={{ 
                  y: -6, 
                  boxShadow: "0 12px 20px -8px rgba(0, 0, 0, 0.08)",
                  scale: 1.01
                }}
                className={`p-8 rounded-3xl border-2 flex flex-col items-center text-center transition-all ${
                  pillarBgAccents[idx] || 'bg-slate-50 border-slate-100'
                } ${
                  idx === 3 && 'md:col-span-2 lg:col-span-1 lg:max-w-none md:max-w-md md:mx-auto lg:mx-0'
                } ${
                  idx === 4 && 'md:col-span-2 lg:col-span-1 lg:max-w-none md:max-w-md md:mx-auto lg:mx-0'
                }`}
              >
                {/* Circle Icon Badge */}
                <div className="w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-6">
                  <IconComponent className={`w-8 h-8 ${iconColor}`} />
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-slate-800 mb-3">
                  {pillar.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-slate-500 font-semibold leading-relaxed">
                  {pillar.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}
