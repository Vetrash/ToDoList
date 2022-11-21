import React from 'react';
import _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { todoState, updateListLoadFile } from '../../store/todoSlice.js';
/**
 * Формирует и возвращает список загруженный файлов либо строку об отсуствии загруженных файлов
 * @returns возвращаем JSX эелемент списка загруженных файлов
 */
const ListUploadFiles = () => {
  const { todoItems, uploadFile, redactedItemId } = useSelector(todoState);
  const dispatch = useDispatch();
  const files = redactedItemId !== null ? todoItems[redactedItemId].files : [];
  if (uploadFile.length === 0 && files.length === 0) {
    return (
      <ul className="filelist">
        <li key={_.uniqueId()} className="fileMenu__fileLine">
          <p className="fileMenu__textLine">Загруженных файлов нет</p>
        </li>
      </ul>
    );
  }
  /**
   * удаляет элемент на котором вызвана из state
   * @param {*} e dom элемент
   */
  const deletUploadItem = (e) => {
    const parent = e.target.closest('.fileMenu__fileLine');
    const nameFile = parent.querySelector('.fileMenu__textLine').textContent;
    const newList = uploadFile.filter((elem) => elem.name !== nameFile);
    dispatch(updateListLoadFile(newList));
  };

  return (
    <ul className="filelist">
      {uploadFile.map((file) => (
        <li key={_.uniqueId()} className="fileMenu__fileLine">
          <p className="fileMenu__textLine">{file.name}</p>
          <div className="control-conteiner__fileLine">
            <button type="button" className="control-img" onClick={deletUploadItem}>
              <img src="./img/cancel.svg" alt="" />
            </button>
            <a className="iconDowload control-img" alt="загрузить" href={file.url} download={file.name}>
              <img className="iconDowload" src="./img/free-icon-save-file-3811490.png" alt="download" />
            </a>
          </div>
        </li>
      ))}
    </ul>
  );
};
export default ListUploadFiles;
