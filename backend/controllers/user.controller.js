// Initially Created by: Coleman Dietsch
// CSC450 Capstone
// Restaurant Club - user.controller.js
// February 14, 2022
// Last Edited (Initials, Date, Edits):
//  (CPD, 2/26, #154 Completed multi table updates to user controller)
//  (CPD, 2/27, re-wrote the update handler to hopefully give correct response now)
//  (CPD, 2/28, Removed historyId in create because history table is going away)
//  (CPD, 2/28, Added friend methods to users controller)
//  (DAB, 3/06/2022, Added in findByNameOffsetLimit that returns the needed user attributes
//  to load a state into redux. Safe data with no passwords)
//  (TJI, 03/28/2022 - Added in password hashing)
//  (DAB, 3/27/2022, Added the friends table results to return with get as friendsOne)


const { authentication } = require("../models");
const db = require("../models");
const { Op } = db.Sequelize;
const User = db.users;
const Authentication = db.authentication;
const Permission = db.permission;
const Address = db.address;
const Friend = db.friend;

// Password hashing utility
const bcrypt = require('bcrypt');

// Create and Save a new User
// Asynchronous method to create a user with the parameters passed from the frontend.
// Alters the user, address, and authentication tables (and eventually history)
exports.create = async (req, res) => {
    // Validate request
    if ((!req.body.userEmail) || (!req.body.userName)) {
        res.status(400).send({
            message: "Required fields are userEmail, address, and userName"
        });
        return;
    }

    // Check username does not already exist
    const userName = req.body.userName;
    const userNameAvailable = await Authentication.findOne({
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
    console.log("user name is: " + userNameAvailable);

    // If the userName is available, procede with creating a new account
    if (userNameAvailable === "Available") {

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
            // historyId: null, // FK constraint with History table
        }

        // Hashes the submitted password using BCrypt's minor a modal going through 2^10 rounds
        if(authentication.userPassword)
        {
            const salt = await bcrypt.genSaltSync(10, 'a');
            authentication.userPassword = bcrypt.hashSync(authentication.userPassword, salt);
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
    User.findAll({ include: [Address, Authentication] })
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
    // Saving the userId to params
    const id = req.params.id;

    // Querying the database for the user with the param id
    User.findByPk((id), {
        include: [Address, Authentication,
            {
                model: Friend, as: "friendOne",
                include: [{
                    model: User, as: "friendTwo", attributes: ["userId"],
                    include: {
                        model: Authentication, attributes: ["userName"]
                    }
                },
                ]
            }
        ]
    })
        .then(data => {
            // If there is data, it is sent 
            if (data) {
                res.send(data);
            } 
            // Else a 404 error message is sent
            else {
                res.status(404).send({
                    message: `Cannot find User with id=${id}.`
                });
            }
        })
        .catch(err => {
            // If there is another kind of error the requester is notified
            res.status(500).send({
                message:
                    err.message || "Error retrieving User with id=" + id
            });
        });
};

// Update a User by the id in the request
exports.update = async (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content body can not be empty!"
        });
        return;
    }
    const id = req.params.id;

    // We find the associated addressId from the user table
    const addressId = await User.findByPk(id)
        .then(user => {
            // If the user exists the data is updated
            if (user) {
                // Destructure address from the user
                const { addressId } = user;
                return addressId
            } else {
                // This negative value indicates there has been an error
                return -1
            }
        })

    // Try to update users table
    const userUpdateStatus = await User.update(req.body, {
        where: { userId: id }
    })
        .then(status => {
            return status;
        })

    // Binary hash the submitted password using BCrypt's minor A modal for 2^10 rounds
    if(req.body.userPassword)
    {
        const salt = await bcrypt.genSaltSync(10, 'a');
        req.body.userPassword = bcrypt.hashSync(req.body.userPassword, salt);
    }

    // Try to update auth table
    const authUpdateStatus = await Authentication.update(req.body, {
        where: { userId: id }
    })
        .then(status => {
            return status;
        })

    // Try to update address table
    const addressUpdateStatus = await Address.update(req.body, {
        where: { addressId: addressId }
    })
        .then(status => {
            return status;
        })

    // Any one of these values being equal to 1 indicates success updating a row
    if (userUpdateStatus == 1 ||
        authUpdateStatus == 1 ||
        addressUpdateStatus == 1) {
        res.send({
            message: "User was updated successfully!"
        });
    } else {
        res.status(500).send({
            message: `Cannot update user. Maybe user was not found!`
        });
    }


};

