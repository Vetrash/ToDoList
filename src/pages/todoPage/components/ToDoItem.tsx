import React from 'react';
import { getDatabase, remove, ref } from 'firebase/database';
import { observer } from 'mobx-react-lite';
import cn from 'classnames';
import { toastNotDelete, toastDeleteToDo } from '../../../Components/toasts';
import TodoState from '../../../store/mobx/TodoState';
import TrigerUIState from '../../../store/mobx/TrigerUIState';

const ToDoItem = observer((props: {id: string}) => {
  const { id } = props;
  const item = TodoState.todoItems[id];
  const imgSrc = {
    cansel: './img/cancel.svg',
    edit: './img/edit.svg',
  };

  const deletItem = (e : React.MouseEvent<HTMLButtonElement>) => {
    const target = e.target as HTMLButtonElement;
    const selectId = target.dataset.id as string;
    if (selectId === TodoState.redactedItemId) {
      toastNotDelete();
      return;
    }
    const db = getDatabase();
    remove(ref(db, `data/${selectId}`))
      .then(() => {
        TodoState.deleteItems(selectId);
        toastDeleteToDo();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const redactItem = (e : React.MouseEvent<HTMLButtonElement>) => {
    const target = e.target as HTMLButtonElement;
    const newId = target.dataset.id as string;
    TodoState.setRedactItemId(newId);
    TrigerUIState.switchShowedRedactor(true);
  };

  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-explicit-any
  const btnItem = (func: (...rest: any) => void, srcImg:string) => (
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
