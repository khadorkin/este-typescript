import * as http from 'http';
// Just to test code sharing.
import * as validation from '../validations';

http
  .createServer((_, res) => {
    res.write(validation.validateEmail('Hello World!'));
    res.end();
  })
  .listen(3000);
