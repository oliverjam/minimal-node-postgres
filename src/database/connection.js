const { Pool } = require("pg");
require("dotenv").config();

const DB_URL =
  process.env.NODE_ENV === "test"
    ? process.env.TEST_DB_URL
    : process.env.DB_URL;

if (!DB_URL) throw new Error("Enviroment variable DB_URL must be set");

const options = {
  connectionString: DB_URL,
  ssl: !DB_URL.includes("localhost"),
};

module.exports = new Pool(options);
