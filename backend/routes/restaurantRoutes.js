import express from "express";
 
import { 
    getAllRestaurants,
    createRestaurant,
    getRestaurantById,
    updateRestaurant,
    deleteRestaurant
} from "../controllers/Restaurants.js";
 
const restaurantRoutes = express.Router();
 
restaurantRoutes.get('/', getAllRestaurants);
restaurantRoutes.get('/:id', getRestaurantById);
restaurantRoutes.post('/', createRestaurant);
restaurantRoutes.patch('/:id', updateRestaurant);
restaurantRoutes.delete('/:id', deleteRestaurant);
 
export default restaurantRoutes;