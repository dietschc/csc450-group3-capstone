// Initially Created by: Coleman Dietsch
// CSC450 Capstone
// Restaurant Club - authJwt.js
// March 24, 2022
// Last Edited (Initials, Date, Edits):

const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const Authentication = db.authentication;
const User = db.users;
const Address = db.address;

// Catch expired access tokens
const { TokenExpiredError } = jwt;
const catchError = (err, res) => {
    if (err instanceof TokenExpiredError) {
        return res.status(401).send({ message: "Unauthorized! Access Token was expired!" });
    }
    return res.sendStatus(401).send({ message: "Unauthorized!" });
}

/**
 * Verify access token by checking the request headers
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
const verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];
    
    // Must provide access token in headers
    if (!token) {
        return res.status(403).send({
            message: "No token provided!"
        });
    }

    // Use JWT verify function on supplied token
    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return catchError(err, res);
        }

        // Keep track of the decoded user id of this token
        req.userId = decoded.id;
        next();
    });
};

/**
 * Function to check permission level matching admin 
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const isAdmin = (req, res, next) => {

    // Set id variable from req parameter
    const id = req.userId;

    // Check the user table to get permission id (level)
    User.findByPk((id), { include: [Address, Authentication] })
        .then(user => {

            // PermissionId 4 is admin
            if (user.authentication.permissionId === 4) {
                // res.send(user);
                next();
                return;
            } 

            // Send 403 permission error response otherwise
            res.status(403).send({
                message: "Requires Admin Permission!"
            });
        })
        // Catch other errors
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Error retrieving User with id=" + id
            });
        });
};

/**
 * Function to check permission level matching owner 
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const isOwner = (req, res, next) => {
    // Set id variable from req parameter
    const id = req.userId;

    // Check the user table to get permission id (level)
    User.findByPk((id), { include: [Address, Authentication] })
        .then(user => {

            // PermissionId 2 is owner
            if (user.authentication.permissionId === 2) {
                // res.send(user);
                next();
                return;
            } 

            // Send 403 permission error response otherwise
            res.status(403).send({
                message: "Requires Owner Permission!"
            });
        })
        // Catch other errors
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Error retrieving User with id=" + id
            });
        });
};


const authJwt = {
    verifyToken: verifyToken,
    isAdmin: isAdmin,
    isOwner: isOwner
};

module.exports = authJwt;
