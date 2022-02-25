// Initially Created by: Devin Brueberg
// CSC450 Capstone
// Restaurant Club - restaurant.controller.js
// February 21, 2022
// Last Edited (Initials, Date, Edits):
//  (DAB, 2/22/2022, Finished the basic req/res for the restaurant controller)

const db = require("../models");
const Restaurant = db.restaurants;
const Image = db.image;
const Address = db.address;
const Rating = db.rating;

// Create and Save a new Restaurant
exports.create = async (req, res) => {
    // Validate request
    if (!req.body.restaurantWebsite) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Creating an array to hold the needed table ideas as the adjoining 
    // restaurant tables are created
    const restaurantData = {
        userCreatorId: req.body.userCreatorId,
        userOwnerId: null,
        ratingId: null,
        addressId: null,
        imageId: null,
        restaurantName: req.body.restaurantName,
        restaurantDigiContact: req.body.restaurantDigiContact,
        restaurantWebsite: req.body.restaurantWebsite,
        restaurantPhone: req.body.restaurantPhone,
        reviewCount: 0
    };

    // Ratings start off with a default of 0 so they will show 
    // no stars
    const ratingData = {
        tasteRating: 0,
		serviceRating: 0,
		cleanlinessRating: 0,
		overallRating: 0
    }

    // Wait for the address to be created, then copy to a const
    const address = await Address.create(req.body)
    .then(newAddress => {
        // Assigning the id of the newly created table to the restaurant array
        restaurantData.addressId = newAddress.addressId;
        // Returning the instance
        return newAddress;
    })
    .catch(err => {
        // If there is an error, a response is sent to notify the requester
        res.status(500).send({
            message:
                err.message || "Some error occurred while creating the Address."
        });
    });

    // Wait for the image to be created, then copy to a const
    const image = await Image.create(req.body)
    .then(newImage => {
        // Assigning the id of the newly created table to the restaurant array
        restaurantData.imageId = newImage.imageId;
        // Returning the instance
        return newImage;
    })
    .catch(err => {
        // If there is an error, a response is sent to notify the requester
        res.status(500).send({
            message:
                err.message || "Some error occurred while creating the Image."
        });
    });

    // Wait for the rating to be created, then copy to a const
    const rating = await Rating.create(ratingData)
    .then(newRating => {
        restaurantData.ratingId = newRating.ratingId;
        return newRating;
    })
    .catch(err => {
        // If there is an error, a response is sent to notify the requester
        res.status(500).send({
            message:
                err.message || "Some error occurred while creating the Rating."
        });
    });

    // Save Restaurant in the database
    await Restaurant.create(restaurantData)
    .then(newRestaurant => {
        
        // Send the response JSON with all created table objects
        res.json({ ...newRestaurant.dataValues, address, rating, image });
    })
    .catch(err => {
        // If there is an error, a response is sent to notify the requester
        res.status(500).send({
            message:
                err.message || "Some error occurred while creating the Restaurant."
        });
    });
};

// Retrieve all Restaurants from the database.
exports.findAll = async (req, res) => {
    // Using an async function to search the database for all existing restaurants
    await Restaurant.findAll({ include: [Address, Rating, Image] })
    .then(restaurant => {
        // If restaurants are found the data is returned
        res.send(restaurant);
    })
    .catch(err => {
        // Else a message indicating the restaurant was not found is sent
        res.status(500).send({
            message:
                err.message || "Some error occurred while retrieving restaurants."
        });
    });
};

// Find a single Restaurant with an id
exports.findOne = async (req, res) => {
    // Id's needed to find the restaurant and adjoining tables
    const { id: restaurantId } = req.params;

    // Using an async function to search the database for an existing restaurant
    // based on an id and joining needed tables for response
    await Restaurant.findByPk(restaurantId, {
        include: [Address, Rating, Image]
    })
    .then((restaurant) => {
        // If restaurant was found the data is returned
        if (restaurant) {
            res.send(restaurant);
        } 
        // Else a message indicating the restaurant was not found is sent
        else {
            res.status(404).send({
                message: `Cannot find Restaurant with id=${restaurantId}.`
            });
        }
    })
    .catch(err => {
        // If there is an error, a response is sent to notify the requester
        res.status(500).send({
            message: err.message || `Error retrieving Restaurant with id=${restaurantId}.`
        });
    });
};

