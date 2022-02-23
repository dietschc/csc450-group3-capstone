// Initially Created by: Tyler Irvin
// CSC450 Capstone
// Restaurant Club - user.routes.js
// February 14, 2022
// Last Edited (Initials, Date, Edits):

module.exports = app => {
    // Call methods located in this file
    const review = require("../controllers/review.controller.js");
    var router = require("express").Router();

    // URL to review for route
    app.use('/review', router);

    // Retrieve all Reviews
    router.get("/", review.findAll);

    // URL for single review (GET /review/{id})
    router.get("/:id", review.findOne);

    // URL to create review (POST /review)
    router.post("/", review.addReview);
  };