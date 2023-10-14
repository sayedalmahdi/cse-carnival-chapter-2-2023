const mysql = require("mysql2");
const config = require("./config");

const pool = mysql.createConnection({
  database: "railway",
  host: "containers-us-west-94.railway.app",
  password: "oVStev8RMXpn1dj64ugj",
  port: 6206,
  user: "root",
});

module.exports = pool;