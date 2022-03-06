// Initially Created by: Devin Brueberg
// CSC450 Capstone
// Restaurant Club - friend.routes.js
// March 3, 2022
// Last Edited (Initials, Date, Edits):

module.exports = app => {
    const friend = require("../controllers/friend.controller.js");
    var router = require("express").Router();

    // Create a new Restaurant
    router.post("/", friend.create);

    // Retrieve all Restaurants
    router.get("/", friend.findAll);

    // Retrieve a single Restaurant with id
    router.get("/:id", friend.findOne);

    // Update a Restaurant with id
    router.put("/:id", friend.update);

    // Delete a Restaurant with id
    router.delete("/:id/:friendId", friend.delete);

    // URL to restaurant for route
    app.use('/friend', router);
  };