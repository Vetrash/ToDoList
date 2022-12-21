import { FormikProps } from 'formik';
import { getDatabase, ref, push, set } from 'firebase/database';
import _ from 'lodash';
import TodoState from '../../../../../store/mobx/TodoState';
import { toastAddToDo, toastNotRedacted, toastOverdue, toastRedacted } from '../../../../../Components/toasts';
import getCheckStatys from './getCheckStatys';
import type { FormValues } from './ToDoRedactorTypes';
import upload from '../../../../fileMenu/upload';

export enum modeList { 'newItem', 'redactItem' }

const getPath = (mode: modeList) => {
  if (mode === modeList.newItem) {
    const db = getDatabase();
    const { key } = push(ref(db, 'data/'));
    return key;
  }
  return TodoState.redactedItemId;
};

const getToastByMode = (mode: modeList) => {
  if (mode === modeList.newItem) return toastAddToDo();
  return toastRedacted();
};

const safeTodo = (formik: FormikProps<FormValues>, mode: modeList) => {
  if (mode === modeList.newItem && !formik.isValid) return toastNotRedacted();
  if (mode === modeList.redactItem && !_.isEmpty(_.omit(formik.errors, 'topic'))) return toastNotRedacted();
  const { status, deadline } = formik.values;
  const statusRed = getCheckStatys(deadline, status);
  const files = _.cloneDeep(TodoState.uploadFile);
  const db = getDatabase();
  const localLogin = localStorage.getItem('login');
  const username = `${localLogin}@test.ru`;
  const clearForm = { topic: '', topicDublicate: '', description: '', status: 'waiting', deadline: '' };
  const path = getPath(mode);
  upload(path as string)
  set(ref(db, `data/${path}`), { ...formik.values, status: statusRed, files, username })
    .then(() => {
      TodoState.addItem({ ...formik.values, status: statusRed, files, id: path as string });
      formik.setValues(clearForm);
      getToastByMode(mode);
      if (statusRed === 'overdue') { toastOverdue();}
    })
    .catch(() => { toastNotRedacted(); });
};
export default safeTodo;
