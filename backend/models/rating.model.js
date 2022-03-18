// Initially Created by: Devin Brueberg
// CSC450 Capstone
// Restaurant Club - rating.model.js
// February 20, 2022
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