import React, { useEffect } from 'react';
import { getDatabase, ref, query, equalTo, onValue, orderByChild } from 'firebase/database';
import FileMenu from '../fileMenu/FileMenu';
import TodoMain from './components/TodoMain';
import TodoState, { ActionData } from '../../store/mobx/TodoState';
import UserState from '../../store/mobx/UserState';

const ToDoPage = () => {
  useEffect(() => {
    const localLogin = localStorage.getItem('login');
    const localToken = localStorage.getItem('token');
    if (UserState.login === '' || UserState.token === '') {
      UserState.signIn({ token: localToken as string, login: localLogin as string });
    }
    if (localLogin !== 'undefined' && localLogin !== null) {
      const db = getDatabase();
      const recentPostsRef = query(ref(db, 'data'), orderByChild('username'), equalTo(`${localLogin}@test.ru`));
      onValue(recentPostsRef, (snapshot) => {
        const data : ActionData = snapshot.val();
        if (data === null) return;
        const dataClearNull = Object.entries(data).filter((elem) => elem[1] !== null);
        const arrData = dataClearNull.map((elem) => ({ ...elem[1], id: elem[0] }));
        TodoState.newItemsByArr(arrData);
      }, { onlyOnce: true });
    }
  }, []);

  return (
    <div className="todolist-conteiner">
      <FileMenu />
      <TodoMain />
    </div>
  );
};

export default ToDoPage;
