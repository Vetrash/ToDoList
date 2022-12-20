import { FormikHelpers } from 'formik';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import LogIn from '../../../Components/logIn';

type valuesType = {
    username: string;
    password: string;
}

type actionType = FormikHelpers<{
    username: string;
    password: string;
}>

const SubmitAuth = (values: valuesType, action: actionType) => {
  const auth = getAuth();
  const email = `${values.username}@test.ru`;
  signInWithEmailAndPassword(auth, email, values.password)
    .then((userCredential) => {
      const token = userCredential.user.uid;
      LogIn(token, values.username);
    })
    .catch(() => {
      action.setErrors({ username: 'UnknownUser' });
    });
};

export default SubmitAuth;
