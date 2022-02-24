// Initially Created by: Coleman Dietsch
// CSC450 Capstone
// Restaurant Club - user.controller.js
// February 14, 2022
// Last Edited (Initials, Date, Edits):

const db = require("../models");
const User = db.users;
const Authentication = db.authentication;
const Address = db.address;

// Create and Save a new User
exports.create = (req, res) => {
    // Validate request
    if (!req.body.userEmail) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    // Build parameters for user table insert
    const user = {
        addressId: null, // FK constraint with Address
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        userEmail: req.body.userEmail,
    };

    // Save User in the database
    User.create(user)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the User."
            });
        });
};

// Asynchronous method to create a user with the parameters passed from the frontend.
// Alters the user, address, and authentication tables (and eventually history)
exports.addUser = async (req, res) => {
    // Validate request
    if ((!req.body.userEmail) || (!req.body.address) || (!req.body.userName)) {
        res.status(400).send({
            message: "Required fields are userEmail, address, and userName"
        });
        return;
    }

    // Check username does not already exist
    const userName = req.body.userName;
    const userNameAvaialble = await Authentication.findOne({
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
                return "Username not available";
            } else {
                return "Available";
            }
        })
        .catch(err => {
            return "Error checking username";
        });
    // Debug code
    console.log("user name is: " + userNameAvaialble);

    // If the userName is available, procede with creating a new account
    if (userNameAvaialble === "Available") {

        // Build parameters for address table insert
        const address = {
            address: req.body.address,
            city: req.body.city,
            state: req.body.state,
            zip: req.body.zip,
        };

        // Wait for the address to be created, then copy to a const
        const newAddress = await Address.create(address)
            .then(newAddress => {
                return newAddress;
            })
            .catch(err => {
                return "Some error occurred while creating the Address.";
            });

        // Debug code
        // console.log("new address: " + newAddress);

        // Build parameters for user table insert
        const user = {
            addressId: newAddress.addressId,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            userEmail: req.body.userEmail,
        };

        // Wait for a user to be created, then copy to a const
        const newUser = await User.create(user)
            .then(newUser => {
                return newUser;
            })
            .catch(err => {
                return "Some error occurred while creating the User.";
            });

        // Debug code
        // console.log("new user: " + JSON.stringify(newUser));

        // Build parameters for authentication table insert
        const authentication = {
            userId: newUser.userId,
            // Default permissionId level is 1 for members
            permissionId: 1, // FK constraint with Permission table
            userName: req.body.userName,
            userPassword: req.body.userPassword,
            historyId: null, // FK constraing with History table
        }

        // Save Authentication in the database
        Authentication.create(authentication)
            .then(newAuth => {
                // Send the response JSON with both objects
                res.json({ newUser, newAddress, newAuth });
            })
            .catch(err => {
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while creating the User."
                });
            });
    } else {

        // Else the userName already exists, do nothing
        res.status(400).send({
            message: "Username not available"
        });

    }

};

// Retrieve all Users from the database.
exports.findAll = (req, res) => {
    User.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving users."
            });
        });
};

// Find a single User with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    User.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find User with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving User with id=" + id
            });
        });
};

// Update a User by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
    User.update(req.body, {
        where: { userId: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "User was updated successfully."
                });
            } else {
                res.status(500).send({
                    message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating User with id=" + id
            });
        });
};

// Delete a User with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    User.destroy({
        where: { userId: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "User was deleted successfully!"
                });
            } else {
                res.status(500).send({
                    message: `Cannot delete User with id=${id}. Maybe User was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete User with id=" + id
            });
        });
};
