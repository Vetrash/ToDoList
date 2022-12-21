import React from 'react';
import { observer } from 'mobx-react-lite';
import cn from 'classnames';
import TodoState from '../../../../store/mobx/TodoState';
import deletItem from './elements/deletItem';
import redactItem from './elements/redactItem';

const ToDoItem = observer((props: { id: string }) => {
  const { id } = props;
  const item = TodoState.todoItems[id];
  const imgSrc = {
    cansel: './img/cancel.svg',
    edit: './img/edit.svg',
  };
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-explicit-any
  const btnItem = (func: (...rest: any) => void, srcImg: string) => (
    <button type="button" className="control-img" onClick={func} data-id={id}>
      <img data-id={id} src={srcImg} alt="" />
    </button>
  );

  return (
    <div className={cn('toDoItem', `${item.status}`, { selected: TodoState.searchItemId === id })}>
      <div className="infoToDo">
        <p className="topic">{item.topic}</p>
        <div className="control-conteiner">
          {btnItem(deletItem, imgSrc.cansel)}
          {btnItem(redactItem, imgSrc.edit)}
        </div>
      </div>
    </div>
  );
});

export default ToDoItem;
