import { UserResolvers } from '../generated/graphqlgen';
import { User as UserType } from '../types';

export const User: UserResolvers.Type = {
  ...UserResolvers.defaultResolvers,

  createdAt: (parent: UserType) => parent.createdAt,
  updatedAt: (parent: UserType) => parent.createdAt,
};
