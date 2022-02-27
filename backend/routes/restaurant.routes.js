// Initially Created by: Coleman Dietsch
// CSC450 Capstone
// Restaurant Club - restaurant.routes.js
// February 14, 2022
// Last Edited (Initials, Date, Edits):
//  (DAB, 2/27/2022, Added in some offset/limit findAll as well as search 
//  by name and author Id)

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
    router.delete("/:id", restaurants.delete);

    // Retrieve Restaurants matching the author id ordered asc by restaurant name
    router.get("/author/:id", restaurants.findByAuthorId);

    // Retrieve Restaurants  matching the author id ordered asc by restaurant name and result limit
    router.get("/author/:offset/:limit/:id", restaurants.findByAuthorIdLimitOffset);

    // Retrieve Restaurants ordered asc by restaurant name and result limit
    router.get("/limit/:limit", restaurants.findAllLimit);

    // Retrieve Restaurants ordered asc by restaurant name with result limit and offset
    router.get("/limit/:offset/:limit", restaurants.findAllLimitOffset);

    // Retrieve Restaurants searched by restaurant name with offset and limit
    router.get("/search/:offset/:limit/:name", restaurants.findByNameLimitOffset);

    // URL to restaurant for route
    app.use('/restaurants', router);
  };