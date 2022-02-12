var mysql = require('mysql');

var connection = mysql.createConnection({
  host: "localhost",
  user: "restaurant",
  password: "S566kcKyQeykBpsY",
  database: "restaurantDB"
});

var sql = '';
connection.connect();
/*
sql = 'CALL addUser ("2313 Sumac Way", "Woodbury", "MN", "55125", "Tyler", "Irvin", "irvint@csp.edu", "tirvin", "something"); ';
connection.query(sql, function (error, results) {
  if (error) throw error;
  console.log('Add Test User1 ', results);
});

sql = 'CALL addUser ("123 Main St", "Springfield", "IL", "43578", "Susan", "Hart", "harts@gmail.com", "susanh", "drowssap");';
connection.query(sql, function (error, results) {
  if (error) throw error;
  console.log('Add Test User2 ', results);
});
*/
sql= 'CALL addRestaurant ("7250 Valley Creek Plaza", "Woodbury", "MN", "55125", "applebees.jpg", 1, "Applebee\'s", "", "https://www.applebees.com", "(651) 731-8321"); ';
connection.query(sql, function (error, results) {
  if (error) throw error;
  console.log('Add Test Restaurant1 ', results);
});

sql= 'CALL addRestaurant ("6233 Heimos Industrial Park Dr", "St. Louis", "MO", "63129", "image02.png", 2, "Cracker Barrel", "", "https://www.crackerbarrel.com/", "(314) 416-8880"); ';
connection.query(sql, function (error, results) {
  if (error) throw error;
  console.log('Add Test Restaurant2 ', results);
});


connection.end();