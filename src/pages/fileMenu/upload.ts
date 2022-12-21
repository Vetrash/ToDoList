import { getStorage, ref, uploadBytes } from 'firebase/storage';
import { toastUpload } from '../../Components/toasts';
import TodoState from '../../store/mobx/TodoState';
import UserState from '../../store/mobx/UserState';
import safeFile from './safeFile';

const upload = (path: string) => {
  const storage = getStorage();
  Promise.all(
    TodoState.uploadFileData.map((elem) => {
      const storageRef = ref(storage, `${UserState.login}/${path}/${elem.name}`);
      return uploadBytes(storageRef, elem)
        .then(() => { safeFile(elem.name); });
    }),
  )
    .then(() => { toastUpload(TodoState.uploadFileData.length); });
};

export default upload;
