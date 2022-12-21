import React from 'react';
import { getDatabase, remove, ref } from 'firebase/database';
import { toastNotDelete, toastDeleteToDo } from '../../../../../Components/toasts';
import TodoState from '../../../../../store/mobx/TodoState';

const deletItem = (e: React.MouseEvent<HTMLButtonElement>) => {
  const target = e.target as HTMLButtonElement;
  const selectId = target.dataset.id as string;
  if (selectId === TodoState.redactedItemId) {
    toastNotDelete();
    return;
  }
  const db = getDatabase();
  remove(ref(db, `data/${selectId}`))
    .then(() => {
      TodoState.deleteItems(selectId);
      toastDeleteToDo();
    })
    .catch((err) => {
      console.log(err);
    });
};
export default deletItem;
