var mysql = require('mysql');

var connection = mysql.createConnection({
  host: "localhost",
  user: "restaurant",
  password: "S566kcKyQeykBpsY",
  database: "restaurant-app"
});

var sql = '';
connection.connect();

sql = 'DROP TABLE IF EXISTS customers';
connection.query(sql , function (error, results, fields) {
  if (error) throw error;
  console.log('DROP customer table: ');
});

sql = 'CREATE TABLE customers (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), address VARCHAR(255))';
connection.query(sql, function (error, results, fields) {
  if (error) throw error;
  console.log('CREATE customer table: ');
});

sql = 'INSERT INTO customers (name, address) VALUES ("Mike","432 Some Street")';
connection.query(sql, function (error, results, fields) {
  if (error) throw error;
  console.log('INSERT INTO customers table: ');
});


connection.end();
