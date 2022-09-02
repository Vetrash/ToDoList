import React from 'react';
import { useDispatch } from 'react-redux';
import { removeToDO, redactToDO } from '../store/todoSlice.js';
/* eslint-disable */
const ToDoItem = (props) => {
  const dispatch = useDispatch();
  const {
    id, selected, topic, status,
  } = props;
  //обертка для функции удаления
  const deletitem = (e) => {
    dispatch(removeToDO(e.target.dataset.id));
  };
  //обертка для функции редактирования
  const redactitem = (e) => {
    dispatch(redactToDO(e.target.dataset.id));
  };
  const selectedClass = selected === true ? 'selected' : '';//проверка на выделение конкретного дела
  //отрисовка элемента списка
  return (
    <li className={`toDoItem ${status} ${selectedClass}`}>
      <div className="infoToDo">
        <p className="topic">{topic}</p>
        <div className="control-conteiner">
          <button type="button" className="control-img" onClick={deletitem} data-id={id}>
            <img data-id={id} src="./img/cancel.svg" alt="" />
          </button>
          <button type="button" className="control-img" onClick={redactitem} data-id={id}>
            <img data-id={id} src="./img/edit.svg" alt="edit item" />
          </button>
        </div>
      </div>
    </li>
  );
};

export default ToDoItem;
