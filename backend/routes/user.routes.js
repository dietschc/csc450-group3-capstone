// Initially Created by: Coleman Dietsch
// CSC450 Capstone
// Restaurant Club - user.routes.js
// February 14, 2022
// Last Edited (Initials, Date, Edits):

module.exports = app => {
    const users = require("../controllers/user.controller.js");
    var router = require("express").Router();

    // Create a new User
    router.post("/", users.create);

    // Retrieve all Users
    router.get("/", users.findAll);

    // Retrieve a single User with id
    router.get("/:id", users.findOne);

    // Update a User with id
    router.put("/:id", users.update);

    // Delete a User with id
    router.delete("/:id", users.delete);

    // URL to user for route
    app.use('/users', router);
  };