/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import _ from 'lodash';

export const todoState = (state) => state.todo;

const todoSlice = createSlice({
  name: 'todo',
  initialState: {
    todoItems: { },
    redactedItemId: null,
    searchItemId: null,
    isShovedFileMenu: false,
    uploadFile: [],
    todoTopics: [],
  },
  reducers: {
    /**
     * добавить в стейт обьект с переданными параметрами
     * @param {{ topic: string, description: string, status : string, deadline: date }} action
     * данные для сохранения в объект
     */
    addItem(state, action) {
      const { topic, description, status, deadline } = action.payload;
      const id = _.uniqueId('itemToDo_');
      const files = _.cloneDeep(state.uploadFile);
      state.todoItems[id] = { id, topic, description, status, files, deadline };
      state.uploadFile = [];
      state.redactedItemId = null;
      state.todoTopics.push(topic);
    },
    /**
     * удалить из стейта задачу по Id
     * @param {{id:string}} action id элемента для удаления
     */
    deleteItems(state, action) {
      const id = action.payload;
      const lastTopic = state.todoItems[id].topic;
      const cloneTodoTopics = _.cloneDeep(state.todoTopics);
      state.todoTopics = cloneTodoTopics.filter((elem) => elem !== lastTopic);
      delete state.todoItems[id];
      state.uploadFile = [];
      state.redactedItemId = null;
    },
    /**
     * изменение данных в задаче по Id
     * @param {{id: string, topic: string, description: string,
     * status : string, deadline: date }} action
     * данные для сохранения в объект
     */
    redactItem(state, action) {
      const { id, topic, description, status, deadline } = action.payload;
      const lastTopic = state.todoItems[id].topic;
      const files = _.cloneDeep(state.uploadFile);
      state.todoItems[id] = { topic, description, files, status, deadline };
      state.uploadFile = [];
      state.redactedItemId = null;
      const cloneTodoTopics = _.cloneDeep(state.todoTopics);
      state.todoTopics = cloneTodoTopics.filter((elem) => elem !== lastTopic);
      state.todoTopics.push(topic);
    },
    /**
     * Устанавливаем в стейт id редактируемой задачи
     * @param {string} action id редактируемой задачи для установки
     */
    setRedactItemId(state, action) {
      state.redactedItemId = action.payload;
      state.uploadFile = state.todoItems[action.payload].files;
    },
    /**
     * true - включает файловое меню / false - выключает
     * @param {boolean} action значение для включения/выкдючение файлового меню
     */
    switchShowedFileMenu(state, action) {
      state.isShovedFileMenu = action.payload;
    },
    /**
     * сохраняем данные о файле в стейт
     * @param {{ name: string, url: URL }} action имя и ссылка на скачиваемый файл
     */
    loadFiles(state, action) {
      state.uploadFile.push(action.payload);
    },
    /**
     * Перезаписывает масив имен и ссылок скачиваемых файлов
     * @param {Array} action масив имен и ссылок объектов
     */
    updateListLoadFile(state, action) {
      state.uploadFile = action.payload;
    },
    /**
     * устанавливаем id объекта для выделения
     * @param {string} action id задачи для выделения
     */
    selectedItemById(state, action) {
      state.searchItemId = action.payload;
    },
  },
});

export const {
  addItem, deleteItems, redactItem, setRedactItemId,
  switchShowedFileMenu, loadFiles, selectedItemById,
  updateListLoadFile,
} = todoSlice.actions;
export default todoSlice.reducer;
