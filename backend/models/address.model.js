module.exports = (sequelize, Sequelize) => {
	const Address = sequelize.define("address", {
		addressId: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		address: {
			type: Sequelize.STRING
		},
		city: {
			type: Sequelize.STRING
		},
		state: {
			type: Sequelize.STRING
		},
		zip: {
			type: Sequelize.STRING
		}
	}, {
		freezeTableName: true,
		timestamps: false
	});
	return Address;
};