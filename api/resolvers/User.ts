import { UserResolvers } from '../types';

export const User: UserResolvers = {
  createdAt: parent => parent.createdAt,
  email: parent => parent.email,
  id: parent => parent.id,
  updatedAt: parent => parent.createdAt,
};
