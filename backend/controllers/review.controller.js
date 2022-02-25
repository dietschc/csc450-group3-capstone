// Initially Created by: Devin Brueberg
// CSC450 Capstone
// Restaurant Club - review.controller.js
// February 20, 2022
// Last Edited (Initials, Date, Edits):

const db = require("../models");
const Review = db.review;
const History = db.history;
const ReviewImage = db.reviewImage;
const Image = db.image;
const Rating = db.rating;
const Restaurant = db.restaurants;

// Create and Save a new Restaurant
exports.create = async (req, res) => {
    // Validate request
    if (!req.body.restaurantId) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Creating an array to hold the needed table ideas as the adjoining 
    // restaurant tables are created
    const reviewData = {
        userId: req.body.userId,
        restaurantId: req.body.restaurantId,
        ratingId: null,
        reviewTitle: req.body.reviewTitle,
        reviewText: req.body.reviewText,
        historyId: null
    };

    // Searching the database to verify a restaurant exists to write the review for
    await Restaurant.findByPk(reviewData.restaurantId)
    .then(async (restaurant) => {
        // If a restaurant was found the rating will be created
        if (restaurant) {
            // A new history entry is added for the rating
            const newHistory = await History.create(req.body)
            .then(history => {
                // The reviewData array is updated with the historyId
                reviewData.historyId = history.historyId;

                // The history object is returned to the caller
                return history;
            })
            .catch(err => {
                // If there is an error, a response is sent to notify the requester
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while creating the History."
                });
            });

            // A new rating is created for the review
            const newRating = await Rating.create(req.body)
            .then(rating => {
                // The ratingId is updated in the reviewData array
                reviewData.ratingId = rating.ratingId;

                // Returning the rating query instance
                return rating;
            })
            .catch(err => {
                // If there is an error, a response is sent to notify the requester
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while creating the Rating."
                });
            });

            // A new image row in the image table is created for the review
            const newImage = await Image.create(req.body)
            .then(image => {
                // Returning the image instance to the caller
                return image;
            })
            .catch(err => {
                // If there is an error, a response is sent to notify the requester
                res.status(500).send({
                    message: 
                        err.message || "Some error occurred while creating the Image."
                });
            });
            
            // Creating the review table for the new review
            const newReview = await Review.create(reviewData)
            .then(newReview => {
                // The new review object is returned to the caller
                return newReview;
            })
            .catch(err => {
                // If there is an error, a response is sent to notify the requester
                res.status(500).send({
                    // The requester is notified there was an error
                    message: err.message || "Some error occurred while creating the Review."
                });
            });

            // Searching for the restaurant rating to update
            await Rating.findByPk(restaurant.ratingId)
            .then(async rating => {
                // Updating the restaurant rating by adding in the new rating to the 
                // restaurants rating table
                await rating.update({
                tasteRating: rating.tasteRating + req.body.tasteRating,
                serviceRating: rating.serviceRating + req.body.serviceRating,
                cleanlinessRating: rating.cleanlinessRating + req.body.cleanlinessRating,
                overallRating: rating.overallRating + req.body.overallRating
                });
            
                // Incrementing the restaurants reviewCount by 1 since there is one new review
                await restaurant.increment('reviewCount', { by: 1});
            });
            
            // Connecting the review and image tables for the new review image
            await ReviewImage.create({
                imageId: newImage.imageId,
                reviewId: newReview.reviewId
            })
            .then(() => {
                // Sending the newly created review data values back to the requester
                res.json({ ...newReview.dataValues, newHistory, newRating, newImage})
            })
            .catch(err => {
                // If there is an error, a response is sent to notify the requester
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while creating the ReviewImage."
                });
            });
        }
        // Else the restaurant does not exist so a review cannot be created for it
        else {
            res.status(500).send({
                // Letting the requester know the review could not be created
                message: `Cannot create a review. No restaurant with id=${restaurantId}.`
            });
        }
    })
    .catch(err => {
        // If there is an error, a response is sent to notify the requester
        res.status(500).send({
            message: err.message || "Error creating the review."
        });
    });
};

// Retrieve all Restaurants from the database.
exports.findAll = (req, res) => {
    // Review.findAll()
    //     .then(data => {
    //         res.send(data);
    //     })
    //     .catch(err => {
    //         res.status(500).send({
    //             message:
    //                 err.message || "Some error occurred while retrieving restaurants."
    //         });
    //     });
};

// Find a single Restaurant with an id
exports.findOne = (req, res) => {
    // const id = req.params.id;
    // Review.findByPk(id)
    //     .then(data => {
    //         if (data) {
    //             res.send(data);
    //         } else {
    //             res.status(404).send({
    //                 message: `Cannot find Restaurant with id=${id}.`
    //             });
    //         }
    //     })
    //     .catch(err => {
    //         res.status(500).send({
    //             message: "Error retrieving Restaurant with id=" + id
    //         });
    //     });
};

// Update a Restaurant by the id in the request
exports.update = (req, res) => {
    // const id = req.params.id;
    // Review.update(req.body, {
    //     where: { restaurantId: id }
    // })
    //     .then(num => {
    //         if (num == 1) {
    //             res.send({
    //                 message: "Restaurant was updated successfully."
    //             });
    //         } else {
    //             res.status(500).send({
    //                 message: `Cannot update Restaurant with id=${id}. Maybe Restaurant was not found or req.body is empty!`
    //             });
    //         }
    //     })
    //     .catch(err => {
    //         res.status(500).send({
    //             message: "Error updating Restaurant with id=" + id
    //         });
    //     });
};

// Delete a Restaurant with the specified id in the request
exports.delete = (req, res) => {
    // const id = req.params.id;
    // Review.destroy({
    //     where: { restaurantId: id }
    // })
    //     .then(num => {
    //         if (num == 1) {
    //             res.send({
    //                 message: "Restaurant was deleted successfully!"
    //             });
    //         } else {
    //             res.status(500).send({
    //                 message: `Cannot delete Restaurant with id=${id}. Maybe Restaurant was not found!`
    //             });
    //         }
    //     })
    //     .catch(err => {
    //         res.status(500).send({
    //             message: "Could not delete Restaurant with id=" + id
    //         });
    //     });
};