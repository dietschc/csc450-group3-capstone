// Initially Created by: Devin Brueberg
// CSC450 Capstone
// Restaurant Club - review.service.js
// February 28, 2022
// Last Edited (Initials, Date, Edits):

import http from "../http-common";

class ReviewDataService {

    /**
     * Create a new review
     * 
     * @param { 
     * userId, restaurantId, 
     * reviewTitle, reviewText, 
     * tasteRating, serviceRating, 
     * cleanlinessRating, overallRating, 
     * imageLocation 
     * } data 
     * @returns - Review data if created
     */
    create(data) {
        return http.post("/review/", data);
    }

    /**
     * Get all reviews from the database
     * 
     * @returns 
     */
    getAll() {
        return http.get("/review");
    }

    /**
     * Get the review with the specific review Id
     * @param { reviewId } id 
     * @returns - Review data if found
     */
    get(id) {
        return http.get(`/review/${id}`);
    }

    /**
     * Updates an existing review if there is one
     * 
     * @param { reviewId } id 
     * @param { 
     * userId, reviewTitle, 
     * reviewText, tasteRating, serviceRating, 
     * cleanlinessRating, overallRating, imageLocation 
     * } data 
     * @returns - Success/error message
     */
    update(id, data) {
        return http.put(`/review/${id}`, data);
    }

    /**
     * Deletes a review and all associated tables
     * 
     * @param { reviewId } id 
     * @returns - Success/error message
     */
    delete(id) {
        return http.delete(`/review/${id}`);
    }

    /**
     * Retrieve review matching the author id ordered asc by review name
     * 
     * @param { authorId } id 
     * @returns  - Review data for that author
     */
    findByAuthorId(id) {
        return http.get(`/author/${id}`);
    }
    
    /**
     * Retrieve review  matching the author id ordered asc by review name and result limit
     * 
     * @param {*} offset 
     * @param {*} limit 
     * @param { authorId } id 
     * @returns - Review data if found
     */
    findByAuthorIdOffsetLimit(offset, limit, id) {
        return http.get(`/author/${offset}/${limit}/${id}`);
    }
    
    /**
     * Retrieve review ordered asc by review name and result limit
     * 
     * @param {*} limit 
     * @returns - Review data if found
     */
    findAllLimit(limit) {
        return http.get(`/limit/${limit}`);
    }
    
    /**
     * Retrieve review ordered asc by review name with result limit and offset
     * 
     * @param {*} offset 
     * @param {*} limit 
     * @returns - Review data if found
     */
    findAllOffsetLimit(offset, limit) {
        return http.get(`/limit/${offset}/${limit}`);
    }
    
    /**
     * Retrieve review searched by a string review author user name with offset and limit
     * 
     * @param {*} offset 
     * @param {*} limit 
     * @param {*} name - string to query for user name
     * @returns - Review data if found
     */
    findByNameOffsetLimit(offset, limit, name) {
        return http.get(`/search/${offset}/${limit}/${name}`);
    }
    
    /**
     * Retrieve all Reviews sorted newest to oldest
     * 
     * @returns - Review data if found
     */
    findAllSortedByDate() {
        return http.get(`/sorted/date`);
    }
    
    /**
     * Retrieve all Reviews sorted newest to oldest with offset and limit
     * 
     * @param {*} offset 
     * @param {*} limit 
     * @returns - Review data if found
     */
    findAllSortedByDateOffsetLimit(offset, limit) {
        return http.get(`/sorted/date/${offset}/${limit}`);
    }
}

// Exporting ReviewDataService
export default new ReviewDataService();