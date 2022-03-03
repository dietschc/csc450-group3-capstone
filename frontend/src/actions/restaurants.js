// Devin Brueberg
// CSC450 Capstone
// Restaurant Club - restaurants.js
// February 15, 2022
// Last Edited (Initials, Date, Edits):
//  (DAB, 2/18/2022, Added in actions for restaurants)
//  (DAB, 2/19/2022, Added in comments, altered code for images update)
//  (DAB, 3/01/2022, Added in thunk methods )
//  (DAB, 3/02/20222, Added in comments)

// Using React library in order to build components 
// for the app and importing needed components
import C from '../constants';
import RestaurantDataService from "../services/restaurant.service";
import { formatDBRestaurantFind } from '../helperFunction/actionHelpers';

/**
 * Searches the database for all restaurants with up to the offset/limit. It will then 
 * add the results to state.
 * 
 * @param {*} offset 
 * @param {*} limit 
 * @returns 
 */
export const findAllRestaurantsOrderedThunk = (offset, limit) => async dispatch => {
    // The restaurant database will be queried for all restaurants within the 
    // parameter offset/limit
    await RestaurantDataService.findAllOffsetLimit(offset, limit)
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
            // If there is an error it will be logged
            console.log(err)
        })
}

/**
 * UNDER CONSTRUCTION
 * Adds the restaurant to the database and updates state.
 * @returns 
 */
export const addRestaurantThunk= () => async dispatch => {}

/**
 * React Redux reducer that will add a new restaurant to state.
 * 
 * @param {
 * @param {*} restaurantId - Id of the restaurant.
 * @param {*} userCreatorId - Id of the user who created/updated the restaurant.
 * @param {*} userName - User name of the user who created/updated the restaurant.
 * @param {*} userOwnerId - Id of the user who owns the restaurant.
 * @param {*} restaurantName - Name of the restaurant.
 * @param {*} restaurantDigiContact - Digital contact link of the restaurant, typically 
 * a URL to the contact page of their website.
 * @param {*} restaurantWebsite - Main website URL of the restaurant.
 * @param {*} restaurantPhone - Restaurant phone number.
 * @param {*} addressId - Database address Id of the restaurant.
 * @param {*} address - Physical address of the restaurant.
 * @param {*} city - City of the restaurant.
 * @param {*} state - State of the restaurant.
 * @param {*} zip - Zip of the restaurant.
 * @param {*} ratingId - Database ratingId.
 * @param {*} tasteRating - int taste rating.
 * @param {*} serviceRating - int service rating.
 * @param {*} cleanlinessRating - int cleanliness rating.
 * @param {*} overallRating - int overall rating.
 * @param {*} reviewCount - int total number of reviews for this restaurant.
 * @param {*} imageId - Database image id.
 * @param {*} imageLocation - File location of the image.
 * } param0 
 * @returns 
 */
export const addRestaurant = ({restaurantId, userCreatorId, 
    userName, userOwnerId, restaurantName, 
    restaurantDigiContact, restaurantWebsite, 
    restaurantPhone, addressId, address, 
    city, state, zip, ratingId, tasteRating, 
    serviceRating, cleanlinessRating, overallRating, 
    reviewCount, imageId, imageLocation}) => ({
        type: C.ADD_RESTAURANT,
        id: restaurantId,
        author: {
            id: userCreatorId,
            userName: userName
        }, 
        ownerId: userOwnerId,
        name: restaurantName,
        digitalContact: restaurantDigiContact,
        website: restaurantWebsite,
        phone: restaurantPhone,
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