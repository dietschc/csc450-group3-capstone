// Tyler Irvin
// CSC450 Capstone
// Restaurant Club - user.service.js
// February 18, 2022
// Last Edited (Initials, Date, Edits):

import http from "../http-common";

class ReviewDataService {

  // Gets all reviews
  getAll() {
    return http.get("/reviews");
  }

  // Gets a specific review
  get(id) {
    return http.get(`/review/${id}`);
  }

  // Creates a new review
  create(data) {
    return http.post("/review", data);
  }

  // Updates a specific review
  update(id, data) {
    return http.put(`/review/${id}`, data);
  }

  // Deletes a specific review
  delete(id) {
    return http.delete(`/review/${id}`);
  }

  deleteAll() {
    return http.delete(`/review`);
  }

  findByTitle(title){
    return http.get(`/tutorials?title=${title}`);
  }

}
export default new ReviewDataService();
