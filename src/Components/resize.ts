import React from 'react';
/**
 * Изменение ширины блока посредством прописовани атрибута style в элементе
 * с классом redactorToDO и todolist-block
 * При каждом вызове просчитывает сдвиг мыши и изменяет ширину на данный сдвиг
 * не может уменьщить поле todolist-block менее 400px
 */
const minLengthList = 400; // Минимальная ширина Туду листа

const resize = (e : React.DragEvent) => {
  const target = e.target as HTMLElement;
  const todolist = target.closest('.todolist-block') as HTMLElement;
  const resizeBlock = document.querySelector('.redactorToDO') as HTMLElement;
  const offsetX = e.nativeEvent.clientX !== 0 ? e.nativeEvent.offsetX : 0;
  const newWidth = todolist.clientWidth + offsetX;
  const todolistSize = newWidth < minLengthList ? `${minLengthList}px` : `${newWidth}px`;
  const resizeBlockSize = newWidth < minLengthList
    ? `${window.innerWidth - minLengthList}px`
    : `${window.innerWidth - newWidth}px`;
  todolist.style.width = todolistSize;
  resizeBlock.style.width = resizeBlockSize;
};
export default resize;
