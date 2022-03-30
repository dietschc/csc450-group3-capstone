// Initially Created by: Devin Brueberg
// CSC450 Capstone
// Restaurant Club - rating.controller.js
// March 3, 2022
// Last Edited (Initials, Date, Edits):
//  (DAB, 3/4/2022, Fine tuned friend create and added comments)

const db = require("../models");
const { Op } = db.Sequelize;
const Friend = db.friend;
const Authentication = db.authentication;
const User = db.users;

// Create and Save a new Restaurant
exports.create = async (req, res) => {
    // Validate request
    if (!req.body.friendOneId || !req.body.friendTwoId) {
        res.status(400).send({
            message: "Friend Id's can not be empty!",
        });

        return;
    }

    // Checking if the friend already exists in the database
    const isFriend = await Friend.findOne({
        where: {
            [Op.and]: [
                { friendOneId: req.body.friendOneId },
                { friendTwoId: req.body.friendTwoId },
            ],
        },
    })
        .then((res) => {
            // If a friend is not in the database true is returned
            if (res !== null) {
                return true;
            }
            // If the friend is in the database false is returned
            else {
                return false;
            }
        })
        .catch((err) => {
            // Errors are caught and returned to the requester
            res.send({
                message: err.message || "There was an error finding the friend",
            });

            // Returning false since the friend was not found in the database
            return false;
        });

    // If the friend is not in the database it is added
    if (!isFriend) {
        // Save Friend to the database
        const newFriend = await Friend.create(req.body)
            .then((friend) => {
                // If a friend is created the data is returned as the response
                return friend;
            })
            .catch((err) => {
                // If there is an error it will be returned
                return err;
            });

        // Looking up the authentication for the friendTwoId
        await Authentication.findOne({
            attributes: ["userName"],
            where: {
                userId: newFriend.friendTwoId,
            },
        })
            .then((authentication) => {
                // The formatted result is sent as a result
                res.send({ ...newFriend.dataValues, ...authentication.dataValues });
            })
            .catch((err) => {
                // If there is an error the requester will be notified
                res.status(500).send({
                    message: err.message || "Some error occurred while adding friend.",
                });
            });
    }
    // Else the friend is already in the database or was not added
    else {
        res.send({
            message: "Friend was not added to the database",
        });
    }
};

// Retrieve all Friends from the database.
exports.findAll = async (req, res) => {
    // The database is queried to find and return all friends in the database
    await Friend.findAll({
        include: [
            {
                model: User,
                as: "friendTwo",
                include: {
                    model: Authentication,
                    attributes: ["userName"],
                },
                attributes: ["userId"],
            },
        ],
    })
        .then((friend) => {
            // The result of the query is sent as a response
            res.send(friend);
        })
        .catch((err) => {
            // If there was an error the error message is send as a response
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving friends.",
            });
        });
};

// Find a single friend with an friendId
exports.findOne = async (req, res) => {
    // Getting the friendId out of params
    const { id: friendId } = req.params;

    // Checking the database for the friend with the friendId and
    // returning the result
    await Friend.findByPk(friendId, {
        include: [
            {
                model: User,
                as: "friendTwo",
                include: {
                    model: Authentication,
                    attributes: ["userName"],
                },
                attributes: ["userId"],
            },
        ],
    })
        .then((friend) => {
            // If a friend was found in the database it is sent as a response
            if (friend) {
                res.send(friend);
            }
            // Else the user is notified the friend was not found
            else {
                res.status(404).send({
                    message: `Cannot find friend with id=${friendId}.`,
                });
            }
        })
        .catch((err) => {
            // If there was an error the user is notified
            res.status(500).send({
                message: err.message || "Error retrieving friend with id=" + friendId,
            });
        });
};

// Update a Restaurant by the id in the request
exports.update = (req, res) => {
    // The requester is notified that this is operation is not yet implemented
    res.status(404).send({ message: "Not implemented." });
    // const id = req.params.id;
    // Review.update(req.body, {
    //     where: { restaurantId: id }
    // })
    //     .then(num => {
    //         if (num == 1) {
    //             res.send({
    //                 message: "Restaurant was updated successfully."
    //             });
    //         } else {
    //             res.status(500).send({
    //                 message: `Cannot update Restaurant with id=${id}. Maybe Restaurant was not found or req.body is empty!`
    //             });
    //         }
    //     })
    //     .catch(err => {
    //         res.status(500).send({
    //             message: "Error updating Restaurant with id=" + id
    //         });
    //     });
};

// Deletes a friend from the req.body for the user specified in the req.params.id
exports.delete = (req, res) => {
    // The id of the user who will be removing the friend
    const id = req.params.id;

    // The id of the friend to be deleted
    const friendTwoId = req.params.friendId;

    // Destroy the Friend record where the friend exists to delete friend
    Friend.destroy({
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
                res.status(404).send({
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
