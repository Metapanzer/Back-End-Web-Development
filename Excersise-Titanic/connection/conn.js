const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "titanic",
  port: 3306,
});

db.connect((err) => {
  if (err) return console.log("Error " + err.message);

  console.log("Connected to Database");
});

module.exports = db;
