import React from 'react';
import type { setType } from './typesFileMenu';
import upload from './upload';

export const drop = (e: React.DragEvent, setIsLoading: setType, setIsDragOnLoadZone: setType) => {
  e.preventDefault();
  const target = e.target as HTMLElement;
  const parent = target.closest('.fileMenu__loader');
  if (parent !== null) {
    const fileList = e.dataTransfer.files as FileList;
    upload(fileList, setIsLoading);
  }
  setIsDragOnLoadZone(false);
};
export default drop;
