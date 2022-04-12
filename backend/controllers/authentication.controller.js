// Initially Created by: Coleman Dietsch
// CSC450 Capstone
// Restaurant Club - authentication.controller.js
// February 15, 2022
// Last Edited (Initials, Date, Edits):
//  (CPD, 2/27/2022, Added findByNameOffsetLimit function)
//  (CPD, 3/3/2022, Updating login function to return friends)
//  (CPD, 3/24/2022, Included creating new access token to login)
//  (CPD, 3/26/2022, Included new refresh token to login)
//  (TJI, 3/28/2022, Added password hashing)
//  (DAB, 4/02/2022, Added in updatePassword and updatePasswordSecure)
//  (DAB, 4/12/2022, Error Handling Audit - failed)
//  (DAB, 4/12/2022, Double checked and added error handling to every query)

const db = require("../models");
const Sequelize = require("sequelize");
const { Op } = db.Sequelize;
const Authentication = db.authentication;
const User = db.users;
const Address = db.address;
const Friend = db.friend;
const Permission = db.permission;
// Utility to hash passwords
const bcrypt = require('bcrypt');
const RefreshToken = db.refreshToken;
const config = require("../config/auth.config");
const jwt = require("jsonwebtoken");
const conversationModel = require("../models/conversation.model");

// Create and Save a new Authentication
exports.create = (req, res) => {
    // Validate request
    if (!req.body.userId || !req.body.userPassword) {
        res.status(400).send({
            message: "You must supply a user ID and password!"
        });
        return;
    }

    // Create a Authentication
    const authentication = {
        userId: req.body.userId,
        permissionId: req.body.permissionId,
        userName: req.body.userName,
        userPassword: req.body.userPassword
    };

    // Convert the given password to a binary hash using BCrypt's minor a form for 2^10 rounds of hashing
    if (authentication.userPassword) {
        // Attempting to encrypt the password
        try {
            const salt = bcrypt.genSaltSync(10, 'a');
            authentication.userPassword = bcrypt.hashSync(authentication.userPassword, salt);
        }
        // Password not encrypted, logging error
        catch (err) {
            res.status(400).send({
                message: "Error encrypting the password!"
            });
            return;
        }
        
    }

    // Save Authentication in the database
    Authentication.create(authentication)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Authentication."
            });
        });
};

// Authentication login callback function
exports.login = async (req, res) => {
    // Validate request
    if ((!req.body.userName) || (!req.body.userPassword)) {
        res.status(400).send({
            message: "You must supply a username and password!"
        });
        return;
    }

    // Set parameters for db lookup
    const userName = req.body.userName;
    const userPassword = req.body.userPassword;

    // Create getAuth object
    const getAuth = await Authentication.findOne(
        {
            include: [Permission],
            where: {
                userName: userName,
            }
        })
        .then(data => {
            // Boolean to determine if hashed passwords match
            const match = bcrypt.compareSync(userPassword, data.userPassword);

            if (match) { return data; }
            else { return "incorrect password"; }
            // if (data) {
            //     return data;
            // } else {
            //     return "incorrect username password";
            // }
        })
        .catch(err => {
            return err;
        });

    // Setup our userId parameter (if it exists)
    let id = 0;
    if (getAuth) {
        id = getAuth.userId;
    }

    // Get user info
    const getUser = await User.findByPk(id)
        .then(data => {
            if (data) {
                return data;
            } else {
                // Return null if there is no matching user
                return null;
            }
        })
        .catch(err => {
            return err;
        });

    // Setup our variables for if the login is a valid user
    let addressId = 0;
    let accessToken = 0;
    let refreshToken = 0;

    // console.log("get user: ", getUser);

    // If the user is valid, get addressId and generate tokens
    if (getUser) {
        // Extract addressId 
        addressId = getUser.addressId;
        // Attempting to sign in with the access token
        try {
            // Create new Access Token, include user id
            accessToken = jwt.sign({ id: getUser.userId }, config.secret, {
                expiresIn: config.jwtExpiration
            });

            // Create new refresh token, pass in getUser object data as parameter
            refreshToken = await RefreshToken.createToken(getUser);
        }
        // Token access failed, returning message
        catch (err) {
            console.log("Error creating token")
        } 
    }

    // Get friend data
    const getFriends = await Friend.findAll({
        where: {
            friendOneId: id
        },
        // This should match the userId below
        attributes: [],
        include: [
            {
                model: User, as: 'friendTwo',
                include: {
                    model: Authentication, attributes: ['userName']
                },
                // Should match the friendTwo Id from above
                attributes: ['userId']
            }
        ]
    })
        .then(data => {
            if (data) {
                return data;
            } else {
                return `Cannot find friends`;
            }
        })
        .catch(err => {
            return err;
        });

    let friends = [];
    if (getFriends.length > 0) {
        // Attempting to iterate through the friends list
        try {
            const formatFriends = (getFriends) => getFriends.map(friend => {
                const userId = friend.friendTwo.userId;
                const userName = friend.friendTwo.authentication.userName;
                return { userId, userName };
            });
            // map friends
            friends = formatFriends(getFriends);
        }
        // There was an error so the message is logged
        catch (err) {
            console.log("Error getting friends!");
        }
        
    }

    // Get address info
    Address.findByPk(addressId)
        .then(getAddress => {
            if (getAddress) {
                // Return the following JSON objects in the response
                res.json({
                    getAuth, getUser, friends, getAddress,
                    accessToken, refreshToken
                });
            } else {
                res.status(404).send({
                    message: `Cannot find User`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving User with id"
            });
        });
};

// Authentication checkUsername callback function
exports.checkUserName = (req, res) => {
    // Validate request
    if (!req.body.userName) {
        res.status(400).send({
            message: "You must supply a username!"
        });
        return;
    }

    // Set parameters for db lookup
    const userName = req.body.userName;

    Authentication.findOne({
        where: {
            userName: userName
        }
    })
        .then(data => {
            // Debug code
            // console.log("data: " + data);
            // console.log(data instanceof Authentication);

            // If where condition has a match the username already exists
            if (data instanceof Authentication) {
                res.status(400).send({
                    message: "User name already exists!"
                });
            } else {
                res.status(200).send({
                    message: "User name available!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error checking username"
            });
        });
};

// Retrieve all Authentications from the database.
exports.findAll = (req, res) => {
    Authentication.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving authentication."
            });
        });
};

