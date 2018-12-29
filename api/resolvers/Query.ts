import { QueryResolvers } from '../generated/graphqlgen';

export const Query: QueryResolvers.Type = {
  ...QueryResolvers.defaultResolvers,
  me: (_parent, _args, ctx) => {
    return ctx.user;
  },
  // posts: (_parent, _args, ctx) => {
  //   // https://graphql.org/learn/authorization
  //   // if (ctx.user == null) return null
  //   return ctx.getUser();
  // },
};
