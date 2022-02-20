// Initially Created by: Devin Brueberg
// CSC450 Capstone
// Restaurant Club - image.model.js
// February 20, 2022
// Last Edited (Initials, Date, Edits):

module.exports = (sequelize, Sequelize) => {
	const Image = sequelize.define("image", {
		imageId: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		imageLocation: {
			type: Sequelize.STRING
		}
	}, {
		freezeTableName: true,
		timestamps: false
	});
	return Image;
};