import React from 'react';
import resize from '../../../../Components/resize';

const ResizeMarker = () => (
  <div className="resizeBlock">
    <div className="resizeBlock__conteiner">
      <img className="resizeBlock__arrow" src="./img/chevron_left.svg" alt="leftarrow" />
      <img className="resizeBlock__arrow" src="./img/chevron_right.svg" alt="leftarrow" />
    </div>
    <div draggable="true" onDrag={resize} className="resizeBlock__dragLine" />
  </div>
);
export default ResizeMarker;
