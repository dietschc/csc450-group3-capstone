// Initially Created by: Coleman Dietsch
// CSC450 Capstone
// Restaurant Club - authentication.controller.js
// February 15, 2022
// Last Edited (Initials, Date, Edits):

const { address } = require("../models");
const db = require("../models");
const Authentication = db.authentication;
const User = db.users;
const Address = db.address;

// Create and Save a new Authentication
exports.create = (req, res) => {
    // Validate request
    if (!req.body.userId) {
        res.status(400).send({
            message: "You must supply a user ID!"
        });
        return;
    }

    // Create a Authentication
    const authentication = {
        userId: req.body.userId,
        permissionId: req.body.permissionId,
        userName: req.body.userName,
        userPassword: req.body.userPassword,
        historyId: req.body.historyId,
    };

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
    const getAuth = await Authentication.findOne({
        where: {
            userName: userName,
            userPassword: userPassword
        }
    })
        .then(data => {
            if (data) {
                return data;
            } else {
                return "incorrect username password";
            }
        })
        .catch(err => {
            return err;
        });

        // Setup out userId parameter (if it exists)
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
                return `Cannot find User with id=${id}.`;

            }
        })
        .catch(err => {
            return err;
        });

        // Setup out addressId parameter (if it exists)
        let addressId = 0;
        if (getUser) {
            addressId = getUser.addressId;
        }

        // Get address info
        Address.findByPk(addressId)
        .then(getAddress => {
            if (getAddress) {
                // Return all 3 JSON objects in an array in the response
                res.json({ getAuth, getUser, getAddress });
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
