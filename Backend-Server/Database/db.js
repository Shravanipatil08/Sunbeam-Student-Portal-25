const mysql2 = require("mysql2"); //imported mysql2

const pool = mysql2.createPool({
  //database connection
  host: "localhost",
  user: "root",
  password: "root",
  database: "sunbeam_db",
});

module.exports = pool; //exported database
