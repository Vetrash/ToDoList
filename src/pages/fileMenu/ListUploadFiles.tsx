import React from 'react';
import _ from 'lodash';
import { observer } from 'mobx-react-lite';
import TodoState from '../../store/mobx/TodoState';
import deletUploadItem from './deletUploadItem';

const ListUploadFiles = observer(() => {
  const id: string = TodoState.redactedItemId as string;
  const files = TodoState.redactedItemId !== null ? TodoState.todoItems[id].files : [];
  const emptyList = <p className="fileMenu__textLine">Загруженных файлов нет</p>;
  const listFile = TodoState.uploadFile.map((file) => (
    <>
      <p className="fileMenu__textLine">{file.name}</p>
      <div className="control-conteiner__fileLine">
        <button type="button" className="control-img" onClick={(e) => deletUploadItem(e)}>
          <img src="./img/cancel.svg" alt="" />
        </button>
        <a className="iconDowload control-img" href={file.url} download={file.name}>
          <img className="iconDowload" src="./img/free-icon-save-file-3811490.png" alt="download" />
        </a>
      </div>
    </>
  ));
  const isListEmpty = TodoState.uploadFile.length === 0 && files.length === 0;

  return (
    <div className="fileMenu__filelist">
      <ul className="filelist">
        <li key={_.uniqueId()} className="fileMenu__fileLine">
          {isListEmpty ? emptyList : listFile}
        </li>
      </ul>
    </div>
  );
});
export default ListUploadFiles;
