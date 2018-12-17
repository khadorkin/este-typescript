# este-typescript

Is What It Is.

## Prerequisites

- [node.js](http://nodejs.org/) Node 10+
- [docker-compose](https://www.docker.com/products/docker-engine)

## Setup project

- `git clone https://github.com/este-typescript/este-typescript.git este`
- `cd este`
- `npm install`
- `npm run docker:up`
- `npm run deploy:db`

## Dev tasks

- `npm run dev` start development
- `npm run prisma`
- `npm run prisma --help`
- `npm run prisma reset` wipes the data and keeps the schema
- `npm run prisma delete` get rid of the whole service
