import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import _ from 'lodash';
import cn from 'classnames';
import { todoState, setRedactItemId, deleteItems } from '../../store/todoSlice.js';
import { toastNotDelete, toastDeleteToDo } from '../tools/toasts.js';

/**
 * Вовзращает JSX элемент задачи с функцими удаления и редактирования
 * @param {{id: string}} props id задачи в виде строки
 * @returns JSX елемент
 */
const ToDoItem = (props) => {
  const { id } = props;
  const { todoItems, redactedItemId, searchItemId } = useSelector(todoState);
  const dispatch = useDispatch();
  const item = todoItems[id];
  /**
   * удаление задачи
   */
  const deletItem = (e) => {
    const selectId = e.target.dataset.id;
    if (selectId === redactedItemId) {
      toastNotDelete();
      return;
    }
    dispatch(deleteItems(selectId));
    toastDeleteToDo();
  };
  /**
   * Передаем ID редактируемой задачи
   */
  const redactItem = (e) => {
    const newId = e.target.dataset.id;
    dispatch(setRedactItemId(newId));
  };
  return (
    <li key={_.uniqueId()} className={cn('toDoItem', `${item.status}`, { selected: searchItemId === id })}>
      <div className="infoToDo">
        <p className="topic">{item.topic}</p>
        <div className="control-conteiner">
          <button type="button" className="control-img" onClick={deletItem} data-id={id}>
            <img data-id={id} src="./img/cancel.svg" alt="" />
          </button>
          <button type="button" className="control-img" onClick={redactItem} data-id={id}>
            <img data-id={id} src="./img/edit.svg" alt="edit item" />
          </button>
        </div>
      </div>
    </li>
  );
};

export default ToDoItem;
