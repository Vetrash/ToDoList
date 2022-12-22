import React from 'react';
import TodoState from '../../../store/mobx/TodoState';

const deletUploadItem = (e: React.MouseEvent) => {
  const target = e.target as HTMLElement;
  const parent = target.closest('.fileMenu__fileLine');
  const nameFile = parent !== null ? parent.querySelector('.fileMenu__textLine') : null;
  const name = nameFile?.textContent as string;
  TodoState.DeletUploadFile(name);
};

export default deletUploadItem;
