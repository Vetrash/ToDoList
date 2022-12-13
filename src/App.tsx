import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './scss/App/App.scss';
import { ToastContainer } from 'react-toastify';
import { observer } from 'mobx-react-lite';
import 'react-toastify/dist/ReactToastify.css';
import TodoPage from './pages/todoPage/ToDoPage';
import Authorization from './pages/authorization/authorization';
import SignUp from './pages/SignUp/SignUp';
import NotFound from './pages/NotFound/NotFound';
import PrivateOutlet from './Components/PrivateOutlet';

const App = observer(() => (
  <>
    <Routes>
      <Route path="/" element={<PrivateOutlet alt={<Navigate to="/login" />} />}>
        <Route path="/" element={<TodoPage />} />
      </Route>

      <Route path="/login" element={<PrivateOutlet alt={<Authorization />} />}>
        <Route path="/login" element={<Navigate to="/" />} />
      </Route>

      <Route path="/signup" element={<PrivateOutlet alt={<SignUp />} />}>
        <Route path="/signup" element={<Navigate to="/" />} />
      </Route>

      <Route path="/*" element={<NotFound />} />
    </Routes>
    <ToastContainer />
  </>
));

export default App;
