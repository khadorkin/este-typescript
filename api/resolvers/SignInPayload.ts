import { SignInPayloadResolvers } from '../types';

export const SignInPayload: SignInPayloadResolvers = {
  errors: parent => (parent.errors == null ? null : parent.errors),
  token: parent => (parent.token == null ? null : parent.token),
};
