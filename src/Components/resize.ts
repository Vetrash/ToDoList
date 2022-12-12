import React from 'react';
import _ from 'lodash';
/**
 * Изменение ширины блока посредством прописовани атрибута style в элементе
 * с классом redactorToDO и todolist-block
 * При каждом вызове просчитывает сдвиг мыши и изменяет ширину на данный сдвиг
 * не может уменьщить поле todolist-block менее 400px и увелисить более 70% от ширины окна
 */
const minLengthList = 400; // Минимальная ширина Туду листа
const maxOffsetEvent = 50; // максимальное отдоление мыши от элемента перетаскивания
const maxWidthTodoList = 0.7; // максимальное отношение ширины туду листа к ширине окна 70%

const resize = (e : React.DragEvent) => {
  const target = e.target as HTMLElement;
  const todolist = target.closest('.todolist-block') as HTMLElement;
  const resizeBlock = document.querySelector('.redactorToDO') as HTMLElement;
  const { width } = todolist.style;
  const redactWidth = _.includes(width, '%')
    ? (Number(width.slice(0, -1)) * window.innerWidth) / 100
    : Number(width.slice(0, -2));
  const newWidth = redactWidth + e.nativeEvent.offsetX;
  if (Math.abs(e.nativeEvent.offsetX) < maxOffsetEvent) {
    const windowInnerWidth = window.innerWidth;
    if (newWidth < minLengthList) {
      todolist.style.width = `${minLengthList}px`;
      resizeBlock.style.width = `${windowInnerWidth - minLengthList}px`;
    } else if ((newWidth / windowInnerWidth) < maxWidthTodoList) {
      todolist.style.width = `${newWidth}px`;
      resizeBlock.style.width = `${windowInnerWidth - newWidth}px`;
    }
  }
};
export default resize;
