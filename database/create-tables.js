var mysql = require('mysql');

var connection = mysql.createConnection({
  host: "localhost",
  user: "restaurant",
  password: "S566kcKyQeykBpsY",
  database: "restaurantDB"
});

var sql = '';
connection.connect();

sql = 'CREATE TABLE IF NOT EXISTS address (';
sql += 'addressId INT NOT NULL AUTO_INCREMENT, ';
sql += 'address VARCHAR (64), ';
sql += 'city VARCHAR(64), ';
sql += 'state CHAR(2), ';
sql += 'zip CHAR(5), ';
sql += 'PRIMARY KEY (addressId))';

connection.query(sql, function (error, results) {
  if (error) throw error;
  console.log('CREATE address table: ', results);
});

sql = 'CREATE TABLE IF NOT EXISTS user (';
sql += 'userId INT NOT NULL AUTO_INCREMENT, ';
sql += 'addressId INT, ';
sql += 'fName VARCHAR(64) NOT NULL, ';
sql += 'lName VARCHAR(64) NOT NULL, ';
sql += 'userEmail VARCHAR(64), ';
sql += 'PRIMARY KEY (userId), ';
sql += 'FOREIGN KEY (addressId) REFERENCES address(addressId))';

connection.query(sql, function (error, results) {
  if (error) throw error;
  console.log('CREATE user table: ', results);
});

sql = 'CREATE TABLE IF NOT EXISTS conversation (';
sql += 'conversationId INT NOT NULL AUTO_INCREMENT, '
sql += 'userId1 INT NOT NULL, ';
sql += 'userId2 INT NOT NULL, ';
sql += 'PRIMARY KEY (conversationId), ';
sql += 'FOREIGN KEY (userId1) REFERENCES user(userId), ';
sql += 'FOREIGN KEY (userId2) REFERENCES user(userId))';

connection.query(sql, function (error, results) {
  if (error) throw error;
  console.log('CREATE conversation table: ', results);
});

sql = 'CREATE TABLE IF NOT EXISTS message (';
sql += 'messageID INT NOT NULL AUTO_INCREMENT, ';
sql += 'conversationID INT NOT NULL, ';
sql += 'message VARCHAR(255), ';
sql += 'timestamp DATETIME, ';
sql += 'PRIMARY KEY (messageId), ';
sql += 'FOREIGN KEY (conversationId) REFERENCES conversation(conversationID))';

connection.query(sql, function (error, results) {
  if (error) throw error;
  console.log('CREATE message table: ', results);
});

sql = 'CREATE TABLE IF NOT EXISTS image (';
sql += 'imageId INT NOT NULL AUTO_INCREMENT, ';
sql += 'imageLocation VARCHAR(255) UNIQUE, ';
sql += 'PRIMARY KEY (imageId))';

connection.query(sql, function (error, results) {
  if (error) throw error;
  console.log('CREATE image table: ', results);
});

sql = 'CREATE TABLE IF NOT EXISTS restaurant (';
sql += 'restaurantId INT NOT NULL AUTO_INCREMENT, ';
sql += 'userCreatorId INT, ';
sql += 'userOwnerId INT, ';
sql += 'ratingId INT, ';
sql += 'addressId INT, ';
sql += 'imageId INT, ';
sql += 'restaurantName VARCHAR(64), ';
sql += 'restDigiContact VARCHAR(255), ';
sql += 'restWebsite VARCHAR(255), ';
sql += 'restPhone VARCHAR(15), ';
sql += 'revCount INT UNSIGNED, ';
sql += 'PRIMARY KEY (restaurantId), ';
sql += 'FOREIGN KEY (userCreatorId) REFERENCES user(userId), ';
sql += 'FOREIGN KEY (userOwnerId) REFERENCES user(userId), ';
sql += 'FOREIGN KEY (addressId) REFERENCES address(addressId), ';
sql += 'FOREIGN KEY (imageId) REFERENCES image(imageId))';

