// Initially Created by: Coleman Dietsch
// CSC450 Capstone
// Restaurant Club - auth.config.js
// March 24, 2022
// Last Edited (Initials, Date, Edits):


// Access token and Refresh Access token expiration settings
module.exports = {
    secret: "super-secret-key",
    // jwtExpiration: 3600,           // 1 hour 
    // jwtRefreshExpiration: 86400,   // 24 hours
    /* for test */
    jwtExpiration: 60,          // 1 minute 
    jwtRefreshExpiration: 120,  // 2 minutes
};