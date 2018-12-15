import { validateEmail, validatePassword, Validator } from './';

// TODO: Use GraphQL endpoint generated type.
export interface ISignInInput {
  createAccount: boolean;
  email: string;
  password: string;
}

// TODO: Extract Input and Errors types from mutation.
// export type AuthMutationResponse = {|
//   +auth: ?{|
//     +token: ?string,
//     +errors: ?{|
//       +email: ?EmailError,
//       +password: ?PasswordError,
//     |},
//   |}
// |};

// Note validateSignIn is pure function to be reusable across platforms.
const validateSignIn: Validator<ISignInInput> = input => ({
  email: validateEmail(input.email),
  password: validatePassword(input.password),
});

export default validateSignIn;
