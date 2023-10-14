const mysql = require("mysql2");
const config = require("./config");

const pool = mysql.createConnection({
  database: config.db.database,
  host: config.db.host,
  password: config.db.password,
  //port: config.db.database_port,
  user: config.db.user,
});

module.exports = pool;
