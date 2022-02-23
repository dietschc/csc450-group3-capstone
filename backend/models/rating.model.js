// Initially Created by: Tyler Irvin
// CSC450 Capstone
// Restaurant Club - review.model.js
// February 18, 2022
// Last Edited (Initials, Date, Edits):

module.exports = (sequelize, Sequelize) => {
	const Rating = sequelize.define("rating", {
		revId: {
			type: Sequelize.INTEGER,
			primaryKey: true,
		},
		tasteRating: {
			type: Sequelize.FLOAT(1,1)
		},
		serviceRating: {
			type: Sequelize.FLOAT(1,1)
		},
		cleanlinessRating: {
			type: Sequelize.FLOAT(1,1)
		},
		overallRating: {
			type: Sequelize.FLOAT(1,1)
		}
	}, {
		freezeTableName: true,
		timestamps: false
	});
	return Rating;
};