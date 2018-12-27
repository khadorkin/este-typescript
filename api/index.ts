import { GraphQLServer } from 'graphql-yoga';
import { Prisma } from '../prisma/generated/prisma-client';
import { resolvers } from './resolvers';
import { Context } from './types';

const endpoint = process.env.PRISMA_ENDPOINT as string;
if (!endpoint)
  throw Error(
    `Missing process.env.PRISMA_ENDPOINT. Did you run 'npm run env dev'?`,
  );

const context: Context = {
  db: new Prisma({ endpoint, secret: process.env.PRISMA_SECRET }),
  hasError: errors => Object.values(errors).some(error => error != null),
};

const server = new GraphQLServer({
  context,
  resolvers,
  typeDefs: './api/schema.graphql',
} as any);

server.start(() => {
  // tslint:disable-next-line:no-console
  console.log('Server is running on http://localhost:4000');
});
