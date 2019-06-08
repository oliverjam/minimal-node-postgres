const db = require("../connection");
const build = require("../build");

beforeEach(async () => {
  await build();
});

describe("DB connection", () => {
  test("Returns error when relation does not exist", () => {
    return db.query("SELECT * FROM blah").catch(error => {
      expect(error).toMatchInlineSnapshot(
        `[error: relation "blah" does not exist]`
      );
    });
  });
  test("Returns a post", () => {
    return db.query("SELECT * FROM posts").then(data => {
      const { rows } = data;
      const [post] = rows;
      expect(post.title).toBe("my first blog post");
    });
  });
});
