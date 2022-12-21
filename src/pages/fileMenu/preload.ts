import _ from 'lodash';
import { toastOverfloy, toastLoadedEarlier } from '../../Components/toasts';
import TodoState from '../../store/mobx/TodoState';

const maxFiles = 10;
const preload = async (fileList: FileList) => {
  if (TodoState.uploadFile.length === maxFiles) return toastOverfloy();
  const redactFileList = [];
  for (let i = 0; i < fileList.length; i += 1) {
    if (TodoState.uploadFile.length + redactFileList.length >= maxFiles) {
      toastOverfloy();
      break;
    }
    const isNameLoad = _.find(TodoState.uploadFile, { name: fileList[i].name }) !== undefined;
    if (!isNameLoad) {
      redactFileList.push(fileList[i]);
      continue;
    }
    toastLoadedEarlier(fileList[i].name);
  }
  redactFileList.forEach((file) => {
    TodoState.loadFiles({ name: file.name, url: URL.createObjectURL(file) });
  });

  TodoState.addFileData(redactFileList);
};

export default preload;
