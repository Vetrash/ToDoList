import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import FormAuth from './components/FormAuth';
import Header from '../Header';

const Authorization = () => {
  const { t } = useTranslation();
  return (
    <>
      <Header />
      <div className="form__conteiner">
        <FormAuth />
        <div className="form__subtitle">
          <div className="text-center">
            <span>{t('notAccount')}</span>
            <Link to="/signup">{t('signUp')}</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Authorization;
