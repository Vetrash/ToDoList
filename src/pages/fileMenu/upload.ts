import _ from 'lodash';
import { getStorage, ref, uploadBytes } from 'firebase/storage';
import { toastOverfloy, toastLoadedEarlier, toastUpload } from '../../Components/toasts';
import TodoState from '../../store/mobx/TodoState';
import UserState from '../../store/mobx/UserState';
import safeFile from './safeFile';
import type { setType } from './typesFileMenu';

const upload = async (fileList: FileList, setIsLoading: setType) => {
  setIsLoading(true);
  if (TodoState.uploadFile.length === 10) {
    toastOverfloy();
    setIsLoading(false);
    return;
  }
  const storage = getStorage();
  const emptyPosition = 10 - TodoState.uploadFile.length < 0 ? 0 : 10 - TodoState.uploadFile.length;
  const redactFileList = [];
  for (let i = 0; i < fileList.length; i += 1) {
    const isNameLoad = _.find(TodoState.uploadFile, { name: fileList[i].name }) !== undefined;
    if (redactFileList.length === emptyPosition) break;
    if (!isNameLoad) {
      redactFileList.push(fileList[i]);
    } else {
      toastLoadedEarlier(fileList[i].name);
    }
  }

  Promise.all(
    redactFileList.map((elem) => {
      const storageRef = ref(storage, `${UserState.login}/${elem.name}`);
      return uploadBytes(storageRef, elem).then(() => {
        safeFile(elem.name);
      });
    }),
  ).then(() => {
    if (fileList.length > 10) {
      toastOverfloy();
    }
    toastUpload(redactFileList.length);
    window.dispatchEvent(new CustomEvent('switchload', { detail: false }));
    setIsLoading(false);
  });
};

export default upload;
