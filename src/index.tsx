import React from 'react';
import ReactDOM from 'react-dom/client';
import { initializeApp } from 'firebase/app';
import { BrowserRouter as Router } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import './scss/index.scss';
import i18n from './i18n';
import App from './App';

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

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <Router>
      <I18nextProvider i18n={i18n}>
        <App />
      </I18nextProvider>
    </Router>
  </React.StrictMode>,
);
