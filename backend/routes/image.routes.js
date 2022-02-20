// Initially Created by: Devin Brueberg
// CSC450 Capstone
// Restaurant Club - image.routes.js
// February 20, 2022
// Last Edited (Initials, Date, Edits):

module.exports = app => {
    const image = require("../controllers/image.controller.js");
    var router = require("express").Router();

    // Create a new Restaurant
    router.post("/", image.create);

    // Retrieve all Restaurants
    router.get("/", image.findAll);

    // Retrieve a single Restaurant with id
    router.get("/:id", image.findOne);

    // Update a Restaurant with id
    router.put("/:id", image.update);

    // Delete a Restaurant with id
    router.delete("/:id", image.delete);

    // URL to restaurant for route
    app.use('/image', router);
  };