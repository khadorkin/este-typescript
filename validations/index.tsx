import isEmail from 'validator/lib/isEmail';
import isURL from 'validator/lib/isURL';

// Helpers. Not exported, because they are just helpers.
const required = (value: string) => (value.length === 0 ? 'REQUIRED' : null);
const min5 = (value: string) => (value.length < 5 ? 'MIN_5_CHARS' : null);
const max140 = (value: string) => (value.length > 140 ? 'MAX_140_CHARS' : null);
const max1024Chars = (value: string) =>
  value.length > 1024 ? 'MAX_1024_CHARS' : null;

export const validateEmail = (value: string) =>
  required(value) || (!isEmail(value) ? 'EMAIL' : null);

export const validateUrl = (value: string) =>
  required(value) || (!isURL(value) ? 'URL' : null);

export const max140Chars = (value: string) => required(value) || max140(value);

export const validatePassword = (value: string) =>
  required(value) || min5(value) || max1024Chars(value);
