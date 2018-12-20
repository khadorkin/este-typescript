import isEmail from 'validator/lib/isEmail';
import { EmailError, PasswordError } from '../api/types';
// import isURL from 'validator/lib/isURL';

type ValidationError = EmailError | PasswordError;

export type MaybeValidationError = ValidationError | undefined;

export type ValidationErrors<Input> = {
  [P in keyof Input]?: MaybeValidationError
};
// TODO: Use generated Errors.
export type Validator<Input> = (input: Input) => ValidationErrors<Input>;

// Helpers.

const required = (value: string) => value.length === 0 && 'REQUIRED';
const email = (value: string) => !isEmail(value) && 'EMAIL';
const min5 = (value: string) => value.length < 5 && 'MIN_5_CHARS';
const max1024 = (value: string) => value.length > 1024 && 'MAX_1024_CHARS';
// const max140 = (value: string) => value.length > 140 && 'MAX_140_CHARS';

// Fields.

type Validate = (value: string) => MaybeValidationError;

export const validateEmail: Validate = value =>
  required(value) || email(value) || undefined;

export const validatePassword: Validate = value =>
  required(value) || min5(value) || max1024(value) || undefined;

// export const validateUrl = (value: string) =>
//   required(value) || (!isURL(value) ? 'URL' : undefined);

// export const max140Chars = (value: string) => required(value) || max140(value);
