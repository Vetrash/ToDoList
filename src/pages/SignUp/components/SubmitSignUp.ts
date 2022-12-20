import { FormikHelpers } from 'formik';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import LogIn from '../../../Components/logIn';

type valuesType = {
  username: string;
  password: string;
  confirmPassword: string;
}

type actionType = FormikHelpers<{
  username: string;
  password: string;
  confirmPassword: string;
}>

const SubmitSignUp = (values: valuesType, action: actionType) => {
  const auth = getAuth();
  const email = `${values.username}@test.ru`;
  createUserWithEmailAndPassword(auth, email, values.password)
    .then((userCredential) => {
      const token = userCredential.user.uid;
      LogIn(token, values.username);
    })
    .catch(() => {
      action.setErrors({ username: 'cloneLogin' });
    });
};

export default SubmitSignUp;
