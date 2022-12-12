import React, { useEffect } from 'react';
import { getDatabase, ref, query, equalTo, onValue, orderByChild } from 'firebase/database';
import { observer } from 'mobx-react-lite';
import ListTodoItems from './ListTodoItems';
import ToDoRedactor from './ToDoRedactor';
import resize from '../../../Components/resize';
import SearchToDoItem from './searchToDoItem';
import TodoState from '../../../store/mobx/TodoState';
import UserState from '../../../store/mobx/UserState';
import TrigerUIState from '../../../store/mobx/TrigerUIState';

type resType = { id: string, topic: string, description: string,
  status: string, deadline: string, files: { name: string, url: string }[]}[];

const TodoMain = observer(() => {
  const resizeWindows = () => { TrigerUIState.checkMobailWidth(window.innerWidth); };

  useEffect(() => {
    TrigerUIState.checkMobailWidth(window.innerWidth);
    window.addEventListener('resize', resizeWindows);
  });

  const selectToDos = (e : React.ChangeEvent) => {
    const localLogin = localStorage.getItem('login');
    const target = e.target as HTMLSelectElement;
    const type = target.value === 'all' ? '' : target.value;
    const db = getDatabase();
    const recentPostsRef = query(ref(db, 'data'), orderByChild('username'), equalTo(`${localLogin}@test.ru`));
    onValue(recentPostsRef, (snapshot) => {
      const data : resType = snapshot.val();
      const dataClearNull = Object.entries(data).filter((elem) => elem[1] !== null);
      const arrData = dataClearNull.map((elem) => ({ ...elem[1], id: elem[0] }));
      if (type !== '') {
        const filtArr = arrData.filter((elem) => elem.status === type);
        TodoState.newItemsByArr(filtArr);
        return;
      }
      TodoState.newItemsByArr(arrData);
    }, { onlyOnce: true });
  };

  const showRedactor = () => { TrigerUIState.switchShowedRedactor(true); };

  return (
    <>
      <div className="todolist-block" style={{ width: TrigerUIState.isStyleMobail ? '100%' : '50%' }}>
        <div className="resizeBlock">
          <div className="resizeBlock__conteiner">
            <img className="resizeBlock__arrow" src="./img/chevron_left.svg" alt="leftarrow" />
            <img className="resizeBlock__arrow" src="./img/chevron_right.svg" alt="leftarrow" />
          </div>
          <div draggable="true" onDrag={resize} className="resizeBlock__dragLine" />
        </div>
        <div className="title">
          <div className="title__buttonConteiner">
            <button type="button" onClick={() => UserState.signOff()} className="title__button leftBtn">Выход</button>
            <button type="button" onClick={showRedactor} className="title__button rightBtn">Создать задачу</button>
          </div>
          <select onChange={selectToDos} className="workSelector" name="work" id="work-select">
            <option value="all">Все мои дела</option>
            <option value="waiting">Мои не начатые дела</option>
            <option value="inProcess">Мои начатые дела</option>
            <option value="done">Мои выполненые дела</option>
            <option value="undone">Мои просроченные дела</option>
          </select>
        </div>
        <ListTodoItems />
        <SearchToDoItem />
      </div>
      <ToDoRedactor />
    </>
  );
});

export default TodoMain;
