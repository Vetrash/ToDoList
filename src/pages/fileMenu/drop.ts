import React from 'react';
import preload from './preload';

const drop = (e: React.DragEvent) => {
  e.preventDefault();
  const target = e.target as HTMLElement;
  const parent = target.closest('.fileMenu__loader');
  if (parent !== null) {
    const fileList = e.dataTransfer.files as FileList;
    preload(fileList);
  }
};
export default drop;