// Find a single Authentication with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    Authentication.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Authentication with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Authentication with id=" + id
            });
        });
};

// Update a Authentication by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
    const salt = bcrypt.genSaltSync(10, 'a');
    req.body.userPassword = bcrypt.hashSync(req.body.userPassword, salt);
    console.log(req.body);

    Authentication.update(req.body, {
        where: { authId: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Authentication was updated successfully."
                });
            } else {
                res.status(500).send({
                    message: `Cannot update Authentication with id=${id}. Maybe Authentication was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Authentication with id=" + id
            });
        });
};

// Update a users password in the database
exports.updatePassword = async (req, res) => {
    // Validate request
    if (!req.body.newPassword) {
        res.status(400).send({
            message: "You must supply a userId and new password!"
        });
        return;
    }

    // Pulling the userId from params and encrypting the new password
    const userId = req.params.userId;
    const salt = bcrypt.genSaltSync(10, 'a');
    const newPassword = await bcrypt.hashSync(req.body.newPassword, salt);

    // Preparing the data to be updated in Sequelize
    const data = {
        userPassword: newPassword
    }

    // Updating the user password in the database where the userId is 
    // a match
    await Authentication.update(data, {
        where: { userId: userId }
    })
        .then(num => {
            // If there is a result then the success message is sent
            if (num == 1) {
                res.send({
                    message: "Authentication was updated successfully."
                });
            }
            // Else a message is sent that it was not updated
            else {
                res.status(500).send({
                    message: `Cannot update Authentication with id=${userId}. Maybe Authentication was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            // If there is an error the requester is notified
            res.status(500).send({
                message: "Error updating Authentication with id=" + userId
            });
        });
};

// Update a users password in the database if the body password matches 
// the existing password
exports.updatePasswordSecure = async (req, res) => {
    // Validate request
    if (!req.body.userPassword || !req.body.newPassword) {
        res.status(400).send({
            message: "You must supply a user password and new password!"
        });
        return;
    }

    // Pulling the userId from params and encrypting the new password. The 
    // current password is extracted to a variable
    const userId = req.params.userId;
    const salt = bcrypt.genSaltSync(10, 'a');
    const password = req.body.userPassword;
    const newPassword = await bcrypt.hashSync(req.body.newPassword, salt);

    // Checking that a user exists with the param userId and body password. 
    // If the userId and password are valid this will hold true
    const isValid = await User.findOne({
        include: [
            Authentication
        ], where: { userId: userId }
    })
        .then(user => {
            // If there are results the returned password is checked for validity
            if (user) {
                // Boolean to determine if hashed passwords match, the result is 
                // returned
                return bcrypt.compareSync(password, user.authentication.userPassword);
            }
            // Else there was not a user with that userId and false is returned
            else {
                return false;
            }
        })
        .catch(err => {
            return false;
        })

    // If the userId and password are valid, the password will attempt an update
    if (isValid) {
        // Preparing the data to update the password
        const data = {
            userPassword: newPassword
        }

        // Updating the user password in the database where the userId is 
        // a match
        await Authentication.update(data, {
            where: { userId: userId }
        })
            .then(num => {
                // If there is a result then the success message is sent
                if (num == 1) {
                    res.send({
                        message: "Authentication was updated successfully."
                    });
                }
                // Else a message is sent that it was not updated 
                else {
                    res.status(500).send({
                        message: `Cannot update Authentication with id=${userId}. Maybe Authentication was not found or req.body is empty!`
                    });
                }
            })
            .catch(err => {
                // If there is an error the requester is notified
                res.status(500).send({
                    message: "Error updating Authentication with id=" + userId
                });
            });
    }
    else {
        res.status(404).send({
            message: `Either there was no user with that Id or the passwords did not match`
        });
    }
};

