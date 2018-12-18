import { MutationResolvers } from '../generated/graphqlgen';

export const Mutation: MutationResolvers.Type = {
  ...MutationResolvers.defaultResolvers,
  createDraft: (parent, args, ctx) => {
    throw new Error('Resolver not implemented');
  },
  createUser: (parent, args, ctx) => {
    throw new Error('Resolver not implemented');
  },
  publish: (parent, args, ctx) => {
    throw new Error('Resolver not implemented');
  },
};
