// Initially Created by: Coleman Dietsch
// CSC450 Capstone
// Restaurant Club - restaurant.routes.js
// February 14, 2022
// Last Edited (Initials, Date, Edits):

module.exports = app => {
    const restaurants = require("../controllers/restaurant.controller.js");
    var router = require("express").Router();

    // Create a new Restaurant
    router.post("/", restaurants.create);

    // Retrieve all Restaurants
    router.get("/", restaurants.findAll);

    // Retrieve a single Restaurant with id
    router.get("/:id", restaurants.findOne);

    // Update a Restaurant with id
    router.put("/:id", restaurants.update);

    // Delete a Restaurant with ids
    router.delete("/:restaurantId/:ratingId/:imageId/:addressId", restaurants.delete);

    // URL to restaurant for route
    app.use('/restaurants', router);
  };