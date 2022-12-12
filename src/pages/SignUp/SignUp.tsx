import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import FormSignUp from './components/FormSignUp';
import Header from '../Header';

const SignUp = () => {
  const { t } = useTranslation();
  return (
    <>
      <Header />
      <div className="form__conteiner">
        <FormSignUp />
        <div className="form__subtitle">
          <span className="text-center mb-0">{t('haveAcount')}</span>
          <Link to="/" className="text-center d-block">{t('enter')}</Link>
        </div>
      </div>
    </>
  );
};

export default SignUp;
