import React from 'react';
import ListTodoItems from './ListTodoItems.js';
import ToDoRedactor from './ToDoRedactor.js';
import resize from '../tools/resize.js';
import SearchToDoItem from '../tools/searchToDoItem.js';

const TodoMain = () => {
  const isResizebleWidth = window.innerWidth > 600;
  const styleWidth = isResizebleWidth ? '50%' : '100%';

  return (
    <>
      <div className="todolist-block" style={{ width: styleWidth }}>
        <div className="resizeBlock">
          <div className="resizeBlock__conteiner">
            <img className="resizeBlock__arrow" src="./img/chevron_left.svg" alt="leftarrow" />
            <img className="resizeBlock__arrow" src="./img/chevron_right.svg" alt="leftarrow" />
          </div>
          <div draggable="true" onDrag={resize} className="resizeBlock__dragLine" />
        </div>
        <div className="title">Мои дела</div>
        <ListTodoItems />
        <SearchToDoItem />
      </div>
      <ToDoRedactor />
    </>
  );
};

export default TodoMain;
