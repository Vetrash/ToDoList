import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addToDo, setInput, clearRedactItem, addAlert,
} from '../store/todoSlice.js';
/* eslint-disable */
const ToDoRedactor = () => {
  //получаем данные стейта
  const redactItem = useSelector((state) => state.todos.redactItem);
  const alertlog = useSelector((state) => state.todos.alertLog);
  const todos = useSelector((state) => state.todos.todoItems);
  const dispatch = useDispatch();
  //создаем рефы для инпутов
  const topicInput = React.createRef();
  const descripInput = React.createRef();
  const statusInput = React.createRef();
  //функция для отслеживания ввода в инпут
  const handleChangeInput = (elem) => {
    const name = elem.target.dataset.state;//получаем названиее измененного инпута
    const { value } = elem.target;//получаем значение инпута
    dispatch(setInput({ name, value }));//вызываем функцию обновления стейта
  };
  //функция валидации
  const validate = (mode) => {
    const valid = {
      ValidLengthMin: false,
      ValidDublicateName: false,
    };//обьект для хранения информации валидации по параметрам
    let alert = '';//текст ошибок
    if (topicInput.current.value.length >= 4) {
      valid.ValidLengthMin = true; //проверка на минимальную длину названия задачи
    } else {
      alert += 'Название задачи менее 4-х символов. ';
    }
    const newTopic = topicInput.current.value;//получаем название задачи из инпута
    const indexRedactItem = todos.findIndex((x) => x.topic === newTopic);
    if (redactItem.id === '') {//проверяем есть ли данные о редактируемом обьекте, если id='' то обьект создается новый
      if (indexRedactItem === -1) {
        valid.ValidDublicateName = true; //проверяем что в списке нет задач с таким именем
      } else {
        alert += 'Задача с таким именем существует.';
      }
    } else if (indexRedactItem === -1) {//id!='' значит объект может редактируется
      valid.ValidDublicateName = true; //в списке нет обьекта с таким именем, значит обьект можно и сохранить как новый и отредактировать старый
    } else if (todos[indexRedactItem].id === redactItem.id && mode === 'redact') {//объект с таким именем существует тогда для режима редактирования проверяем что у дубликата тотже id. Для режима создания новой задачи значение проверки будет ложь
      valid.ValidDublicateName = true;
    } else {
      alert += 'Задача с таким именем существует.';
    }

    if (valid.ValidLengthMin !== true || valid.ValidDublicateName !== true) {
      dispatch(addAlert(alert)); //если хотябы одна из проверок не прошла обновляет значение ошибок и далее возвращаем false
    } else {
      return true; //все проверки успешно пройдены разрешаем дальнейшие действия
    }
    return false;
  };
  //функция для сохранения редактируемого элемента
  const redactToDoItem = () => {
    if (validate('redact')) { //делаем проверку
      const newToDo = { //собираем данные для сохранения
        id: redactItem.id,
        topic: topicInput.current.value,
        description: descripInput.current.value,
        status: statusInput.current.value,
      };
      dispatch(addToDo(newToDo)); //передаем в функцию сохранения ранее подготовленные данные
      dispatch(clearRedactItem()); // очишаем поля инпутов через store
    }
  };
  //функция сохранения новых дел
  const addNewToDo = () => {
    if (validate('add')) { //запускаем проверку 
      const newToDo = {//собираем данные
        id: '',//id пустой так как addToDo() выдаст новый id при его отсуствии
        topic: topicInput.current.value,
        description: descripInput.current.value,
        status: statusInput.current.value,
      };
      dispatch(addToDo(newToDo));//передаем в функцию сохранения ранее подготовленные данные
      dispatch(clearRedactItem());// очишаем поля инпутов через store
    }
  };
  //отрисовка кнопки сохранения изменений при редактировании
  const redactControlBtn = () => {
    if (redactItem.id !== '') {
      return (<button type="button" onClick={redactToDoItem}>Сохранить изменения</button>);
    }
    return '';
  };
  //отрисовка блока редактирования
  return (
    <div className="redactorConteiner">
      <p>Название задачи </p>
      <input
        type="text"
        ref={topicInput}
        data-state="topic"
        onChange={handleChangeInput}
        value={redactItem.topic}
      />
      <p>Описание задачи</p>
      <textarea
        ref={descripInput}
        data-state="description"
        onChange={handleChangeInput}
        value={redactItem.description}
      />
      <p>Статус задачи</p>
      <select ref={statusInput} data-state="status" onChange={handleChangeInput} name="select" value={redactItem.status}>
        <option value="waiting">ожидает</option>
        <option value="inProcess">в процессе</option>
        <option value="completed">выполнена</option>
      </select>
      <div className="alertlog">{alertlog}</div>
      <div className="redactor-control">
        {redactControlBtn()}
        <button type="button" onClick={addNewToDo}>Сохранить как новую задачу</button>
      </div>
    </div>
  );
};
export default ToDoRedactor;
