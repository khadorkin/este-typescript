import { UserResolvers } from '../generated/graphqlgen';

export const User: UserResolvers.Type = {
  ...UserResolvers.defaultResolvers,
  email: (parent, args, ctx) => {
    throw new Error('Resolver not implemented');
  },
  name: (parent, args, ctx) => {
    throw new Error('Resolver not implemented');
  },
  posts: (parent, args, ctx) => {
    throw new Error('Resolver not implemented');
  },
};