// Update a Authentication by the id in the request
exports.updateByUserId = (req, res) => {
    const userId = req.params.userId;
    // As in create, hashing the password.
    const salt = bcrypt.genSaltSync(10, 'a');
    // If there is a userPassword field, it will be hashed
    if (req.body.password) {
        // Attempting to encrypt password
        try {
            req.body.userPassword = bcrypt.hashSync(req.body.userPassword, salt);
        }
        // Error encrypting password
        catch (err) {
            console.log("Error encrypting password");
        }
    }
    
    Authentication.update(req.body, {
        where: { userId: userId }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Authentication was updated successfully."
                });
            } else {
                res.status(500).send({
                    message: `Cannot update Authentication with id=${userId}. Maybe Authentication was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Authentication with id=" + userId
            });
        });
};

// Delete a Authentication with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    Authentication.destroy({
        where: { authId: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Authentication was deleted successfully!"
                });
            } else {
                res.status(500).send({
                    message: `Cannot delete Authentication with id=${id}. Maybe Authentication was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Authentication with id=" + id
            });
        });
};

// Retrieve all Authentications entries from the database whose name is like the search param. Returns 
// results up to the set offset and limit values
exports.findByNameOffsetLimit = async (req, res) => {
    // Checking that offset and limit are numbers, if not a default value will be used
    const searchOffset = isNaN(req.params.offset) ? 0 : parseInt(req.params.offset);
    const searchLimit = isNaN(req.params.limit) ? 999999999999 : parseInt(req.params.limit);
    // The authentication userName is pulled from params to be used in the query
    const searchName = req.params.userName;

    // Using an async function to search the database for all existing authentications
    await Authentication.findAll({
        include: [
            {
                model: User,
                include: {
                    model: Address
                }
            }
        ],
        where: { userName: { [Op.like]: `%${searchName}%` } },
        order: [['userName', 'ASC']],
        offset: searchOffset,
        limit: searchLimit
    })
        .then(authentication => {
            // If authentications are found the data is returned
            res.send(authentication);
        })
        .catch(err => {
            // Else a message indicating the authentication was not found is sent
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving authentications."
            });
        });
}

/**
 * This function will attempt to create a new access token, as long as the refresh token is not expired
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
exports.refreshToken = async (req, res) => {
    // Refresh token is required
    const { refreshToken: requestToken } = req.body;
    if (requestToken == null) {
        return res.status(403).json({ message: "Refresh Token is required!" });
    }

    try {
        // Make sure the supplied refresh token is present in the database
        let refreshToken = await RefreshToken.findOne({ where: { token: requestToken } });
        console.log(refreshToken)

        if (!refreshToken) {
            res.status(403).json({ message: "Refresh token is not in database!" });
            return;
        }

        // Save our userId so we can use it to create more access tokens
        const { userId } = refreshToken;

        // If the refresh token is expired, remove it from the database
        if (RefreshToken.verifyExpiration(refreshToken)) {
            RefreshToken.destroy({ where: { id: refreshToken.id } });

            // Send 403 response indicating that your token was expired
            res.status(403).json({
                message: "Refresh token was expired. Please make a new signin request",
            });

            return;
        }

        // Create new access token, include user id, secret, and expiration
        const newAccessToken = jwt.sign({ id: userId }, config.secret, {
            expiresIn: config.jwtExpiration,
        });

        // Return new access token and refresh token in response
        return res.status(200).json({
            accessToken: newAccessToken,
            refreshToken: refreshToken.token,
        });

        // Catch all other errors
    } catch (err) {
        return res.status(500).send({ message: err });
    }
};
