import * as yup from 'yup';

export const nameSchema = (arr) => yup.object().shape({
  topic: yup.string()
    .required('заполните имя задачи \n')
    .min(4, 'имя задачи должно быть не менее 4-х символов \n')
    .max(20, 'имя задачи должно быть не более 20-х символов \n')
    .notOneOf(arr, 'задача с таким именем существует \n'),

  topicDublicate: yup.string()
    .required('заполните имя задачи \n')
    .min(4, 'имя задачи должно быть не менее 4-х символов \n')
    .max(20, 'имя задачи должно быть не более 20-х символов \n'),

  deadline: yup.string()
    .required('укажите дедлайн \n'),
});

export default nameSchema;
