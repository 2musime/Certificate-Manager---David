import React, { FC } from 'react';
import { useLanguage } from '../../common/context/LanguageContext';

const Example3: FC = () => {
  const { translations } = useLanguage();

  return (
    <h1>{translations['example3']}</h1>
  );
};

export default Example3;
