import { GraphQLServer } from 'graphql-yoga';
import { data } from './data';
import { resolvers } from './resolvers';

const server = new GraphQLServer({
  context: { data },
  resolvers,
  typeDefs: './api/schema.graphql',
} as any);

server.start(() => {
  // tslint:disable-next-line:no-console
  console.log('Server is running on http://localhost:4000');
});
