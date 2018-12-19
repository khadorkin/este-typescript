// import * as bcrypt from 'bcryptjs';
// import * as jwt from 'jsonwebtoken';
import { MutationResolvers } from '../generated/graphqlgen';

// login: async (_parent, { email, password }, ctx) => {
//   const user = await ctx.db.user({ email })
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
  // signIn: async (_, { input }, ctx) => {
  signIn: async () => {
    // if (input.createAccount) {
    //   const password = await bcrypt.hash(input.password, 10);
    //   const user = await ctx.db.createUser({
    //     email: input.email,
    //     password: input.password,
    //   });
    //   const token = jwt.sign({ userId: user.id }, process.env
    //     .APP_SECRET as jwt.Secret);
    //   //   return {
    //   //     id: user.id,
    //   //     token,
    //   //   }
    //   // ctx.db.
    // }
    throw new Error('Resolver not implemented');
  },
};
