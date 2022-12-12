import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import React from 'react';

const NotFound = () => {
  const { t } = useTranslation();

  return (
    <div className="d-flex flex-column h-100">
      <div className="text-center">
        <h1 className="h4 text-muted">{t('pageNotFound')}</h1>
        <p className="text-muted">
          {t('goTo')}
          <Link to="/">{t('onMainPage')}</Link>
        </p>
      </div>
    </div>
  );
};

export default NotFound;
