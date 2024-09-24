import { useContext } from 'react';
import { LanguageContext } from './LanguageContext';

const useTranslation = () => {
  const { language } = useContext(LanguageContext);
  const translations = require(`../../locales/${language}.json`);
  return (key: string) => translations[key] || key;
};

export default useTranslation;
