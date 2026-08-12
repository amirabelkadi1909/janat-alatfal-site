import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../translations';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  // Try to get saved language from localStorage, default to Arabic 'ar'
  const [language, setLanguage] = useState(() => {
    const savedLang = localStorage.getItem('lang');
    return savedLang === 'fr' ? 'fr' : 'ar';
  });

  useEffect(() => {
    // Save language to local storage
    localStorage.setItem('lang', language);
    
    // Set HTML page attributes
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);

  const toggleLanguage = () => {
    setLanguage((prevLang) => (prevLang === 'ar' ? 'fr' : 'ar'));
  };

  const t = translations[language];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
