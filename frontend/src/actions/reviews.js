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


export const findAllReviewsOrdered = (offset, limit) => async dispatch => {
    /**
     * Call and await the user data service create method, passing the parameters and storing the 
     * results in a constant.
     */
    await ReviewDataService.findAllOffsetLimit(offset, limit)
        .then(async res => {
            console.log("data: ", res.data);

            if (res) {
                
                await res.data.map(review => {
                    console.log("Mapped data: ", review);
                    const reviewData = { ...review.user, ...review.rating, 
                        ...review.restaurant, ...review.history, ...review.images[0], 
                        ...review.user, ...review, ...review.user.authentication }
                    console.log(reviewData)
                    dispatch(addReview(reviewData));
                
                })
            }
            // This combines the 3 JSON objects into a single object
            // const result = { ...res.data.newUser, ...res.data.newAddress, ...res.data.newAuth }
            // dispatch(addReview(result))
        })
        .catch(err => {
            console.log(err)
        })
}

export const addReviewThunk = (
    userId, restaurantId, reviewTitle, reviewText, tasteRating, serviceRating, 
    cleanlinessRating, overallRating, imageLocation ) => async dispatch => {
    /**
     * Call and await the user data service create method, passing the parameters and storing the 
     * results in a constant.
     */
    await ReviewDataService.create({
        userId, restaurantId, reviewTitle, reviewText, tasteRating, serviceRating, 
        cleanlinessRating, overallRating, imageLocation
    })
        .then(res => {
            console.log("data: ", res.data);

            // This combines the 3 JSON objects into a single object
            // const result = { ...res.data.newUser, ...res.data.newAddress, ...res.data.newAuth }
            // dispatch(addReview(result))
        })
        .catch(err => {
            console.log(err)
        })
}

/**
 * React-Redux action to add a review to redux state.
 * 
 * @param {*} userName - User name of the user who wrote this review.
 * @param {*} userId - User Id of the user who wrote this review.
 * @param {*} restaurantId - Restaurant Id of the restaurant being reviewed.
 * @param {*} restaurantName - Name of the restaurant being reviewed.
 * @param {*} tasteRating - Taste rating for the review.
 * @param {*} serviceRating - Service rating for the review.
 * @param {*} cleanlinessRating - Cleanliness rating for the review.
 * @param {*} overallRating - Overall rating for the review.
 * @param {*} reviewTitle - Title of the review.
 * @param {*} reviewText - Body review text.
 * @param {*} imageLocation - File location the image will be stored at.
 * @returns 
 */
 export const addReview = ({userName, reviewId, userId, imageId, historyId, restaurantId, ratingId, restaurantName, tasteRating, 
    serviceRating, cleanlinessRating, overallRating, reviewTitle, 
    reviewText, created, modified, imageLocation}) => ({
        type: C.ADD_REVIEW,
        id: reviewId,
        author: {
            id: userId,
            userName: userName
        },
        restaurant: {
            id: restaurantId,
            name: restaurantName
        },
        rating: {
            id: ratingId,
            tasteRating: tasteRating,
            serviceRating: serviceRating,
            cleanlinessRating: cleanlinessRating,
            overallRating: overallRating
        },
        reviewTitle: reviewTitle,
        reviewText: reviewText,
        images: {
            id: imageId,
            imageLocation: imageLocation
        },
        history: {
            id: historyId,
            created: created,
            modified: modified
        }
    })

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