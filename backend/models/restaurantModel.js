import { Sequelize } from "sequelize";
import db from "../config/database.js";
 
const { DataTypes } = Sequelize;
 
const Restaurant = db.define('restaurant',{
    name:{
        type: DataTypes.STRING
    },
    address:{
        type: DataTypes.STRING
    }
},{
    freezeTableName: true
});
 
export default Restaurant;