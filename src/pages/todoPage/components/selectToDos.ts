import React from 'react';
import { getDatabase, ref, query, equalTo, onValue, orderByChild } from 'firebase/database';
import TodoState, { ActionData } from '../../../store/mobx/TodoState';

const selectToDos = (e: React.ChangeEvent) => {
  const localLogin = localStorage.getItem('login');
  const target = e.target as HTMLSelectElement;
  const type = target.value === 'all' ? '' : target.value;
  const db = getDatabase();
  const recentPostsRef = query(ref(db, 'data'), orderByChild('username'), equalTo(`${localLogin}@test.ru`));
  onValue(
    recentPostsRef,
    (snapshot) => {
      const data: ActionData = snapshot.val();
      const dataClearNull = Object.entries(data).filter((elem) => elem[1] !== null);
      const arrData = dataClearNull.map((elem) => ({ ...elem[1], id: elem[0] }));
      if (type !== '') {
        const filtArr = arrData.filter((elem) => elem.status === type);
        TodoState.newItemsByArr(filtArr);
        return;
      }
      TodoState.newItemsByArr(arrData);
    },
    { onlyOnce: true },
  );
};
export default selectToDos;
