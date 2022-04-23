// Initially Created by: Coleman Dietsch
// CSC450 Capstone
// Restaurant Club - address.model.js
// February 14, 2022
// Last Edited (Initials, Date, Edits):
// (TJI) 29 March 2022 - Added in character limits to match ERD

module.exports = (sequelize, Sequelize) => {
	const Address = sequelize.define("address", {
		addressId: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		address: {
			type: Sequelize.STRING(64)
		},
		city: {
			type: Sequelize.STRING(64)
		},
		state: {
			type: Sequelize.STRING(2)
		},
		zip: {
			type: Sequelize.STRING(5)
		}
	}, {
		freezeTableName: true,
		timestamps: false
	});
	return Address;
};