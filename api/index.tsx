import * as http from 'http';
// Just to test code sharing.
import * as validators from '../validators';

http
  .createServer((_, res) => {
    res.write(validators.validateEmail('Hello World!'));
    res.end();
  })
  .listen(4000);

// import { prisma } from '../database/generated/prisma-client';

// // A `main` function so that we can use async/await

// const main = async () => {
//   // Create a new user called `Alice`
//   const newUser = await prisma.createUser({ name: 'Alice' });
//   // tslint:disable-next-line:no-console
//   console.log(`Created new user: ${newUser.name} (ID: ${newUser.id})`);

//   // Read all users from the database and print them to the console
//   const allUsers = await prisma.users();
//   // tslint:disable-next-line:no-console
//   console.log(allUsers);
// };

// // tslint:disable-next-line:no-console
// main().catch(error => console.error(error));
