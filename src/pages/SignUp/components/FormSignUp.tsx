import { Formik, Field, ErrorMessage, Form } from 'formik';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';
import React from 'react';
import { SignupSchema } from '../../../Components/validate';
import UserState from '../../../store/mobx/UserState';

const FormSignUp = () => {
  const { t } = useTranslation();

  return (
    <Formik
      initialValues={{ username: '', password: '', confirmPassword: '' }}
      validationSchema={SignupSchema}
      onSubmit={(values, actions) => {
        const auth = getAuth();
        const email = `${values.username}@test.ru`;

        createUserWithEmailAndPassword(auth, email, values.password)
          .then((userCredential : any) => {
            const token = userCredential.user.accessToken;
            localStorage.setItem('token', token);
            localStorage.setItem('login', values.username);
            UserState.signIn({ token, login: values.username });
          })
          .catch(() => {
            actions.setErrors({ username: 'cloneLogin' });
          });
      }}
    >
      {({ errors }) => (
        <Form className="form">
          <h1 className="form__title">{t('signUp')}</h1>
          <div className="form__inputBlock">
            <label className="form__label" htmlFor="username">{t('nameUser')}</label>
            <Field type="username" name="username" placeholder="Логин" className={cn('form__control', { 'is-invalid': errors.username })} />
            <ErrorMessage name="username">{() => <div className="invalid-tooltip">{t(`errorlogin.${errors.username}`)}</div>}</ErrorMessage>
          </div>
          <div className="form__inputBlock">
            <label className="form__label" htmlFor="password">{t('password')}</label>
            <Field type="password" name="password" className={cn('form__control', { 'is-invalid': errors.password })} />
            <ErrorMessage name="password">{() => <div className="invalid-tooltip">{t(`errorPassword.${errors.password}`)}</div>}</ErrorMessage>
          </div>
          <div className="form__inputBlock">
            <label className="form__label" htmlFor="confirmPassword">{t('confirmPassword')}</label>
            <Field type="password" name="confirmPassword" className={cn('form__control', { 'is-invalid': errors.confirmPassword })} />
            <ErrorMessage name="confirmPassword">{() => <div className="invalid-tooltip">{t(`errorConfirmPassword.${errors.confirmPassword}`)}</div>}</ErrorMessage>
          </div>
          <button type="submit" className="btn">{t('register')}</button>
        </Form>
      )}
    </Formik>
  );
};

export default FormSignUp;
