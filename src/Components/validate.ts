import * as yup from 'yup';

export const nameSchema = (arr : string[]) => yup.object().shape({
  topic: yup.string() // проверка для сохранения нового объекта
    .required('Заполните имя задачи. \n')
    .min(4, 'Имя задачи должно быть не менее 4-х символов. \n')
    .max(20, 'Имя задачи должно быть не более 20-х символов. \n')
    .notOneOf(arr, 'Задача с таким именем существует. \n'),

  topicDublicate: yup.string() // проверка для сохранения редактируемого объекта
    .required('Заполните имя задачи. \n')
    .min(4, 'Имя задачи должно быть не менее 4-х символов. \n')
    .max(20, 'Имя задачи должно быть не более 20-х символов. \n'),

  deadline: yup.string()
    .required('Укажите дедлайн. \n'),
});

export const authSchema = yup.object().shape({
  username: yup.string()
    .required('required'),
  password: yup.string()
    .required('required'),
});

export const SignupSchema = yup.object().shape({
  username: yup.string()
    .required('lengthError')
    .min(3, 'lengthError')
    .max(20, 'lengthError'),
  password: yup.string()
    .min(6, 'lengthError')
    .required('lengthError'),
  confirmPassword: yup.string()
    .min(6, 'lengthError')
    .required('mismatch')
    .oneOf([yup.ref('password'), null], 'mismatch'),
});

export default nameSchema;
