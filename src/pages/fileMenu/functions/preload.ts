import _ from 'lodash';
import { toastOverfloy, toastLoadedEarlier } from '../../../Components/toasts';
import TodoState from '../../../store/mobx/TodoState';

const maxFiles = 10;
const preload = (fileList: FileList) => {
  const { uploadFile } = TodoState;
  if (uploadFile.length === maxFiles) return toastOverfloy();
  const Files = _.uniqBy(Object.values(fileList), 'name');
  const filterFiles = Files.filter((file) => {
    const isContein = _.find(uploadFile, { name: file.name }) !== undefined;
    if (isContein) { toastLoadedEarlier(file.name); }
    return !isContein;
  });
  const emptyPos = maxFiles - uploadFile.length;
  if (emptyPos <= filterFiles.length) { toastOverfloy(); }
  const packFiles = _.slice(filterFiles, 0, emptyPos);
  packFiles.forEach((file) => {
    TodoState.loadFiles({ name: file.name, url: URL.createObjectURL(file) });
  });
  TodoState.addFileData(packFiles);
};

export default preload;
