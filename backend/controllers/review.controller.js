// Initially Created by: Tyler Irvin
// CSC450 Capstone
// Restaurant Club - review.controller.js
// February 18, 2022
// Last Edited (Initials, Date, Edits):

// Tables structed in this folder:
const { sequelize } = require("../models");
const db = require("../models");
const Review = db.review;
const User = db.users;
const Restaurant = db.restaurants;
const Rating = db.rating;
const Op = db.Sequelize.Op;


// Find all Reviews (URL: GET /review)
exports.findAll = (req, res) => {
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

// Find a specific Review (URL: GET /review/{id})
exports.findOne = (req, res) => {
    // get the id (primary key of review) out of the parameters
    const revId = req.params.id;
    Review.findByPk(revId)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find review with id=${revId}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving review with id=${revId}."
            });
        });
};


exports.addReview = async (req, res) => {

    if ((!req.body.userId) || (!req.body.restaurantId))
    {
        res.status(400).send(
            {message: "Required fields missing! Login and restaurant required."}
        );
        return;
    }
    if (!req.body.revTitle)
    {
        res.status(400).send(
            {message: "Review title required."}
        );
        return;
    }


    const request = {
        userId : req.body.userId,
        restaurantId : req.body.restaurantId,
        tasteRating : req.body.tasteRating,
        serviceRating : req.body.serviceRating,
        cleanlinessRating : req.body.cleanlinessRating,
        overallRating : req.body.overallRating,
        revTitle : req.body.revTitle,
        revText : req.body.revText,
        imageLocation : ""
    }

    console.log(request.userId);

    const newReview = await sequelize
        .query('CALL addReview (:userId, :restaurantId, :tasteRating, :serviceRating, :cleanlinessRating, :overallRating, :revTitle, :revText, :imageLocation)',
        {replacements:
            {userId: request.userId,
             restaurantId: request.restaurantId,
             tasteRating: request.tasteRating,
             serviceRating: request.serviceRating,
             cleanlinessRating: request.cleanlinessRating,
             overallRating: request.overallRating,
             revTitle: request.revTitle,
             revText: request.revText,
             imageLocation: request.imageLocation}})
        .then(res.send(200))
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error adding Review"
            });
        });
};
