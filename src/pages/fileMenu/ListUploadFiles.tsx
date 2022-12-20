import React from 'react';
import _ from 'lodash';
import { observer } from 'mobx-react-lite';
import TodoState from '../../store/mobx/TodoState';

const ListUploadFiles = observer(() => {
  const id: string = TodoState.redactedItemId as string;
  const files = TodoState.redactedItemId !== null ? TodoState.todoItems[id].files : [];
  if (TodoState.uploadFile.length === 0 && files.length === 0) {
    return (
      <div className="fileMenu__filelist">
        <ul className="filelist">
          <li key={_.uniqueId()} className="fileMenu__fileLine">
            <p className="fileMenu__textLine">Загруженных файлов нет</p>
          </li>
        </ul>
      </div>
    );
  }

  const deletUploadItem = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    const parent = target.closest('.fileMenu__fileLine');
    const nameFile = parent !== null ? parent.querySelector('.fileMenu__textLine') : null;
    const newList = TodoState.uploadFile.filter((elem) => elem.name !== nameFile?.textContent);
    TodoState.updateListLoadFile(newList);
  };

  return (
    <div className="fileMenu__filelist">
      <ul className="filelist">
        {TodoState.uploadFile.map((file) => (
          <li key={_.uniqueId()} className="fileMenu__fileLine">
            <p className="fileMenu__textLine">{file.name}</p>
            <div className="control-conteiner__fileLine">
              <button type="button" className="control-img" onClick={deletUploadItem}>
                <img src="./img/cancel.svg" alt="" />
              </button>
              <a className="iconDowload control-img" href={file.url} download={file.name}>
                <img className="iconDowload" src="./img/free-icon-save-file-3811490.png" alt="download" />
              </a>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
});
export default ListUploadFiles;
