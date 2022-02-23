// Devin Brueberg
// CSC450 Capstone
// Restaurant Club - reviews.js
// February 15, 2022
// Last Edited (Initials, Date, Edits):
//  (DAB, 2/14/2022, Started writing redux actions for reviews/users)
//  (DAB, 2/15/2022, Finished basic redux actions for reviews)
//  (DAB, 2/15/2022, Moved reviews, users into their own files into their own files)

// Using React library in order to build components 
// for the app and importing needed components
import C from '../constants';
import { v4 } from 'uuid';
import ReviewDataService from "../services/review.service";
/**
 * React-Redux action to add a review to redux state.
 * 
 * @param {*} userId - User Id of the user who wrote this review.
 * @param {*} restaurantId - Restaurant Id of the restaurant being reviewed.
 * @param {*} tasteRating - Taste rating for the review.
 * @param {*} serviceRating - Service rating for the review.
 * @param {*} cleanlinessRating - Cleanliness rating for the review.
 * @param {*} overallRating - Overall rating for the review.
 * @param {*} revTitle - Title of the review.
 * @param {*} revText - Body review text.
 * @param {*} imageId - File location the image will be stored at.
 * @returns 
 */

export const addReview = (
    userId, restaurantId, revTitle, revText, imageId,
    tasteRating, serviceRating, cleanlinessRating, overallRating
    ) => async (dispatch) => {
    
    try {
        const res = await ReviewDataService.create({userId, restaurantId, revTitle,
        revText, imageId, tasteRating, serviceRating, cleanlinessRating, overallRating});

        dispatch({
            type: C.ADD_REVIEW,
            payload: res.data,
        });
    } catch (err) {
        return Promise.reject(err);
    }
}

    // React-Redux action to delete a review based off id from redux state
    export const deleteReview = (id) => ({
        type: C.DELETE_REVIEW,
        id: id
    })

    /**
     * React-Redux action to delete all reviews from redux state.
     * 
     * @returns 
     */
    export const deleteAllReviews = () => ({
        type: C.DELETE_ALL_REVIEWS
    })

    /**
     * React-Redux action to update redux state.
     * 
     * @param {*} reviewId 
     * @param {*} tasteRating - Taste rating for the review.
     * @param {*} serviceRating - Service rating for the review.
     * @param {*} cleanlinessRating - Cleanliness rating for the review.
     * @param {*} overallRating - Overall rating for the review.
     * @param {*} reviewTitle - Title of the review.
     * @param {*} reviewText - Body review text.
     * @param {*} imageLocation - File location the image will be stored at. 
     * @returns 
     */
    export const updateReview = (reviewId, tasteRating, 
        serviceRating, cleanlinessRating, overallRating, reviewTitle, 
        reviewText, imageLocation) => ({
            type: C.UPDATE_REVIEW,
            id: reviewId,
            rating: {
                tasteRating: tasteRating,
                serviceRating: serviceRating,
                cleanlinessRating: cleanlinessRating,
                overallRating: overallRating
            },
            reviewTitle: reviewTitle,
            reviewText: reviewText,
            images: {
                imageLocation: imageLocation
            },
            history: {
                modified: new Date()
            }
        })