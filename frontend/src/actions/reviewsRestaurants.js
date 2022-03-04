// Devin Brueberg
// CSC450 Capstone
// Restaurant Club - reviewsRestaurants.js
// March 1, 2022
// Last Edited (Initials, Date, Edits):
//  (DAB, 3/02/2022, "Added in some additional comments, cleaned up code")
//  (CPD, 3/03/2022, "Added in findByAuthorIdThunk")

// Using React library in order to build components 
// for the app and importing needed components
import ReviewDataService from "../services/review.service";
import RestaurantDataService from "../services/restaurant.service";
import { addRestaurant } from './restaurants';
import { addReview } from './reviews';
import { formatDBRestaurantFind, formatDBReviewFind } from '../helperFunction/actionHelpers';

/**
 * Adds the specified offset and limit of reviews with their id referenced restaurants to 
 * their respective Redux states. 
 * 
 * @param {*} offset 
 * @param {*} limit 
 * @returns 
 */
export const findAllReviewsRestaurantsOrderedThunk = (offset, limit) => async dispatch => {
    // Creating a Set to hold unique restaurant id's
    const restaurantIdSet = new Set();
    
    // Making a call to the database to request the reviews
    await ReviewDataService.findAllOffsetLimit(offset, limit)
    .then(async res => {
        // If data was found in the database query it is formatted 
        // for redux and added to state
        if (res) {
            // Iterating through the review data
            await res.data.map(review => {
                // Formatting the database data so it matches redux
                const reviewData = formatDBReviewFind(review);

                // Adding the restaurant Id for the current review
                restaurantIdSet.add(reviewData.restaurantId);
               
                // Adding the current review to state
                dispatch(addReview(reviewData));

                // Returning the current review
                return review;
            })
        }
    })
    .catch(err => {
        // If there was an error it is logged in the console
        console.log(err)
    })

    // If there are restaurant id's in the set the database is queried to return all matching
    // restaurant data
    restaurantIdSet.size > 0 && await RestaurantDataService.findAllByArray(Array.from(restaurantIdSet))
    .then(async res => {
        // If there is data in the query it is added to redux state
        if (res) {
            // Iterating through the restaurant data
            await res.data.map(restaurant => {
                // The restaurant data is formatted to be added to redux state
                const restaurantData = formatDBRestaurantFind(restaurant);

                // Adding the restaurant to redux state
                dispatch(addRestaurant(restaurantData));

                // Returning the restaurant data
                return restaurant;
            })
        }
    })
    .catch(err => {
        // If there was an error it is logged in the console
        console.log(err);
    })
}

/**
 * Finds all reviews from specific userId and returns them
 * 
 * @param {*} userId 
 * @returns 
 */
 export const findByAuthorIdThunk = (userId) => async dispatch => {
    // Creating a Set to hold unique restaurant id's
    const restaurantIdSet = new Set();
    
    // Making a call to the database to request the reviews
    await ReviewDataService.findByAuthorId(userId)
    .then(async res => {
        // console.log("returned values: ", res);

        // If data was found in the database query it is formatted 
        // for redux and added to state
        if (res) {
            // Iterating through the review data
            await res.data.map(review => {
                // Formatting the database data so it matches redux
                const reviewData = formatDBReviewFind(review);

                // Adding the restaurant Id for the current review
                restaurantIdSet.add(reviewData.restaurantId);
               
                // Adding the current review to state
                dispatch(addReview(reviewData));

                // Returning the current review
                return review;
            })
        }
    })
    .catch(err => {
        // If there was an error it is logged in the console
        console.log(err)
    })

    // If there are restaurant id's in the set the database is queried to return all matching
    // restaurant data
    restaurantIdSet.size > 0 && await RestaurantDataService.findAllByArray(Array.from(restaurantIdSet))
    .then(async res => {
        // If there is data in the query it is added to redux state
        if (res) {
            // Iterating through the restaurant data
            await res.data.map(restaurant => {
                // The restaurant data is formatted to be added to redux state
                const restaurantData = formatDBRestaurantFind(restaurant);

                // Adding the restaurant to redux state
                dispatch(addRestaurant(restaurantData));

                // Returning the restaurant data
                return restaurant;
            })
        }
    })
    .catch(err => {
        // If there was an error it is logged in the console
        console.log(err);
    })
}