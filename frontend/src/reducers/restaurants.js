// Devin Brueberg
// CSC450 Capstone
// Restaurant Club - restaurants.js
// February 13, 2022
// Last Edited (Initials, Date, Edits):
//  (DAB, 2/19/2022, Added in comments, altered code for images update)
//  (DAB, 3/07/2022, Altered the update images code. There will need to be 
//  an action.imageId in order to update the update properly)


// Using React library in order to build components 
// for the app and importing needed components
import C from '../constants';

// The restaurants reducer will allow the restaurants [] state to be 
// altered
export const restaurants = (state = [], action) => {
    switch (action.type) {
        case C.ADD_RESTAURANT:
            return [
                ...state,
                restaurant({}, action)
            ]
        case C.DELETE_ALL_RESTAURANTS:
            return []
        case C.DELETE_RESTAURANT:
            return state.filter((restaurant) => restaurant.id !== action.id)
        case C.INCREMENT_RESTAURANT_REVIEW_COUNT:
            return state.map((currentRestaurant) => {
                if (currentRestaurant.id === action.id) {
                    return restaurant(currentRestaurant, action)
                }
                else {
                    return currentRestaurant
                }
            })
        case C.DECREMENT_RESTAURANT_REVIEW_COUNT:
            return state.map((currentRestaurant) => {
                if (currentRestaurant.id === action.id) {
                    return restaurant(currentRestaurant, action)
                }
                else {
                    return currentRestaurant
                }
            })
        case C.UPDATE_RESTAURANT_REVIEW_COUNT:
            return state.map((currentRestaurant) => {
                if (currentRestaurant.id === action.id) {
                    return restaurant(currentRestaurant, action)
                }
                else {
                    return currentRestaurant
                }
            })
        case C.UPDATE_RESTAURANT:
            return state.map((currentRestaurant) => {
                if (currentRestaurant.id === action.id) {
                    return restaurant(currentRestaurant, action)
                }
                else {
                    return currentRestaurant
                }
            })
        case C.UPDATE_RESTAURANT_RATING:
            return state.map((currentRestaurant) => {
                if (currentRestaurant.id === action.id) {
                    return restaurant(currentRestaurant, action)
                }
                else {
                    return currentRestaurant
                }
            })
        case C.UPDATE_RESTAURANT_OWNER:
            return state.map((currentRestaurant) => {
                if (currentRestaurant.id === action.id) {
                    return restaurant(currentRestaurant, action)
                }
                else {
                    return currentRestaurant
                }
            })
        default:
            return state;
    }
}

// The restaurant reducer will allow the restaurant {} state to be 
// altered
export const restaurant = (state = {}, action) => {
    switch (action.type) {
        case C.ADD_RESTAURANT:
            return {
                id: action.id,
                author: author({}, action),
                ownerId: action.ownerId,
                name: action.name,
                digitalContact: action.digitalContact,
                website: action.website,
                phone: action.phone,
                address: restaurantAddress({}, action),
                rating: rating({}, action),
                reviewCount: action.reviewCount,
                images: images([], action)
            }
        case C.INCREMENT_RESTAURANT_REVIEW_COUNT:
            return {
                ...state,
                reviewCount: ++state.reviewCount
            }
        case C.DECREMENT_RESTAURANT_REVIEW_COUNT:
            return {
                ...state,
                reviewCount: --state.reviewCount
            }
        case C.UPDATE_RESTAURANT:
            return {
                ...state,
                author: author(state.author, action),
                name: action.name,
                digitalContact: action.digitalContact,
                website: action.website,
                phone: action.phone,
                address: restaurantAddress(state.address, action),
                images: images(state.images, action)
            }
        case C.UPDATE_RESTAURANT_RATING: {
            return {
                ...state,
                rating: rating(state.rating, action)
            }
        }
        case C.UPDATE_RESTAURANT_REVIEW_COUNT:
            return {
                ...state,
                reviewCount: action.reviewCount
            }
        case C.UPDATE_RESTAURANT_OWNER:
            return {
                ...state,
                ownerId: action.ownerId
            }
        default:
            return state;
    }
}

// The author reducer will allow the author {} state to be 
// altered
export const author = (state = {}, action) => {
    switch (action.type) {
        case C.ADD_RESTAURANT:
            return {
                id: action.author.id,
                userName: action.author.userName
            }
        case C.UPDATE_RESTAURANT:
            return {
                id: action.author.id,
                userName: action.author.userName
            }
        default:
            return state;
    }
}

// The restaurants reducer will allow the restaurants [] state to be 
// altered
export const restaurantAddress = (state = [], action) => {
    switch (action.type) {
        case C.ADD_RESTAURANT:
            return {
                id: action.address.id,
                address: action.address.address,
                city: action.address.city,
                state: action.address.state,
                zip: action.address.zip
            }
        case C.UPDATE_RESTAURANT:
            return {
                ...state,
                address: action.address.address,
                city: action.address.city,
                state: action.address.state,
                zip: action.address.zip
            }
        default:
            return state;
    }
}

// The rating reducer will allow the rating {} state to be 
// altered
export const rating = (state = {}, action) => {
    switch (action.type) {
        case C.ADD_RESTAURANT:
            return {
                id: action.rating.id,
                tasteRating: action.rating.tasteRating,
                serviceRating: action.rating.serviceRating,
                cleanlinessRating: action.rating.cleanlinessRating,
                overallRating: action.rating.overallRating
            }
        case C.UPDATE_RESTAURANT_RATING: {
            return {
                ...state,
                tasteRating: action.rating.tasteRating,
                serviceRating: action.rating.serviceRating,
                cleanlinessRating: action.rating.cleanlinessRating,
                overallRating: action.rating.overallRating
            }
        }
        default:
            return state;
    }
}

// The images reducer will allow the images [] state to be 
// altered
export const images = (state = [], action) => {
    switch (action.type) {
        case C.ADD_RESTAURANT:
            return action.images.map((currentImage) => image(currentImage, action))
        case C.UPDATE_RESTAURANT:
            // ID's are not updated in the update, they do not need to be. They will be updated 
            // where they are needed during browsing. If id's are desired there will have 
            // to be another database call that returns all the updated ID's. 
            // Just add the ID returned to the actions and they will render
            return action.images.map((actionImage) => image(actionImage, action))
        default:
            return state;
    }
}

// The image reducer will allow the image {} state to be 
// altered
export const image = (state = {}, action) => {
    switch (action.type) {
        case C.ADD_RESTAURANT:
            return {
                id: state.id,
                imageLocation: state.imageLocation
            }
        case C.UPDATE_RESTAURANT:
            // ID's are not updated in the update, they do not need to be. They will be updated 
            // where they are needed during browsing. If id's are desired there will have 
            // to be another database call that returns all the updated ID's
            // Just add the ID returned to the actions and they will render
            return {
                id: state.imageId,
                imageLocation: state.imageLocation
            }
        default:
            return state;
    }
}