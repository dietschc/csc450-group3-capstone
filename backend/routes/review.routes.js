// Initially Created by: Tyler Irvin
// CSC450 Capstone
// Restaurant Club - user.routes.js
// February 14, 2022
// Last Edited (Initials, Date, Edits):

module.exports = app => {
  const review = require("../controllers/review.controller.js");
  var router = require("express").Router();

  // Create a new Restaurant
  router.post("/", review.create);

  // Retrieve all Restaurants
  router.get("/", review.findAll);

  // Retrieve a single Restaurant with id
  router.get("/:id", review.findOne);

  // Update a Restaurant with id
  router.put("/:id", review.update);

  // Delete a Restaurant with id
  router.delete("/:id", review.delete);

  // URL to restaurant for route
  app.use('/review', router);
};