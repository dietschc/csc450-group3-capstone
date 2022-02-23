var mysql = require('mysql');

var connection = mysql.createConnection({
  host: "localhost",
  user: "restaurant",
  password: "S566kcKyQeykBpsY",
  database: "restaurantDB"
});

var sql = '';
connection.connect();

sql = 'DROP PROCEDURE IF EXISTS addAddress';

connection.query(sql, function (error, results) {
  if (error) throw error;
  console.log('DROP addAddress ', results);
});

sql = 'CREATE PROCEDURE addAddress (';
sql += 'IN addressIn VARCHAR(64), ';
sql += 'IN cityIn VARCHAR(64), ';
sql += 'IN stateIn CHAR(2), ';
sql += 'IN zipIn CHAR(5), ';
sql += 'OUT addressId INT) ';

sql += 'BEGIN ';

sql += 'INSERT INTO address(address, city, state, zip) ';
sql += 'VALUES (addressIn, cityIn, stateIn, zipIn); ';

sql += 'SELECT LAST_INSERT_ID() INTO addressId; ';

sql += 'END';

connection.query(sql, function (error, results) {
  if (error) throw error;
  console.log('ADD addAddress ', results);
});

sql = 'DROP PROCEDURE IF EXISTS addUserBase';

connection.query(sql, function (error, results) {
  if (error) throw error;
  console.log('DROP addUserBase ', results);
});

sql = 'CREATE PROCEDURE addUserBase (';
sql += 'IN addressIn VARCHAR(64), ';
sql += 'IN cityIn VARCHAR(64), ';
sql += 'IN stateIn CHAR(2), ';
sql += 'IN zipIn CHAR(5), ';
sql += 'IN fNameIn VARCHAR(64), ';
sql += 'IN lNameIn VARCHAR(64), ';
sql += 'IN emailIn VARCHAR(64), ';
sql += 'OUT userId INT) ';

sql += 'BEGIN ';

sql += 'CALL addAddress(addressIn, cityIn, stateIn, zipIn, @addId); ';

sql += 'INSERT INTO user (addressId, fName, lName, userEmail) ';
sql += 'VALUES (@addId, fNameIn, lNameIn, emailIn); ';

sql += 'SELECT LAST_INSERT_ID() INTO userId; ';

sql += 'END';

connection.query(sql, function (error, results) {
  if (error) throw error;
  console.log('ADD addUserBase ', results);
});

sql = 'DROP PROCEDURE IF EXISTS addUser';

connection.query(sql, function (error, results) {
  if (error) throw error;
  console.log('DROP addUser ', results);
});

sql = 'CREATE PROCEDURE addUser (';
sql += 'IN addressIn VARCHAR(64), ';
sql += 'IN cityIn VARCHAR(64), ';
sql += 'IN stateIn CHAR(2), ';
sql += 'IN zipIn CHAR(5), ';
sql += 'IN fNameIn VARCHAR(64), ';
sql += 'IN lNameIn VARCHAR(64), ';
sql += 'IN emailIn VARCHAR(64), ';
sql += 'IN usernameIn VARCHAR(64), ';
sql += 'IN passwordIn VARCHAR(64)) ';


sql += 'sp: BEGIN ';

sql += 'SELECT IFNULL(0, 1) INTO @userExists FROM authentication WHERE userName = usernameIn; ';
sql += 'IF (@userExists = 0) THEN ';
sql += 'LEAVE sp; ';
sql += 'END IF; ';

sql += 'CALL addUserBase(addressIn, cityIn, stateIn, zipIn, fNameIn, lNameIn, emailIn, @userId); ';

