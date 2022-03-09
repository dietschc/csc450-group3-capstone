// Initially Created by: Devin Brueberg
// CSC450 Capstone
// Restaurant Club - image.controller.js
// February 20, 2022
// Last Edited (Initials, Date, Edits):
// (CPD, 3/8/22, Created upload function to upload images to cloud)

const db = require("../models");
const Image = db.image;
const uploadFile = require("../middleware/upload");

// Upload endpoint
exports.upload = async (req, res) => {
    console.log("req: ", req);
    try {
        await uploadFile(req, res);
        if (req.file == undefined) {
            // console.log('req details: ', req.file);
          return res.status(400).send({ message: "Please upload a file!" });
        }

        // Upload was successful
        console.log("file location: ", req.file.location);
        res.status(200).send({
            // return cloud location so we can use it 
          location: req.file.location
        });
      } catch (err) {
        res.status(500).send({
          message: `Could not upload the file: ${req.file.originalname}. ${err}`,
        });
      }
}

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