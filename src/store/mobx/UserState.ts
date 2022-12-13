import { makeAutoObservable } from 'mobx';

class UserState {
  token = '';

  login = '';

  constructor() {
    makeAutoObservable(this);
  }

  signIn(action : {token:string, login:string}) {
    this.token = action.token;
    this.login = action.login;
  }

  signOff() {
    this.token = '';
    this.login = '';
    localStorage.removeItem('token');
    localStorage.removeItem('login');
  }
}
export default new UserState();
