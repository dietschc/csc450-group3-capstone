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

    const { restaurantId } = req.body;

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

    await Restaurant.findByPk(1)
    .then(async(restaurant) => {
        if (restaurant) {
            // Code for creating a review
            const newHistory = await History.create(req.body)
            .then(history => {
                reviewData.historyId = history.historyId;

                return history;
            })
            .catch(err => {
                // If there is an error, a response is sent to notify the requester
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while creating the History."
                });
            });

            const newRating = await Rating.create(req.body)
            .then(rating => {
                reviewData.ratingId = rating.ratingId;

                return rating;
            })
            .catch(err => {
                // If there is an error, a response is sent to notify the requester
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while creating the Rating."
                });
            });

            const newImage = await Image.create(req.body)
            .then(image => {
                return image;
            })
            .catch(err => {
                // If there is an error, a response is sent to notify the requester
                res.status(500).send({
                    message: err.message || "Some error occurred while creating the Image."
                });
            });

            

            const newReview = await Review.create(reviewData)
            .then(newReview => {
                return newReview;
                // res.json({ ...newReview.dataValues, newHistory, newRating, newImage})
            })
            .catch(err => {
                // If there is an error, a response is sent to notify the requester
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while creating the Review."
                });
            });

            await ReviewImage.create({
                imageId: newImage.imageId,
                reviewId: newReview.reviewId
            })
            .then(() => res.json({ ...newReview.dataValues, newHistory, newRating, newImage}))
            .catch(err => {
                // If there is an error, a response is sent to notify the requester
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while creating the ReviewImage."
                });
            });

        }
        else {
            res.status(500).send({
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