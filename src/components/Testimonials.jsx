import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

export default function Testimonials() {
  const { language } = useLanguage();

  const reviews = [
    {
      id: 1,
      nameAr: "Joude Ali Reh",
      nameFr: "Joude Ali Reh",
      relationAr: "ولي أمر",
      relationFr: "Parent d'élève",
      textAr: "ربي يبارك فيهم و شكرا على مجهوداتكم و حسن معاملتكم",
      textFr: "Que Dieu les bénisse, merci pour vos efforts et votre excellent traitement.",
      avatarBg: "bg-rose-100 text-rose-500"
    },
    {
      id: 2,
      nameAr: "Nursin Anis",
      nameFr: "Nursin Anis",
      relationAr: "ولي أمر",
      relationFr: "Parent d'élève",
      textAr: "شكرا للمربية على المجهودات المبذولة تحية اجلال وتقدير",
      textFr: "Merci à l'éducatrice pour les efforts déployés. Hommage et appréciation.",
      avatarBg: "bg-sky-100 text-sky-500"
    },
    {
      id: 3,
      nameAr: "Yanis Man",
      nameFr: "Yanis Man",
      relationAr: "ولي أمر",
      relationFr: "Parent d'élève",
      textAr: "انا متأكد ان الجديد سيكون حاضر بقوة",
      textFr: "Je suis sûr que la nouveauté sera présente en force.",
      avatarBg: "bg-emerald-100 text-emerald-500"
    }
  ];

  return (
    <section id="testimonials" className="py-24 bg-slate-50/50 relative overflow-hidden select-none">
      {/* Background blobs */}
      <div className="absolute top-10 left-[5%] w-72 h-72 bg-pastel-peach/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-800 tracking-tight">
            {language === 'ar' ? 'آراء أولياء الأمور' : 'Témoignages des Parents'}
          </h2>
          <div className="h-1.5 bg-rose-300 rounded-full mx-auto my-4 w-20" />
          <p className="text-lg sm:text-xl text-slate-500 font-semibold leading-relaxed">
            {language === 'ar' 
              ? 'ثقة الأولياء هي سر نجاحنا وتميزنا المستمر' 
              : 'La confiance des parents est le secret de notre succès'}
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, idx) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              whileHover={{ y: -5 }}
              className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm relative flex flex-col justify-between"
            >
              {/* Quote Mark Decoration */}
              <Quote className="absolute top-6 right-6 left-auto text-slate-100 w-12 h-12 rotate-180 -z-0 pointer-events-none" />

              <div className="relative z-10">
                {/* Five Stars Rating */}
                <div className="flex gap-1 mb-5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                {/* Testimonial Text */}
                <p className="text-slate-500 font-semibold leading-relaxed text-sm sm:text-base">
                  "{language === 'ar' ? review.textAr : review.textFr}"
                </p>
              </div>

              {/* Author Section */}
              <div className="flex items-center gap-4 mt-8 pt-6 border-t border-slate-100 relative z-10">
                {/* Stylized initials avatar */}
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-lg shadow-inner ${review.avatarBg}`}>
                  {language === 'ar' ? review.nameAr.charAt(0) : review.nameFr.split(' ').pop().charAt(0)}
                </div>

                <div className="flex flex-col text-start">
                  <span className="font-extrabold text-slate-800 text-sm sm:text-base">
                    {language === 'ar' ? review.nameAr : review.nameFr}
                  </span>
                  <span className="text-xs text-slate-400 font-bold">
                    {language === 'ar' ? review.relationAr : review.relationFr}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
