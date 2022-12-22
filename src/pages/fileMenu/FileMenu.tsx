import React from 'react';
import { observer } from 'mobx-react-lite';
import cn from 'classnames';
import ListUploadFiles from './ListUploadFiles';
import TrigerUIState from '../../store/mobx/TrigerUIState';
import textLoadZone from './textLoadZone';
import drop from './functions/drop';

const FileMenu = observer(() => {
  const closer = () => {
    TrigerUIState.switchShowedFileMenu(false);
  };

  return (
    <div
      className={cn('conteiner__FM', { elem_activ: TrigerUIState.isShovedFileMenu })}
      onDragOver={(e) => { e.preventDefault(); }}
      onDrop={(e) => drop(e)}
    >
      <div className="fileMenu__back" />
      <div className="fileMenu">
        <button className="btn__cross elem_show" type="button" onClick={closer} aria-label="close menu" />
        <div className="fileMenu__loader ">
          <div className="loader">
            <img className="fileMenu__loader__img" src="./img/download.png" alt="load-icon" />
            <div className="fileMenu__loader__text">{textLoadZone()}</div>
          </div>
        </div>
        <ListUploadFiles />
      </div>
    </div>
  );
});
export default FileMenu;
