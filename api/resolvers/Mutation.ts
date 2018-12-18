import { MutationResolvers } from '../generated/graphqlgen';

export const Mutation: MutationResolvers.Type = {
  ...MutationResolvers.defaultResolvers,
  createDraft: (/* parent, args, ctx */) => {
    // ctx.data.
    throw new Error('Resolver not implemented');
  },
  createUser: () => {
    throw new Error('Resolver not implemented');
  },
  publish: () => {
    throw new Error('Resolver not implemented');
  },
};
