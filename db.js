const {Pool} = require("pg");

const pool = new Pool({
  user: "postgres",
  password: "bruhbruh",
  database: "webtask",
  host: "localhost",
  port: 5432
});

module.exports = pool;
