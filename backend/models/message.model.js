// Initially Created by: Devin Brueberg
// CSC450 Capstone
// Restaurant Club - message.model.js
// February 20, 2022
// Last Edited (Initials, Date, Edits):

module.exports = (sequelize, Sequelize) => {
	const Message = sequelize.define("message", {
		messageId: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		conversationId: {
			type: Sequelize.INTEGER
		},
		message: {
			type: Sequelize.STRING
		},
		timeStamp: {
			type: Sequelize.STRING
		}
	}, {
		freezeTableName: true,
		timestamps: false
	});
	return Message;
};