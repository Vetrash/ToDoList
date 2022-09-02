import { createSlice } from '@reduxjs/toolkit';
/* eslint-disable */
const todoSlice = createSlice({
  name: 'todos',
  initialState: {
    todoItems: [],
    lastId: 0,
    redactItem: {
      id: '',
      topic: '',
      description: '',
      status: '',
    },
    workingMode: 'view',
    alertLog: '',
  },
  reducers: {
    //функция сохранения дел
    addToDo(state, action) {
      const newtoDo = action.payload;
      if (newtoDo.id === '') { //проверка наличия id
        state.lastId += 1; //увеличиваем счетчик id
        newtoDo.id = state.lastId;// присваевыем полученный id новому делу
        state.todoItems.push(newtoDo);//добавляем в стейт новое дело
      } else {
        const { id } = state.redactItem;
        const indexRedactItem = state.todoItems.findIndex((x) => x.id === id); //ищем в масиве обьект с полученным id
        const EditToDo = { //создаем обьект с новыми данными
          id: state.redactItem.id,
          topic: state.redactItem.topic,
          description: state.redactItem.description,
          status: state.redactItem.status,
        };
        state.todoItems[indexRedactItem] = EditToDo; //заменяем старый объект новым
      }
    },
    //функция удаления
    removeToDO(state, action) {
      const id = Number(action.payload);
      if (id === state.redactItem.id) { //проверяем что удаляемый объект сейчас не редактируется
        alert('Нельзя удалить редактируемый объект');
      } else {
        const indexDeletItem = state.todoItems.findIndex((x) => x.id === id);//находим индекс удаляемого элемента
        const newArr = state.todoItems.filter((elem, index) => index !== indexDeletItem);//создаем новый масив без удаляемого объекта
        state.todoItems = newArr;//заменяем старый масив новым
      }
    },
    //функция выделения редактируемого элемента
    redactToDO(state, action) {
      state.alertLog = '';//чистим лог ошибок для выбраного обьекта
      const id = Number(action.payload);
      const indexRedactItem = state.todoItems.findIndex((x) => x.id === id);
      const DataRedactItem = state.todoItems[indexRedactItem];
      state.redactItem = DataRedactItem;//находим данные редактируемого объекта и передает в пеменную для их считывания при отрисовке
    },
    //обновление значения ипута через стейт
    setInput(state, action) {
      state.redactItem[action.payload.name] = action.payload.value;
    },
    //очиска данных о редактировании (переход в режим создания новых дел)
    clearRedactItem(state) {
      state.redactItem = {
        id: '',
        topic: '',
        description: '',
        status: '',
      };
      state.alertLog = '';
    },
    //обновление текста ошибки
    addAlert(state, action) {
      state.alertLog = action.payload;
    },
    //функция поиска по списку
    search(state, action) {
      const searchTopic = action.payload;
      let indexRedactItem = -1; //изначально думаем что искомого нет
      state.todoItems.forEach((elem, index) => {//перебираем список
        if (elem.topic === searchTopic) { indexRedactItem = index; }//обновляем индекс искомого объекта
        elem.selected = false;//удаляем выделение
      });
      if (indexRedactItem === -1) {//обьекта нет выкидываем сообщение
        alert('Такой задачи нет в списке. Пора её создать!');
      } else {//объект есть
        state.todoItems[indexRedactItem].selected = true;//даем выделение объекту
        alert(`Задача под номером ${indexRedactItem + 1}. Обрати внимание на рамку.`);//выкидываем сообщение
      }
    },
  },
});
//экспортируем слайсы и редюсер
export const {
  addToDo, removeToDO,
  redactToDO, setInput, clearRedactItem, addAlert, search,
} = todoSlice.actions;
export default todoSlice.reducer;
