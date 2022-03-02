// Initially Created by: Devin Brueberg
// CSC450 Capstone
// Restaurant Club - actionHelpers.js
// March 1, 2022
// Last Edited (Initials, Date, Edits):

/**
 * The helper function will nicely format the data retrieved from a find 
 * restaurant request from the database and format it so it can be used 
 * by redux reducers to load into state.
 * 
 * @param {*} restaurant 
 * @returns 
 */
export const formatDBRestaurantFind = (restaurant) => {
    // If data was found it will format and return the result
    if (restaurant) {
        return {
            restaurantId: restaurant.restaurantId,
            userCreatorId: restaurant.userCreator.userId,
            restaurantDigiContact: restaurant.restaurantDigiContact,
            restaurantName: restaurant.restaurantName,
            restaurantPhone: restaurant.restaurantPhone,
            restaurantWebsite: restaurant.restaurantWebsite,
            ...restaurant.address,
            ...restaurant.image,
            reviewCount: restaurant.reviewCount,  
            ...restaurant.userCreator.authentication,
            ratingId: restaurant.rating.ratingId,
            tasteRating: restaurant.rating.tasteRating/restaurant.reviewCount,
            serviceRating: restaurant.rating.serviceRating/restaurant.reviewCount,
            cleanlinessRating: restaurant.rating.cleanlinessRating/restaurant.reviewCount,
            overallRating: restaurant.rating.overallRating/restaurant.reviewCount 
        }
    }
    // Else it will just return the parameter
    else {
        return restaurant
    }
}


/**
 * The helper function will nicely format the data retrieved from a find 
 * review request from the database and format it so it can be used 
 * by redux reducers to load into state.
 * 
 * @param {*} restaurant 
 * @returns 
 */
export const formatDBReviewFind = (review) => {
    // If data was found it will format and return the result
    if (review) {
        return {
            reviewId: review.reviewId,
            reviewTitle: review.reviewTitle,
            reviewText: review.reviewText,
            ...review.history,
            ...review.rating,
            ...review.restaurant,
            userId: review.user.userId,
            ...review.user.authentication,
            ...review.images.length > 0 && review.images[0]
        }
    }
    // Else it will just return the parameter
    else {
        return review
    }
}