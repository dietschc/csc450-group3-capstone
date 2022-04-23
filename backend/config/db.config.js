// Initially Created by: Coleman Dietsch
// CSC450 Capstone
// Restaurant Club - db.config.js
// February 14, 2022
// Last Edited (Initials, Date, Edits):
const fs = require('fs');
const path = require("path");
const checkEnv = require("../helperFunction/checkEnvironment")

// Check if we are on the prod environment
const isProd = checkEnv();

module.exports = {
  HOST: isProd ? process.env.DB_URL : "localhost",
  PORT: isProd ? process.env.DB_PORT : 3306,
  USER: isProd ? process.env.DB_USERNAME : "restaurant",
  PASSWORD: isProd ? process.env.DB_PASSWORD : "S566kcKyQeykBpsY",
  DB: isProd ? process.env.DB_DATABASE : "restaurantDB",
  ssl: {
    ca: isProd ? process.env.CA_CERT : "",
    rejectUnauthorized: true
  },
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
