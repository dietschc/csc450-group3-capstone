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

// Authentication to Permission Association
db.authentication.belongsTo(db.permission, { foreignKey: 'permissionId' });
db.permission.hasMany(db.authentication, { foreignKey: 'permissionId' });

// Conversation to Message Association
db.conversation.hasMany(db.message, { foreignKey: 'conversationId' });
db.message.belongsTo(db.conversation, { foreignKey: 'conversationId' });

// History to Authentication Association
db.history.hasOne(db.authentication, { foreignKey: 'historyId' })
db.authentication.belongsTo(db.history, { foreignKey: 'historyId' })

// History to Review Association
db.history.hasOne(db.review, { foreignKey: 'historyId' })
db.review.belongsTo(db.history, { foreignKey: 'historyId' })

// Image to ReviewImage Association
db.image.hasOne(db.reviewImage, { foreignKey: 'imageId' });
db.reviewImage.belongsTo(db.image, { foreignKey: 'imageId' })

// Restaurant to Address Association
db.address.hasOne(db.restaurants, { foreignKey: 'addressId' });
db.restaurants.belongsTo(db.address, { foreignKey: 'addressId' });

// Restaurant to Image Association
db.image.hasOne(db.restaurants, { foreignKey: 'imageId' });
db.restaurants.belongsTo(db.image, { foreignKey: 'imageId' });

// Restaurant to Rating Association
db.rating.hasOne(db.restaurants, { foreignKey: 'ratingId' });
db.restaurants.belongsTo(db.rating, { foreignKey: 'ratingId' });

// Restaurant to Review Association
db.review.belongsTo(db.restaurants, { foreignKey: 'restaurantId' });
db.restaurants.hasMany(db.review, { foreignKey: 'restaurantId' });

// Restaurant to User Association
db.restaurants.belongsTo(db.users, { foreignKey: { name: 'userCreatorId' } });
db.restaurants.belongsTo(db.users, { foreignKey: { name: 'userOwnerId' } });
db.users.hasOne(db.restaurants, { foreignKey: { name: 'userCreatorId' } });
db.users.hasOne(db.restaurants, { foreignKey: { name: 'userOwnerId' } });

// Review to Rating Association
db.rating.hasOne(db.review, { foreignKey: 'ratingId' });
db.review.belongsTo(db.rating, { foreignKey: 'ratingId' });

// Review to ReviewImage Association
db.review.hasMany(db.reviewImage, { foreignKey: 'reviewId' });
db.reviewImage.belongsTo(db.review, { foreignKey: 'reviewId' });

// User to Authentication Association
db.users.hasOne(db.authentication, { foreignKey: 'userId' });
db.authentication.belongsTo(db.users, { foreignKey: 'userId' });

// User to Address Association
db.address.hasOne(db.users, { foreignKey: 'addressId' });
db.users.belongsTo(db.address, { foreignKey: 'addressId' });

// User to Conversation Association
db.users.hasMany(db.conversation, { foreignKey: 'userToId' });
db.users.hasMany(db.conversation, { foreignKey: 'userFromId' });
db.conversation.belongsTo(db.users, { foreignKey: 'userToId' });
db.conversation.belongsTo(db.users, { foreignKey: 'userFromId' });

// User to Friend Association
db.users.hasMany(db.friend, { foreignKey: 'friendOneId' });
db.users.hasMany(db.friend, { foreignKey: 'friendTwoId' });
db.friend.belongsTo(db.users, { foreignKey: 'friendOneId' });
db.friend.belongsTo(db.users, { foreignKey: 'friendTwoId' });

// User to Review Association
db.review.belongsTo(db.users, { foreignKey: 'userId' });
db.users.hasMany(db.review, { foreignKey: 'userId' });

// Exporting the database
module.exports = db;