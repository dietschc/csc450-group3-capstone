// Initially Created by: Coleman Dietsch
// CSC450 Capstone
// Restaurant Club - auth.config.js
// March 24, 2022
// Last Edited (Initials, Date, Edits):


// Access token and Refresh Access token expiration settings
module.exports = {
    secret: "NEmqXp3eRcndLeMj3ZPkU5WgALVdAwbXpzxwy5Wyf5EKnx87r5xrcM5rbrm5nKgz",
    // Expiration of access tokens
    jwtExpiration: 7200,           // 2 hours
    // Expiration of refresh tokens
    jwtRefreshExpiration: 28800,   // 8 hours

    /* For testing */
    // jwtExpiration: 15,          // 15 seconds 
    // jwtRefreshExpiration: 120,  // 2 minutes
};