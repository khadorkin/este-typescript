import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { MutationResolvers } from '../generated/graphqlgen';
import { SignInErrors } from '../types';
import validateSignIn from '../../validators/validateSignIn';

export const Mutation: MutationResolvers.Type = {
  ...MutationResolvers.defaultResolvers,

  signIn: async (_, { input }, context) => {
    const fail = (errors: Partial<SignInErrors>) => ({
      errors: {
        email: null,
        password: null,
        ...errors,
      },
      token: null,
    });
    const success = (userId: string) => ({
      errors: null,
      token: jwt.sign({ userId }, process.env.API_SECRET as jwt.Secret),
    });

    const errors = validateSignIn(input);
    if (context.hasError(errors)) return fail(errors);

    if (input.createAccount) {
      const exists = await context.db.$exists.user({ email: input.email });
      if (exists) return fail({ email: 'ALREADY_EXISTS' });
      const password = await bcrypt.hash(input.password, 10);
      const user = await context.db.createUser({
        email: input.email,
        password,
      });
      return success(user.id);
    } else {
      const user = await context.db.user({ email: input.email });
      if (!user) return fail({ email: 'NOT_EXISTS' });
      const validPassword = await bcrypt.compare(input.password, user.password);
      if (!validPassword) return fail({ password: 'WRONG_PASSWORD' });
      return success(user.id);
    }
  },
};
