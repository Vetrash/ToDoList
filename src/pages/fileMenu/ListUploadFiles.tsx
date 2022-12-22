import React from 'react';
import axios from 'axios';
import _ from 'lodash';
import { observer } from 'mobx-react-lite';
import TodoState from '../../store/mobx/TodoState';
import deletUploadItem from './functions/deletUploadItem';

const load = (url: string, text: string) => {
  axios({ url, method: 'GET', responseType: 'blob' }).then((response: { data: Blob }) => {
    const urlItem = URL.createObjectURL(response.data);
    const a = document.createElement('a');
    a.href = urlItem;
    a.download = text;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  });
};

const getListItem = (text: string, url: string) => (
  <li key={_.uniqueId()} className="fileMenu__fileLine">
    <p className="fileMenu__textLine">{text}</p>
    <div className="control-conteiner__fileLine">
      <button type="button" className="control-img" onClick={(e) => deletUploadItem(e)}>
        <img src="./img/cancel.svg" alt="" />
      </button>
      <button type="button" className="iconDowload control-img" onClick={() => load(url, text)}>
        <img className="iconDowload" src="./img/free-icon-save-file-3811490.png" alt="download" />
      </button>
    </div>
  </li>
);

const ListUploadFiles = observer(() => {
  const emptyList = (
    <li key={_.uniqueId()} className="fileMenu__fileLine">
      <p className="fileMenu__textLine">Загруженных файлов нет</p>
    </li>
  );
  const listFile = TodoState.uploadFile.map((file) => getListItem(file.name, file.url));
  const isListEmpty = TodoState.uploadFile.length === 0;

  return (
    <div className="fileMenu__filelist">
      <ul className="filelist">{isListEmpty ? emptyList : listFile}</ul>
    </div>
  );
});
export default ListUploadFiles;
