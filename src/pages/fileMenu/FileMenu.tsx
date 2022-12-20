import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import cn from 'classnames';
import ListUploadFiles from './ListUploadFiles';
import TrigerUIState from '../../store/mobx/TrigerUIState';
import iconLoadZone from './iconLoadZone';
import textLoadZone from './textLoadZone';
import drop from './drop';

const FileMenu = observer(() => {
  const [isDragOnLoadZone, setIsDragOnLoadZone] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const closer = () => {
    TrigerUIState.switchShowedFileMenu(false);
  };

  return (
    <div
      className={cn('conteiner__FM', { elem_activ: TrigerUIState.isShovedFileMenu })}
      onDragOver={() => setIsDragOnLoadZone(true)}
      onDrop={(e) => drop(e, setIsLoading, setIsDragOnLoadZone)}
    >
      <div className="fileMenu__back" />
      <div className="fileMenu">
        <button className="btn__cross elem_show" type="button" onClick={closer} aria-label="close menu" />
        <div className="fileMenu__loader ">
          <div className={cn('loader', 'loader__drag_line', { loader__drag_lineShow: isDragOnLoadZone })}>
            {iconLoadZone(isLoading)}
            <div className="fileMenu__loader__text">{textLoadZone(isDragOnLoadZone, setIsLoading)}</div>
          </div>
        </div>
        <ListUploadFiles />
      </div>
    </div>
  );
});
export default FileMenu;
