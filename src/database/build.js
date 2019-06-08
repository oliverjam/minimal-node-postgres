const db = require("./connection");

const sql = `
BEGIN;
DROP TABLE IF EXISTS posts CASCADE;
CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  title VARCHAR(64),
  body VARCHAR(50000) NOT NULL
);
INSERT INTO posts (title, body) VALUES
('my first blog post', 'lorem ipsum'),
('another post', 'blah blah blah');
COMMIT;
`;

function build() {
  return db.query(sql).then(() => db.end());
}

module.exports = build;
