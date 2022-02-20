// Initially Created by: Coleman Dietsch
// CSC450 Capstone
// Restaurant Club - index.js
// February 14, 2022
// Last Edited (Initials, Date, Edits):
//  (DAB, 2/20/2022, Added in image, reviewImage, review and rating models)

const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.users = require("./user.model.js")(sequelize, Sequelize);
db.restaurants = require("./restaurant.model.js")(sequelize, Sequelize);
db.authentication = require("./authentication.model.js")(sequelize, Sequelize);
db.address = require("./address.model.js")(sequelize, Sequelize);
// db.image = require("./image.model.js")(sequelize, Sequelize);
// db.reviewImage = require("./reviewImage.model.js")(sequelize, Sequelize);
// db.rating = require("./rating.model.js")(sequelize, Sequelize);
// db.review = require("./review.model.js")(sequelize, Sequelize);

// User 1-1 Authentication Associations
db.users.hasOne(db.authentication, { foreignKey: 'userId' });
db.authentication.belongsTo(db.users, { foreignKey: 'userId' });

module.exports = db;
