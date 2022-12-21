import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import ToDoRedactor from './ToDoRedactor/ToDoRedactor';
import TrigerUIState from '../../../store/mobx/TrigerUIState';
import ToDoList from './ToDoList/ToDoList';

const TodoMain = observer(() => {
  const resizeWindows = () => { TrigerUIState.checkMobailWidth(window.innerWidth); };

  useEffect(() => {
    TrigerUIState.checkMobailWidth(window.innerWidth);
    window.addEventListener('resize', resizeWindows);
  });

  return (
    <>
      <ToDoList />
      <ToDoRedactor />
    </>
  );
});

export default TodoMain;
