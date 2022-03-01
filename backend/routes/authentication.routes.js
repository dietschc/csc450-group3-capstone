// Initially Created by: Coleman Dietsch
// CSC450 Capstone
// Restaurant Club - authentication.routes.js
// February 15, 2022
// Last Edited (Initials, Date, Edits):

module.exports = app => {
  const authentication = require("../controllers/authentication.controller.js");
  var router = require("express").Router();

  // Create a new Authentication
  router.post("/", authentication.create);

  // Call login function
  router.post("/login", authentication.login);

  // Call checkUserName function
  router.post("/checkusername", authentication.checkUserName);

  // Retrieve all Authentications
  router.get("/", authentication.findAll);

  // Retrieve a single Authentication with id
  router.get("/:id", authentication.findOne);

  // Retrieve authentication searched by user userName with offset and limit
  router.get("/search/:offset/:limit/:userName", authentication.findByNameOffsetLimit);

  // Update a Authentication with id
  router.put("/:id", authentication.update);

  // Delete a Authentication with id
  router.delete("/:id", authentication.delete);

  // URL to authentication for route
  app.use('/authentication', router);
};