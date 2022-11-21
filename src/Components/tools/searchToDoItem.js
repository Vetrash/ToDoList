import React, { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import _ from 'lodash';
import { todoState, selectedItemById } from '../../store/todoSlice.js';
import { toastNotFound, toastFound } from './toasts.js';
/**
 * Функция отрисовки поисковой строки и поиска задач
 * @returns JSX элемент
 */
const SearchToDoItem = () => {
  const searchInput = useRef();
  const { todoItems } = useSelector(todoState);
  const dispatch = useDispatch();
  /**
   * поиск задачи с выделением
   */
  const search = () => {
    const searchValue = searchInput.current.value;
    const id = _.findKey(todoItems, ['topic', searchValue]);
    searchInput.current.value = '';
    if (id === undefined) {
      dispatch(selectedItemById(null));
      toastNotFound();
      return;
    }
    dispatch(selectedItemById(id));
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
};
export default SearchToDoItem;
