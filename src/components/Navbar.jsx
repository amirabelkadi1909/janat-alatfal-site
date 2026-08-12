import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Menu, X, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const { language, toggleLanguage, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Determine active section based on scroll position
      const sections = ['home', 'about', 'programs', 'testimonials', 'faq', 'registration'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'home', label: t.nav.home },
    { id: 'about', label: t.nav.about },
    { id: 'programs', label: t.nav.programs },
    { id: 'testimonials', label: t.nav.testimonials },
    { id: 'faq', label: t.nav.faq },
    { id: 'registration', label: t.nav.registration }
  ];

  const handleLinkClick = (id) => {
    setIsOpen(false);
    const el = document.getElementById(id);
    if (el) {
      const offset = 80; // height of navbar
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
    <header 
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/80 backdrop-blur-lg shadow-sm py-3' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          
          {/* Logo / Kindergarten Name */}
          <div 
            onClick={() => handleLinkClick('home')}
            className="flex items-center gap-2 cursor-pointer select-none group"
          >
            
            <div className="flex flex-col">
              <span className="font-bold text-lg text-slate-800 leading-tight group-hover:text-rose-500 transition-colors">
                {language === 'ar' ? 'جنة الأطفال لشقر' : 'Jannat Al-Atfal'}
              </span>
              <span className="text-xs text-slate-400 font-medium">
                {language === 'ar' ? 'روضة أطفال نموذجية' : "Jardin d'enfants"}
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`relative px-3 py-2 rounded-full text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  activeSection === link.id
                    ? 'text-rose-500 font-bold'
                    : 'text-slate-600 hover:text-rose-400'
                }`}
              >
                {/* Bubble highlight for active link */}
                {activeSection === link.id && (
                  <motion.span
                    layoutId="activePill"
                    className="absolute inset-0 bg-rose-50 rounded-full -z-10"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                {link.label}
              </button>
            ))}
          </nav>

          {/* Language Switcher & Call to Action (Desktop) */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-slate-200 text-slate-600 hover:border-rose-300 hover:text-rose-500 transition-all font-semibold text-xs cursor-pointer bg-white"
            >
              <Globe className="w-4 h-4 text-slate-400" />
              <span>{language === 'ar' ? 'Français' : 'العربية'}</span>
            </button>

            {/* Quick Contact CTA */}
            <button
              onClick={() => handleLinkClick('registration')}
              className="px-4 py-2 rounded-full bg-rose-400 hover:bg-rose-500 text-white font-bold text-xs shadow-md shadow-rose-200 hover:shadow-lg hover:shadow-rose-300 transition-all cursor-pointer transform hover:-translate-y-0.5"
            >
              {t.hero.cta}
            </button>
          </div>

          {/* Mobile Actions Menu (Hamburger & Language) */}
          <div className="flex items-center lg:hidden gap-3">
            {/* Quick Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="p-2 rounded-full border border-slate-200 bg-white text-slate-600 text-xs font-bold flex items-center justify-center"
            >
              {language === 'ar' ? 'FR' : 'عربي'}
            </button>

            {/* Hamburger Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-xl text-slate-600 hover:text-rose-500 hover:bg-rose-50/50 transition-colors"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden border-t border-slate-100 bg-white/95 backdrop-blur-lg overflow-hidden shadow-inner"
          >
            <div className="px-4 pt-2 pb-6 space-y-1.5">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className={`w-full block text-start px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                    activeSection === link.id
                      ? 'bg-rose-50 text-rose-500 font-bold'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-rose-400'
                  }`}
                >
                  {link.label}
                </button>
              ))}
              <div className="pt-4 border-t border-slate-100 px-4">
                <button
                  onClick={() => handleLinkClick('registration')}
                  className="w-full text-center py-3 rounded-xl bg-rose-400 text-white font-bold text-sm shadow-md hover:bg-rose-500 transition-colors"
                >
                  {t.hero.cta}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
