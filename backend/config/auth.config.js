// Initially Created by: Coleman Dietsch
// CSC450 Capstone
// Restaurant Club - auth.config.js
// March 24, 2022
// Last Edited (Initials, Date, Edits):


// Access token and Refresh Access token expiration settings
module.exports = {
    secret: "super-secret-key",
    // Expiration of access tokens
    // jwtExpiration: 7200,           // 2 hours
    // Expiration of refresh tokens
    // jwtRefreshExpiration: 28800,   // 8 hours

    /* For testing */
    jwtExpiration: 60,          // 1 minute 
    jwtRefreshExpiration: 120,  // 2 minutes
};