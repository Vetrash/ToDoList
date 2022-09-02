import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import todoStore from './store/index.js';
import App from './App.js';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={todoStore}>
      <App />
    </Provider>
  </React.StrictMode>,
);
