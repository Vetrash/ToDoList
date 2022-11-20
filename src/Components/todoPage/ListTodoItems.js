import _ from 'lodash';
import React from 'react';
import { useSelector } from 'react-redux';
import { todoState } from '../../store/todoSlice.js';
import ToDoItem from './ToDoItem.js';

const ListTodoItems = () => {
  const { todoItems } = useSelector(todoState);
  const idItems = Object.keys(todoItems);
  const renderItems = [];
  idItems.forEach((id) => { renderItems.push(<ToDoItem id={id} />); });
  if (renderItems.length === 0) { renderItems.push(<li key={_.uniqueId()} />); }
  return (
    <ul className="todolist">{renderItems}</ul>
  );
};
export default ListTodoItems;
