const { createServer } = require("http");
require("dotenv").config();

const server = createServer((request, response) => {
  response.setHeader("content-type", "application/json");
  response.end(JSON.stringify({ hello: "world" }));
});

server.listen(process.env.PORT || 3000, () => {
  console.log("Server is running on http://localhost:3000");
});

module.exports = server;
