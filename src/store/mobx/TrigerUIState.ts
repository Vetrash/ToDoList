/* eslint lines-between-class-members: ["error", "always", { "exceptAfterSingleLine": true }] */
import { makeAutoObservable } from 'mobx';

class TrigerUIState {
  isStyleMobail = true;
  isShovedFileMenu = false;
  isShovedRedactor = false;

  constructor() {
    makeAutoObservable(this);
  }

  switchShowedFileMenu(payload: boolean) {
    this.isShovedFileMenu = payload;
  }

  switchShowedRedactor(payload: boolean) {
    this.isShovedRedactor = payload;
  }

  checkMobailWidth(width: number) {
    if (width > 650) {
      this.isStyleMobail = false;
      this.isShovedRedactor = true;
      return;
    }
    this.isStyleMobail = true;
  }
}
export default new TrigerUIState();
