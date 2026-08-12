import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export default function FAQ() {
  const { t } = useLanguage();
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 bg-white relative overflow-hidden select-none">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-800 tracking-tight animate-fade-in">
            {t.faq.title}
          </h2>
          <div className="h-1.5 bg-yellow-300 rounded-full mx-auto my-4 w-16" />
          <p className="text-lg sm:text-xl text-slate-500 font-semibold leading-relaxed">
            {t.faq.subtitle}
          </p>
        </div>

        {/* FAQ Accordions List */}
        <div className="space-y-4">
          {t.faq.items.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className={`rounded-2xl border transition-all ${
                  isOpen 
                    ? 'border-rose-200 bg-rose-50/20' 
                    : 'border-slate-200 bg-white hover:border-rose-100 hover:bg-slate-50/30'
                }`}
              >
                {/* Header/Question Trigger */}
                <button
                  onClick={() => toggleAccordion(idx)}
                  className="w-full flex items-center justify-between p-6 font-extrabold text-slate-700 hover:text-slate-900 transition-colors text-start text-base sm:text-lg cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span>{item.question}</span>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className={`p-1.5 rounded-full flex items-center justify-center ${
                      isOpen ? 'bg-rose-100 text-rose-500' : 'bg-slate-100 text-slate-400'
                    }`}
                  >
                    <ChevronDown className="w-5 h-5" />
                  </motion.div>
                </button>

                {/* Content/Answer Drawer */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ 
                        height: 'auto', 
                        opacity: 1,
                        transition: { height: { duration: 0.25, ease: 'easeOut' }, opacity: { duration: 0.2 } }
                      }}
                      exit={{ 
                        height: 0, 
                        opacity: 0,
                        transition: { height: { duration: 0.2, ease: 'easeIn' }, opacity: { duration: 0.15 } }
                      }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pt-1 text-slate-500 font-semibold text-sm sm:text-base leading-relaxed border-t border-slate-100/50">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
