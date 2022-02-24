// Devin Brueberg
// CSC450 Capstone
// Restaurant Club - restaurants.js
// February 15, 2022
// Last Edited (Initials, Date, Edits):
//  (DAB, 2/18/2022, Added in actions for restaurants)
//  (DAB, 2/19/2022, Added in comments, altered code for images update)

// Using React library in order to build components 
// for the app and importing needed components
import C from '../constants';
import { v4 } from 'uuid';

/**
 * React Redux reducer that will add a new restaurant to state.
 * 
 * @param {*} restaurantId 
 * @param {*} authorId 
 * @param {*} authorUserName 
 * @param {*} ownerId 
 * @param {*} restaurantName 
 * @param {*} digitalContact 
 * @param {*} website 
 * @param {*} phone 
 * @param {*} addressId 
 * @param {*} address 
 * @param {*} city 
 * @param {*} state 
 * @param {*} zip 
 * @param {*} ratingId 
 * @param {*} tasteRating 
 * @param {*} serviceRating 
 * @param {*} cleanlinessRating 
 * @param {*} overallRating 
 * @param {*} reviewCount 
 * @param {*} imageId 
 * @param {*} imageLocation 
 * @returns 
 */
export const addRestaurant = (restaurantId, authorId, authorUserName, ownerId, restaurantName, digitalContact, website, 
    phone, addressId, address, city, state, zip, ratingId, tasteRating, serviceRating, cleanlinessRating, overallRating, 
    reviewCount, imageId, imageLocation) => ({
        type: C.ADD_RESTAURANT,
        id: restaurantId,
        author: {
            id: authorId,
            userName: authorUserName
        }, 
        ownerId: ownerId,
        name: restaurantName,
        digitalContact: digitalContact,
        website: website,
        phone: phone,
        address: {
            id: addressId,
            address: address,
            city: city,
            state: state,
            zip: zip
        },
        rating: {
            id: ratingId,
            tasteRating: tasteRating,
            serviceRating: serviceRating,
            cleanlinessRating: cleanlinessRating,
            overallRating: overallRating
        },
        reviewCount: reviewCount,
        images: [
            {
                id: imageId,
                imageLocation: imageLocation
            }
        ]
    })

/**
 * React Redux reducer that will decrement the review count in state.
 * 
 * @param {*} restaurantId 
 * @returns 
 */
export const decrementRestaurantReviewCount = (restaurantId) => ({
    type: C.DECREMENT_RESTAURANT_REVIEW_COUNT,
    id: restaurantId
})

/**
 * React Redux reducer that will delete all restaurants from state.
 * 
 * @returns 
 */
export const deleteAllRestaurants = () => ({
    type: C.DELETE_ALL_RESTAURANTS
})

/**
 * React Redux reducer that will delete a restaurant from state.
 * @param {*} restaurantId 
 * @returns 
 */
export const deleteRestaurant = (restaurantId) => ({
    type: C.DELETE_RESTAURANT,
    id: restaurantId
})

/**
 * React Redux reducer that will increment the review count in state.
 * 
 * @param {*} restaurantId 
 * @returns 
 */
export const incrementRestaurantReviewCount = (restaurantId) => ({
    type: C.INCREMENT_RESTAURANT_REVIEW_COUNT,
    id: restaurantId
})

/**
 * React Redux reducer that will update a restaurant owner Id in state 
 * based off the param restaurant id.
 * 
 * @param {*} restaurantId 
 * @param {*} ownerId 
 * @returns 
 */
export const updateRestaurantOwner = (restaurantId, ownerId) => ({
    type: C.UPDATE_RESTAURANT_OWNER,
    id: restaurantId,
    ownerId: ownerId
})

/**
 * React Redux reducer that will update the restaurant in state.
 * @param {*} restaurantId 
 * @param {*} restaurantName 
 * @param {*} authorId 
 * @param {*} authorUserName 
 * @param {*} address 
 * @param {*} city 
 * @param {*} state 
 * @param {*} zip 
 * @param {*} phone 
 * @param {*} digitalContact 
 * @param {*} website 
 * @param {*} imageLocation 
 * @returns 
 */
export const updateRestaurant = (restaurantId, restaurantName, authorId, authorUserName, address, 
    city, state, zip, phone, digitalContact, website, imageArray) => ({
    type: C.UPDATE_RESTAURANT,
    id: restaurantId,
    author: {
        id: authorId,
        userName: authorUserName
    },
    name: restaurantName,
    digitalContact: digitalContact,
    website: website,
    phone: phone,
    address: {
        address: address,
        city: city,
        state: state,
        zip: zip
    },
    images: imageArray
        
    
})

/**
 * React Redux reducer that will update the restaurant rating in state for the 
 * param id restaurant.
 * 
 * @param {*} restaurantId 
 * @param {*} tasteRating 
 * @param {*} serviceRating 
 * @param {*} cleanlinessRating 
 * @param {*} overallRating 
 * @returns 
 */
export const updateRestaurantRating = (restaurantId, tasteRating, serviceRating, 
    cleanlinessRating, overallRating) => ({
    type: C.UPDATE_RESTAURANT_RATING,
    id: restaurantId,
    rating: {
        tasteRating: tasteRating,
        serviceRating: serviceRating,
        cleanlinessRating: cleanlinessRating,
        overallRating: overallRating
    }
})

/**
 * React Redux update the restaurant review count with a new number.
 * 
 * @param {*} restaurantId 
 * @param {*} reviewCount 
 * @returns 
 */
export const updateRestaurantReviewCount = (restaurantId, reviewCount) => ({
    type: C.UPDATE_RESTAURANT_REVIEW_COUNT,
    id: restaurantId,
    reviewCount: reviewCount
})