import React from 'react';
import './scss/App/App.scss';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FileMenu from './Components/fileMenu/FileMenu.js';
import TodoMain from './Components/todoPage/TodoMain.js';

const App = () => (
  <>
    <div className="todolist-conteiner">
      <FileMenu />
      <TodoMain />
    </div>
    <ToastContainer />
  </>
);

export default App;
