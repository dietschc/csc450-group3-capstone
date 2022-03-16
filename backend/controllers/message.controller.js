// Initially Created by: Devin Brueberg
// CSC450 Capstone
// Restaurant Club - message.controller.js
// February 27, 2022
// Last Edited (Initials, Date, Edits):
//  (DAB, 2/28/2022, Added in comments)
//  (DAB, 3/14/2022, Added findAllAfterDateOffsetLimit method to 
//  query all post createdAt times)

const db = require("../models");
const { Op } = db.Sequelize;
const Message = db.message;
const Conversation = db.conversation;
const User = db.user;

// Create and Save a new message
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

    // Creating a message data object to hold the message data as 
    // it is created
    const messageData = {
        conversationId: null,
        message: req.body.message,
    }

    // Searching if the conversation between the two users exists or not
    await Conversation.findOne({
        where: {
            [Op.and]: [
                { userToId: req.body.userToId },
                { userFromId: req.body.userFromId }
            ]
        }
    }).then(async conversation => {
        // If the conversation exists, a mew message is added to the database
        if (conversation) {
            // Assigning the correct conversation id to the message data
            messageData.conversationId = conversation.conversationId;

            // Creating the new message and returning the values created
            await Message.create(messageData)
                .then(message => {
                    // Returning the message data to the caller
                    res.send({ ...message.dataValues, conversation });
                });
        }
        // Else there is not a conversation entry in the database so a new 
        // one is created before the message is added
        else {
            // Creating a new conversation with the message details
            conversation = await Conversation.create(req.body)
                .then(newConversation => {
                    // Assigning the correct conversationId to the message data
                    messageData.conversationId = newConversation.conversationId;

                    // Returning that conversation data
                    return newConversation;
                })
                .catch(err => {
                    // If there is an error it is logged
                    console.log(err);
                });

            // Creating the message in the database with the message data
            await Message.create(messageData)
                .then(message => {
                    // Returning the message data to the caller
                    res.send({ ...message.dataValues, conversation });
                })
        }
    }).catch(err => {
        // If there is an error, it is send back to the requester
        res.status(500).send({
            message:
                err.message || "Some error occurred while creating the message."
        });
    });
};


// Retrieve all messages from the database.
exports.findAll = async (req, res) => {
    // Searching for all messages and their attached conversation entires
    await Message.findAll({
        include: [Conversation]
    })
        .then(message => {
            // If found, sending them back to the requester
            res.send(message);
        })
        .catch(err => {
            // If there was an error the requester is notified
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving messages."
            });
        });
};


// Find a single message with an id
exports.findOne = async (req, res) => {
    // Pulling the message id out of the req param
    const { id: messageId } = req.params;

    // Searching for a message and its attached conversation entry by message Id
    await Message.findByPk(messageId, {
        include: [Conversation]
    })
        .then(message => {
            // If a message was found the result is sent back
            if (message) {
                res.send(message);
            }
            // If a message was not found the user is notified
            else {
                res.send({
                    message: `No messages found with message id ${messageId}!`
                });
            }
        })
        .catch(err => {
            // If there was an error the requester is notified
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving messages."
            });
        });
};


// Update a message by the id in the request. Updating messages is currently not 
// needed
exports.update = (req, res) => {
    res.status(404).send({
        message: "Update a message will not be functional until milestone 4"
    })
};


// Delete a message with the specified id in the request. Deleting messages is currently 
// not needed
exports.delete = (req, res) => {
    res.status(404).send({
        message: "Delete a message will not be functional until milestone 4"
    })
};


// 
exports.findByConversationIdOffsetLimit = async (req, res) => {
    // Checking that offset and limit are numbers, if not a default value will be used
    const searchOffset = isNaN(req.params.offset) ? 0 : parseInt(req.params.offset);
    const searchLimit = isNaN(req.params.limit) ? 999999999999 : parseInt(req.params.limit);
    // Grabbing the userFrom and userTo ids out of params to find the conversation
    const { userToId, userFromId } = req.params;

    // Async searching the database and returning all messages. The 
    // search includes all joined tables and attributes. Data will 
    // be sorted by updatedAt time and in ASC order so that offset and 
    // limit will retrieve the correct message order
    await Message.findAll({
        subQuery: false,
        include: [Conversation],
        order: [['updatedAt', 'DESC'], ['messageId']],
        where: {
            [Op.or]: [
                {
                    [Op.and]: [
                        { '$conversation.userToId$': userToId },
                        { '$conversation.userFromId$': userFromId }
                    ]
                },
                {
                    [Op.and]: [
                        { '$conversation.userToId$': userFromId },
                        { '$conversation.userFromId$': userToId }
                    ]
                }
            ]
        },
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

/**
 * The findAllAfterDateOffsetLimit method will find all messages using the user and friend 
 * ids created after the current messageId data up to the specified limit and offset.
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.findAllAfterDateOffsetLimit = async (req, res) => {
    // Checking that offset and limit are numbers, if not a default value will be used
    const searchOffset = isNaN(req.params.offset) ? 0 : parseInt(req.params.offset);
    const searchLimit = isNaN(req.params.limit) ? 999999999999 : parseInt(req.params.limit);
    // Grabbing the ids and messageId date out of params to find the conversation
    const { userToId, userFromId, messageId } = req.params;

    // Async searching the database and returning all messages. The 
    // search includes all joined tables and attributes. Data will 
    // be sorted by updatedAt time and in DESC order so that offset and 
    // limit will retrieve the correct message order
    await Message.findAll({
        subQuery: false,
        include: [Conversation],
        order: [['updatedAt', 'DESC']],
        where: {
            [Op.and]: [
                {   
                    [Op.and]: [
                        { '$conversation.userToId$': userToId },
                        { '$conversation.userFromId$': userFromId }
                    ]
                },
                {
                    messageId: { [Op.gt]: messageId }
                }]
        },
        offset: searchOffset,
        limit: searchLimit
    })
        .then(message => {
            if (message) {
                // If messages are found they are sent back to the requester
                res.send(message);
            }
            else {
                // If nothing is found a 404 will be sent back
                res.status(404).send({ message: "No new messages"})
            }
            
        })
        .catch(err => {
            // If there is an error the requester will be notified
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving messages."
            });
        });
}