// Initially Created by: Coleman Dietsch
// CSC450 Capstone
// Restaurant Club - refreshToken.model.js
// March 26, 2022
// Last Edited (Initials, Date, Edits):

const config = require("../config/auth.config");
const { v4: uuidv4 } = require("uuid");

module.exports = (sequelize, Sequelize) => {
    const RefreshToken = sequelize.define("refreshToken", {
        token: {
            type: Sequelize.STRING,
        },
        expiryDate: {
            type: Sequelize.DATE,
        },
    });

    /**
     * Creates a new refresh token in the database, the refresh token string is returned
     * 
     * @param {*} user 
     * @returns 
     */
    RefreshToken.createToken = async function (user) {
        // Create a new date object to hold the expiration date/time and add the expiration time
        const expiredAt = new Date();
        expiredAt.setSeconds(expiredAt.getSeconds() + config.jwtRefreshExpiration);

        // Create new uuid string for the token string
        const newTokenString = uuidv4();

        // Create new refresh token in the database with the following parameters
        const refreshToken = await this.create({
            token: newTokenString,
            userId: user.userId,
            expiryDate: expiredAt.getTime(),
        });

        // Return the new refresh token string
        return refreshToken.token;
    };

    /**
     * Simple function will return true if the argument token is expired
     * 
     * @param {*} token 
     * @returns 
     */
    RefreshToken.verifyExpiration = (token) => {
        return token.expiryDate.getTime() < new Date().getTime();
    };
    
    return RefreshToken;
};
