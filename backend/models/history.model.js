// Initially Created by: Devin Brueberg
// CSC450 Capstone
// Restaurant Club - history.model.js
// February 20, 2022
// Last Edited (Initials, Date, Edits):

module.exports = (sequelize, Sequelize) => {
	const History = sequelize.define("history", {
		historyId: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		created: {
			type: Sequelize.DATE
		},
		modified: {
			type: Sequelize.DATE
		}
	}, {
		freezeTableName: true,
		timestamps: false
	});
	return History;
};