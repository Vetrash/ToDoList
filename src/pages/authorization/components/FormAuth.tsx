import React from 'react';
import { Formik, Field, ErrorMessage, Form } from 'formik';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';
import { authSchema } from '../../../Components/validate';
import UserState from '../../../store/mobx/UserState';

const FormAuth = () => {
  const { t } = useTranslation();
  return (
    <Formik
      initialValues={{ username: '', password: '' }}
      validationSchema={authSchema}
      onSubmit={(values, action) => {
        const auth = getAuth();
        const email = `${values.username}@test.ru`;
        signInWithEmailAndPassword(auth, email, values.password)
          .then((userCredential : any) => {
            const token = userCredential.user.accessToken;
            localStorage.setItem('token', token);
            localStorage.setItem('login', values.username);
            UserState.signIn({ token, login: values.username });
          })
          .catch(() => {
            action.setErrors({ username: 'UnknownUser' });
          });
      }}
    >
      {({ errors }) => (
        <Form className="form">
          <h1 className="form__title">{t('enter')}</h1>
          <div className="form__inputBlock">
            <label className="form__label" htmlFor="username">{t('youNick')}</label>
            <Field name="username" placeholder="Ваш ник" id="username" className={cn('form__control', { 'is-invalid': errors.username })} />
            <ErrorMessage name="username">{() => <div className="invalid-tooltip">{t(`errorlogin.${errors.username}`)}</div>}</ErrorMessage>
          </div>
          <div className="form__inputBlock">
            <label className="form__label" htmlFor="password">{t('password')}</label>
            <Field type="password" name="password" placeholder="Пароль" id="password" className={cn('form__control', { 'is-invalid': errors.password })} />
            <ErrorMessage name="password">{() => <div className="invalid-tooltip">{t(`errorPassword.${errors.password}`)}</div>}</ErrorMessage>
          </div>
          <button type="submit" className="btn">{t('entering')}</button>
        </Form>
      )}
    </Formik>
  );
};
export default FormAuth;
