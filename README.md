# Minimal Node Postgres

A minimal boilerplate to get started with Node and Postgres. Includes a database setup script, testing with Jest & Supertest and basic linting rules.

## Docs

### Setup

1. Run `npm install`
1. Rename `.env.example` to `.env` (change the values if you like)
1. Run `npm run setup` to create a dev database using the values in `.env`
1. Run `npm run dev` to start the live-reloading server

### Database

We're using PostgreSQL as our database and the `pg` Node module to connect to it. We create a new connection pool in `src/database/connection.js` using the `DATABASE_URL` from your `.env`.

The database tables are built with some example data in `src/database/build.js`.

`src/database/setup.js` is a script for creating a new database using the `psql` CLI. It will use the username/password/database name from the `DATABASE_URL` in your `.env`. It doesn't really matter what you set these to as this won't be used in production.

You can run this script with `npm run setup` to make sure your dev database is created and built. It's okay to run this multiple times (as long as you don't mind overwriting the data in the tables).

### Testing

Run the tests with `npm test`. You can make Jest watch for changes with `npm test -- --watch`.

Jest will automatically run any test files ending in `.test.js`. It's common to group these in `__test__` directories.

The setup script will create a separate test database (using the `TEST_DB_URL` from `.env`) when `NODE_ENV` is set to `"test"`. This will happen automatically in the `pretest` npm script that runs before `npm test`.

There is an example server test using Supertest in `src/__test__/server.test.js`. It will start the server is `server.js` on a different port (so it doesn't clash with your dev server if you have that running on `3000`).

There is an example database test in `src/database/__test__/connection.test.js`. It rebuilds the database tables before each test to ensure the tests don't affect each other.

### Linting

Run `npm run lint` to have check all files with ESLint. Feel free to add or disable rules in the `.eslintrc` file.

### Formatting

Run `npm run format` to format all the JS files using Prettier. The `.prettierrc` file has set some defaults to ensure everyone's editors auto-formats the same way. You can [configure](https://prettier.io/docs/en/options.html) more rules if you like.
