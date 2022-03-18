// Initially Created by: Coleman Dietsch
// CSC450 Capstone
// Restaurant Club - authentication.model.js
// February 15, 2022
// Last Edited (Initials, Date, Edits):
// (CPD, 2/28/2022, Removed historyId column and enabled timestamps)

module.exports = (sequelize, Sequelize) => {
	const Authentication = sequelize.define("authentication", {
		authId: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		userId: {
			type: Sequelize.INTEGER
		},
		permissionId: {
			type: Sequelize.INTEGER
		},
		userName: {
			type: Sequelize.STRING
		},
		userPassword: {
			type: Sequelize.STRING
		},
	}, {
		freezeTableName: true,
		timestamps: true
	});

	return Authentication;
};