// Delete a User with the specified id in the request
exports.delete = async (req, res) => {
    const id = req.params.id;

    // We find the associated addressId from the user table
    const addressId = await User.findByPk(id)
        .then(user => {
            // If the user exists the data is updated
            if (user) {
                // Destructure address from the user
                const { addressId } = user;
                return addressId
            } else {
                return "User not found"
            }
        })

    // console.log("address id: ", addressId);

    const deletedUserStatus = await User.destroy({
        where: { userId: id }
    })
        .then(deletedStatus => {
            return deletedStatus;
        })

    // console.log("deleted user: ", deletedUserStatus);

    // If a user was deleted without errors, also delete the address
    if (deletedUserStatus == 1) {
        Address.destroy({
            where: { addressId: addressId }
        })
            .then(num => {
                // If there was no error in the deleting the success response is sent back
                if (num == 1) {
                    res.send({
                        message: "User was deleted successfully!"
                    });
                }
                // If there was an error, a response is sent to notify the requester
                else {
                    res.status(500).send({
                        message: `Cannot delete user. Maybe user was not found!`
                    });
                }
            })
            .catch(err => {
                // If there is an error, a response is sent to notify the requester
                res.status(500).send({
                    message: err.message || `Could not delete user with id=${id}.`
                });
            });
    } else {
        res.status(500).send({
            message: `Cannot delete user. Maybe user was not found!`
        });
    }
};

// Create and Save a new Friend in the req.body for the user specified in the req.params.id
exports.addFriend = async (req, res) => {
    // Validate request
    if (!req.body.friendTwoId) {
        res.status(400).send({
            message: "You must supply a userId paramater and userId for friend in the body!"
        });
        return;
    }

    // Collect userId from parameter
    const id = req.params.id;
    const friendTwoId = req.body.friendTwoId;

    // Create a Friend
    const friend = {
        friendOneId: id,
        friendTwoId: friendTwoId
    };

    // Check that you are not already friends
    const alreadyFriends = await Friend.findOne({
        where: {
            friendOneId: id,
            friendTwoId: friendTwoId
        }
    })

    // console.log("already friend!", alreadyFriends);

    if (alreadyFriends) {
        res.status(500).send({
            message: "Already friends with user " + id
        });
    } else {

        // Save Friend in the database
        Friend.create(friend)
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while creating the Friend."
                });
            });
    }


};

// Returns a list of friends for the user specified in the req.params.id
exports.getAllFriends = async (req, res) => {
    const id = req.params.id;

    Friend.findAll({
        where: {
            friendOneId: id
        },
        // We include only attributes that we need, which are none from the Friends table
        // except for friendTwoId which we use for debugging
        // attributes: ['friendTwoId'],
        attributes: [],
        include: [
            {
                model: User, as: 'friendTwo',
                include: {
                    model: Authentication, attributes: ['userName']
                },
                // Should match the friendTwoId from above
                attributes: ['userId']
            }
        ]
    })
        .then(data => {
            // console.log("friend data: ", data);

            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Friend with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({ err });
        });
};

// Deletes a friend from the req.body for the user specified in the req.params.id
exports.deleteFriend = async (req, res) => {
    // Validate request
    if (!req.body.friendTwoId) {
        res.status(400).send({
            message: "You must supply a friend to delete!"
        });
        return;
    }

    // The id of the user who will be removing the friend
    const id = req.params.id;

    // The id of the friend to be deleted
    const friendTwoId = req.body.friendTwoId;

    // Destroy the Friend record where the friend exists to delete friend
    await Friend.destroy({
        where: {
            friendOneId: id,
            friendTwoId: friendTwoId
        }
    })
        .then(num => {
            // No errors implies success
            if (num == 1) {
                res.send({
                    message: "Friend was deleted successfully!"
                });
            } else {
                res.status(500).send({
                    message: `Cannot delete Friend with id=${id}. Maybe Friend was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Friend with id=" + id
            });
        });
};

// Retrieve all User entries from the database whose userName is like the search param. Returns 
// results up to the set offset and limit values
exports.findByNameOffsetLimit = async (req, res) => {
    // Checking that offset and limit are numbers, if not a default value will be used
    const searchOffset = isNaN(req.params.offset) ? 0 : parseInt(req.params.offset);
    const searchLimit = isNaN(req.params.limit) ? 999999999999 : parseInt(req.params.limit);
    // The userName is pulled from params to be used in the query
    const searchName = req.params.userName;

    // Searching for all User data that matches the name and returning the results with 
    // the offset/limit
    await User.findAll({
        subQuery: false,
        include: [Address,
            {
                model: Friend, as: 'friendOne'
            },
            {
                model: Authentication, attributes: [
                    'authId', 'userName', 'createdAt', 'updatedAt'
                ],
                include: {
                    model: Permission
                }
            }
        ],
        where: { '$authentication.userName$': { [Op.like]: `%${searchName}%` } },
        order: [[Authentication, 'userName', 'ASC']],
        offset: searchOffset,
        limit: searchLimit
    })
        .then(user => {

            // If users are found the data is returned
            res.send(user);
        })
        .catch(err => {
            // Else a message indicating the user was not found is sent
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving users."
            });
        });
}
