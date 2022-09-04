/* eslint-disable */
import React, { useState } from 'react';
import './App.css';
import './scrollStyle.css';
import ToDoItem from './ToDoItem/ToDoitem.js';
import ToDoRedactor from './ToDoItem/todoRedactor.js';

const App = () => {
  // объявляю стейты
  const [todoItems, setTodoItems] = useState([]);
  const [lastId, setLastId] = useState(0);
  const [redactedItem, setRedactedItem] = useState(
    {
      id: '',
      topic: '',
      description: '',
      status: '',
    },
  );
  const [alertLog, setAlertLog] = useState('');

  // создаю рефы для ипута поиска и блока с задачами
  const todolist = React.createRef();
  const searchInput = React.createRef();
  // функция для изменения ширины блока с задачами
  const resize = (e) => {
    // получаем численое значение ширины блока
    const width = todolist.current.style.width.slice(0, -2);
    const newWidth = Number(width) + e.nativeEvent.offsetX;// получаем обновленую ширину блока
    if (Math.abs(e.nativeEvent.offsetX) < 50) {
      // после drop offsetX принимает большие значения, таким способом ограничиваю чувствительность
      const windowInnerWidth = window.innerWidth // ширину окна
      if (newWidth < 400) {
        // блок не должен быть менее 400px
        todolist.current.style.width = '400px';
      } else if ((newWidth / windowInnerWidth) < 0.7){
        todolist.current.style.width = `${Number(width) + e.nativeEvent.offsetX}px`;// изменяем ширину блока
      }
    }
  };
  // функция поиска по списку дел
  const searchToDoItem = () => {
    const searchTopic = searchInput.current.value;
    let indexRedactItem = -1; // изначально думаем что искомого нет
    const tdItems = [...todoItems]; // создаем переменную с данными стейта
    tdItems.forEach((elem, index) => {
      // перебираем список
      if (elem.topic === searchTopic) { indexRedactItem = index; }
      // обновляем индекс искомого объекта
      elem.selected = false;// удаляем выделение
    });
    if (indexRedactItem === -1) {
      // обьекта нет выкидываем сообщение
      alert('Такой задачи нет в списке. Пора её создать!');
    } else {
      // объект есть
      tdItems[indexRedactItem].selected = true;// даем выделение объекту
      setTodoItems(tdItems);// перезаписываем стейт с обновленными данными
      alert(`Задача под номером ${indexRedactItem + 1}. Обрати внимание на рамку.`);// выкидываем сообщение
    }
    searchInput.current.value = '';// очищаем поле поиска
  };
  // создаем разметку для списка дел
  const renderItems = todoItems.map((item) => (
    <ToDoItem
      key={item.id}
      id={item.id}
      topic={item.topic}
      status={item.status}
      selected={item.selected}
      todoItems={todoItems}
      setTodoItems={setTodoItems}
      redactedItem={redactedItem}
      setRedactedItem={setRedactedItem}
      alertLog={alertLog}
      setAlertLog={setAlertLog}
    />
  ));

  // отрисовываем страницу
  return (
    <div className="todolist-conteiner">
      <div
        ref={todolist}
        className="todolist-block"
        style={{ width: '400px' }}
      >
        <div className="conteiner-resize">
          <div className="arrow-conteiner">
            <img src="./img/chevron_left.svg" alt="leftarrow" />
            <img src="./img/chevron_right.svg" alt="leftarrow" />
          </div>
          <div draggable="true" onDrag={resize} className="borderLine" />
        </div>
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
      <div className="redactorToDO">
        <ToDoRedactor
          todoItems={todoItems}
          setTodoItems={setTodoItems}
          redactedItem={redactedItem}
          setRedactedItem={setRedactedItem}
          alertLog={alertLog}
          setAlertLog={setAlertLog}
          lastId={lastId}
          setLastId={setLastId}
        />
      </div>
    </div>
  );
};

export default App;
