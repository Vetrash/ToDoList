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
  return (
    <div className={cn('toDoItem', `${item.status}`, { selected: TodoState.searchItemId === id })}>
      <div className="infoToDo">
        <p className="topic">{item.topic}</p>
        <div className="control-conteiner">
          <button type="button" className="control-img" onClick={deletItem} data-id={id}>
            <img data-id={id} src="./img/cancel.svg" alt="" />
          </button>
          <button type="button" className="control-img" onClick={redactItem} data-id={id}>
            <img data-id={id} src="./img/edit.svg" alt="edit item" />
          </button>
        </div>
      </div>
    </div>
  );
});

export default ToDoItem;
