import { FormikHelpers } from 'formik';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import LogIn from '../../../Components/logIn';

type signInType = FormikHelpers<{ username: string; password: string; }>;
type signUpType = FormikHelpers<{ username: string; password: string; confirmPassword: string; }>;
type actionTypes = signInType|signUpType;
type valuesTypes = { username: string; password: string; confirmPassword?: string; };
const getAuthError = (err: { code: string }) => {
  switch (err.code) {
    case 'auth/too-many-requests':
      return { username: 'manyRequests' };
    case 'auth/wrong-password':
      return { username: 'wrongPassword' };
    case 'auth/user-not-found':
      return { username: 'userNotFound' };
    case 'auth/email-already-in-use':
      return { username: 'cloneLogin' };
    default:
      return { username: 'unknownError' };
  }
};

const SubmitSignUpIn = (values: valuesTypes, action: actionTypes) => {
  const auth = getAuth();
  const email = `${values.username}@test.ru`;
  const workFunction = values.confirmPassword
    ? createUserWithEmailAndPassword
    : signInWithEmailAndPassword;

  workFunction(auth, email, values.password)
    .then((userCredential) => {
      const token = userCredential.user.uid;
      LogIn(token, values.username);
    })
    .catch((err) => action.setErrors(getAuthError(err)));
};

export default SubmitSignUpIn;
