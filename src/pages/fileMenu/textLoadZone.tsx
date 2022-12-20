import React from 'react';
import upload from './upload';
import type { setType } from './typesFileMenu';

const textLoadZone = (isDragOnLoadZone: boolean, setIsLoading: setType) => {
  const hendlerUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    const fileList = target.files as FileList;
    upload(fileList, setIsLoading);
  };
  const onDragElement = <p>Отпустите файлы для загрузки</p>;
  const offDragElement = (
    <>
      <label className="loader__text" htmlFor="file-input">
        Выбрать файл
        <input className="hide uploadfile" id="file-input" type="file" name="file" multiple onChange={hendlerUpload} />
      </label>
      <span> или перетащите его сюда</span>
    </>
  );
  return isDragOnLoadZone ? onDragElement : offDragElement;
};

export default textLoadZone;
