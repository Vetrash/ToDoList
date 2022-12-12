import _ from 'lodash';
import { observer } from 'mobx-react-lite';
import React from 'react';
import ToDoItem from './ToDoItem';
import TodoState from '../../../store/mobx/TodoState';

const ListTodoItems = observer(() => {
  const idItems = Object.keys(TodoState.todoItems);
  const renderItems = idItems.map((id) => (
    <li key={_.uniqueId()}>
      <ToDoItem id={id} />
    </li>
  ));
  return (
    <ul className="todolist">{renderItems}</ul>
  );
});
export default ListTodoItems;
