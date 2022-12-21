import axios from 'axios';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import TodoState from '../../store/mobx/TodoState';
import UserState from '../../store/mobx/UserState';

const safe = (name:string, path: string) => {
  const storage = getStorage();
  getDownloadURL(ref(storage, `${UserState.login}/${path}/${name}`))
    .then((url: string) => {
      axios({ url, method: 'GET', responseType: 'blob' }).then((response: { data: Blob }) => {
        const urlItem = URL.createObjectURL(response.data);
        TodoState.loadFiles({ name, url: urlItem });
      });
    })
    .catch((error) => {
      console.log(error);
    });
};
const safeFile = (name: string) => {
  const path = TodoState.newItemId === null ? TodoState.newItemId : TodoState.redactedItemId;
  safe(name, path as string);
};

export default safeFile;
