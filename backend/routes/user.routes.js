// Initially Created by: Coleman Dietsch
// CSC450 Capstone
// Restaurant Club - user.routes.js
// February 14, 2022
// Last Edited (Initials, Date, Edits):
// (CPD, 2/28, Added friend routes on users controller)
//  (DAB, 3/06/2022, Added in findByNameOffsetLimit)

module.exports = app => {
  const users = require("../controllers/user.controller.js");
  var router = require("express").Router();

  // Create a new User
  router.post("/", users.create);

  // Retrieve all Users
  router.get("/", users.findAll);

  // Retrieve a single User with id
  router.get("/:id", users.findOne);

  // Retrieve authentication searched by user userName with offset and limit
  router.get("/search/:offset/:limit/:userName", users.findByNameOffsetLimit);

  // Add friend for user id specified in body
  router.post("/friends/:id", users.addFriend);

  // Get all friends for user id
  router.get("/friends/:id", users.getAllFriends);

  // Delete friend for user id specified in body
  router.delete("/friends/:id", users.deleteFriend);

  // Update a User with id
  router.put("/:id", users.update);

  // Delete a User with id
  router.delete("/:id", users.delete);

  // URL to user for route
  app.use('/users', router);
};