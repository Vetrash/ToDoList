import React from 'react';
import { useTranslation } from 'react-i18next';
import { Field, ErrorMessage } from 'formik';
import cn from 'classnames';

type propsType = {
    htmlFor: string;
    type: string;
    name:string;
    placeholder: string;
    errors: string | undefined;
    tLable: string;
}
const FormInputBlock = (props:propsType) => {
  const { htmlFor, errors, type, name, placeholder, tLable } = props;
  const { t } = useTranslation();

  return (
    <div className="form__inputBlock">
      <label
        className="form__label"
        htmlFor={htmlFor}
      >
        {t(tLable)}
      </label>
      <Field
        type={type}
        name={name}
        placeholder={placeholder}
        className={cn('form__control', { 'is-invalid': errors })}
      />
      <ErrorMessage name={name}>
        {() => (
          <div className="invalid-tooltip">
            {t(`error_${name}.${errors}`)}
          </div>
        )}
      </ErrorMessage>
    </div>
  );
};

export default FormInputBlock;
