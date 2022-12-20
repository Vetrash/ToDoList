import React from 'react';
import { Navigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import UserState from '../../store/mobx/UserState';

type propsType = {
    elementAuth: string| React.ReactElement;
    elementNotAuth: string| React.ReactElement;
}
const AuthRoute = observer((props: propsType) => {
  const { elementAuth, elementNotAuth } = props;
  const pathElementAuth = typeof elementAuth === 'string'
    ? <Navigate to={elementAuth} />
    : elementAuth as React.ReactElement;

  const pathElementNotAuth = typeof elementNotAuth === 'string'
    ? <Navigate to={elementNotAuth} />
    : elementNotAuth as React.ReactElement;

  const localToken = localStorage.getItem('token');
  const isAuth = UserState.token !== '' || localToken !== null;
  return isAuth ? pathElementAuth : pathElementNotAuth;
});
export default AuthRoute;
