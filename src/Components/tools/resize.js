import _ from 'lodash';

const resize = (e) => {
  const todolist = e.target.closest('.todolist-block');
  const resizeBlock = document.querySelector('.redactorToDO');
  const { width } = todolist.style;
  const redactWidth = _.includes(width, '%')
    ? (Number(width.slice(0, -1)) * window.innerWidth) / 100
    : Number(width.slice(0, -2));
  const newWidth = redactWidth + e.nativeEvent.offsetX;
  if (Math.abs(e.nativeEvent.offsetX) < 50) {
    const windowInnerWidth = window.innerWidth;
    if (newWidth < 400) {
      todolist.style.width = '400px';
      resizeBlock.style.width = `${windowInnerWidth - 400}px`;
    } else if ((newWidth / windowInnerWidth) < 0.7) {
      todolist.style.width = `${newWidth}px`;
      resizeBlock.style.width = `${windowInnerWidth - newWidth}px`;
    }
  }
};
export default resize;
