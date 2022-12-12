import React from 'react';
import { observer } from 'mobx-react-lite';
import { Outlet } from 'react-router-dom';
import UserState from '../store/mobx/UserState';

const PrivateOutlet = observer((props: {alt: React.ReactElement}) => {
  const localToken = localStorage.getItem('token');
  const isAuth = UserState.token !== '' || localToken !== null;
  const { alt } = props;
  return isAuth ? <Outlet /> : alt;
});

export default PrivateOutlet;
