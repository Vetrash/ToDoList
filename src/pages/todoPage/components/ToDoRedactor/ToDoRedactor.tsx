import { useEffect } from 'react';
import { useFormik, FormikProps } from 'formik';
import { observer } from 'mobx-react-lite';
import TodoState from '../../../../store/mobx/TodoState';
import { nameSchema } from '../../../../Components/validate';
import RedactorBlock from './components/RedactorBlock';
import type { FormValues } from './components/ToDoRedactorTypes';

const loadRedactedForm = (formik: FormikProps<FormValues>) => {
  if (TodoState.redactedItemId !== null) {
    const id = TodoState.redactedItemId;
    const { topic } = TodoState.todoItems[id];
    formik.setValues({ ...TodoState.todoItems[id], topicDublicate: topic });
  }
};

const ToDoRedactor = observer(() => {
  const formik = useFormik({
    initialValues: {
      topic: '',
      topicDublicate: '',
      description: '',
      deadline: '',
      status: 'waiting',
    },
    onSubmit: () => { console.log('send'); },
    validationSchema: nameSchema(TodoState.todoTopics),
  });

  useEffect(() => { loadRedactedForm(formik); }, [TodoState.redactedItemId]);
  useEffect(() => { formik.setFieldValue('topicDublicate', formik.values.topic); }, [formik.values.topic]);
  useEffect(() => { formik.setFieldValue('topic', '', true); }, []);
  return RedactorBlock(formik);
});
export default ToDoRedactor;
