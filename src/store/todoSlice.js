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
    addItem(state, action) {
      const { topic, description, status, deadline } = action.payload;
      const id = _.uniqueId('itemToDo_');
      const files = _.cloneDeep(state.uploadFile);
      state.todoItems[id] = { id, topic, description, status, files, deadline };
      state.uploadFile = [];
      state.redactedItemId = null;
      state.todoTopics.push(topic);
    },
    deleteItems(state, action) {
      const id = action.payload;
      const lastTopic = state.todoItems[id].topic;
      const cloneTodoTopics = _.cloneDeep(state.todoTopics);
      state.todoTopics = cloneTodoTopics.filter((elem) => elem !== lastTopic);
      delete state.todoItems[id];
      state.uploadFile = [];
      state.redactedItemId = null;
    },
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
    setRedactItemId(state, action) {
      state.redactedItemId = action.payload;
      state.uploadFile = state.todoItems[action.payload].files;
    },
    switchShowedFileMenu(state, action) {
      state.isShovedFileMenu = action.payload;
    },
    loadFiles(state, action) {
      state.uploadFile.push(action.payload);
    },
    updateListLoadFile(state, action) {
      state.uploadFile = action.payload;
    },
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
