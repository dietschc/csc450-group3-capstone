// Initially Created by: Devin Brueberg
// CSC450 Capstone
// Restaurant Club - rating.controller.js
// March 3, 2022
// Last Edited (Initials, Date, Edits):

const db = require("../models");
const Friend = db.friend;
const Authentication = db.authentication;
const User = db.users;

// Create and Save a new Restaurant
exports.create = async (req, res) => {
    // Validate request
    if (!req.body.friendOneId ||
        !req.body.friendTwoId) {
        res.status(400).send({
            message: "Friend Id's can not be empty!"
        });
        return;
    }

    // Save Friend to the database
    const newFriend = await Friend.create(req.body)
    .then(friend => {
        // If a friend is created the data is returned as the response
        return friend;
    })
    .catch(err => {
        // If there is an error it will be returned
        return err;
    }); 

    // Looking up the authentication for the friendTwoId
    await Authentication.findOne({ 
        attributes: ['userName'],
        where: {
            userId: newFriend.friendTwoId
        }
    })
    .then(authentication => {
        // The formatted result is sent as a result
        res.send({...newFriend.dataValues, ...authentication.dataValues})
    })
    .catch(err => {
        // If there is an error the requester will be notified
        res.status(500).send({
            message:
                err.message || "Some error occurred while adding friend."
        });
    }); 
};

// Retrieve all Friends from the database.
exports.findAll = async (req, res) => {
    // The database is queried to find and return all friends in the database
    await Friend.findAll({
        include: [
            { model: User, as: 'friendTwo', 
                include: { 
                    model: Authentication, attributes: [ 'userName' ]}, attributes: [ 'userId' ] }
                ]            
    })
    .then(friend => {
        // The result of the query is sent as a response
        res.send(friend);
    })
    .catch(err => {
        // If there was an error the error message is send as a response
        res.status(500).send({
            message:
                err.message || "Some error occurred while retrieving friends."
        });
    });
};

// Find a single friend with an friendId
exports.findOne = async (req, res) => {
    // Getting the friendId out of params
    const { id: friendId }= req.params;

    // Checking the database for the friend with the friendId and 
    // returning the result
    await Friend.findByPk(friendId, {
        include: [
            { model: User, as: 'friendTwo', 
                include: { 
                    model: Authentication, attributes: [ 'userName' ]}, attributes: [ 'userId' ] }
                ]            
    })
    .then(friend => {
        // If a friend was found in the database it is sent as a response
        if (friend) {
            res.send(friend);
        } 
        // Else the user is notified the friend was not found
        else {
            res.status(404).send({
                message: `Cannot find friend with id=${friendId}.`
            });
        }
    })
    .catch(err => {
        // If there was an error the user is notified
        res.status(500).send({
            message: 
                err.message || "Error retrieving friend with id=" + friendId
        });
    });
};

// Update a Restaurant by the id in the request
exports.update = (req, res) => {
    // The requester is notified that this is operation is not yet implemented
    res.status(404).send({message: "Not implemented."})
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

// Delete a Restaurant with the specified id in the request
exports.delete = (req, res) => {
    // Pulling the friend to delete from params
    const { id: friendId } = req.params;

    // Deleting the friend from the database based off teh id
    Friend.destroy({
        where: { friendId: friendId }
    })
        .then(num => {
            // If the friend was deleted a success message is sent
            if (num == 1) {
                res.send({
                    message: "Friend was deleted successfully!"
                });
            } 
            // Else the user is notified the friend was not deleted
            else {
                res.status(500).send({
                    message: `Cannot delete Friend with id=${friendId}. Maybe Friend was not found!`
                });
            }
        })
        .catch(err => {
            // If there is an error the message is sent or the user is notified by message
            res.status(500).send({
                message: err.message || "Could not delete Friend with id=" + friendId
            });
        });
};