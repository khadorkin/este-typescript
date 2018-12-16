import * as http from 'http';
// Just to test code sharing.
import * as validators from '../validators';

http
  .createServer((_, res) => {
    res.write(validators.validateEmail('Hello World!'));
    res.end();
  })
  .listen(4000);
