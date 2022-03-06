// Initially Created by: Devin Brueberg
// CSC450 Capstone
// review Club - review.routes.js
// February 20, 2022
// Last Edited (Initials, Date, Edits):
//  (DAB, 2/27/2022, Added in some offset/limit findAll as well as search 
//  by name and author Id)
//  (DAB, 3/5/2022, Added in route for findByRestaurantAuthorIdOffsetLimit)

module.exports = app => {
  const review = require("../controllers/review.controller.js");
  var router = require("express").Router();

  // Create a new review
  router.post("/", review.create);

  // Retrieve all review
  router.get("/", review.findAll);

  // Retrieve a single review with id
  router.get("/:id", review.findOne);

  // Update a review with id
  router.put("/:id", review.update);

  // Delete a review with id
  router.delete("/:id", review.delete);

  // Retrieve review matching the author id ordered asc by review name
  router.get("/author/:id", review.findByAuthorId);

  // Retrieve review  matching the author id ordered asc by review name and result limit
  router.get("/author/:offset/:limit/:id", review.findByAuthorIdOffsetLimit);

  // Retrieve review  matching the author id ordered asc by review name and result limit
  router.get("/restaurant/:offset/:limit/:id", review.findByRestaurantIdOffsetLimit);

  // Retrieve review  matching the author id ordered asc by review name and result limit
  router.get("/:offset/:limit/:authorId/:restaurantId", review.findByRestaurantAuthorIdOffsetLimit);

  // Retrieve review ordered asc by review name and result limit
  router.get("/limit/:limit", review.findAllLimit);

  // Retrieve review ordered asc by review name with result limit and offset
  router.get("/limit/:offset/:limit", review.findAllOffsetLimit);

  // Retrieve review searched by review name with offset and limit
  router.get("/search/:offset/:limit/:name", review.findByNameOffsetLimit);

  // Retrieve all Reviews sorted newest to oldest
  router.get("/sorted/date", review.findAllSortedByDate);

  // Retrieve all Reviews sorted newest to oldest
  router.get("/sorted/date/:offset/:limit", review.findAllSortedByDateOffsetLimit);

  // URL to review for route
  app.use('/review', router);
  };