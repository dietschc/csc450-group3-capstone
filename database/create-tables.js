var mysql = require('mysql');

var connection = mysql.createConnection({
  host: "localhost",
  user: "restaurant",
  password: "S566kcKyQeykBpsY",
  database: "restaurantDB"
});

var sql = '';
connection.connect();

sql = 'DROP TABLE IF EXISTS restaurants';
connection.query(sql, function (error, results) {
  if (error) throw error;
  console.log('DROP restaurants table: ', results);
});

sql = `CREATE TABLE restaurants(
  id INT(11) PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(200),
  address VARCHAR(200),
  createdAt DATE,
  updatedAt DATE
  )ENGINE=INNODB;`
connection.query(sql, function (error, results) {
  if (error) throw error;
  console.log('CREATE restaurants table: ', results);
});

sql = 'INSERT INTO restaurants (name, address) VALUES ("Best Thai","432 Some Street")';
connection.query(sql, function (error, results) {
  if (error) throw error;
  console.log('INSERT INTO restaurants table: ', results);
});


connection.end();
