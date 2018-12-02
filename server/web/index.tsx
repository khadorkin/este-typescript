import { createServer } from 'http';
import { parse } from 'url';
import * as next from 'next';

const port = process.env.PORT != null ? parseInt(process.env.PORT, 10) : 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => {
    // @ts-ignore req.url should not be nullable imho.
    const parsedUrl = parse(req.url, true);
    const { pathname, query } = parsedUrl;

    if (pathname === '/a') {
      app.render(req, res, '/a', query);
    } else if (pathname === '/b') {
      app.render(req, res, '/b', query);
    } else {
      handle(req, res, parsedUrl);
    }
  })
    // @ts-ignore Error should be typed imho.
    .listen(port, error => {
      if (error) throw error;
      // tslint:disable-next-line no-console
      console.log(`> Ready on http://localhost:${port}`);
    });
});
