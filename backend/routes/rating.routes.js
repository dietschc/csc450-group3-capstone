// Initially Created by: Devin Brueberg
// CSC450 Capstone
// Restaurant Club - rating.routes.js
// February 20, 2022
// Last Edited (Initials, Date, Edits):

module.exports = app => {
    const rating = require("../controllers/rating.controller.js");
    var router = require("express").Router();

    // Create a new Restaurant
    router.post("/", rating.create);

    // Retrieve all Restaurants
    router.get("/", rating.findAll);

    // Retrieve a single Restaurant with id
    router.get("/:id", rating.findOne);

    // Update a Restaurant with id
    router.put("/:id", rating.update);

    // Delete a Restaurant with id
    router.delete("/:id", rating.delete);

    // URL to restaurant for route
    app.use('/rating', router);
  };