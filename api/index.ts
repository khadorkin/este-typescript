import { ApolloServer, gql } from 'apollo-server';
import { importSchema } from 'graphql-import';
import { Prisma } from '../prisma/generated/prisma-client';
import { resolvers } from './resolvers';
import { Context } from './types';
import { IncomingMessage } from 'http';
import * as jwt from 'jsonwebtoken';
import { JsonWebTokenPayload } from './resolvers/Mutation';

const { PRISMA_ENDPOINT, PRISMA_SECRET, API_SECRET } = process.env;
if (!PRISMA_ENDPOINT || !PRISMA_SECRET || !API_SECRET)
  throw Error(`Did you run 'npm run env dev'?`);

const db = new Prisma({ endpoint: PRISMA_ENDPOINT, secret: PRISMA_SECRET });

// https://graphql.org/learn/authorization
const getUser = async (req: IncomingMessage) => {
  const { authorization } = req.headers;
  if (authorization == null) return null;
  const token = authorization.replace('Bearer ', '');
  let decoded = {};
  try {
    decoded = jwt.verify(token, API_SECRET);
  } catch (error) {
    // tslint:disable-next-line:no-console
    console.log(error);
    return null;
  }
  const hasUserId = (decoded: any): decoded is JsonWebTokenPayload =>
    'userId' in decoded;
  if (!hasUserId(decoded)) return null;
  const user = await db.user({ id: decoded.userId });
  return user;
};

const hasError = (errors: {}) =>
  Object.values(errors).some(error => error != null);

const server = new ApolloServer({
  context: async ({ req }: { req: IncomingMessage }): Promise<Context> => {
    const user = await getUser(req);
    return { db, hasError, user };
  },
  resolvers: resolvers as any,
  typeDefs: gql`
    ${importSchema(__dirname + '/schema.graphql')}
  `,
});

server.listen().then(({ url }) => {
  // tslint:disable-next-line:no-console
  console.log(`Server ready at ${url}`);
});
