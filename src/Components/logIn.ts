import UserState from '../store/mobx/UserState';

const LogIn = (token:string, username: string) => {
  localStorage.setItem('token', token);
  localStorage.setItem('login', username);
  UserState.signIn({ token, login: username });
};

export default LogIn;
