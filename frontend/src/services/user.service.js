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

  // Updates a specific user
  update(id, data) {
    return http.put(`/users/${id}`, data);
  }

  // Deletes a specific user
  delete(id) {
    return http.delete(`/users/${id}`);
  }

}

// Exporting DataService
export default new UserDataService();