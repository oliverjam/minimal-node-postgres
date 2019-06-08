const { createServer } = require("http");
require("dotenv").config();

const server = createServer((request, response) => {
  response.setHeader("content-type", "text/html");
  response.end(`<h1>Hello world</h1>`);
});

server.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
