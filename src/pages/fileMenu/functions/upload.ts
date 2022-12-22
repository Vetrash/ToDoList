import { getStorage, ref, uploadBytes } from 'firebase/storage';
import { toastUpload } from '../../../Components/toasts';
import TodoState from '../../../store/mobx/TodoState';
import UserState from '../../../store/mobx/UserState';
import getUrlLoadFile from './getUrlLoadFile';

const upload = async (path: string) => {
  const storage = getStorage();
  const fileList = await Promise.all(
    TodoState.uploadFileData.map((elem) => {
      const storageRef = ref(storage, `${UserState.login}/${path}/${elem.name}`);
      return uploadBytes(storageRef, elem);
    }),
  ).then((res) => {
    toastUpload(TodoState.uploadFileData.length);
    return Promise.all(
      res.map((data) => {
        const { name } = data.metadata;
        return getUrlLoadFile(name, path).then((item) => item);
      }),
    ).then((item) => item);
  });
  return fileList;
};

export default upload;
