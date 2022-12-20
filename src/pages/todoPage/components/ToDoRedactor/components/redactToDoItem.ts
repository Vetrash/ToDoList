import { FormikProps } from 'formik';
import { getDatabase, ref, set } from 'firebase/database';
import _ from 'lodash';
import TodoState from '../../../../../store/mobx/TodoState';
import TrigerUIState from '../../../../../store/mobx/TrigerUIState';
import getCheckStatys from './getCheckStatys';
import { toastRedacted, toastNotRedacted, toastOverdue } from '../../../../../Components/toasts';

interface FormValues {
  topic: string;
  topicDublicate: string;
  description: string;
  deadline: string;
  status: string;
}

const redactToDoItem = (formik: FormikProps<FormValues>) => {
  if (!_.has(formik.errors, 'topicDublicate')) {
    const { topic, description, status, deadline } = formik.values;
    const statusRed = getCheckStatys(deadline, status);
    const files = _.cloneDeep(TodoState.uploadFile);
    const db = getDatabase();
    const localLogin = localStorage.getItem('login');
    set(ref(db, `data/${TodoState.redactedItemId}`), {
      topic,
      description,
      status: statusRed,
      files,
      deadline,
      username: `${localLogin}@test.ru`,
    })
      .then(() => {
        TodoState.redactItem({
          topic,
          description,
          status: statusRed,
          id: TodoState.redactedItemId as string,
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
        toastRedacted();
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

export default redactToDoItem;
