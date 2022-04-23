// Initially Created by: Devin Brueberg
// CSC450 Capstone
// Restaurant Club - image.routes.js
// February 20, 2022
// Last Edited (Initials, Date, Edits):
// 	(CPD, 3/12/2022, Updated delete routes and comments)
//	(DAB, 3/13/2022, Added in deleteRestaurantDirectory route)
//  (CPD, 4/6/2022, Added authJWT headers and cleaned up routes)

module.exports = app => {
	const image = require("../controllers/image.controller.js");
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

	// Create a new Image
	router.post("/",
		[authJwt.verifyToken],
		image.upload
	);

	// Retrieve all Images
	// router.get("/", image.findAll);    NOT USED

	// Retrieve a single Image with id
	// router.get("/:id", image.findOne);    NOT USED

	// Update a Image with id
	// router.put("/:id", image.update);    NOT USED

	// Delete an image from a specific location, specified in the req.body
	router.delete("/",
		[authJwt.verifyToken],
		image.delete
	);

	// Delete a restaurant sub directory and all files contained within it
	router.delete("/restaurants/:directory",
		[authJwt.verifyToken],
		image.deleteRestaurantDirectory
	);

	// Delete a user sub directory and all files contained within it
	router.delete("/:id",
		[authJwt.verifyToken],
		image.deleteUserDirectory
	);

	// URL to restaurant for route
	app.use('/images', router);
};