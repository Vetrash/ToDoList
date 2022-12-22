import { Formik, Form } from 'formik';
import { useTranslation } from 'react-i18next';
import React from 'react';
import { SignupSchema } from '../../../Components/validate';
import SubmitSignUpIn from '../../authorization/components/SubmitSignUpIn';
import FormInputBlock from '../../../Components/FormInputBlock';

const FormSignUp = () => {
  const { t } = useTranslation();
  return (
    <Formik
      initialValues={{ username: '', password: '', confirmPassword: '' }}
      validationSchema={SignupSchema}
      onSubmit={(values, actions) => SubmitSignUpIn(values, actions)}
    >
      {({ errors }) => (
        <Form className="form">
          <h1 className="form__title">{t('signUp')}</h1>
          <FormInputBlock
            htmlFor="username"
            type="username"
            name="username"
            placeholder="Логин"
            errors={errors.username}
            tLable="username"
          />
          <FormInputBlock
            htmlFor="password"
            type="password"
            name="password"
            placeholder="Придумайте пароль"
            errors={errors.password}
            tLable="password"
          />
          <FormInputBlock
            htmlFor="confirmPassword"
            type="password"
            name="confirmPassword"
            placeholder="Повторите пароль"
            errors={errors.confirmPassword}
            tLable="confirmPassword"
          />
          <button type="submit" className="btn">
            {t('register')}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default FormSignUp;
