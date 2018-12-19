import { Prisma } from '../prisma/generated/prisma-client';
import { EmailError, PasswordError } from '../validators';

export interface User {
  id: string;
  createdAt: string;
  updatedAt: string;
  email: string;
}

export interface SignInInput {
  email: string;
  password: string;
  createAccount: boolean;
}

export interface SignInErrors {
  email: EmailError | null;
  password: PasswordError | null;
}

export interface SignInPayload {
  errors: SignInErrors;
  token: string | null;
  user: User | null;
}

export interface Context {
  db: Prisma;
}
