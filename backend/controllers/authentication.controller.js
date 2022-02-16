// Initially Created by: Coleman Dietsch
// CSC450 Capstone
// Restaurant Club - authentication.controller.js
// February 15, 2022
// Last Edited (Initials, Date, Edits):

const db = require("../models");
const Authentication = db.authentication;

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
