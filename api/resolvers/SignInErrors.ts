import { SignInErrorsResolvers } from '../types';

export const SignInErrors: SignInErrorsResolvers = {
  email: parent => (parent.email == null ? null : parent.email),
  password: parent => (parent.password == null ? null : parent.password),
};
