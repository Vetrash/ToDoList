import * as yup from 'yup';
/**
 * валидация введенных данных в окне радктирования
 * @param {Array} arr масив недоступных имен
 */
export const nameSchema = (arr) => yup.object().shape({
  topic: yup.string()
    .required('Заполните имя задачи. \n')
    .min(4, 'Имя задачи должно быть не менее 4-х символов. \n')
    .max(20, 'Имя задачи должно быть не более 20-х символов. \n')
    .notOneOf(arr, 'Задача с таким именем существует. \n'),

  topicDublicate: yup.string()
    .required('Заполните имя задачи. \n')
    .min(4, 'Имя задачи должно быть не менее 4-х символов. \n')
    .max(20, 'Имя задачи должно быть не более 20-х символов. \n'),

  deadline: yup.string()
    .required('Укажите дедлайн. \n'),
});

export default nameSchema;
