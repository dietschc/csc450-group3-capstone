// Initially Created by: Coleman Dietsch
// CSC450 Capstone
// Restaurant Club - user.model.js
// February 14, 2022
// Last Edited (Initials, Date, Edits):
// (TJI) 29 March 2022 - Added in character limits to match ERD

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
			type: Sequelize.STRING(64)
		},
		lastName: {
			type: Sequelize.STRING(64)
		},
		userEmail: {
			type: Sequelize.STRING(64)
		}
	}, {
		freezeTableName: true,
		timestamps: false
	});
	return User;
};