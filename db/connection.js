const mysql = require("mysql");
const util = require("util");
require("dotenv").config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

connection.connect(function(err) {
    if (err) throw err;

  });

  connection.query = util.promisify(connection.query)

  module.exports = connection