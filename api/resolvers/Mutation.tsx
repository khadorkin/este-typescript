import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { MutationResolvers } from '../generated/graphqlgen';
import { User, SignInErrors } from '../types';
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
    const fail = (errors: SignInErrors) => ({ errors, token: null });
    // if (context.hasErrors(errors)) return fail(errors);
    if (Object.values(errors).some(value => value != null)) return fail(errors);

    const success = (userId: string) => ({
      errors: null,
      token: jwt.sign({ userId }, process.env.API_SECRET as jwt.Secret),
    });

    if (input.createAccount) {
      const { email } = input;
      const exists = await context.db.$exists.user({ email });
      if (exists) return fail({ email: 'ALREADY_EXISTS', password: null });
      const password = await bcrypt.hash(input.password, 10);
      const user = await context.db.createUser({ email, password });
      return success(user.id);
    }
    throw new Error('Resolver not implemented');
  },
};