// Update a Restaurant by the id in the request
exports.update = async(req, res) => {
    // Validate request
    if (!req.body.restaurantWebsite) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Id's needed to update the address, image, and restaurant tables
    const { id: restaurantId} = req.params;
    

    // Data for an Address row for the Restaurant
    const addressData = {
        address: req.body.address,
        city: req.body.city,
        state: req.body.state,
        zip: req.body.zip
    }

    // Data for an image location
    const imageData = {
        imageLocation: req.body.imageLocation
    }

    // Data to update the restaurant
    const restaurantData = {
        userCreatorId: req.body.userCreatorId,
        restaurantName: req.body.restaurantName,
        restaurantDigiContact: req.body.restaurantDigiContact,
        restaurantWebsite: req.body.restaurantWebsite,
        restaurantPhone: req.body.restaurantPhone
    };

    // First will search the database to find the restaurant so that valid id's 
    // can be used in the update and to verify restaurant exists
    await Restaurant.findByPk(restaurantId)
    .then(async(restaurant) => {
        // If the restaurant exists the data is updated
        if (restaurant) {
            // Destructuring the correct address and image id's from 
            // the queried restaurant
            const { addressId, imageId } = restaurant;

            // Updating the data for the restaurant in all tables
            await Restaurant.update(restaurantData, {
            where: { restaurantId: restaurantId }
            })
            .then(await Address.update(addressData, {
                where: { addressId: addressId }
            }))
            .then(await Image.update(imageData, {
                where: { imageId: imageId }
            }))
            .then(num => {
                // If the restaurant was updated a success response is sent
                if (num == 1) {
                    res.send({
                        message: "Restaurant was updated successfully."
                    });
                } 
                // If there was an error, a response is sent to notify the requester
                else {
                    res.status(500).send({
                        message: `Cannot update Restaurant with id=${restaurantId}. Maybe Restaurant was not found or req.body is empty!`
                    });
                }
            });
        }
        // If the restaurant was not found, the requester is notified
        else {
            res.status(500).send({
                message: `Cannot update Restaurant with id=${restaurantId}. Maybe Restaurant was not found!`
            });
        }
    })
    .catch(err => {
        // If there is an error, a response is sent to notify the requester
        res.status(500).send({
            message: err.message || "Error updating Restaurant with id=" + restaurantId
        });
    });
};

// Delete a Restaurant with the specified id in the request
exports.delete = async (req, res) => {
    // Retrieving the restaurant id from params
    const { id: restaurantId } = req.params;

    // Using an async function to search the database for an existing restaurant
    // based on an id
    await Restaurant.findOne({
        where: { restaurantId: restaurantId }
    })
    .then(async (restaurant) => {
        // If a restaurant is found the results are used to delete all related tables
        if (restaurant) {
            const { ratingId, imageId, addressId } = restaurant;
            // Deleting the restaurant and adjoining tables from the database in the 
            // correct key check order
            await Restaurant.destroy({
                where: { restaurantId: restaurantId }
            }).then(await Rating.destroy({
                where: { ratingId: ratingId }
            })).then(await Image.destroy({
                where: { imageId: imageId }
            })).then(await Address.destroy({
                where: { addressId: addressId }
            })).then(num => {
                    // If there was no error in the deleting the success response is sent back
                    if (num == 1) {
                        res.send({
                            message: "Restaurant was deleted successfully!"
                        });
                    } 
                    // If there was an error, a response is sent to notify the requester
                    else {
                        res.status(500).send({
                            message: `Cannot delete Restaurant with id=${restaurantId}. Maybe Restaurant was not found!`
                        });
                    }
                });
                 
        }
        // If the restaurant was not found, the requester is notified
        else {
            res.status(500).send({
                message: `Restaurant with id=${restaurantId} was not found`
            });
        }
    })
    .catch(err => {
        // If there is an error, a response is sent to notify the requester
        res.status(500).send({
            message: err.message || `Could not delete Restaurant with id=${restaurantId}.`
        });
    }); 
};