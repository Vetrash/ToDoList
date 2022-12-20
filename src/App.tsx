import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './scss/App/App.scss';
import { ToastContainer } from 'react-toastify';
import { observer } from 'mobx-react-lite';
import 'react-toastify/dist/ReactToastify.css';
import TodoPage from './pages/todoPage/ToDoPage';
import Authorization from './pages/authorization/authorization';
import SignUp from './pages/SignUp/SignUp';
import NotFound from './pages/NotFound/NotFound';
import AuthRote from './Components/AltRoute/AuthRote';

const App = observer(() => (
  <>
    <Routes>
      <Route path="/" element={<AuthRote elementAuth={<TodoPage />} elementNotAuth="/login" />} />
      <Route path="/login" element={<AuthRote elementAuth="/" elementNotAuth={<Authorization />} />} />
      <Route path="/signup" element={<AuthRote elementAuth="/" elementNotAuth={<SignUp />} />} />
      <Route path="/*" element={<NotFound />} />
    </Routes>
    <ToastContainer />
  </>
));

export default App;
