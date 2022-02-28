// Initially Created by: Devin Brueberg
// CSC450 Capstone
// Restaurant Club - message.controller.js
// February 27, 2022
// Last Edited (Initials, Date, Edits):

const db = require("../models");
const { Op } = db.Sequelize;
const Message = db.message;
const Conversation = db.conversation;
const User = db.user;

// Create and Save a new Restaurant
exports.create = async (req, res) => {
    // Validate request
    if (!req.body.userToId ||
        !req.body.userFromId ||
        !req.body.message) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    const messageData = {
        conversationId: null,
        message: req.body.message,
    }

    await Conversation.findOne({ 
        where: {[Op.and]: [ 
            { userToId: req.body.userToId }, 
            { userFromId: req.body.userFromId } 
        ]}
    }).then(async conversation => {
        if (conversation) {
            messageData.conversationId = conversation.conversationId;
            await Message.create(messageData)
            .then(message => {
                res.json({ ...message.dataValues, conversation });
            });
        }
        else {
            conversation = await Conversation.create(req.body)
            .then(newConversation => {
                messageData.conversationId = newConversation.conversationId
                return newConversation;
            })
            .catch(err => {
                console.log(err);
            });

            await Message.create(messageData)
            .then(message => {
                res.json({ ...message.dataValues, conversation });
            })
        }
    }).catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while creating the Restaurant."
        });
    });
};

// Retrieve all Restaurants from the database.
exports.findAll = async (req, res) => {
    await Message.findAll({
        include: [ Conversation ]
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving messages."
            });
        });
};

// Find a single Restaurant with an id
exports.findOne = async (req, res) => {
    const { id: messageId } = req.params;
    await Message.findByPk(messageId, {
        include: [ Conversation ]
    })
    .then(message => {
        if (message) {
            res.send(message);
        }
        else {
            res.status(404).send({
                message: `No messages found with message id ${messageId}!`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while retrieving messages."
        });
    });
};

// Update a Restaurant by the id in the request
exports.update = (req, res) => {
    res.send({
        message: "Update a message will not be functional until milestone 4"
    })
};

// Delete a Restaurant with the specified id in the request
exports.delete = (req, res) => {
    res.send({
        message: "Delete a message will not be functional until milestone 4"
    })
};

exports.findByConversationIdOffsetLimit = async (req, res) => {
    // Checking that offset and limit are numbers, if not a default value will be used
    const searchOffset = isNaN(req.params.offset) ? 0 : parseInt(req.params.offset);
    const searchLimit = isNaN(req.params.limit) ? 999999999999 : parseInt(req.params.limit);
    const { userToId, userFromId } = req.params;

    // Async searching the database and returning all reviews. The 
    // search includes all joined tables and attributes
    await Message.findAll({
        subQuery: false,
        include: [ Conversation ],
        order: [['updatedAt', 'ASC']],
        where: {[Op.or]: [ 
            {
                [Op.and]: [
                    { '$conversation.userToId$': userToId }, 
                    { '$conversation.userFromId$': userFromId }
            ]},
            {
                [Op.and]: [
                    { '$conversation.userToId$': userFromId }, 
                    { '$conversation.userFromId$': userToId } 
            ]}
        ]},
        offset: searchOffset, 
        limit: searchLimit 
    })
    .then(message => {
        // If messages are found they are sent back to the requester
        res.send(message);
    })
    .catch(err => {
        // If there is an error the requester will be notified
        res.status(500).send({
            message:
                err.message || "Some error occurred while retrieving messages."
        });
    });
}