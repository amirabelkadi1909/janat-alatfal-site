import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Heart, Phone, MapPin, Globe } from 'lucide-react';

export default function Footer() {
  const { language, t } = useLanguage();

  const handleLinkClick = (id) => {
    const el = document.getElementById(id);
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
    <footer className="bg-slate-900 text-slate-400 py-16 relative overflow-hidden select-none border-t-4 border-rose-350">
      
      {/* Wave bottom decoration inside footer */}
      <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-blue-400 via-rose-400 to-yellow-400"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-start">
          
          {/* Logo & Description */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 cursor-pointer select-none" onClick={() => handleLinkClick('home')}>
              <div className="w-9 h-9 rounded-full bg-rose-500/20 flex items-center justify-center text-rose-400">
                <Heart className="w-5 h-5 fill-current" />
              </div>
              <span className="font-black text-white text-lg font-cairo">
                {language === 'ar' ? 'جنة الأطفال لشقر' : 'Jannat Al-Atfal'}
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed font-semibold">
              {t.footer.description}
            </p>
            {/* Social icons */}
            <div className="flex gap-3 mt-2">
              <a
                href="https://www.facebook.com/profile.php?id=100064926541053"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-slate-800 text-slate-400 hover:bg-rose-400 hover:text-white flex items-center justify-center transition-colors"
                aria-label="Facebook Profile"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.8c4.56-.93 8-4.96 8-9.8z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="flex flex-col gap-4">
            <h3 className="text-white font-extrabold text-base tracking-wide border-l-4 border-rose-400 pl-3 rtl:border-l-0 rtl:border-r-4 rtl:pl-0 rtl:pr-3">
              {t.footer.linksTitle}
            </h3>
            <ul className="space-y-2.5 text-sm font-semibold">
              {[
                { id: 'home', label: t.nav.home },
                { id: 'about', label: t.nav.about },
                { id: 'programs', label: t.nav.programs },
                { id: 'testimonials', label: t.nav.testimonials },
                { id: 'faq', label: t.nav.faq }
              ].map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => handleLinkClick(link.id)}
                    className="hover:text-white transition-colors cursor-pointer text-start"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details Column */}
          <div className="flex flex-col gap-4">
            <h3 className="text-white font-extrabold text-base tracking-wide border-l-4 border-rose-400 pl-3 rtl:border-l-0 rtl:border-r-4 rtl:pl-0 rtl:pr-3">
              {t.footer.contactTitle}
            </h3>
            <ul className="space-y-3.5 text-sm font-semibold">
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-rose-400 shrink-0 mt-1" />
                <span dir="ltr" className="text-start font-medium text-slate-300">
                  0699 78 86 30
                </span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-rose-400 shrink-0 mt-1" />
                <span className="text-slate-300 leading-tight">
                  {t.contact.addressValue}
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Globe className="w-4 h-4 text-rose-400 shrink-0 mt-1" />
                <span className="text-slate-300">
                  Souk Ahras, Algeria
                </span>
              </li>
            </ul>
          </div>

          {/* Opening Hours Column */}
          <div className="flex flex-col gap-4">
            <h3 className="text-white font-extrabold text-base tracking-wide border-l-4 border-rose-400 pl-3 rtl:border-l-0 rtl:border-r-4 rtl:pl-0 rtl:pr-3">
              {t.contact.openHours}
            </h3>
            <div className="p-4 rounded-2xl bg-slate-800/40 border border-slate-800 text-sm font-semibold">
              <p className="text-slate-300">{t.contact.openHoursValue}</p>
              <span className="text-xs text-rose-400 block mt-2 font-bold">
                {language === 'ar' ? 'مرحبًا بزيارتكم' : 'Bienvenue à vous'}
              </span>
            </div>
          </div>

        </div>

        {/* Bottom copyright details */}
        <div className="mt-16 pt-8 border-t border-slate-800 text-center text-xs sm:text-sm font-semibold">
          <p>{t.footer.rights}</p>
        </div>

      </div>
    </footer>
  );
}