sql += 'INSERT INTO authentication (userId, permissionId, userName, userPassword) ';
sql += 'VALUES (@userId, 0, usernameIn, passwordIn); ';
/*
sql += 'CALL addHistory ("address", "address", @userId, null, addressIn, TRUE); ';
sql += 'CALL addHistory ("address", "city", @userId, null, cityIn, FALSE); ';
sql += 'CALL addHistory ("address", "state", @userId, null, stateIn, FALSE); ';
sql += 'CALL addHistory ("address", "zip", @userId, null, zipIn, FALSE); ';
sql += 'CALL addHistory ("user", "fName", @userId, null, fNameIn, FALSE); ';
sql += 'CALL addHistory ("user", "lName", @userId, null, lNameIn, FALSE); ';
sql += 'CALL addHistory ("user", "userEmail", @userId, null, emailIn, FALSE); ';
sql += 'CALL addHistory ("authentication", "userName", @userId, null, usernameIn, FALSE); ';
sql += 'CALL addHistory ("authentication", "userPassword", @userId, null, passwordIn, FALSE); ';
*/
sql += 'END';

connection.query(sql, function (error, results) {
  if (error) throw error;
  console.log('ADD addUser ', results);
});


sql = 'DROP PROCEDURE IF EXISTS addHistory';

connection.query(sql, function (error, results) {
  if (error) throw error;
  console.log('DROP addHistory ', results);
});


sql = 'CREATE PROCEDURE addHistory (';
sql += 'IN sourceTableIn VARCHAR(32), ';
sql += 'IN sourceColumnIn VARCHAR(32), ';
sql += 'IN userIdIn INT, ';
sql += 'IN oldvalueIn VARCHAR(255), ';
sql += 'IN newValueIn VARCHAR(255), ';
sql += 'IN startBool BOOLEAN) ';

sql += 'BEGIN ';
sql += 'START TRANSACTION; ';
sql += 'SELECT IF(startBool, MAX(historyId) + 1, MAX(historyId)) INTO @id FROM history; ';
sql += 'SELECT IF(startBool, 0, MAX(ord)) INTO @ord FROM history WHERE historyId = @id; ';
sql += 'INSERT INTO history (historyId, ord, userId, sourceTable, sourceColumn, oldValue, newValue, modifiedTime) ';
sql += 'VALUES (@id, @ord, userIdIn, sourceTableIn, sourceColumnIn, oldValueIn, newValueIn, NOW()); ';
sql += 'COMMIT;';
sql += 'END ';

connection.query(sql, function (error, results) {
  if (error) throw error;
  console.log('ADD addHistory ', results);
});


sql = 'DROP PROCEDURE IF EXISTS addImage';

connection.query(sql, function (error, results) {
  if (error) throw error;
  console.log('DROP addImage ', results);
});

sql = 'CREATE PROCEDURE addImage (';
sql += 'IN imageIn VARCHAR(255), ';
sql += 'OUT imageIdOut INT) ';

sql += 'BEGIN ';

sql += 'INSERT INTO image (imageLocation) ';
sql += 'VALUES (imageIn); ';

sql += 'SELECT LAST_INSERT_ID() INTO imageIdOut; ';

sql += 'END';

connection.query(sql, function (error, results) {
  if (error) throw error;
  console.log('ADD addImage ', results);
});



sql = 'DROP PROCEDURE IF EXISTS addRestaurant';

connection.query(sql, function (error, results) {
  if (error) throw error;
  console.log('DROP addRestaurant ', results);
});



sql = 'CREATE PROCEDURE addRestaurant (';
sql += 'IN addressIn VARCHAR(64), ';
sql += 'IN cityIn VARCHAR(64), ';
sql += 'IN stateIn CHAR(2), ';
sql += 'IN zipIn CHAR(5), ';
sql += 'IN imageIn VARCHAR(255), ';
sql += 'IN userId INT, ';
sql += 'IN restaurantNameIn VARCHAR(64), ';
sql += 'IN restDigiContactIn VARCHAR(255), ';
sql += 'IN restWebsiteIn VARCHAR(255), ';
sql += 'IN restPhoneIn VARCHAR(15)) ';

sql += 'BEGIN ';

sql += 'CALL addAddress(addressIn, cityIn, stateIn, zipIn, @addId); ';
sql += 'CALL addImage(imageIn, @imageId); ';

