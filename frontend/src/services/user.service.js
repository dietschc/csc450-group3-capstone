// Coleman Dietsch
// CSC450 Capstone
// Restaurant Club - user.service.js
// February 14, 2022
// Last Edited (Initials, Date, Edits):

import http from "../http-common";

class UserDataService {

  // Gets all users
  getAll() {
    return http.get("/users");
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
    return http.get(`/authentication/search/${offset}/${limit}/${userName}`);
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
export default new UserDataService();
