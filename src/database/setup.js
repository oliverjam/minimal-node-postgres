const { promisify } = require("util");
const { exec } = require("child_process");
const build = require("./build");
require("dotenv").config();
/* eslint-disable no-console */

const execute = promisify(exec); // death to callbacks

const DB_URL =
  process.env.NODE_ENV === "test"
    ? process.env.TEST_DB_URL
    : process.env.DATABASE_URL;

const { username, password, pathname } = new URL(DB_URL);
const dbName = pathname.replace("/", "");

// uses ANSI escape sequences to style the text
// https://en.wikipedia.org/wiki/ANSI_escape_code
const boldGreen = str => "\u001b[1m\u001b[32m" + str + "\u001b[0m";
const boldRed = str => "\u001b[1m\u001b[31m" + str + "\u001b[0m";

console.log(`\nCreating database '${dbName}'...`);
execute(
  `psql <<EOF
\\x
CREATE DATABASE ${dbName};
CREATE USER ${username} WITH SUPERUSER PASSWORD '${password}';
ALTER DATABASE ${dbName} OWNER TO ${username};
EOF`
)
  .then(() => {
    console.log(boldGreen(`Created '${dbName}'`));
    console.log(`\nBuilding database '${dbName}'...`);
  })
  .then(build)
  .then(() => {
    console.log(boldGreen(`Built '${dbName}'`));
    process.exit(0); // exits immediately to stop terminal hanging
  })
  .catch(error => {
    console.log(boldRed(`Error building '${dbName}'\n`));
    console.log(error);
    process.exit(0);
  });
