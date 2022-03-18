// Initially Created by: Devin Brueberg
// CSC450 Capstone
// Restaurant Club - reviewImage.routes.js
// February 20, 2022
// Last Edited (Initials, Date, Edits):

module.exports = app => {
    const reviewImage = require("../controllers/reviewImage.controller.js");
    var router = require("express").Router();

    // Create a new Restaurant
    router.post("/", reviewImage.create);

    // Retrieve all Restaurants
    router.get("/", reviewImage.findAll);

    // Retrieve a single Restaurant with id
    router.get("/:id", reviewImage.findOne);

    // Update a Restaurant with id
    router.put("/:id", reviewImage.update);

    // Delete a Restaurant with id
    router.delete("/:id", reviewImage.delete);

    // URL to restaurant for route
    app.use('/reviewImage', router);
  };