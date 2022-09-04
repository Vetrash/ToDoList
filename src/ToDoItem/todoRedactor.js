/* eslint-disable */
import React from 'react';

const ToDoRedactor = (props) => {
  // деконструируем пропс
  const {
    setTodoItems, setRedactedItem, setAlertLog, setLastId,
    redactedItem, lastId, todoItems, alertLog,
  } = props;
  // создаем рефы для инпутов
  const topicInput = React.createRef();
  const descripInput = React.createRef();
  const statusInput = React.createRef();

  // функция для отслеживания ввода в инпут
  const handleChangeInput = (elem) => {
    const name = elem.target.dataset.state;// получаем название измененного инпута
    const { value } = elem.target;// получаем значение инпута
    const redactItem = { ...redactedItem };// создаем копию объекта
    redactItem[name] = value;// обнавляем параметр в копии
    setRedactedItem(redactItem);// переписываем стейт на новые данные
  };
  // функция сохранения изменений
  const addToDo = (obj) => {
    const newtoDo = obj;
    if (newtoDo.id === '') { // проверка наличия id
      let newId = lastId;// увеличиваем счетчик id
      newId += 1;
      setLastId(newId); // сохраняем новый счетчик id
      newtoDo.id = newId;// присваевыем полученный id новому делу
      const tdItems = [...todoItems];
      tdItems.push(newtoDo);
      setTodoItems(tdItems);// добавляем в стейт новое дело
    } else {
      const { id } = redactedItem;// получаем id редактируемого объекта
      // ищем в масиве обьект с полученным id
      const indexRedactItem = todoItems.findIndex((x) => x.id === id);
      const EditToDo = {
        // создаем обьект с новыми данными
        id: redactedItem.id,
        topic: redactedItem.topic,
        description: redactedItem.description,
        status: redactedItem.status,
      };
      const tdItems = todoItems;
      tdItems[indexRedactItem] = EditToDo;
      setTodoItems(tdItems);// заменяем старый объект новым
    }
    setRedactedItem({ // очищаем данные о редактируемом объекте
      id: '',
      topic: '',
      description: '',
      status: '',
    });
    setAlertLog('');// очищаем лог ошибок
  };
  // функция валидации
  const validate = (mode) => {
    const valid = {
      ValidLengthMin: false,
      ValidDublicateName: false,
    };// обьект для хранения информации валидации по параметрам
    let alert = '';// текст ошибок полученных в ходе валидации
    if (topicInput.current.value.length >= 4) {
      valid.ValidLengthMin = true; // проверка на минимальную длину названия задачи
    } else {
      alert += 'Название задачи менее 4-х символов. ';
    }
    const newTopic = topicInput.current.value;// получаем название задачи из инпута
    const indexRedactItem = todoItems.findIndex((x) => x.topic === newTopic);
    if (redactedItem.id === '') {
      // проверяем есть ли данные о редактируемом обьекте, если id='' то обьект создается новый
      if (indexRedactItem === -1) {
        valid.ValidDublicateName = true; // проверяем что в списке нет задач с таким именем
      } else {
        alert += 'Задача с таким именем существует.';
      }
    } else if (indexRedactItem === -1) {
      // id!='' значит объект может редактироваться
      valid.ValidDublicateName = true;
      // в списке нет обьекта с таким именем, обьект можно и сохранить как новый
    } else if (todoItems[indexRedactItem].id === redactedItem.id && mode === 'redact') {
      // объект с таким именем существует.
      // тогда для режима редактирования проверяем что у дубликата тот же id.
      // Для режима создания новой задачи значение проверки будет ложь
      valid.ValidDublicateName = true;
    } else {
      alert += 'Задача с таким именем существует.';
    }

    if (valid.ValidLengthMin !== true || valid.ValidDublicateName !== true) {
      // если хотябы одна из проверок не прошла обновляет значение ошибок и далее возвращаем false
      setAlertLog(alert);
    } else {
      return true; // все проверки успешно пройдены разрешаем дальнейшие действия
    }
    return false;
  };
  // функция для сохранения редактируемого элемента
  const redactToDoItem = () => {
    if (validate('redact')) { // делаем проверку
      const newToDo = { // собираем данные для сохранения
        id: redactedItem.id,
        topic: topicInput.current.value,
        description: descripInput.current.value,
        status: statusInput.current.value,
      };
      addToDo(newToDo); // передаем в функцию сохранения изменений
    }
  };
  // функция сохранения новых дел
  const addNewToDo = () => {
    if (validate('add')) { // запускаем проверку
      const newToDo = {
        // собираем данные
        id: '', // id пустой так как addToDo() выдаст новый id при его отсуствии
        topic: topicInput.current.value,
        description: descripInput.current.value,
        status: statusInput.current.value,
      };
      addToDo(newToDo);// передаем в функцию сохранения ранее подготовленные данные
    }
  };
  // отрисовка кнопки сохранения изменений при редактировании
  const redactControlBtn = () => {
    if (redactedItem.id !== '') {
      return (
        <>
          <button type="button" onClick={redactToDoItem}>Сохранить изменения</button>
          <button type="button" onClick={addNewToDo}>Сохранить как новую задачу</button>
        </>
      );
    }
    return (<button type="button" onClick={addNewToDo}>Сохранить как новую задачу</button>);
  };
  // отрисовка блока редактирования
  return (
    <div className="redactorConteiner">
      <p>Название задачи </p>
      <input
        type="text"
        ref={topicInput}
        data-state="topic"
        onChange={handleChangeInput}
        value={redactedItem.topic}
      />
      <p>Описание задачи</p>
      <textarea
        ref={descripInput}
        data-state="description"
        onChange={handleChangeInput}
        value={redactedItem.description}
      />
      <p>Статус задачи</p>
      <select ref={statusInput} data-state="status" onChange={handleChangeInput} name="select" value={redactedItem.status}>
        <option value="waiting">ожидает</option>
        <option value="inProcess">в процессе</option>
        <option value="completed">выполнена</option>
      </select>
      <div className="alertlog">{alertLog}</div>
      <div className="redactor-control">
        {redactControlBtn()}
      </div>
    </div>
  );
};
export default ToDoRedactor;
