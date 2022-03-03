// Initially Created by: Devin Brueberg
// CSC450 Capstone
// Restaurant Club - friend.model.js
// February 20, 2022
// Last Edited (Initials, Date, Edits):

module.exports = (sequelize, Sequelize) => {
	const Friend = sequelize.define("friend", {
		friendId: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			unique: true
		},
		friendOneId: {
			type: Sequelize.INTEGER,
			unique: true
		},
		friendTwoId: {
			type: Sequelize.INTEGER,
			unique: true
		}
	}, {
		freezeTableName: true,
		timestamps: false
	});
	return Friend;
};