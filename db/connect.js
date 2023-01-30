const mysql = require("mysql");
require("dotenv").config();

const { HOST, USER, DATABASE, PASSWORD} = process.env;

const connectionSQL = mysql.createConnection({
  host: HOST,
  user: USER,
  database: DATABASE,
  password: PASSWORD,
});

connectionSQL.connect((err) => {
  if (err) {
    console.log('DB not connected');
  } else {
    console.log('DB connected');
  }
})

module.exports = { connectionSQL };
