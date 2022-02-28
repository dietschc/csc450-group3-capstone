// Initially Created by: Devin Brueberg
// CSC450 Capstone
// Restaurant Club - message.routes.js
// February 27, 2022
// Last Edited (Initials, Date, Edits):

module.exports = app => {
  const message = require("../controllers/message.controller.js");
  var router = require("express").Router();

  // Create a new Restaurant
  router.post("/", message.create);

  // Retrieve all Restaurants
  router.get("/", message.findAll);

  // Retrieve a single Restaurant with id
  router.get("/:id", message.findOne);

  // Update a Restaurant with id
  router.put("/:id", message.update);

  // Delete a Restaurant with id
  router.delete("/:id", message.delete);

  // Retrieve all Reviews sorted newest to oldest
  router.get("/sorted/date/:userToId/:userFromId/:offset/:limit", message.findByConversationIdOffsetLimit);

  // URL to restaurant for route
  app.use('/message', router);
};