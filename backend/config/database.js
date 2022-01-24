import { Sequelize } from "sequelize";
 
const db = new Sequelize('restaurantDB', 'restaurant', 'S566kcKyQeykBpsY', {
    host: "localhost",
    dialect: "mysql"
});
 
export default db;