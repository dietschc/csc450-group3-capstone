// Initially Created by: Devin Brueberg
// CSC450 Capstone
// Restaurant Club - authentication.service.js
// March 6, 2022
// Last Edited (Initials, Date, Edits):
//  (DAB, Added services for updatePassword and updatePasswordSecure)
//  (DAB, Ordered routes alphabetically)

import http from "../http-common";

class AuthenticationDataService {
    /**
     * Creates a new authentication entry if one is not 
     * already in the database.
     * 
     * @param {*} data 
     * @returns - authentication if created
     */
    create(data) {
        return http.post("/authentication/", data);
    }

    /**
     * Deletes the authentication with the specified friendId
     * 
     * @param { friendId } id 
     * @returns
     */
    delete(id) {
        return http.delete(`/authentication/${id}`);
    }

    /**
     * Get the authentication if it exists by providing a authentication id.
     * 
     * @param { friendId } id 
     * @returns - authentication data if found matching the authentication id
     */
    get(id) {
        return http.get(`/authentication/${id}`);
    }

    /**
     * Retrieves all authentications.
     * 
     * @returns - an array of all authentications found
     */
    getAll() {
        return http.get("/authentication");
    }

    /**
     * NOT TO BE IMPLEMENTED UNTIL MILESTONE 4
     * 
     * @param {*} id 
     * @param {*} data 
     * @returns - 404
     */
    update(id, data) {
        return http.put(`/authentication/${id}`, data);
    }

    /**
     * Updates a users permission via userId.
     * 
     * @param {*} userId 
     * @param {*} data 
     * @returns 
     */
    updateByUserId(userId, data) {
        return http.put(`/authentication/userId/${userId}`, data);
    }

    /**
     * Updates the user password of the param userId
     * 
     * @param {*} userId 
     * @param {
     * newPassword: the desired new user password
     * } data 
     * @returns - 404
     */
    updatePassword(userId, data) {
        return http.put(`/authentication/password/${userId}`, data);
    }

    /**
     * Updates the user password of the param userId. It will 
     * only update the password if the userPassword matches the 
     * user password in the database.
     * 
     * @param {*} userId 
     * @param { 
     * userPassword: current users password,
     * newPassword: the desired new user password
     * } data 
     * @returns - 404
     */
    updatePasswordSecure(userId, data) {
        return http.put(`/authentication/passwordSecure/${userId}`, data);
    }
}

// Exporting DataService
export default new AuthenticationDataService();