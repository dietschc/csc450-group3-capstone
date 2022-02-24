// Initially Created by: Coleman Dietsch
// CSC450 Capstone
// Restaurant Club - index.js
// February 14, 2022
// Last Edited (Initials, Date, Edits):

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
db.users = require("./user.model")(sequelize, Sequelize);
db.restaurants = require("./restaurant.model")(sequelize, Sequelize);
db.authentication = require("./authentication.model")(sequelize, Sequelize);
db.address = require("./address.model")(sequelize, Sequelize);
db.image = require("./image.model")(sequelize, Sequelize);
db.reviewImage = require("./reviewImage.model")(sequelize, Sequelize);
db.rating = require("./rating.model.js")(sequelize, Sequelize);
db.review = require("./review.model.js")(sequelize, Sequelize);
db.friend = require("./friend.model")(sequelize, Sequelize);
db.history = require("./history.model")(sequelize, Sequelize);
db.conversation = require("./conversation.model")(sequelize, Sequelize);
db.message = require("./message.model")(sequelize, Sequelize);
db.permission = require("./permission.model")(sequelize, Sequelize);

// User 1-1 Authentication Associations
db.users.hasOne(db.authentication, { foreignKey: 'userId' });
db.authentication.belongsTo(db.users, { foreignKey: 'userId' });

module.exports = db;
