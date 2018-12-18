import { Resolvers } from '../generated/graphqlgen';
import { Mutation } from './Mutation';
import { Post } from './Post';
import { Query } from './Query';
import { User } from './User';

export const resolvers: Resolvers = {
  Mutation,
  Post,
  Query,
  User,
};
