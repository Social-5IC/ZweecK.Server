const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "www.volpatofederico.it",
  user: "UserZweeck",
  password: "Zweeck$03",
  database: "zweeck",
});

const connectionCallback = function (err) {
  if (err) console.error("Error connecting: ", err.stack);
  console.log("connected");
};

exports.query = function (query, params) {
  connection.connect(connectionCallback);
};
