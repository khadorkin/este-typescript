import { QueryResolvers } from '../types';

export const Query: QueryResolvers = {
  me: () => {
    throw new Error('Resolver not implemented');
  },
};
