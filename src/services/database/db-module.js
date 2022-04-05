const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "www.volpatofederico.it",
  user: "UserZweeck",
  password: "Zweeck$03",
  database: "zweeck",
});

exports.query = function (query, params) {
  return new Promise((resolve, reject) => {
    // open connection for a query
    connection.connect((error) => {
      if (error) reject(`Query failed: [${error.message}]`);
    });
    // execute query
    connection.query(query, params ?? [], (error, results) => {
      if (error) reject(`Query failed: [${error.message}]`);
      resolve(results);
    });
    // close connection for the query
    connection.end();
  });
};
