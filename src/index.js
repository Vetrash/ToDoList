import React from 'react';
import ReactDOM from 'react-dom/client';
import { initializeApp } from 'firebase/app';
import { Provider } from 'react-redux';
import './scss/index.scss';
import App from './App.js';

import store from './store/index.js';
/* eslint-disable */
const config = {
  apiKey: 'API_KEY',
  authDomain: 'todo-list-36d26.firebaseapp.com',
  databaseURL: 'https://todo-list-36d26-default-rtdb.firebaseio.com',
  projectId: 'todo-list-36d26',
  storageBucket: 'todo-list-36d26.appspot.com',
  messagingSenderId: 'SENDER_ID',
  appId: 'APP_ID',
};
/* eslint-enable */
initializeApp(config);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);
