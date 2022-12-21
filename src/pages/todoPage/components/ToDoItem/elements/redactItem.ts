import React from 'react';
import TodoState from '../../../../../store/mobx/TodoState';
import TrigerUIState from '../../../../../store/mobx/TrigerUIState';

const redactItem = (e: React.MouseEvent<HTMLButtonElement>) => {
  const target = e.target as HTMLButtonElement;
  const newId = target.dataset.id as string;
  TodoState.setRedactItemId(newId);
  TrigerUIState.switchShowedRedactor(true);
};
export default redactItem;
