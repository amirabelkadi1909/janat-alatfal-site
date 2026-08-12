import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'framer-motion';
import { Phone, MapPin, Clock } from 'lucide-react';

export default function Contact() {
  const { language, t } = useLanguage();

  return (
    <section id="contact" className="py-24 bg-white relative overflow-hidden select-none">
      {/* Decorative vectors */}
      <div className="absolute top-10 left-[8%] w-56 h-56 bg-pastel-blue/20 rounded-full blur-3xl pointer-events-none -z-10"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-800 tracking-tight">
            {t.contact.title}
          </h2>
          <div className="h-1.5 bg-yellow-300 rounded-full mx-auto my-4 w-16" />
          <p className="text-lg sm:text-xl text-slate-500 font-semibold leading-relaxed">
            {t.contact.subtitle}
          </p>
        </div>

        {/* Two Columns Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Info Details Cards (Takes 5/12) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Phone Card */}
            <motion.a
              href="tel:0699788630"
              whileHover={{ x: language === 'ar' ? -6 : 6 }}
              className="p-6 rounded-3xl border border-slate-150 bg-slate-50/50 hover:bg-slate-50 hover:border-slate-300 transition-all flex items-center gap-5 text-start cursor-pointer"
            >
              <div className="w-12 h-12 rounded-2xl bg-sky-100 flex items-center justify-center text-sky-500 shrink-0 shadow-sm">
                <Phone className="w-6 h-6" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-slate-400 font-extrabold">{t.contact.phone}</span>
                <span className="text-base sm:text-lg font-black text-slate-700 dir-ltr text-start mt-0.5">
                  0699 78 86 30
                </span>
              </div>
            </motion.a>

            {/* Facebook Link Card */}
            <motion.a
              href="https://www.facebook.com/profile.php?id=100064926541053"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ x: language === 'ar' ? -6 : 6 }}
              className="p-6 rounded-3xl border border-rose-150 bg-rose-50/10 hover:bg-rose-50/30 hover:border-rose-350 transition-all flex items-center gap-5 text-start cursor-pointer"
            >
              <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-600 shrink-0 shadow-sm">
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.8c4.56-.93 8-4.96 8-9.8z"/>
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-slate-400 font-extrabold">{t.contact.facebook}</span>
                <span className="text-base sm:text-lg font-black text-slate-700 mt-0.5 hover:text-blue-600 transition-colors">
                  جنة الأطفال لشقر
                </span>
              </div>
            </motion.a>

            {/* Open Hours Card */}
            <div className="p-6 rounded-3xl border border-slate-150 bg-slate-50/50 flex items-center gap-5 text-start">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-500 shrink-0 shadow-sm">
                <Clock className="w-6 h-6" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-slate-400 font-extrabold">{t.contact.openHours}</span>
                <span className="text-sm sm:text-base font-black text-slate-700 mt-0.5">
                  {t.contact.openHoursValue}
                </span>
              </div>
            </div>

            {/* Address Location Card */}
            <div className="p-6 rounded-3xl border border-slate-150 bg-slate-50/50 flex items-center gap-5 text-start">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-500 shrink-0 shadow-sm">
                <MapPin className="w-6 h-6" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-slate-400 font-extrabold">{t.contact.address}</span>
                <span className="text-sm sm:text-base font-black text-slate-700 mt-0.5">
                  {t.contact.addressValue}
                </span>
              </div>
            </div>

          </div>

          {/* Interactive Map Vector Mockup (Takes 7/12) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 rounded-[2.5rem] border-2 border-slate-200 bg-slate-50/50 p-6 flex flex-col justify-between overflow-hidden shadow-inner relative min-h-[300px]"
          >
            {/* Visual Vector Map Drawing */}
            <div className="absolute inset-0 z-0">
              <svg viewBox="0 0 600 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full opacity-80">
                {/* Background Land */}
                <rect width="600" height="400" fill="#f1f5f9" />
                
                {/* Playful Roads */}
                <path d="M-50 150 C 150 160, 450 120, 650 140" stroke="#ffffff" strokeWidth="24" strokeLinecap="round" />
                <path d="M-50 150 C 150 160, 450 120, 650 140" stroke="#e2e8f0" strokeWidth="2" strokeLinecap="round" strokeDasharray="6 6" />

                <path d="M150 -50 C 160 150, 180 320, 200 450" stroke="#ffffff" strokeWidth="20" strokeLinecap="round" />
                <path d="M450 -50 C 440 150, 420 320, 400 450" stroke="#ffffff" strokeWidth="20" strokeLinecap="round" />
                
                <path d="M-50 300 H 650" stroke="#ffffff" strokeWidth="24" />
                <path d="M-50 300 H 650" stroke="#e2e8f0" strokeWidth="2" strokeDasharray="6 6" />

                {/* River/Water shape */}
                <path d="M-50 50 Q 150 80 300 30 T 650 40" stroke="#cbd5e1" strokeWidth="12" strokeLinecap="round" fill="none" opacity="0.6"/>

                {/* Green park zones */}
                <path d="M 40 40 Q 90 20 110 80 T 50 120 Z" fill="#d1fae5" />
                <path d="M 500 240 Q 550 250 560 320 T 480 350 Z" fill="#d1fae5" />

                {/* Building blocks */}
                <rect x="220" y="50" width="80" height="60" rx="8" fill="#e2e8f0" />
                <rect x="50" y="200" width="70" height="65" rx="8" fill="#e2e8f0" />
                <rect x="300" y="220" width="60" height="50" rx="8" fill="#e2e8f0" />

                {/* Kindergarten Site Building Highlight */}
                <rect x="220" y="200" width="110" height="75" rx="14" fill="#fed7aa" stroke="#fb923c" strokeWidth="2" />
                <text x="228" y="240" fill="#c2410c" fontSize="11" fontWeight="bold" fontFamily="sans-serif">
                  جنة الأطفال
                </text>

                {/* Bouncing Map Pin on our Building */}
                <g className="animate-bounce" style={{ transformOrigin: '275px 190px' }}>
                  <path d="M275 190 C265 190 255 175 255 160 C255 145 265 135 275 135 C285 135 295 145 295 160 C295 175 285 190 275 190 Z" fill="#EF4444" />
                  <circle cx="275" cy="160" r="7" fill="#FFFFFF" />
                </g>
                <ellipse cx="275" cy="192" rx="10" ry="3" fill="#cbd5e1" />
              </svg>
            </div>
            
            {/* Header tag */}
            <div className="relative z-10 self-start bg-slate-900/85 backdrop-blur-sm text-white px-4 py-2 rounded-xl text-xs font-bold border border-slate-700 select-none">
              📍 {language === 'ar' ? 'موقعنا الجغرافي بمدوروش' : 'Notre emplacement à Mdaourouch'}
            </div>
            
            {/* Direct Directions CTA link */}
            <a
              href="https://www.google.com/maps"
              target="_blank"
              rel="noopener noreferrer"
              className="relative z-10 self-end bg-white/95 text-slate-800 hover:bg-rose-400 hover:text-white px-5 py-3 rounded-2xl text-xs font-black shadow-lg shadow-slate-200/50 hover:shadow-xl transition-all cursor-pointer select-none"
            >
              {language === 'ar' ? 'عرض على خرائط Google' : 'Voir sur Google Maps'}
            </a>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
