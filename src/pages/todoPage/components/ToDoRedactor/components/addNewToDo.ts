import { FormikProps } from 'formik';
import { getDatabase, ref, push } from 'firebase/database';
import _ from 'lodash';
import TodoState from '../../../../../store/mobx/TodoState';
import TrigerUIState from '../../../../../store/mobx/TrigerUIState';
import { toastAddToDo, toastNotRedacted, toastOverdue } from '../../../../../Components/toasts';
import getCheckStatys from './getCheckStatys';

interface FormValues {
  topic: string;
  topicDublicate: string;
  description: string;
  deadline: string;
  status: string;
}

const addNewToDo = (formik: FormikProps<FormValues>) => {
  if (formik.isValid) {
    const { topic, description, status, deadline } = formik.values;
    const statusRed = getCheckStatys(deadline, status);
    const files = _.cloneDeep(TodoState.uploadFile);
    const localLogin = localStorage.getItem('login');
    const db = getDatabase();
    push(ref(db, 'data/'), {
      topic,
      description,
      status: statusRed,
      files,
      deadline,
      username: `${localLogin}@test.ru`,
    })
      .then((res) => {
        TodoState.addItem({
          id: res.key as string,
          topic,
          description,
          status: statusRed,
          deadline,
          files,
        });
        formik.setValues({
          topic: '',
          topicDublicate: '',
          description: '',
          status: 'waiting',
          deadline: '',
        });
        toastAddToDo();
        if (statusRed === 'overdue') {
          toastOverdue();
        }
        if (window.innerWidth < 650) {
          TrigerUIState.switchShowedRedactor(false);
        }
      })
      .catch(() => {
        toastNotRedacted();
      });
  }
};

export default addNewToDo;
