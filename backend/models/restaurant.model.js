// Initially Created by: Coleman Dietsch
// CSC450 Capstone
// Restaurant Club - restaurant.model.js
// February 7, 2022
// Last Edited (Initials, Date, Edits):
//	(DAB, 2/20,2022, Matched table columns to that in our finalized database)

module.exports = (sequelize, Sequelize) => {
	const Restaurant = sequelize.define("restaurant", {
		restaurantId: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		userCreatorId: {
			type: Sequelize.INTEGER
		},
		userOwnerId: {
			type: Sequelize.INTEGER
		},
		ratingId: {
			type: Sequelize.INTEGER
		},
		addressId: {
			type: Sequelize.INTEGER
		},
		imageId: {
			type: Sequelize.INTEGER
		},
		restaurantName: {
			type: Sequelize.STRING
		},
		restaurantDigiContact: {
			type: Sequelize.STRING
		},
		restaurantWebsite: {
			type: Sequelize.STRING
		},
		restaurantPhone: {
			type: Sequelize.STRING
		},
		reviewCount: {
			type: Sequelize.INTEGER
		},
	}, {
		freezeTableName: false,
		timestamps: true
	});
	return Restaurant;
};