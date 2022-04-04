// Initially Created by: Devin Brueberg
// CSC450 Capstone
// Friend Club - friend.routes.js
// March 3, 2022
// Last Edited (Initials, Date, Edits):

module.exports = app => {
  const friend = require("../controllers/friend.controller.js");
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

  // Create a new Friend
  router.post("/",
    [authJwt.verifyToken],
    friend.create
  );

  // Retrieve all Friends
  router.get("/",
    [authJwt.verifyToken],
    friend.findAll
  );

  // Retrieve a single Friend with id
  router.get("/:id",
    [authJwt.verifyToken],
    friend.findOne
  );

  // Update a Friend with id
  router.put("/:id",
    [authJwt.verifyToken],
    friend.update
  );

  // Delete a Friend with id
  router.delete("/:id/:friendId",
    [authJwt.verifyToken],
    friend.delete
  );

  // URL to restaurant for route
  app.use('/friend', router);
};