import * as http from 'http';
// Just to test code sharing.
import * as validations from '../validations';

http
  .createServer((_, res) => {
    res.write(validations.validateEmail('Hello World!'));
    res.end();
  })
  .listen(4000);
