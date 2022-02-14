// Initially Created by: Coleman Dietsch
// CSC450 Capstone
// Restaurant Club - db.config.js
// February 14, 2022
// Last Edited (Initials, Date, Edits):

module.exports = {
  HOST: "localhost",
  USER: "restaurant",
  PASSWORD: "S566kcKyQeykBpsY",
  DB: "restaurantDB",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
