import _ from 'lodash';
import { makeAutoObservable } from 'mobx';

type ActionTodo = { id: string, topic: string, description: string,
  status: string, deadline: string, files: { name: string, url: string }[]};
type ActionData = { id: string, topic: string, description: string,
  status: string, deadline: string, files: { name: string, url: string }[]}[];

class TodoState {
  todoItems: {[id: string]:{ id: string, topic: string, description: string,
  status: string, deadline: string, files: { name: string, url: string }[]}} = {};

  redactedItemId: null|string = null;

  searchItemId: null|string = null;

  uploadFile: { name: string, url: string }[] = [];

  todoTopics: string[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  addItem(payload : ActionTodo) {
    const { id, topic, description, status, deadline, files } = payload;
    this.todoItems[id] = { id, topic, description, status, files, deadline };
    this.uploadFile = [];
    this.redactedItemId = null;
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
      this.todoItems[id] = { id, topic, description, status, files: checkFiles, deadline };
      this.uploadFile = [];
      this.redactedItemId = null;
      this.todoTopics.push(topic);
    });
  }

  deleteItems(id : string) {
    const lastTopic = this.todoItems[id].topic;
    const cloneTodoTopics = _.cloneDeep(this.todoTopics);
    this.todoTopics = cloneTodoTopics.filter((elem) => elem !== lastTopic);
    delete this.todoItems[id];
    this.uploadFile = [];
    this.redactedItemId = null;
  }

  redactItem(payload: ActionTodo) {
    const { id, topic, description, status, deadline } = payload;
    const lastTopic = this.todoItems[id].topic;
    const files = _.cloneDeep(this.uploadFile);
    this.todoItems[id] = { id, topic, description, files, status, deadline };
    this.uploadFile = [];
    this.redactedItemId = null;
    const cloneTodoTopics = _.cloneDeep(this.todoTopics);
    this.todoTopics = cloneTodoTopics.filter((elem) => elem !== lastTopic);
    this.todoTopics.push(topic);
  }

  setRedactItemId(id : string) {
    this.redactedItemId = id;
    this.uploadFile = this.todoItems[id].files;
  }

  loadFiles(payload : { name: string, url: string }) {
    this.uploadFile.push(payload);
  }

  updateListLoadFile(payload : { name: string, url: string }[]) {
    this.uploadFile = payload;
  }

  selectedItemById(id : string|null) {
    this.searchItemId = id;
  }
}
export default new TodoState();
