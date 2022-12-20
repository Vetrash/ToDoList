import axios from 'axios';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import TodoState from '../../store/mobx/TodoState';
import UserState from '../../store/mobx/UserState';

const safeFile = (name: string) => {
  const storage = getStorage();
  getDownloadURL(ref(storage, `${UserState.login}/${name}`))
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

export default safeFile;
