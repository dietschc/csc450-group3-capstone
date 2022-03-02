// Initially Created by: Devin Brueberg
// CSC450 Capstone
// Restaurant Club - restaurant.service.js
// February 28, 2022
// Last Edited (Initials, Date, Edits):

import http from "../http-common";

class RestaurantDataService {

    /**
     * Create a new restaurant
     * 
     * @param { 
     * userCreatorId, address, city, state, 
     * zip, imageLocation, restaurantName, 
     * restaurantDigiContact, restaurantPhone, 
     * restaurantWebsite
     * } data 
     * @returns - restaurant data if created
     */
    create(data) {
        return http.post("/restaurants/", data);
    }

    /**
     * Get all restaurants from the database
     * 
     * @returns - an array of all restaurants found
     */
    getAll() {
        return http.get("/restaurants");
    }

    /**
     * Get the restaurant with the specific restaurant Id
     * 
     * @param { restaurantId } id 
     * @returns - restaurant data if found
     */
    get(id) {
        return http.get(`/restaurants/${id}`);
    }

    /**
     * Updates an existing restaurant if there is one
     * 
     * @param { restaurantId } id 
     * @param { 
     * restaurantName, restaurantDigiContact, restaurantWebsite, 
     * restaurantPhone, imageLocation, 
     * address, city, state, zip 
     * } data 
     * @returns - Success/error message
     */
    update(id, data) {
        return http.put(`/restaurants/${id}`, data);
    }

    /**
     * Deletes a restaurant and all associated tables
     * 
     * @param { restaurantId } id 
     * @returns - Success/error message
     */
    delete(id) {
        return http.delete(`/restaurants/${id}`);
    }

    /**
     * Get all restaurants from the database by an array of restaurant id's
     * 
     * @returns - an array of all restaurants found
     */
     findAllByArray(data) {
        return http.post("/restaurants/array/", data);
    }

    /**
     * Retrieve restaurant matching the author id ordered asc by restaurant name
     * 
     * @param { userCreatorId } id 
     * @returns  - restaurant data for that author
     */
    findByAuthorId(id) {
        return http.get(`/restaurants/author/${id}`);
    }

    /**
     * Retrieve restaurant  matching the author id ordered asc by restaurant name and result limit
     * 
     * @param {*} offset 
     * @param {*} limit 
     * @param { userCreatorId } id 
     * @returns - restaurant data if found
     */
    findByAuthorIdOffsetLimit(offset, limit, id) {
        return http.get(`/restaurants/author/${offset}/${limit}/${id}`);
    }

    /**
     * Retrieve restaurant ordered asc by restaurant name and result limit
     * 
     * @param {*} limit 
     * @returns - restaurant data if found
     */
    findAllLimit(limit) {
        return http.get(`/restaurants/limit/${limit}`);
    }

    /**
     * Retrieve restaurant ordered asc by restaurant name with result limit and offset
     * 
     * @param {*} offset 
     * @param {*} limit 
     * @returns - restaurant data if found
     */
    findAllOffsetLimit(offset, limit) {
        return http.get(`/restaurants/limit/${offset}/${limit}`);
    }

    /**
     * Retrieve restaurant searched by a string restaurant author user name with offset and limit
     * 
     * @param {*} offset 
     * @param {*} limit 
     * @param {*} name - string to query for user name
     * @returns - restaurant data if found
     */
    findByNameOffsetLimit(offset, limit, name) {
        return http.get(`/restaurants/search/${offset}/${limit}/${name}`);
    }
}

// Exporting DataService
export default new RestaurantDataService();