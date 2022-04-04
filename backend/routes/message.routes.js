// Initially Created by: Devin Brueberg
// CSC450 Capstone
// Restaurant Club - message.routes.js
// February 27, 2022
// Last Edited (Initials, Date, Edits):
//  (DAB, 2/28/2022, Added in comments)
//  (DAB, 3/14/2022, Added in findAllAfterDateOffsetLimit)
//  (DAB, 3/28/2022, Updated the route name for findAllAfterDateOffsetLimit 
//  to describe its behavior of findAllByIdOffsetLimit)
//  (DAB, 4/04/2022, Commenting out unused routes for security. Added
//  JWT to all edit or delete routes)

module.exports = app => {
  const message = require("../controllers/message.controller.js");
  var router = require("express").Router();
  const { authJwt } = require("../middleware");

  // Add access tokens to headers
  router.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // Create a new message
  router.post("/",
    [authJwt.verifyToken],
    message.create);

  // Retrieve all messages
  // router.get("/", message.findAll);

  // Retrieve a single message with id
  // router.get("/:id", message.findOne);

  // Update a message with id
  // router.put("/:id", message.update);

  // Delete a message with id
  // router.delete("/:id", message.delete);

  // Retrieve all messages using the userFrom and To ids. 
  // Sorted newest to oldest with offset and limit
  router.get("/sorted/date/:userToId/:userFromId/:offset/:limit",
    [authJwt.verifyToken],
    message.findByConversationIdOffsetLimit);

  // Retrieve all messages using the userFrom and 
  // To ids written after the current messageId.
  // Sorted newest to oldest with offset and limit
  router.get("/sorted/byId/:messageId/:userToId/:userFromId/:offset/:limit",
    [authJwt.verifyToken],
    message.findAllByIdOffsetLimit);

  // URL to message for route
  app.use('/message', router);
};