import { GraphQLServer } from 'graphql-yoga';
import { Prisma } from '../prisma/generated/prisma-client';
import { resolvers } from './resolvers';

const db = new Prisma({
  endpoint: process.env.PRISMA_ENDPOINT as string,
  secret: process.env.PRISMA_SECRET,
});

const server = new GraphQLServer({
  context: { db },
  resolvers,
  typeDefs: './api/schema.graphql',
} as any);

server.start(() => {
  // tslint:disable-next-line:no-console
  console.log('Server is running on http://localhost:4000');
});
