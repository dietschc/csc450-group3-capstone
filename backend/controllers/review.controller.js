// Initially Created by: Devin Brueberg
// CSC450 Capstone
// Restaurant Club - review.controller.js
// February 20, 2022
// Last Edited (Initials, Date, Edits):

const { rating } = require("../models");
const db = require("../models");
const Review = db.review;
const Rating = db.rating;
const Image = db.image;

// Create and Save a new review
exports.create = async (req, res) => {
    // Check that review text and title are filled in
    if (!req.body.reviewText || !req.body.reviewTitle) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Convert the JSON body into a review array variable with NULL for subtable keys
    const review = {
        userId: req.body.userId,
        restaurantId: req.body.restaurantId,
        ratingId: null,
        reviewTitle: req.body.reviewTitle,
        reviewText: req.body.reviewText,
        imageId: null,
    };

    // Convert the JSON body into a rating array variable
    const rating = {
        tasteRating: req.body.tasteRating,
        serviceRating: req.body.serviceRating,
        cleanlinessRating: req.body.cleanlinessRating,
        overallRating: req.body.overallRating
    };
    
    // Use delivered create ability to add to rating table and set the new_row ID into the review array
    await Rating.create(rating)
        .then(ratingEntry => { review.ratingId = ratingEntry.ratingId;})
        .catch(err => {return err.message;});

    // Only update the imageId if a file is provided
    if (!req.body.imageLocation)
    {
        // Use the delivered create to add to the image table and set the new_row ID into the review array
        await Image.create(req.body.imageLocation)
        .then(imageEntry => { review.imageId = imageEntry.imageId;})
        .catch(err => {return err.message;});
    }

    // Use the delivered create to add to the review table and return the data to the res?
    Review.create(review)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Review itself."
            });
        });
};

// Retrieve all reviews from the database.
exports.findAll = async (req, res) => {
    Review.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving reviews."
            });
        });
};

// Find a single review with an id
exports.findOne = async (req, res) => {
    const id = req.params.id;
    Review.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find review with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: `Error retrieving review with id=${id}.`
            });
        });
};

// Update a review by the id in the request
exports.update = async (req, res) => {

    if (!req.body.reviewText || !req.body.reviewTitle) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    const { id: reviewId } = req.params;
       // Create bodies for updating data.
    const ratingBody =
    {
        tasteRating: req.body.tasteRating,
        serviceRating: req.body.serviceRating,
        cleanlinessRating: req.body.cleanlinessRating,
        overallRating: req.body.overallRating
    };

    const imageBody =
    {
        imageLocation : req.body.imageLocation
    };

    const reviewBody =
    {
        userId: req.body.userId,
        restaurantId: req.body.restaurantId,
        reviewTitle: req.body.reviewTitle,
        reviewText: req.body.reviewText,
    };

    // Find the review by primaray key
    await Review.findByPk(reviewId)
    .then( async(restaurant) => {
        if (restaurant)
        {      // Get the ids for the children tables
            const ratingId = restaurant.ratingId;
            const imageId = restaurant.imageId;
                // update tables sequentially matching on appropriate PK
            await rating.update(ratingBody,
            {where: {ratingId: ratingId}})

            .then (await Image.update(imageBody,
                {where: {imageId: imageId}}))

            .then (await Review.update(reviewBody,
                {where: {reviewId: reviewId}}))

            .then (num => {
                if (num == 1)
                    res.send({
                        message: "Review updated successfully."
                    });

                else
                    res.send({
                        message: `Cannot updated review with id=${reviewId}.`
                    });
            });
        }
        else
            res.status(500).send({
                message: `Review not found with id=${reviewId}.`
            });
    })

    .catch(err => {
        res.status(500).send({
            message: err.message || `Error updating review with id=${reviewId}.`
        });
    });
};

// Delete a review with the specified id in the request
exports.delete = async (req, res) => {
    const id = req.params.id;

    await Review.findOne(
        {where: {reviewId: id}})

    .then( async (review) => {
        if (review)
        {
            const ratingId = review.ratingId;
            const imageId = review.imageId;

        await Image.destroy(
            {where : {imageId: imageId}})

        .then( await Rating.destroy(
            {where : {ratingId: ratingId}}))

        .then( await Review.destroy(
            {where : {reviewId: id}}))

        .then( num => {
            if (num == 1)
                res.send({message: `Review deleted.`});
            else
                res.status(500).send({message: `Error deleting review with id=${id}.`})
            });
        }
        else
            res.status(500).send({message: `Cannot find review with id=${id}.`})
    })

    .catch(err => {
        res.status(500).send({
            message: err.message || `Error deleting review with id=${id}.`
        });
    });
};