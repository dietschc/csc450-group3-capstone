// Initially Created by: Coleman Dietsch
// CSC450 Capstone
// Restaurant Club - user.model.js
// February 14, 2022
// Last Edited (Initials, Date, Edits):

module.exports = (sequelize, Sequelize) => {
	const User = sequelize.define("user", {
		userId: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		addressId: {
			type: Sequelize.INTEGER
		},
		firstName: {
			type: Sequelize.STRING
		},
		lastName: {
			type: Sequelize.STRING
		},
		userEmail: {
			type: Sequelize.STRING
		}
	}, {
		freezeTableName: true,
		timestamps: false
	});
	return User;
};