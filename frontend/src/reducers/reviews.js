// Devin Brueberg
// CSC450 Capstone
// Restaurant Club - reviews.js
// February 13, 2022
// Last Edited (Initials, Date, Edits):
//  (DAB, 2/14/2022, Started writing basic redux reducers)
//  (DAB, 2/15/2022, Finished writing basic redux reducers)

// Using React library in order to build components 
// for the app and importing needed components
import C from '../constants';

// The reviews reducer will allow the reviews [] state to be 
// altered
export const reviews = (state = [], action) => {
    switch (action.type) {
        case C.ADD_REVIEW:
            return [
                ...state,
                review({}, action)
            ]
        case C.DELETE_ALL_REVIEWS:
            return []
        case C.DELETE_REVIEW:
            return state.filter((review) => review.id !== action.id)
        case C.UPDATE_REVIEW:
                return state.map((currentReview) => {
                    if (currentReview.id === action.id) {
                        return review(currentReview, action)
                    }
                    else {
                        return currentReview
                    }
                })
            
        default:
            return state;
    }
}

// The review reducer will allow the review {} state to be 
// altered
export const review = (state = {}, action) => {
    switch (action.type) {
        case C.ADD_REVIEW:
            return {
                id: action.id,
                author: reviewAuthor({}, action),
                restaurant: reviewRestaurant({}, action),
                rating: reviewRating({}, action),
                reviewTitle: action.reviewTitle,
                reviewText: action.reviewText,
                images: reviewImages([], action),
                history: reviewHistory({}, action)
            }
        case C.UPDATE_REVIEW:
            return {
                ...state,
                rating: reviewRating(state.rating, action),
                reviewTitle: action.reviewTitle,
                reviewText: action.reviewText,
                images: reviewImages(state.images, action),
                history: reviewHistory(state.history, action)
            }
        default:
            return state;
    }
}

// The reviewAuthor reducer will allow the author {} state to be 
// altered
export const reviewAuthor = (state = {}, action) => {
    switch (action.type) {
        case C.ADD_REVIEW:
            return {
                id: action.author.id,
                userName: action.author.userName
            }
        default:
            return state;
    }
}

// The reviewRestaurant reducer will allow the review specific restaurant {} 
// state to be altered
export const reviewRestaurant = (state = {}, action) => {
    switch (action.type) {
        case C.ADD_REVIEW:
            return {
                id: action.restaurant.id,
                name: action.restaurant.name
            }
        default:
            return state;
    }
}

// The reviewRating reducer will allow the rating {} state to be 
// altered
export const reviewRating = (state = {}, action) => {
    switch (action.type) {
        case C.ADD_REVIEW:
            return {
                id: action.rating.id,
                tasteRating: action.rating.tasteRating,
                serviceRating: action.rating.serviceRating,
                cleanlinessRating: action.rating.cleanlinessRating,
                overallRating: action.rating.cleanlinessRating
            }
        case C.UPDATE_REVIEW:
            return {
                ...state,
                tasteRating: action.rating.tasteRating,
                serviceRating: action.rating.serviceRating,
                cleanlinessRating: action.rating.cleanlinessRating,
                overallRating: action.rating.overallRating
            }
        default:
            return state;
    }
}

// The reviewImages reducer will allow the images [] state to be 
// altered
export const reviewImages = (state = [], action) => {
    switch (action.type) {
        case C.ADD_REVIEW:
            return [
                ...state,
                reviewImage({}, action)
            ]
        case C.UPDATE_REVIEW:
            return state.map((image) => {
                // NEED TO DECIDE WHAT TO FILTER IMAGE BY, id or imageLocation. This currently 
                // is built to support one image in state only which is the current 
                // standard.
                // 
                if (true) {
                    return reviewImage(image, action)
                }
                else {
                    return image
                }
            })
        default:
            return state;
    }
}

// The reviewImage reducer will allow the image {} state to be 
// altered
export const reviewImage = (state = {}, action) => {
    switch (action.type) {
        case C.ADD_REVIEW:
            return {
                id: action.images.id,
                imageLocation: action.images.imageLocation
            }
        case C.UPDATE_REVIEW:
            return {
                ...state,
                imageLocation: action.images.imageLocation
            }
        default:
            return state;
    }
}

// The reviewHistory reducer will allow the history {} state to be 
// altered
export const reviewHistory = (state = {}, action) => {
    switch (action.type) {
        case C.ADD_REVIEW:
            return {
                id: action.history.id,
                created: action.history.created,
                modified: action.history.modified
            }
        case C.UPDATE_REVIEW:
            return {
                ...state,
                modified: action.history.modified
            }
        default:
            return state;
    }
}