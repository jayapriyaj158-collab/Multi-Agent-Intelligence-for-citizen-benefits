import React, { createContext, useContext, useState, useEffect } from 'react';
import { TRANSLATIONS, UIStrings, LanguageCode } from '../locales/translations';

export type { LanguageCode, UIStrings };

interface LanguageContextType {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  t: UIStrings;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<LanguageCode>(() => {
    const saved = localStorage.getItem('selectedLanguage') || localStorage.getItem('lang');
    if (saved === 'ta' || saved === 'hi' || saved === 'en') {
      return saved as LanguageCode;
    }
    return 'en';
  });

  const setLanguage = (lang: LanguageCode) => {
    localStorage.setItem('selectedLanguage', lang);
    localStorage.setItem('lang', lang);
    setLanguageState(lang);
  };

  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'selectedLanguage' || e.key === 'lang') {
        const newLang = e.newValue as LanguageCode;
        if (newLang === 'en' || newLang === 'ta' || newLang === 'hi') {
          setLanguageState(newLang);
        }
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within a LanguageProvider');
  return context;
};
