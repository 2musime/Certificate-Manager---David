import React, { createContext, useState, FC, useContext, useEffect, ReactNode } from 'react';
import en from '../../locales/en.json';
import de from "../../locales/de.json"

interface LanguageContextProps {
  language: string;
  setLanguage: (lang: string) => void;
  translations: { [key: string]: string };
}

const translationsMap: { [key: string]: { [key: string]: string } } = {
  en,
  de,
};

export const LanguageContext = createContext<LanguageContextProps>({
  language: 'en',
  setLanguage: () => {},
  translations: en,
});

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState('en');
  const [translations, setTranslations] = useState(translationsMap[language]);

  useEffect(() => {
    setTranslations(translationsMap[language]);
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, translations }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
