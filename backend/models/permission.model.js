// Initially Created by: Devin Brueberg
// CSC450 Capstone
// Restaurant Club - permission.model.js
// February 20, 2022
// Last Edited (Initials, Date, Edits):

module.exports = (sequelize, Sequelize) => {
	const Permission = sequelize.define("permission", {
		permissionId: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		permissionName: {
			type: Sequelize.STRING
		}
	}, {
		freezeTableName: true,
		timestamps: false
	});
	return Permission;
};