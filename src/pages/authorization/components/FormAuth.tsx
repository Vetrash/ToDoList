import React from 'react';
import { Formik, Form } from 'formik';
import { useTranslation } from 'react-i18next';
import { authSchema } from '../../../Components/validate';
import SubmitAuth from './SubmitAuth';
import FormInputBlock from '../../../Components/FormInputBlock';

const FormAuth = () => {
  const { t } = useTranslation();
  return (
    <Formik
      initialValues={{ username: '', password: '' }}
      validationSchema={authSchema}
      onSubmit={(values, action) => SubmitAuth(values, action)}
    >
      {({ errors }) => (
        <Form className="form">
          <h1 className="form__title">{t('enter')}</h1>
          <FormInputBlock
            htmlFor="username"
            type="username"
            name="username"
            placeholder="Ваш ник"
            errors={errors.username}
            tLable="youNick"
          />
          <FormInputBlock
            htmlFor="password"
            type="password"
            name="password"
            placeholder="Пароль"
            errors={errors.password}
            tLable="password"
          />
          <button type="submit" className="btn">{t('entering')}</button>
        </Form>
      )}
    </Formik>
  );
};
export default FormAuth;
