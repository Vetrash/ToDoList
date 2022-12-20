import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import ListTodoItems from './ListTodoItems';
import ToDoRedactor from './ToDoRedactor/ToDoRedactor';
import resize from '../../../Components/resize';
import SearchToDoItem from './searchToDoItem';
import UserState from '../../../store/mobx/UserState';
import TrigerUIState from '../../../store/mobx/TrigerUIState';
import selectToDos from './selectToDos';

const TodoMain = observer(() => {
  const resizeWindows = () => {
    TrigerUIState.checkMobailWidth(window.innerWidth);
  };

  useEffect(() => {
    TrigerUIState.checkMobailWidth(window.innerWidth);
    window.addEventListener('resize', resizeWindows);
  });

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
            <button type="button" onClick={() => UserState.signOff()} className="title__button leftBtn">
              Выход
            </button>
            <button type="button" onClick={showRedactor} className="title__button rightBtn">
              Создать задачу
            </button>
          </div>
          <select onChange={(e) => selectToDos(e)} className="workSelector" name="work" id="work-select">
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