sql += 'INSERT INTO restaurant (userCreatorId, addressid, imageId, restaurantName, restDigiContact, restWebsite, restPhone, revCount) ';
sql += 'VALUES (userId, @addId, @imageId, restaurantNameIn, restDigiContactIn, restWebsiteIn, restPhoneIn, 0); '
/*
sql += 'CALL addHistory ("address", "address", userId, null, addressIn, TRUE); ';
sql += 'CALL addHistory ("address", "city", userId, null, cityIn, FALSE); ';
sql += 'CALL addHistory ("address", "state", userId, null, stateIn, FALSE); ';
sql += 'CALL addHistory ("address", "zip", userId, null, zipIn, FALSE); ';
sql += 'CALL addHistory ("image", "imageLocation", userId, null, imageIn, FALSE); ';
sql += 'CALL addHistory ("restaurant", "restaurantName", userId, null, restaurantNameIn, FALSE); ';
sql += 'CALL addHistory ("restaurant", "restaurantDigiContact", userId, null, restaurantDigiContactIn, FALSE); ';
sql += 'CALL addHistory ("restaurant", "restaurantWebsite", userId, null, restaurantWebsiteIn, FALSE); ';
sql += 'CALL addHistory ("restaurant", "restaurantPhone", userId, null, restaurantPhoneIn, FALSE); ';
*/
sql += 'END';

connection.query(sql, function (error, results) {
  if (error) throw error;
  console.log('ADD addRestaurant ', results);
});


sql = 'DROP PROCEDURE IF EXISTS addRating';

connection.query(sql, function (error, results) {
  if (error) throw error;
  console.log('DROP addRating ', results);
});


sql = "CREATE PROCEDURE addRating (";
sql += 'IN revIdIn INT, ';
sql += 'IN tasteRatingIn FLOAT(1), ';
sql += 'IN serviceRatingIn FLOAT(1), ';
sql += 'IN cleanlinessRatingIn FLOAT(1), ';
sql += 'IN overallRatingIn FLOAT(1)) ';

sql += 'BEGIN ';

sql += 'INSERT INTO rating (revId, tasteRating, serviceRating, cleanlinessRating, overallRating) ';
sql += 'VALUES (revIdIn, tasteRatingIn, serviceRatingIn, cleanlinessRatingIn, overallRatingIn); ';

sql += 'END';

connection.query(sql, function (error, results) {
  if (error) throw error;
  console.log('ADD addRating ', results);
});


sql = 'DROP PROCEDURE IF EXISTS addReview';

connection.query(sql, function (error, results) {
  if (error) throw error;
  console.log('DROP addReview ', results);
});


sql = "CREATE PROCEDURE addReview (";
sql += 'IN userIdIn INT, ';
sql += 'IN restaurantIdIn INT, ';
sql += 'IN tasteRatingIn FLOAT(1), ';
sql += 'IN serviceRatingIn FLOAT(1), ';
sql += 'IN cleanlinessRatingIn FLOAT(1), ';
sql += 'IN overallRatingIn FLOAT(1), ';
sql += 'IN revTitleIn VARCHAR(64), ';
sql += 'IN revTextIn VARCHAR(255), ';
sql += 'IN imageLocation VARCHAR(255)) ';

sql += 'BEGIN ';

sql += 'IF imageLocation = "" THEN SET @imageId = NULL; ';
sql += 'ELSE ';
sql += 'CALL addImage(imageLocation, @imageId); ';
sql += 'END IF; '

sql += 'INSERT INTO review (userId, restaurantId, revTitle, revText, imageId) ';
sql += 'VALUES (userIdIn, restaurantIdIn, revTitleIn, revTextIn, @imageId); ';

sql += 'SET @revId = LAST_INSERT_ID(); ';
sql += 'CALL addRating(@revId, tasteRatingIn, serviceRatingIn, cleanlinessRatingIn, overallRatingIn); ';

sql += 'END';

connection.query(sql, function (error, results) {
  if (error) throw error;
  console.log('ADD addReview ', results);
});

connection.end();