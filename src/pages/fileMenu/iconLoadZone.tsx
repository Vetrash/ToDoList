import React from 'react';

const iconLoadZone = (isLoading: boolean) => {
  const imgSrc = isLoading ? './img/loading.png' : './img/download.png';
  return <img className="fileMenu__loader__img" src='./img/download.png' alt="load-icon" />;
};
export default iconLoadZone;
