// Initially Created by: Coleman Dietsch
// CSC450 Capstone
// Restaurant Club - restaurant.routes.js
// February 14, 2022
// Last Edited (Initials, Date, Edits):
//  (DAB, 2/27/2022, Added in some offset/limit findAll as well as search 
//  by name and author Id)
//  (DAB, 4/04/2022, Commenting out unused routes for security. Added
//  JWT to all edit or delete routes)

module.exports = app => {
  const restaurants = require("../controllers/restaurant.controller.js");
  var router = require("express").Router();
  const { authJwt } = require("../middleware");

  // Add access tokens to headers
  router.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // Create a new Restaurant
  router.post("/", [authJwt.verifyToken],
    restaurants.create);

  // Retrieve all Restaurants
  // router.get("/", restaurants.findAll);

  // Retrieve a single Restaurant with id
  router.get("/:id",
    restaurants.findOne);

  // Update a Restaurant with id
  router.put("/:id",
    [authJwt.verifyToken],
    restaurants.update);

  // Delete a Restaurant with ids
  router.delete("/:id",
    [authJwt.verifyToken],
    restaurants.delete);

  // Retrieve all Restaurants
  router.post("/array/",
    restaurants.findAllByArray);

  // Retrieve Restaurants matching the author id 
  // ordered asc by restaurant name
  router.get("/author/:id",
    restaurants.findByAuthorId);

  // Retrieve Restaurants  matching the author id 
  // ordered asc by restaurant name and result limit
  router.get("/author/:offset/:limit/:id",
    restaurants.findByAuthorIdOffsetLimit);

  // Retrieve Restaurants ordered asc by restaurant 
  // name and result limit
  router.get("/limit/:limit",
    restaurants.findAllLimit);

  // Retrieve Restaurants ordered asc by restaurant 
  // name with result limit and offset
  router.get("/limit/:offset/:limit",
    restaurants.findAllOffsetLimit);

  // Retrieve Restaurants searched by restaurant name 
  // with offset and limit
  router.get("/search/:offset/:limit/:name",
    restaurants.findByNameOffsetLimit);

  // URL to restaurant for route
  app.use('/restaurants', router);
};