connection.query(sql, function (error, results) {
  if (error) throw error;
  console.log('CREATE restaurant table: ', results);
});


sql = 'CREATE TABLE IF NOT EXISTS review (';
sql += 'revId INT NOT NULL AUTO_INCREMENT, ';
sql += 'userId INT NOT NULL, ';
sql += 'restaurantId INT NOT NULL, ';
sql += 'revTitle VARCHAR(64), ';
sql += 'revText VARCHAR(255), ';
sql += 'imageId INT, '
sql += 'PRIMARY KEY(revId), ';
sql += 'FOREIGN KEY (userId) REFERENCES user(userId), ';
sql += 'FOREIGN KEY (restaurantId) REFERENCES restaurant(restaurantId), ';
sql += 'FOREIGN KEY (imageId) REFERENCES image(imageId))';

connection.query(sql, function (error, results) {
  if (error) throw error;
  console.log('CREATE review table: ', results);
});


sql = 'CREATE TABLE IF NOT EXISTS rating (';
sql += 'revId INT NOT NULL, ';
sql += 'tasteRating FLOAT(1), ';
sql += 'serviceRating FLOAT(1), ';
sql += 'cleanlinessRating FLOAT(1), ';
sql += 'overallRating FLOAT(1), ';
sql += 'PRIMARY KEY (revId), ';
sql += 'FOREIGN KEY (revId) REFERENCES review(revId))';

connection.query(sql, function(error, results) {
  if (error) throw error;
  console.log('CREATE review TABLE: ', results);
});

sql = 'CREATE TABLE IF NOT EXISTS permission (';
sql += 'permissionId INT NOT NULL AUTO_INCREMENT, ';
sql += 'permissionName VARCHAR(32), ';
sql += 'PRIMARY KEY (permissionId))';

connection.query(sql, function (error, results) {
  if (error) throw error;
  console.log('CREATE permission table: ', results);
});

sql = 'CREATE TABLE IF NOT EXISTS friend (';
sql += 'friendId INT NOT NULL AUTO_INCREMENT, ';
sql += 'userId1 INT NOT NULL, ';
sql += 'userId2 INT NOT NULL, ';
sql += 'PRIMARY KEY (friendId), ';
sql += 'CONSTRAINT CK_VAL CHECK (userId1 < userId2), '
sql += 'CONSTRAINT UQ_PAIR UNIQUE (userId1, userId2))';

connection.query(sql, function(error, results) {
  if(error) throw error;
  console.log('CREATE friend TABLE: ', results);
});

sql = 'CREATE TABLE IF NOT EXISTS authentication (';
sql += 'userId INT NOT NULL, ';
sql += 'permissionId INT NOT NULL, ';
sql += 'userName VARCHAR(64) UNIQUE, ';
sql += 'userPassword BINARY(255), ';
sql += 'PRIMARY KEY (userId), ';
sql += 'FOREIGN KEY (userId) REFERENCES user(userId), ';
sql += 'FOREIGN KEY (permissionId) REFERENCES permission(permissionId))';

connection.query(sql, function (error, results) {
  if (error) throw error;
  console.log('CREATE authentication table: ', results);
});

sql = 'CREATE TABLE IF NOT EXISTS history (';
sql += 'historyId INT NOT NULL, ';
sql += 'ord INT NOT NULL, ';
sql += 'userId INT, ';
sql += 'sourceTable VARCHAR(32), ';
sql += 'sourceColumn VARCHAR(32), ';
sql += 'oldValue VARCHAR(255), ';
sql += 'newValue VARCHAR(255), ';
sql += 'modifiedTime DATETIME, ';
sql += 'PRIMARY KEY (historyId), ';
sql += 'FOREIGN KEY (userId) REFERENCES user(userId))';

connection.query(sql, function (error, results) {
  if (error) throw error;
  console.log('CREATE history table: ', results);
});

connection.end();