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

const createContext = ({ req }: { req: IncomingMessage }): Context => {
  const db = new Prisma({ endpoint: PRISMA_ENDPOINT, secret: PRISMA_SECRET });

  // https://graphql.org/learn/authorization
  // Returning null instead of throwing auth errors in resolvers is
  // recommended. We can add more sophisticated auth errors logic later.
  const getUser = (req: IncomingMessage) => async () => {
    const { authorization } = req.headers;
    if (authorization == null) return null;
    const token = authorization.replace('Bearer ', '');
    const decoded = jwt.verify(token, API_SECRET);
    const hasUserId = (decoded: any): decoded is JsonWebTokenPayload =>
      'userId' in decoded;
    if (!hasUserId(decoded)) return null;
    return db.user({ id: decoded.userId });
  };

  return {
    db,
    getUser: getUser(req),
    hasError: (errors: {}) => Object.values(errors).some(e => e != null),
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
