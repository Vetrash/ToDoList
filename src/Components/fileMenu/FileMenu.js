import React, { useState } from 'react';
import axios from 'axios';
import cn from 'classnames';
import _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { switchShowedFileMenu, todoState, loadFiles } from '../../store/todoSlice.js';
import ListUploadFiles from './ListUploadFiles.js';
import { toastOverfloy, toastLoadedEarlier, toastUpload } from '../tools/toasts.js';

const FileMenu = () => {
  const storage = getStorage();
  const dispatch = useDispatch();
  const { isShovedFileMenu, uploadFile } = useSelector(todoState);
  const [isDragOnLoadZone, setIsDragOnLoadZone] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const safeFile = (name) => getDownloadURL(ref(storage, name))
    .then((url) => axios({ url, method: 'GET', responseType: 'blob' })
      .then((response) => {
        const urlItem = URL.createObjectURL(response.data);
        dispatch(loadFiles({ name, url: urlItem }));
      }))
    .catch((error) => { console.log(error); });

  const upload = async (fileList) => {
    if (uploadFile.length === 10) {
      toastOverfloy();
      return;
    }
    const emptyPosition = 10 - uploadFile.length < 0 ? 0 : 10 - uploadFile.length;
    const redactFileList = [];
    for (let i = 0; i < fileList.length; i += 1) {
      const isNameLoad = _.find(uploadFile, { name: fileList[i].name }) !== undefined;
      if (redactFileList.length === emptyPosition) break;
      if (!isNameLoad) {
        redactFileList.push(fileList[i]);
      } else {
        toastLoadedEarlier(fileList[i].name);
      }
    }
    Promise.all(redactFileList.map((elem) => {
      const storageRef = ref(storage, elem.name);
      return uploadBytes(storageRef, elem).then(() => {
        safeFile(elem.name);
      });
    }))
      .then(() => {
        if (fileList.length > 10) {
          toastOverfloy();
        }
        toastUpload(redactFileList.length);
        setIsLoading(false);
      });
  };

  const closer = () => { dispatch(switchShowedFileMenu(false)); };

  const drag = (e) => {
    e.preventDefault();
    setIsDragOnLoadZone(true);
  };

  const hendlerUpload = (e) => {
    const fileList = [...e.target.files];
    setIsLoading(true);
    upload(fileList);
  };

  const drop = (e) => {
    e.preventDefault();
    const parent = e.target.closest('.fileMenu__loader');
    if (parent !== null) {
      const fileList = [...e.dataTransfer.files];
      setIsLoading(true);
      upload(fileList);
    }
    setIsDragOnLoadZone(false);
  };

  const textLoadZone = () => {
    if (isDragOnLoadZone) {
      return (
        <p>Отпустите файлы для загрузки</p>
      );
    }
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

  const iconLoadZone = () => {
    if (isLoading) {
      return (
        <img className="fileMenu__loader__img fileMenu__loader__twist" src="./img/loading.png" alt="" />
      );
    }
    return (<img className="fileMenu__loader__img" src="./img/download.png" alt="" />);
  };

  return (
    <div
      className={cn('conteiner__FM', { elem_activ: isShovedFileMenu })}
      onDragOver={drag}
      onDrop={drop}
    >
      <div className="fileMenu__back" />
      <div className="fileMenu">
        <button className="btn__cross" type="button" onClick={closer} aria-label="close menu" />
        <div className="fileMenu__loader ">
          <div className={cn('loader', 'loader__drag_line', { loader__drag_lineShow: isDragOnLoadZone })}>
            {iconLoadZone()}
            <div className="fileMenu__loader__text">
              {textLoadZone()}
            </div>
          </div>
        </div>
        <div className="fileMenu__filelist">
          <ListUploadFiles />
        </div>
      </div>
    </div>
  );
};
export default FileMenu;
