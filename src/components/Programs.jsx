import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'framer-motion';
import { 
  GraduationCap, 
  Baby, 
  Paintbrush, 
  Palette, 
  Bookmark, 
  Languages, 
  Puzzle, 
  Activity 
} from 'lucide-react';

export default function Programs() {
  const { t } = useLanguage();

  // Mapping icons to the 8 programs
  const programIconItems = [
    { icon: GraduationCap, color: 'text-sky-500' },
    { icon: Baby, color: 'text-emerald-500' },
    { icon: Paintbrush, color: 'text-amber-500' },
    { icon: Palette, color: 'text-rose-500' },
    { icon: Bookmark, color: 'text-purple-500' },
    { icon: Languages, color: 'text-sky-500' },
    { icon: Puzzle, color: 'text-emerald-500' },
    { icon: Activity, color: 'text-amber-500' }
  ];

  // Specific border colors corresponding to backgrounds for a card feel
  const cardBorderAccents = [
    'hover:border-sky-300 border-sky-100/50 bg-[#f0f9ff]', // blue
    'hover:border-emerald-300 border-emerald-100/50 bg-[#ecfdf5]', // green
    'hover:border-amber-300 border-amber-100/50 bg-[#fffbeb]', // yellow
    'hover:border-rose-300 border-rose-100/50 bg-[#fff5f5]', // peach/red
    'hover:border-purple-300 border-purple-100/50 bg-[#faf5ff]', // lavender
    'hover:border-sky-300 border-sky-100/50 bg-[#f0f9ff]', // blue
    'hover:border-emerald-300 border-emerald-100/50 bg-[#ecfdf5]', // green
    'hover:border-amber-300 border-amber-100/50 bg-[#fffbeb]' // yellow
  ];

  // Circle icon wrapper colors
  const circleIconBg = [
    'bg-sky-100',
    'bg-emerald-100',
    'bg-amber-100',
    'bg-rose-100',
    'bg-purple-100',
    'bg-sky-100',
    'bg-emerald-100',
    'bg-amber-100'
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 25 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 120, damping: 15 }
    }
  };

  return (
    <section id="programs" className="py-24 bg-slate-50/50 relative overflow-hidden">
      {/* Decorative SVG shapes */}
      <div className="absolute top-1/3 left-[-10%] w-64 h-64 bg-pastel-yellow/30 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 right-[-10%] w-80 h-80 bg-pastel-green/20 rounded-full blur-3xl pointer-events-none"></div>

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
            {t.programs.title}
          </motion.h2>
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="h-1.5 bg-emerald-300 rounded-full mx-auto my-4"
          />
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg sm:text-xl text-slate-500 font-semibold leading-relaxed"
          >
            {t.programs.subtitle}
          </motion.p>
        </div>

        {/* Programs Cards Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {t.programs.items.map((item, idx) => {
            const IconComponent = programIconItems[idx]?.icon || GraduationCap;
            const iconColor = programIconItems[idx]?.color || 'text-sky-500';
            return (
              <motion.div
                key={idx}
                variants={cardVariants}
                whileHover={{ 
                  y: -8, 
                  boxShadow: "0 20px 25px -5px rgba(0,0,0,0.05), 0 10px 10px -5px rgba(0,0,0,0.02)",
                  rotate: idx % 2 === 0 ? 1 : -1
                }}
                className={`p-6 rounded-[2rem] border-2 transition-all duration-300 ${
                  cardBorderAccents[idx] || 'bg-white border-slate-100'
                }`}
              >
                {/* Playful Circle Icon Wrapper */}
                <div className={`w-14 h-14 rounded-2xl ${circleIconBg[idx]} flex items-center justify-center mb-6 shadow-inner transform group-hover:scale-110 transition-transform`}>
                  <IconComponent className={`w-8 h-8 ${iconColor}`} />
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-slate-800 mb-3 tracking-tight">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-slate-500 font-semibold leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}
