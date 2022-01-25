# database folder readme
The idea of this folder and the scripts contained within are to be able to setup a dev database on your personal workstation.

This also allows us to track changes we want to implement in the "production" database.

In theory we could apply these same scripts on the production database to implement the changes although it might make sense to add production and development folders to distinguish the two, as production will likely require more complex SQL statements if we don't want to lose data.

Ensure that MySQL is running locally on your workstation and you have the appropriate database, user and permissions created

```
CREATE DATABASE restaurantDB;
CREATE USER 'restaurant'@'localhost' IDENTIFIED BY 'S566kcKyQeykBpsY';
GRANT ALL PRIVILEGES ON restaurantDB.* TO 'restaurant'@'localhost'; 
FLUSH PRIVILEGES;
```

Ensure you are in the correct subdirectory

### `cd database`

Run the following command for your node scripts. Example create-tables.js:

### `node create-tables.js`