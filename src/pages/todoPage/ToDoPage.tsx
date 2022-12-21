import React, { useEffect } from 'react';
import _ from 'lodash';
import { getDatabase, ref, query, equalTo, onValue, orderByChild } from 'firebase/database';
import FileMenu from '../fileMenu/FileMenu';
import TodoMain from './components/TodoMain';
import TodoState, { ActionObj } from '../../store/mobx/TodoState';
import UserState from '../../store/mobx/UserState';

const ToDoPage = () => {
  useEffect(() => {
    const localLogin = localStorage.getItem('login');
    const localToken = localStorage.getItem('token');
    UserState.signIn({ token: localToken as string, login: localLogin as string });
    if (['undefined', null].includes(localLogin)) return;

    const db = getDatabase();
    const recentPostsRef = query(ref(db, 'data'), orderByChild('username'), equalTo(`${localLogin}@test.ru`));
    onValue(
      recentPostsRef,
      (snapshot) => {
        if (snapshot.val() === null) return;
        const data: ActionObj = snapshot.val();
        const arrData = _.map(data, (value, id) => ({ ...value, id }));
        TodoState.newItemsByArr(arrData);
      },
      { onlyOnce: true },
    );
  }, []);

  return (
    <div className="todolist-conteiner">
      <FileMenu />
      <TodoMain />
    </div>
  );
};

export default ToDoPage;
