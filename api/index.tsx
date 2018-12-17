// import * as http from 'http';
// // Just to test code sharing.
// import * as validators from '../validators';

// http
//   .createServer((_, res) => {
//     res.write(validators.validateEmail('Hello World!'));
//     res.end();
//   })
//   .listen(4000);

// import { GraphQLServer } from 'graphql-yoga';
// import { prisma } from '../prisma/generated/prisma-client';

// const Foks = {
//   Post: {
//     author(parent, args, context) {
//       return context.prisma
//         .post({
//           id: parent.id,
//         })
//         .author();
//     },
//   },
//   User: {
//     posts(parent, args, context) {
//       return context.prisma
//         .user({
//           id: parent.id,
//         })
//         .posts();
//     },
//   },
// };

// const resolvers = {
//   Mutation: {
//     createDraft(parent, args, context) {
//       return context.prisma.createPost({
//         title: args.title,
//         author: {
//           connect: { id: args.userId },
//         },
//       });
//     },
//     publish(parent, args, context) {
//       return context.prisma.updatePost({
//         where: { id: args.postId },
//         data: { published: true },
//       });
//     },
//     createUser(parent, args, context) {
//       return context.prisma.createUser({ name: args.name });
//     },
//   },
//   Query: {
//     publishedPosts(parent, args, context) {
//       return context.prisma.posts({ where: { published: true } });
//     },
//     post(parent, args, context) {
//       return context.prisma.post({ id: args.postId });
//     },
//     postsByUser(parent, args, context) {
//       return context.prisma
//         .user({
//           id: args.userId,
//         })
//         .posts();
//     },
//   },
//   ...Foks,
// };

// const server = new GraphQLServer({
//   context: {
//     prisma,
//   },
//   resolvers,
//   typeDefs: './schema.graphql',
// });
// server.start(() => console.log('Server is running on http://localhost:4000'));
