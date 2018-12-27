import { validateEmail, validatePassword } from './';
import { SignInInput, SignInErrors } from '../api/types';

const validateSignIn = (input: SignInInput): SignInErrors => ({
  email: validateEmail(input.email),
  password: validatePassword(input.password),
});

export default validateSignIn;
