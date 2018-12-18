import { QueryResolvers } from '../generated/graphqlgen';

export const Query: QueryResolvers.Type = {
  ...QueryResolvers.defaultResolvers,
  post: (parent, args, ctx) => {
    throw new Error('Resolver not implemented');
  },
  postsByUser: (parent, args, ctx) => {
    throw new Error('Resolver not implemented');
  },
  publishedPosts: (parent, args, ctx) => {
    throw new Error('Resolver not implemented');
  },
};
