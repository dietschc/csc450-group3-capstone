import Restaurant from "../models/restaurantModel.js";
 
export const getAllRestaurants = async (req, res) => {
    try {
        const restaurants = await Restaurant.findAll();
        res.json(restaurants);
    } catch (error) {
        res.json({ message: error.message });
    }  
}
 
export const getRestaurantById = async (req, res) => {
    try {
        const restaurant = await Restaurant.findAll({
            where: {
                id: req.params.id
            }
        });
        res.json(restaurant[0]);
    } catch (error) {
        res.json({ message: error.message });
    }  
}
 
export const createRestaurant = async (req, res) => {
    try {
        await Restaurant.create(req.body);
        res.json({
            "message": "Restaurant Created"
        });
    } catch (error) {
        res.json({ message: error.message });
    }  
}
 
export const updateRestaurant = async (req, res) => {
    try {
        await Restaurant.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        res.json({
            "message": "Restaurant Updated"
        });
    } catch (error) {
        res.json({ message: error.message });
    }  
}
 
export const deleteRestaurant = async (req, res) => {
    try {
        await Restaurant.destroy({
            where: {
                id: req.params.id
            }
        });
        res.json({
            "message": "Restaurant Deleted"
        });
    } catch (error) {
        res.json({ message: error.message });
    }  
}