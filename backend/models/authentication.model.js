// Initially Created by: Coleman Dietsch
// CSC450 Capstone
// Restaurant Club - authentication.model.js
// February 15, 2022
// Last Edited (Initials, Date, Edits):
const db = require("../models");
const User = db.user;

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
		historyId: {
			type: Sequelize.INTEGER
		},
	}, {
		freezeTableName: true,
		timestamps: false
	});

	return Authentication;
};