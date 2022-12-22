import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import UserState from '../../../store/mobx/UserState';

const getUrlLoadFile = (name: string, path: string) => {
  const storage = getStorage();
  return getDownloadURL(ref(storage, `${UserState.login}/${path}/${name}`))
    .then((url: string) => ({ name, url }))
    .catch((error) => {
      console.log(error);
    });
};

export default getUrlLoadFile;
