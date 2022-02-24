// Initially Created by: Tyler Irvin
// CSC450 Capstone
// Restaurant Club - review.model.js
// February 18, 2022
// Last Edited (Initials, Date, Edits):

module.exports = (sequelize, Sequelize) => {
	const Rating = sequelize.define("rating", {
		ratingId: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		tasteRating: {
			type: Sequelize.INTEGER
		},
		serviceRating: {
			type: Sequelize.INTEGER
		},
		cleanlinessRating: {
			type: Sequelize.INTEGER
		},
		overallRating: {
			type: Sequelize.INTEGER
		}
	}, {
		freezeTableName: true,
		timestamps: false
	});
	return Rating;
};