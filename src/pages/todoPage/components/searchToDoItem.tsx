import React, { useRef } from 'react';
import _ from 'lodash';
import { observer } from 'mobx-react-lite';
import TodoState from '../../../store/mobx/TodoState';
import { toastNotFound, toastFound } from '../../../Components/toasts';
/**
 * Функция отрисовки поисковой строки и поиска задач
 * @returns JSX элемент
 */
const SearchToDoItem = observer(() => {
  const searchInput = useRef<HTMLInputElement>(null);

  const search = () => {
    const searchValue = searchInput?.current?.value;
    const id = _.findKey(TodoState.todoItems, ['topic', searchValue]);
    if (searchInput.current !== null) { searchInput.current.value = ''; }
    if (id === undefined) {
      TodoState.selectedItemById(null);
      toastNotFound();
      return;
    }
    TodoState.selectedItemById(id);
    toastFound();
  };

  return (
    <div className="search-block">
      <p>Найти дело</p>
      <div className="btn-block">
        <input ref={searchInput} type="text" />
        <button type="button" onClick={search}>Найти!</button>
      </div>
    </div>
  );
});
export default SearchToDoItem;
