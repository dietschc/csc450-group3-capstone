module.exports = (sequelize, Sequelize) => {
	const Restaurant = sequelize.define("restaurant", {
		restaurantId: {
			type: Sequelize.INTEGER,
			primaryKey: true
		},
		addressId: {
			type: Sequelize.INTEGER
		},
		fName: {
			type: Sequelize.STRING
		},
		lName: {
			type: Sequelize.STRING
		},
		restaurantEmail: {
			type: Sequelize.STRING
		}
	}, {
		freezeTableName: true,
		timestamps: false
	});
	return Restaurant;
};