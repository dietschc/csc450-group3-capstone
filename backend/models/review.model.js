// Initially Created by: Devin Brueberg
// CSC450 Capstone
// Restaurant Club - review.model.js
// February 20, 2022
// Last Edited (Initials, Date, Edits):

module.exports = (sequelize, Sequelize) => {
	const Review = sequelize.define("review", {
		reviewId: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		userId: {
			type: Sequelize.INTEGER
		},
		restaurantId: {
			type: Sequelize.INTEGER
		},
		ratingId: {
			type: Sequelize.INTEGER
		},
		reviewTitle: {
			type: Sequelize.STRING
		},
		reviewText: {
			type: Sequelize.STRING
		},
		historyId: {
			type: Sequelize.INTEGER
		}
	}, {
		freezeTableName: true,
		timestamps: false
	});
	return Review;
};