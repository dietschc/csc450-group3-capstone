// Devin Brueberg
// CSC450 Capstone
// Restaurant Club - reviewsRestaurants.js
// March 1, 2022
// Last Edited (Initials, Date, Edits):

// Using React library in order to build components 
// for the app and importing needed components
import C from '../constants';
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
export const findAllReviewsRestaurantsOrdered = (offset, limit) => async dispatch => {
    // Creating a Set to hold unique restaurant id's
    const restaurantIdSet = new Set();
    
    // Making a call to the database to request the 
    await ReviewDataService.findAllOffsetLimit(offset, limit)
    .then(async res => {
        
        if (res) {
            await res.data.map(review => {
                const reviewData = formatDBReviewFind(review);

                restaurantIdSet.add(reviewData.restaurantId);
               
                dispatch(addReview(reviewData));
                return review;
            })
        }
    })
    .catch(err => {
        console.log(err)
    })

    restaurantIdSet.size > 0 && await RestaurantDataService.findAllByArray(Array.from(restaurantIdSet))
    .then(async res => {
        if (res) {
            await res.data.map(restaurant => {
                const restaurantData = formatDBRestaurantFind(restaurant);

                dispatch(addRestaurant(restaurantData));
                return restaurant;
            })
        }
    })
    .catch(err => {
        console.log(err);
    })
}