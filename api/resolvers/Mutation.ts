import { MutationResolvers } from '../generated/graphqlgen';

export const Mutation: MutationResolvers.Type = {
  ...MutationResolvers.defaultResolvers,
  signIn: () => {
    throw new Error('Resolver not implemented');
  },
};
