import React from 'react';
import './App.css';
import './scrollStyle.css';
import { useSelector, useDispatch } from 'react-redux';
import ToDoItem from './ToDoItem/ToDoitem.js';
import ToDoRedactor from './ToDoItem/todoRedactor.js';
import { search } from './store/todoSlice.js';
/* eslint-disable */
const App = () => {
  const todos = useSelector((state) => state.todos.todoItems); //импортирую список задач из стора
  const dispatch = useDispatch(); //обьявляю диспачер
  //создаю рефы для ипута поиска и блока с задачами
  const todolist = React.createRef();
  const searchInput = React.createRef();
  //функция для изменения ширины блока с задачами
  const resize = (e) => {
    const width = todolist.current.style.width.slice(0, -2); //получаем численое значение ширины блока
    const newWidth = Number(width) + e.nativeEvent.offsetX;//получаем обновленую ширину блока
    if (Math.abs(e.nativeEvent.offsetX) < 50) {//после drop offsetX принимает большие значения, таким способом ограничиваю чувствительность 
      if (newWidth < 400) { //блок не должен быть менее 400px
        todolist.current.style.width = '400px';
      } else {
        todolist.current.style.width = `${Number(width) + e.nativeEvent.offsetX}px`;//изменяем ширину блока
      }
    }
  };
  //обертка для вызова поиска
  const searchToDoItem = () => {
    dispatch(search(searchInput.current.value));//вызываем функцию поиска в store
    searchInput.current.value = '';//очищаем поле поиска
  };
  //создаем разметку для списка дел
  const renderItems = todos.map((item) => (
    <ToDoItem
      key={item.id}
      id={item.id}
      topic={item.topic}
      status={item.status}
      selected={item.selected}
    />
  ));
//отрисовываем страницу
  return (
    <div className="todolist-conteiner">
      <div
        ref={todolist}
        className="todolist-block"
        style={{ width: '400px' }}
      >
        <div className="Title">Мои дела</div>
        <ul className="todolist">{renderItems}</ul>
        <div className="search-block">
          <p>Найти дело</p>
          <div className="btn-block">
            <input ref={searchInput} type="text" />
            <button type="button" onClick={searchToDoItem}>Найти!</button>
          </div>
        </div>
      </div>
      <div draggable="true" onDrag={resize} className="borderLine" />
      <div className="redactorToDO">
        <ToDoRedactor />
      </div>
    </div>
  );
};
export default App;
