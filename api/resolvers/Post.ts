import { PostResolvers } from '../generated/graphqlgen';

export const Post: PostResolvers.Type = {
  ...PostResolvers.defaultResolvers,
  author: (parent, args, ctx) => {
    throw new Error('Resolver not implemented');
  },
};
