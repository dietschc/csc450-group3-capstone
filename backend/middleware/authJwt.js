const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;

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
    
    if (!token) {
        return res.status(403).send({
            message: "No token provided!"
        });
    }

    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return catchError(err, res);
        }

        req.userId = decoded.id;
        next();
    });
};

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const isAdmin = (req, res, next) => {
    User.findByPk(req.userId).then(user => {
        user.getRoles().then(roles => {
            for (let i = 0; i < roles.length; i++) {
                if (roles[i].name === "admin") {
                    next();
                    return;
                }
            }
            res.status(403).send({
                message: "Requires Admin Permissions!"
            });
            return;
        });
    });
};

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const isOwner = (req, res, next) => {
    User.findByPk(req.userId).then(user => {

        user.getRoles().then(roles => {
            for (let i = 0; i < roles.length; i++) {
                if (roles[i].name === "owner") {
                    next();
                    return;
                }
            }

            res.status(403).send({
                message: "Requires Owner Permission!"
            });
        });
    });
};


const authJwt = {
    verifyToken: verifyToken,
    isAdmin: isAdmin,
    isOwner: isOwner
};

module.exports = authJwt;
