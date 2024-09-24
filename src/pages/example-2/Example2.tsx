import React, { FC } from 'react';
import { useLanguage } from '../../common/context/LanguageContext';

const Example2: FC = () => {
  const { translations } = useLanguage();

  return (
    <h1>{translations['example2']}</h1>
  );
};
export default Example2;
