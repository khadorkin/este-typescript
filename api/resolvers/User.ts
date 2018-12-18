import { UserResolvers } from '../generated/graphqlgen';

export const User: UserResolvers.Type = {
  ...UserResolvers.defaultResolvers,
  email: () => {
    throw new Error('Resolver not implemented');
  },
  name: () => {
    throw new Error('Resolver not implemented');
  },
  posts: () => {
    throw new Error('Resolver not implemented');
  },
};
