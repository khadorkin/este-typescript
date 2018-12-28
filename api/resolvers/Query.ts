import { QueryResolvers } from '../generated/graphqlgen';

export const Query: QueryResolvers.Type = {
  ...QueryResolvers.defaultResolvers,
  me: async (_parent, _args, ctx) => {
    if (ctx.userId == null) return null;
    const user = await ctx.db.user({ id: ctx.userId });
    if (user == null) return null;
    return user;
  },
};
