import React from 'react';
import ListTodoItems from '../ListTodoItems';
import SearchToDoItem from '../searchToDoItem';
import UserState from '../../../../store/mobx/UserState';
import TrigerUIState from '../../../../store/mobx/TrigerUIState';
import selectToDos from '../selectToDos';
import ResizeMarker from './ResizeMarker';

const ToDoList = () => {
  const showRedactor = () => { TrigerUIState.switchShowedRedactor(true); };
  return (
    <div className="todolist-block" style={{ width: TrigerUIState.isStyleMobail ? '100%' : '50%' }}>
      <ResizeMarker />
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
  );
};
export default ToDoList;
