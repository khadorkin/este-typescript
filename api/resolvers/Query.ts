import { QueryResolvers } from '../generated/graphqlgen';

export const Query: QueryResolvers.Type = {
  ...QueryResolvers.defaultResolvers,
  me: (_parent, _args, ctx) => {
    return ctx.getUser();
  },
};
