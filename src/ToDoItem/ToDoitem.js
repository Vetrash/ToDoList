import React from 'react';

const ToDoItem = (props) => {
  const {
    id, selected, topic, status, redactedItem,
    todoItems, setRedactedItem, setTodoItems, setAlertLog,
  } = props;

  // обертка для функции удаления
  const deletitem = (e) => {
    const selectId = Number(e.target.dataset.id);
    if (selectId === redactedItem.id) {
      // проверяем что удаляемый объект сейчас не редактируется
      alert('Нельзя удалить редактируемый объект');
    } else {
      // находим индекс удаляемого элемента
      const indexDeletItem = todoItems.findIndex((x) => x.id === selectId);
      // создаем новый масив без удаляемого объекта
      const NewtodoItems = todoItems.filter((elem, index) => index !== indexDeletItem);
      setTodoItems(NewtodoItems);
    }
  };
  // обертка для функции редактирования
  const redactitem = (e) => {
    const Newid = Number(e.target.dataset.id);
    setAlertLog('');
    const indexRedactItem = todoItems.findIndex((x) => x.id === Newid);
    const redactItem = { ...todoItems[indexRedactItem] };
    setRedactedItem(redactItem);
  };
  const selectedClass = selected === true ? 'selected' : '';// проверка на выделение конкретного дела
  // отрисовка элемента списка
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
