// Initially Created by: Tyler Irvin
// CSC450 Capstone
// Restaurant Club - review.model.js
// February 18, 2022
// Last Edited (Initials, Date, Edits):

module.exports = (sequelize, Sequelize) => {
	const Review = sequelize.define("review", {
		revId: {
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
		revTitle: {
			type: Sequelize.STRING
		},
		revText: {
			type: Sequelize.STRING
		},
		imageId: {
			type: Sequelize.INTEGER
		}
	}, {
		freezeTableName: true,
		timestamps: false
	});
	return Review;
};