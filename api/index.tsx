import { GraphQLServer } from 'graphql-yoga';
import { Prisma } from '../prisma/generated/prisma-client';
import { resolvers } from './resolvers';

// TODO: Use dotenv as in Este.
// {
//   // endpoint: process.env.PRISMA_ENDPOINT!,
//   // secret: process.env.PRISMA_SECRET!,
//   // debug: true,
// }
const db = new Prisma();

const server = new GraphQLServer({
  context: { db },
  resolvers,
  typeDefs: './api/schema.graphql',
} as any);

server.start(() => {
  // tslint:disable-next-line:no-console
  console.log('Server is running on http://localhost:4000');
});
