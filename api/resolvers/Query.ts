import { QueryResolvers } from '../generated/graphqlgen';

export const Query: QueryResolvers.Type = {
  ...QueryResolvers.defaultResolvers,
  me: async (_parent, _args, ctx) => {
    return await ctx.getUser();
  },
};
