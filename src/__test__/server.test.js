const supertest = require("supertest");
const server = require("../server");
require("dotenv").config();

afterEach(() => {
  // stop the server after each test
  // avoids "port already in use" errors
  server.close();
});

describe("Server routes", () => {
  test("Home route", () => {
    return supertest(server)
      .get("/")
      .expect(200)
      .expect("content-type", "application/json")
      .then(response => {
        expect(JSON.parse(response.text)).toEqual({ hello: "world" });
      });
  });
});
