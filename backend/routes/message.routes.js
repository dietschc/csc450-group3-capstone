// Initially Created by: Devin Brueberg
// CSC450 Capstone
// Restaurant Club - message.routes.js
// February 27, 2022
// Last Edited (Initials, Date, Edits):
//  (DAB, 2/28/2022, Added in comments)

module.exports = app => {
  const message = require("../controllers/message.controller.js");
  var router = require("express").Router();

  // Create a new message
  router.post("/", message.create);

  // Retrieve all messages
  router.get("/", message.findAll);

  // Retrieve a single message with id
  router.get("/:id", message.findOne);

  // Update a message with id
  router.put("/:id", message.update);

  // Delete a message with id
  router.delete("/:id", message.delete);

  // Retrieve all messages using the userFrom and To ids. Sorted newest to oldest with offset and limit
  router.get("/sorted/date/:userToId/:userFromId/:offset/:limit", message.findByConversationIdOffsetLimit);

  // URL to message for route
  app.use('/message', router);
};