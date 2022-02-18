// Devin Brueberg
// CSC450 Capstone
// Restaurant Club - restaurants.js
// February 15, 2022
// Last Edited (Initials, Date, Edits):
//  (DAB, 2/18/2022, Added in actions for restaurants)

// Using React library in order to build components 
// for the app and importing needed components
import C from '../constants';
import { v4 } from 'uuid';

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

export const decrementRestaurantReviewCount = (restaurantId) => ({
    type: C.DECREMENT_RESTAURANT_REVIEW_COUNT,
    id: restaurantId
})

export const deleteAllRestaurants = () => ({
    type: C.DELETE_ALL_RESTAURANTS
})

export const deleteRestaurant = (restaurantId) => ({
    type: C.DELETE_RESTAURANT,
    id: restaurantId
})

export const incrementRestaurantReviewCount = (restaurantId) => ({
    type: C.INCREMENT_RESTAURANT_REVIEW_COUNT,
    id: restaurantId
})

export const updateRestaurantOwner = (restaurantId, ownerId) => ({
    type: C.UPDATE_RESTAURANT_OWNER,
    id: restaurantId,
    ownerId: ownerId
})

export const updateRestaurant = (restaurantId, restaurantName, authorId, authorUserName, address, 
    city, state, zip, phone, digitalContact, website, imageLocation) => ({
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
    images: {
        imageLocation: imageLocation
    }
        
    
})

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

export const updateRestaurantReviewCount = (restaurantId, reviewCount) => ({
    type: C.UPDATE_RESTAURANT_REVIEW_COUNT,
    id: restaurantId,
    reviewCount: reviewCount
})