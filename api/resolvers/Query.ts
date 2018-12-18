import { QueryResolvers } from '../generated/graphqlgen';

export const Query: QueryResolvers.Type = {
  ...QueryResolvers.defaultResolvers,
  post: () => {
    throw new Error('Resolver not implemented');
  },
  postsByUser: () => {
    throw new Error('Resolver not implemented');
  },
  publishedPosts: () => {
    throw new Error('Resolver not implemented');
  },
};
