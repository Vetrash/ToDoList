import React, { useState } from 'react';
import axios from 'axios';
import { observer } from 'mobx-react-lite';
import cn from 'classnames';
import _ from 'lodash';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import ListUploadFiles from './ListUploadFiles';
import { toastOverfloy, toastLoadedEarlier, toastUpload } from '../../Components/toasts';
import TodoState from '../../store/mobx/TodoState';
import TrigerUIState from '../../store/mobx/TrigerUIState';
import UserState from '../../store/mobx/UserState';

const FileMenu = observer(() => {
  const storage = getStorage();
  const [isDragOnLoadZone, setIsDragOnLoadZone] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const safeFile = (name: string) => getDownloadURL(ref(storage, `${UserState.login}/${name}`))
    .then((url : string) => axios({ url, method: 'GET', responseType: 'blob' })
      .then((response : { data: Blob}) => {
        const urlItem = URL.createObjectURL(response.data);
        TodoState.loadFiles({ name, url: urlItem });
      }))
    .catch((error) => { console.log(error); });

  const upload = async (fileList: FileList) => {
    if (TodoState.uploadFile.length === 10) {
      toastOverfloy();
      setIsLoading(false);
      return;
    }
    const emptyPosition = 10 - TodoState.uploadFile.length < 0
      ? 0
      : 10 - TodoState.uploadFile.length;
    const redactFileList = [];
    for (let i = 0; i < fileList.length; i += 1) {
      const isNameLoad = _.find(TodoState.uploadFile, { name: fileList[i].name }) !== undefined;
      if (redactFileList.length === emptyPosition) break;
      if (!isNameLoad) {
        redactFileList.push(fileList[i]);
      } else {
        toastLoadedEarlier(fileList[i].name);
      }
    }

    Promise.all(redactFileList.map((elem) => {
      const storageRef = ref(storage, `${UserState.login}/${elem.name}`);
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

  const closer = () => { TrigerUIState.switchShowedFileMenu(false); };

  const drag = (e : React.DragEvent) => {
    e.preventDefault();
    setIsDragOnLoadZone(true);
  };

  const hendlerUpload = (event : React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    const fileList = (target.files as FileList);
    setIsLoading(true);
    upload(fileList);
  };

  const drop = (e : React.DragEvent) => {
    e.preventDefault();
    const target = e.target as HTMLElement;
    const parent = target.closest('.fileMenu__loader');
    if (parent !== null) {
      const fileList = e.dataTransfer.files as FileList;
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
      className={cn('conteiner__FM', { elem_activ: TrigerUIState.isShovedFileMenu })}
      onDragOver={drag}
      onDrop={drop}
    >
      <div className="fileMenu__back" />
      <div className="fileMenu">
        <button className="btn__cross elem_show" type="button" onClick={closer} aria-label="close menu" />
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
});
export default FileMenu;
