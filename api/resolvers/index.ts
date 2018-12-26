import { Resolvers } from '../generated/graphqlgen';

import { Mutation } from './Mutation';
import { Query } from './Query';
import { SignInErrors } from './SignInErrors';
import { SignInPayload } from './SignInPayload';
import { User } from './User';

export const resolvers: Resolvers = {
  Mutation,
  Query,
  SignInErrors,
  SignInPayload,
  User,
};
