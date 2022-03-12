// Initially Created by: Devin Brueberg
// CSC450 Capstone
// Restaurant Club - image.controller.js
// February 20, 2022
// Last Edited (Initials, Date, Edits):
// (CPD, 3/8/22, Created upload function to upload images to cloud)
// (CPD, 3/11/22, Created delete image function to remove images from cloud)

const db = require("../models");
const Image = db.image;
const uploadFile = require("../middleware/upload");
const deleteFile = require("../middleware/delete");
const https = require('https');

/**
 * Upload endpoint takes a multipart form with a file as the parameter
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
exports.upload = async (req, res) => {
	try {
		await uploadFile(req, res);
		if (req.file == undefined) {
			// console.log('req details: ', req.file);
			return res.status(400).send({ message: "Please upload a file!" });
		}
		// console.log("req: ", req);
		// console.log("file location: ", req.file.location);

		// Upload was successful
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

/**
 * Delete image endpoint takes a location from the req.body as the parameter
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
exports.delete = async (req, res) => {
	// Validate request
	if (!req.body.location) {
		res.status(400).send({
			message: "File location can not be empty!",
		});
		return;
	}

	// Set file location from req.body
	const location = req.body.location;

	try {
		// Since AWS does not confirm file deletion, we must do this ourselves
		const status = await deleteFile(location, res);

		console.log("status: ", status);

		// Status code will be 1 if file was deleted successfully 
		if (status === 1) {
			res.status(200).send({
				message: "File deleted successfully"
			});

			// Status will be something else if the file was not deleted
		} else {
			res.status(500).send({
				message: "Could not delete file, perhaps file is already deleted?"
			});
		}

	} catch (err) {
		res.status(500).send({
			message: `Could not delete the file: ${err}`,
		});
	}
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
