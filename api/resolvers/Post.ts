import { PostResolvers } from '../generated/graphqlgen';

export const Post: PostResolvers.Type = {
  ...PostResolvers.defaultResolvers,
  author: () => {
    throw new Error('Resolver not implemented');
  },
};
