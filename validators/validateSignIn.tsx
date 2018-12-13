import * as validations from './';

// Note validateSignIn is pure function to be reusable across platforms.

// TODO: Use GraphQL endpoint generated type.
export interface ISignInInput {
  email: string;
  password: string;
  isFirst: boolean;
}

const validateSignIn = (input: ISignInInput) => ({
  email: validations.validateEmail(input.email),
  password: validations.validatePassword(input.password),
});

export default validateSignIn;
