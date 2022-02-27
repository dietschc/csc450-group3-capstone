// Initially Created by: Devin Brueberg
// CSC450 Capstone
// Restaurant Club - review.controller.js
// February 20, 2022
// Last Edited (Initials, Date, Edits):
//  (DAB, 2/26/2022, Completed find all and find by pk operations)

const db = require("../models");
const Review = db.review;
const History = db.history;
const ReviewImage = db.reviewImage;
const Image = db.image;
const Rating = db.rating;
const Restaurant = db.restaurants;
const User = db.users;
const Authentication = db.authentication;

// Create and save a new review
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
            });

            // A new rating is created for the review
            const newRating = await Rating.create(req.body)
            .then(rating => {
                // The ratingId is updated in the reviewData array
                reviewData.ratingId = rating.ratingId;

                // Returning the rating query instance
                return rating;
            });

            // A new image row in the image table is created for the review
            const newImage = await Image.create(req.body)
            .then(image => {
                // Returning the image instance to the caller
                return image;
            });
            
            // Creating the review table for the new review
            const newReview = await Review.create(reviewData)
            .then(newReview => {
                // The new review object is returned to the caller
                return newReview;
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

// Retrieve all reviews from the database.
exports.findAll = async (req, res) => {
    // Async searching the database and returning all reviews. The 
    // search includes all joined tables and attributes
    await Review.findAll({
        attributes: {
            exclude: ['userId', 'restaurantId', 'ratingId', 'historyId']
        },
        include: [
            Rating, History, 
            { model: Image, attributes: ['imageId', 'imageLocation']}, 
            { model: Restaurant, attributes: ['restaurantId', 'restaurantName']}, 
            { model: User, 
                include: { 
                    model: Authentication, attributes: ['userName']}, attributes: ['userId'] }
        ]
    })
    .then(review => {
        // If reviews are found they are sent back to the requester
        res.send(review);
    })
    .catch(err => {
        // If there is an error the requester will be notified
        res.status(500).send({
            message:
                err.message || "Some error occurred while retrieving reviews."
        });
    });
};

// Find a single review with an id
exports.findOne = async (req, res) => {
    // Pulling the reviewId from the param
    const { id: reviewId } = req.params;

    // Async searching the database and returning a review by id. The 
    // search includes all joined tables and attributes
    await Review.findByPk(reviewId, {
        attributes: {
            exclude: ['userId', 'restaurantId', 'ratingId', 'historyId']
        },
        include: [
            Rating, History, 
            { model: Image, attributes: ['imageId', 'imageLocation']}, 
            { model: Restaurant, attributes: ['restaurantId', 'restaurantName']}, 
            { model: User, 
                include: { 
                    model: Authentication, attributes: ['userName']}, attributes: ['userId'] }
        ]
    })
    .then(data => {
        // If reviews are found they are sent back to the requester
        res.send(data);
    })
    .catch(err => {
        // If there is an error the requester will be notified
        res.status(500).send({
            message:
                err.message || "Some error occurred while retrieving the review."
        });
    });
};

// Update a review by the id in the request
exports.update = async (req, res) => {
    // Validate request
    if (!req.body.tasteRating || 
        !req.body.serviceRating || 
        !req.body.cleanlinessRating || 
        !req.body.overallRating) {
        res.status(400).send({
            message: "Content needs required fields!"
        });
        return;
    }

    // Id needed to update the tables
    const { id: reviewId} = req.params;

    // First will search the database to find the review so that valid id's 
    // can be used in the update and to verify review exists
    await Review.findByPk(reviewId, {
        include: [
            Rating, History, 
            { model: Image, through: { where: { reviewId: reviewId }}},
            { model: Restaurant, 
                include: {
                    model: Rating
                }}
        ]
    })
    .then(async (review) => {
        // If the review exists the data is updated
        if (review) {
            // Destructuring the existing review ratings
            const { 
                tasteRating: reviewTasteRating, 
                serviceRating: reviewServiceRating, 
                cleanlinessRating: reviewCleanlinessRating, 
                overallRating: reviewOverallRating 
            } = review.rating;

            // Destructuring the existing restaurant review ratings
            const { 
                tasteRating: restaurantTasteRating, 
                serviceRating: restaurantServiceRating, 
                cleanlinessRating: restaurantCleanlinessRating, 
                overallRating: restaurantOverallRating 
            } = review.restaurant.rating;

            // Calculating the new restaurant rating based off the new review rating values
            const newRestaurantTasteRating = restaurantTasteRating - reviewTasteRating + req.body.tasteRating;
            const newRestaurantServiceRating = restaurantServiceRating - reviewServiceRating + req.body.serviceRating;
            const newRestaurantCleanlinessRating = restaurantCleanlinessRating - reviewCleanlinessRating + req.body.cleanlinessRating;
            const newRestaurantOverallRating = restaurantOverallRating - reviewOverallRating + req.body.overallRating;

            // Destructuring the needed table id's for the full review update
            const { ratingId: reviewRatingId } = review;
            const { ratingId: restaurantRatingId } = review.restaurant.rating;
            const { imageId: reviewImageId } = review.images[0];
            const { historyId: reviewHistoryId } = review;

            // Updating the review table
            await review.update(req.body);

            // Updating the review's rating table
            await Rating.update(req.body, { 
                where: { ratingId: reviewRatingId } 
            });

            // Updating the restaurant's rating table
            await Rating.update({
                tasteRating: newRestaurantTasteRating,
                serviceRating: newRestaurantServiceRating,
                cleanlinessRating: newRestaurantCleanlinessRating,
                overallRating: newRestaurantOverallRating
            }, { 
                where: { ratingId: restaurantRatingId } 
            });

            // Updating the reviews image table
            await Image.update(req.body, {where: { imageId: reviewImageId }});

            // Adding the new modified date to the review's history table
            await History.update(req.body, { where: {historyId: reviewHistoryId }})
            .then(num => {
                // If the review was updated a success response is sent
                if (num == 1) {
                    res.send({
                        message: "Review was updated successfully."
                    });
                } 
                // If there was an error, a response is sent to notify the requester
                else {
                    res.status(500).send({
                        message: `Cannot update Review with id=${reviewId}. Maybe Review was not found or req.body is empty!`
                    });
                }
            });
        }
        // If the review was not found, the requester is notified
        else {
            res.status(500).send({
                message: `Cannot update Review with id=${reviewId}. Maybe Review was not found!`
            });
        }
    })
    .catch(err => {
        // If there is an error, a response is sent to notify the requester
        res.status(500).send({
            message: err.message || "Error updating Review with id=" + reviewId
        });
    });
};

// Delete a Restaurant with the specified id in the request
exports.delete = async (req, res) => {
    // Id's needed to update the address, image, and restaurant tables
    const { id: reviewId} = req.params;

    // First will search the database to find the restaurant so that valid id's 
    // can be used in the delete and to verify review exists
    await Review.findByPk(reviewId, {
        include: [
            Rating, History, Image,
            { model: Restaurant, 
                include: {
                    model: Rating
                }}
        ]
    })
    .then(async (review) => {
        // If the review exists the data will be deleted
        if (review) {
            // Destructuring the existing review ratings
            const { 
                tasteRating: reviewTasteRating, 
                serviceRating: reviewServiceRating, 
                cleanlinessRating: reviewCleanlinessRating, 
                overallRating: reviewOverallRating 
            } = review.rating;
            // Destructuring the existing restaurant review ratings
            const { 
                tasteRating: restaurantTasteRating, 
                serviceRating: restaurantServiceRating, 
                cleanlinessRating: restaurantCleanlinessRating, 
                overallRating: restaurantOverallRating 
            } = review.restaurant.rating;

            // Calculating the new restaurant rating based off the new review rating values
            const newRestaurantTasteRating = restaurantTasteRating - reviewTasteRating;
            const newRestaurantServiceRating = restaurantServiceRating - reviewServiceRating;
            const newRestaurantCleanlinessRating = restaurantCleanlinessRating - reviewCleanlinessRating;
            const newRestaurantOverallRating = restaurantOverallRating - reviewOverallRating;

            // Destructuring the needed table id's for the full review update
            const { ratingId: reviewRatingId, historyId: reviewHistoryId, restaurantId } = review;
            const { ratingId: restaurantRatingId } = review.restaurant.rating;
            const { imageId: reviewImageId } = review.images[0];

            // Deleting the review table
            await review.destroy();

            // Updating the review's rating table
            await Rating.destroy({ where: { ratingId: reviewRatingId }});

            // Updating the restaurant's rating table
            await Rating.update({
                tasteRating: newRestaurantTasteRating,
                serviceRating: newRestaurantServiceRating,
                cleanlinessRating: newRestaurantCleanlinessRating,
                overallRating: newRestaurantOverallRating
            }, { 
                where: { ratingId: restaurantRatingId } 
            });

            // Decrementing the restaurants reviewCount by 1 since there is one less review
            await Restaurant.decrement('reviewCount', { by: 1,  where: { restaurantId: restaurantId }});

            // Deleting the image row
            await Image.destroy({where: { imageId: reviewImageId }});

            // Deleting the history row
            await History.destroy({ where: { historyId: reviewHistoryId }})
            .then(num => {
                // If the review was updated a success response is sent
                if (num == 1) {
                    res.send({
                        message: "Review was deleted successfully."
                    });
                } 
                // If there was an error, a response is sent to notify the requester
                else {
                    res.status(500).send({
                        message: `Cannot delete Review with id=${reviewId}. Maybe Review was not found!`
                    });
                }
            });
        }
        // If the review was not found, the requester is notified
        else {
            res.status(500).send({
                message: `Cannot delete Review with id=${reviewId}. Maybe Review was not found!`
            });
        }
    })
    .catch(err => {
        // If there is an error, a response is sent to notify the requester
        res.status(500).send({
            message: err.message || "Error deleting Review with id=" + reviewId
        });
    });
};