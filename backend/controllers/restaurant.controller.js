const db = require("../models");
const Restaurant = db.restaurants;
const Image = db.image;
const Address = db.address;
const Rating = db.rating;
const Users = db.users;

// Create and Save a new Restaurant
exports.create = async(req, res) => {
    // Validate request
    if (!req.body.restaurantWebsite) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Data for an Address row for the Restaurant
    const address = {
        address: req.body.address,
        city: req.body.city,
        state: req.body.state,
        zip: req.body.zip
    }

    // Wait for the address to be created, then copy to a const
    const newAddress = await Address.create(address)
        .then(newAddress => {
            return newAddress;
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Address."
            });
        });

    // Debug code
    // console.log("new address: ", newAddress);

    // Data for an Image row for the Restaurant
    const image = {
        imageLocation: req.body.imageLocation
    }

    // Wait for the image to be created, then copy to a const
    const newImage = await Image.create(image)
        .then(newImage => {
            return newImage;
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Image."
            });
        });

    // Data for a Rating row for the Restaurant 
    const rating = {
        tasteRating: null,
        serviceRating: null,
        cleanlinessRating: null,
        overallRating: null
    }

    // Wait for the rating to be created, then copy to a const
    const newRating = await Rating.create(rating)
        .then(newAddress => {
            return newAddress;
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Address."
            });
        });

    // Create a Restaurant
    const restaurant = {
        userCreatorId: req.body.userCreatorId,
        userOwnerId: null,
        ratingId: newRating.ratingId,
        addressId: newAddress.addressId,
        imageId: newImage.imageId,
        restaurantName: req.body.restaurantName,
        restaurantDigiContact: req.body.restaurantDigiContact,
        restaurantWebsite: req.body.restaurantWebsite,
        restaurantPhone: req.body.restaurantPhone,
        reviewCount: 0
    };

    // Save Restaurant in the database
    const newRestaurant = await Restaurant.create(restaurant)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Restaurant."
            });
        });
};

// Retrieve all Restaurants from the database.
exports.findAll = (req, res) => {
    Restaurant.findAll({ include: [ Users, Address, Rating, Image ] })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving restaurants."
            });
        });
};

// Find a single Restaurant with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    Restaurant.findOne({ where: { restaurantId: id },
        include: [ Users, Address, Rating, Image ] 
    })
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Restaurant with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Restaurant with id=" + id
            });
        });
};

// Update a Restaurant by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
    Restaurant.update(req.body, {
        where: { restaurantId: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Restaurant was updated successfully."
                });
            } else {
                res.status(500).send({
                    message: `Cannot update Restaurant with id=${id}. Maybe Restaurant was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Restaurant with id=" + id
            });
        });
};

// Delete a Restaurant with the specified id in the request
exports.delete = async(req, res) => {
    const id = req.params.id;
    const deleteRestaurant = await Restaurant.destroy({
        where: { restaurantId: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Restaurant was deleted successfully!"
                });
            } else {
                res.status(500).send({
                    message: `Cannot delete Restaurant with id=${id}. Maybe Restaurant was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Restaurant with id=" + id
            });
        });
};
