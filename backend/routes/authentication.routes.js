// Initially Created by: Coleman Dietsch
// CSC450 Capstone
// Restaurant Club - authentication.routes.js
// February 15, 2022
// Last Edited (Initials, Date, Edits):
//  (DAB, 3/06/2022, Added in updateByUserId)
//  (CPD, 3/26/2022, Added new route for refreshToken)
//  (DAB, 4/02/2022, Added in new routes for updatePassword and 
//  updatePasswordSecure)
//  (DAB, 4/02/2022, JWT added to updatePassword and updatePasswordSecure)

module.exports = app => {
  const authentication = require("../controllers/authentication.controller.js");
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

  // Create a new Authentication
  router.post("/", authentication.create);

  // Call login function
  router.post("/login", authentication.login);

  // Request new access token, as long as the refresh token is not expired
  router.post("/refreshtoken", authentication.refreshToken);

  // Call checkUserName function
  router.post("/checkusername", authentication.checkUserName);

  // Retrieve all Authentications
  router.get("/", authentication.findAll);

  // Retrieve a single Authentication with id
  router.get("/:id", authentication.findOne);

  // Retrieve authentication searched by user userName with offset and limit
  router.get("/search/:offset/:limit/:userName", authentication.findByNameOffsetLimit);

  // Update a Authentication with id
  router.put("/:id", authentication.update);

  // Update a password referencing a userId
  router.put("/password/:userId", [authJwt.verifyToken, authJwt.isAdmin], authentication.updatePassword)

  // Update a password referencing a userId and checking the body oldPassword
  // for validity
  router.put("/passwordSecure/:userId", [authJwt.verifyToken], authentication.updatePasswordSecure);

  // Update a Authentication with id
  router.put("/userId/:userId", authentication.updateByUserId);

  // Delete a Authentication with id
  router.delete("/:id", authentication.delete);

  // URL to authentication for route
  app.use('/authentication', router);
};