import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { MutationResolvers } from '../generated/graphqlgen';
import { User } from '../types';
import validateSignIn from '../../validators/validateSignIn';

// login: async (_parent, { email, password }, context) => {
//   const user = await context.db.user({ email })
//   const valid = await bcrypt.compare(password, user ? user.password : '')

//   if (!valid || !user) {
//     throw new Error('Invalid Credentials')
//   }

//   const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET as jwt.Secret)

//   return {
//     id: user.id,
//     token,
//   }
// },

export const Mutation: MutationResolvers.Type = {
  ...MutationResolvers.defaultResolvers,

  signIn: async (_, { input }, context) => {
    const errors = validateSignIn(input);
    if (errors)
      return {
        errors: {
          email: null,
          password: null,
        },
        token: null,
      };
    const createSuccessAuthPayload = (user: User) => ({
      errors: null,
      token: jwt.sign({ userId: user.id }, process.env
        .API_SECRET as jwt.Secret),
    });

    if (input.createAccount) {
      const email = input.email;
      // const exists = await db.exists.User({ email: input.email });
      // if (exists)
      //   return {
      //     errors: {
      //       email: 'ALREADY_EXISTS',
      //     },
      //   };
      const password = await bcrypt.hash(input.password, 10);
      const user = await context.db.createUser({ email, password });
      return createSuccessAuthPayload(user);
    }
    throw new Error('Resolver not implemented');
  },
};
