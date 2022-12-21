import React from 'react';
import preload from './preload';

const textLoadZone = () => {
  const hendlerUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    const fileList = target.files as FileList;
    preload(fileList);
  };
  return (
    <>
      <label className="loader__text" htmlFor="file-input">
        Выбрать файл
        <input className="hide uploadfile" id="file-input" type="file" name="file" multiple onChange={hendlerUpload} />
      </label>
      <span> или перетащите его сюда</span>
    </>
  );
};

export default textLoadZone;
