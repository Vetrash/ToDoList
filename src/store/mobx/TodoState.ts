/* eslint lines-between-class-members: ["error", "always", { "exceptAfterSingleLine": true }] */
import _ from 'lodash';
import { makeAutoObservable } from 'mobx';

type ActionTodo = {
  id: string;
  topic: string;
  description: string;
  status: string;
  deadline: string;
  files: { name: string; url: string }[];
};
export type ActionData = ActionTodo[];
export type ActionObj = { [id: string]: ActionTodo };

class TodoState {
  todoItems: { [id: string]: ActionTodo } = {};
  redactedItemId: null | string = null;
  searchItemId: null | string = null;
  uploadFile: { name: string; url: string }[] = [];
  todoTopics: string[] = [];
  newItemId: null | string = null;
  uploadFileData: File[] = [];

  constructor() { makeAutoObservable(this); }

  addFileData(Files: File[]) { this.uploadFileData = [...this.uploadFileData, ...Files]; }

  updateFileData(Files: File[]) { this.uploadFileData = Files; }

  addItem(payload: ActionTodo) {
    const { id, topic, description, status, deadline, files } = payload;
    this.todoItems[id] = { id, topic, description, files, status, deadline };
    this.uploadFile = [];
    this.redactedItemId = null;
    this.newItemId = null;
    this.todoTopics.push(topic);
  }

  newItemsByArr(payload: ActionData) {
    Object.keys(this.todoItems).forEach((key) => {
      delete this.todoItems[key];
    });
    this.todoTopics.length = 0;
    payload.forEach((elem) => {
      const { id, topic, description, status, deadline, files } = elem;
      const checkFiles = typeof files === 'undefined' ? [] : files;
      this.addItem({ id, topic, description, status, files: checkFiles, deadline });
    });
  }

  clearItems() { this.todoItems = {}; }

  deleteItems(id: string) {
    const lastTopic = this.todoItems[id].topic;
    const cloneTodoTopics = _.cloneDeep(this.todoTopics);
    this.todoTopics = cloneTodoTopics.filter((elem) => elem !== lastTopic);
    delete this.todoItems[id];
    this.uploadFile = [];
    this.redactedItemId = null;
    this.newItemId = null;
  }

  redactItem(payload: ActionTodo) {
    const { id } = payload;
    const lastTopic = this.todoItems[id].topic;
    const files = _.cloneDeep(this.uploadFile);
    this.addItem({ ...payload, files });
    const cloneTodoTopics = _.cloneDeep(this.todoTopics);
    this.todoTopics = cloneTodoTopics.filter((elem) => elem !== lastTopic);
  }

  setRedactItemId(id: string) {
    this.redactedItemId = id;
    this.newItemId = id;
    this.uploadFile = this.todoItems[id].files;
  }

  setNewitemId(id: string) { this.newItemId = id; }

  loadFiles(payload: { name: string; url: string }) { this.uploadFile.push(payload); }

  updateListLoadFile(payload: { name: string; url: string }[]) { this.uploadFile = payload; }

  selectedItemById(id: string | null) { this.searchItemId = id; }

  DeletUploadFile = (nameFile: string) => {
    const newList = this.uploadFileData.filter((elem) => elem.name !== nameFile);
    const newUpList = this.uploadFile.filter((elem) => elem.name !== nameFile);
    this.updateFileData(newList);
    this.updateListLoadFile(newUpList);
  };
}
export default new TodoState();
