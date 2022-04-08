// Initially Created by: Coleman Dietsch
// CSC450 Capstone
// Restaurant Club - checkEnvironment.js
// April 7, 2022
// Last Edited (Initials, Date, Edits):


// Environment check
// The NODE_ENV variable is set to production on the prod server
const checkEnv = () => {
    if (process.env.NODE_ENV === "production") {
        console.log("running in production mode ");
        return true;

        // Else no NODE_ENV defined implies the default development environment
    } else {
        console.log("running in development mode: ");
        return false;
    }
};

module.exports = checkEnv;