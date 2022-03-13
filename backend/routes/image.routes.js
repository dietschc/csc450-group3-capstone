// Initially Created by: Devin Brueberg
// CSC450 Capstone
// Restaurant Club - image.routes.js
// February 20, 2022
// Last Edited (Initials, Date, Edits):
// (CPD, 3/12/22, Updated delete routes and comments)

module.exports = app => {
	const image = require("../controllers/image.controller.js");
	var router = require("express").Router();

	// Create a new Image
	router.post("/", image.upload);

	// Retrieve all Restaurants
	router.get("/", image.findAll);

	// Retrieve a single Image with id
	router.get("/:id", image.findOne);

	// Update a Image with id
	router.put("/:id", image.update);

	// Delete an image from a specific location, specified in the req.body
	router.delete("/", image.delete);

	// Delete a restaurant sub directory and all files contained within it
	router.delete("/restaurants/:directory", image.deleteRestaurantDirectory);

	// Delete a user sub directory and all files contained within it
	router.delete("/:id", image.deleteUserDirectory);

	// URL to restaurant for route
	app.use('/images', router);
};