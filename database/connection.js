var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "restaurant",
  password: "S566kcKyQeykBpsY"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  con.query("CREATE DATABASE restaurant", function (err, result) {
    if (err) throw err;
    console.log("Database created");
  });
});
