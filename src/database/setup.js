const { promisify } = require("util");
const { exec } = require("child_process");
const build = require("./build");
require("dotenv").config();
/* eslint-disable no-console */

const execute = promisify(exec); // death to callbacks

const DB_NAME = process.env.NODE_ENV === "test" ? "test" : "dev";
const DB_USER = process.env.NODE_ENV === "test" ? "tester" : "developer";
const DB_PASSWORD = process.env.NODE_ENV === "test" ? "test" : "dev";

// uses ANSI escape sequences to style the text
// https://en.wikipedia.org/wiki/ANSI_escape_code
const boldGreen = str => "\u001b[1m\u001b[32m" + str + "\u001b[0m";
const boldRed = str => "\u001b[1m\u001b[31m" + str + "\u001b[0m";

console.log(`\nCreating database '${DB_NAME}'...`);
execute(
  `psql <<EOF
\\x
CREATE DATABASE ${DB_NAME};
CREATE USER ${DB_USER} WITH SUPERUSER PASSWORD '${DB_PASSWORD}';
ALTER DATABASE ${DB_NAME} OWNER TO ${DB_USER};
EOF`
)
  .then(() => console.log(boldGreen(`Created '${DB_NAME}'`)))
  .then(() => console.log(`\nBuilding database '${DB_NAME}'...`))
  .then(build)
  .then(() => console.log(boldGreen(`Built '${DB_NAME}'`)))
  .catch(error => {
    console.log(boldRed(`Error building '${DB_NAME}'\n`));
    console.log(error);
    process.exit(0);
  });
