// Initially Created by: Devin Brueberg
// CSC450 Capstone
// Restaurant Club - conversation.model.js
// February 20, 2022
// Last Edited (Initials, Date, Edits):

module.exports = (sequelize, Sequelize) => {
	const Conversation = sequelize.define("conversation", {
		conversationId: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		userToId: {
			type: Sequelize.INTEGER
		},
		userFromId: {
			type: Sequelize.INTEGER
		}
	}, {
		freezeTableName: true,
		timestamps: false
	});
	return Conversation;
};