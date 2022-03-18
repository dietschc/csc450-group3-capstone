// Initially Created by: Devin Brueberg
// CSC450 Capstone
// Restaurant Club - reviewImage.model.js
// February 20, 2022
// Last Edited (Initials, Date, Edits):

module.exports = (sequelize, Sequelize) => {
	const ReviewImage = sequelize.define("reviewImage", {
		reviewImageId: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		imageId: {
			type: Sequelize.INTEGER
		},
		reviewId: {
			type: Sequelize.INTEGER
		}
	}, {
		freezeTableName: true,
		timestamps: false
	});
	return ReviewImage;
};