import { ApolloServer, gql } from 'apollo-server';
import { importSchema } from 'graphql-import';
import { Prisma } from '../prisma/generated/prisma-client';
import { resolvers } from './resolvers';
import { Context } from './types';
import { IncomingMessage } from 'http';
import * as jwt from 'jsonwebtoken';
import { JsonWebTokenPayload } from './resolvers/Mutation';
// import { makeExecutableSchema } from "graphql-tools";
// import { rule, shield, and, or, not } from 'graphql-shield';

const { PRISMA_ENDPOINT, PRISMA_SECRET, API_SECRET } = process.env;
if (!PRISMA_ENDPOINT || !PRISMA_SECRET || !API_SECRET)
  throw Error(`Did you run 'npm run env dev'?`);

const db = new Prisma({ endpoint: PRISMA_ENDPOINT, secret: PRISMA_SECRET });

const hasError = (errors: {}) =>
  Object.values(errors).some(error => error != null);

const tryGetUserId = (req: IncomingMessage): string | null => {
  const { authorization } = req.headers;
  if (authorization == null) return null;
  const token = authorization.replace('Bearer ', '');
  const decoded = jwt.verify(token, API_SECRET);
  const hasUserId = (decoded: any): decoded is JsonWebTokenPayload =>
    'userId' in decoded;
  return hasUserId(decoded) ? decoded.userId : null;
};

const createContext = ({ req }: { req: IncomingMessage }): Context => {
  return {
    db,
    hasError,
    userId: tryGetUserId(req),
  };
};

const server = new ApolloServer({
  context: createContext,
  resolvers: resolvers as any,
  typeDefs: gql`
    ${importSchema(__dirname + '/schema.graphql')}
  `,
});

server.listen().then(({ url }) => {
  // tslint:disable-next-line:no-console
  console.log(`Server ready at ${url}`);
});
