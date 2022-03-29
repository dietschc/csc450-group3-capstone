// Coleman Dietsch
// CSC450 Capstone
// Restaurant Club - user.service.js
// February 14, 2022
// Last Edited (Initials, Date, Edits):
//  (DAB, 3/06/2022, Added in a findByUserNameOffsetLimit that is User specific 
//  and returns all the needed attributes to create additional users for Admin
//  operations)

import http from "../http-common";
import authHeader from './auth-header';

class UserDataService {

  // Gets all users
  getAll() {
    return http.get("/users", { headers: authHeader() });
  }

  // Gets a specific user
  get(id) {
    return http.get(`/users/${id}`);
  }

  // Creates a new user by calling the adduser method on the users controller
  create(data) {
    return http.post("/users/", data);
  }

  // Attempt to authenticate using the authentication.controller
  login(data) {
    return http.post("/authentication/login", data);
  }

  /**
   * Retrieve authentication searched by a userName string with offset and limit
   * 
   * @param {*} offset 
   * @param {*} limit 
   * @param {*} userName - string to query for user name
   * @returns - authentication data if found
   */
  findByNameOffsetLimit(offset, limit, userName) {
    return http.get(`/authentication/search/${offset}/${limit}/${userName}`, { headers: authHeader() });
  }

  /**
   * Retrieve user searched by a userName string with offset and limit
   * 
   * @param {*} offset 
   * @param {*} limit 
   * @param {*} userName - string to query for user name
   * @returns - user data if found
   */
   findByUserNameOffsetLimit(offset, limit, userName) {
    return http.get(`/users/search/${offset}/${limit}/${userName}`, { headers: authHeader() });
  }

  // Updates a specific user
  update(id, data) {
    return http.put(`/users/${id}`, data);
  }

  // Deletes a specific user
  delete(id) {
    return http.delete(`/users/${id}`);
  }

}

// Exporting the data service
export default new UserDataService();
