// Initially Created by: Devin Brueberg
// CSC450 Capstone
// Restaurant Club - friend.service.js
// March 3, 2022
// Last Edited (Initials, Date, Edits):

import http from "../http-common";

class FriendDataService {

    /**
     * Creates a new friend entry if one is not 
     * already in the database.
     * 
     * @param { friendOneId, friendTwoId } data 
     * @returns - friend if created
     */
    create(data) {
        return http.post("/friend/", data);
    }

    /**
     * Retrieves all friends.
     * 
     * @returns - an array of all friends found
     */
    getAll() {
        return http.get("/friend");
    }

    /**
     * Get the friend if it exists by providing a friend id.
     * 
     * @param { friendId } id 
     * @returns - friend data if found matching the friend id
     */
    get(id) {
        return http.get(`/friend/${id}`);
    }

    /**
     * NOT TO BE IMPLEMENTED UNTIL MILESTONE 4
     * 
     * @param {*} id 
     * @param {*} data 
     * @returns - 404
     */
    update(id, data) {
        return http.put(`/friend/${id}`, data);
    }

    /**
     * Deletes the friend with the specified friendId
     * 
     * @param { friendId } id 
     * @returns
     */
    delete(id) {
        return http.delete(`/friend/${id}`);
    }
}

// Exporting DataService
export default new FriendDataService();