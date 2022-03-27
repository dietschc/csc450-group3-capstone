// Initially Created by: Devin Brueberg
// CSC450 Capstone
// Restaurant Club - actionHelpers.js
// March 1, 2022
// Last Edited (Initials, Date, Edits):
//  (DAB, 3/03/2022, Added in formatDBFriendFind)
//  (DAB, 3/07/2022, Added in formatDBRestaurantCreate)

/**
 * The helper function will nicely format the data retrieved from a find 
 * friend request from the database and format it so it can be used 
 * by redux reducers to load into state.
 * 
 * @param {*} restaurant 
 * @returns 
 */
export const formatDBFriendFind = (friend) => {
    // If data was found it will format and return the result
    if (friend) {
        return {
            friendId: friend.friendId,
            friendOneId: friend.friendOneId,
            friendTwoId: friend.friendTwoId,
            ...friend.friendTwo.authentication
        }
    }
    // Else it will just return the parameter
    else {
        return friend
    }
}


/**
 * The helper function will nicely format the data retrieved from a  
 * restaurant update request from the database and format it so it can 
 * be used by redux reducers to load into state. 
 * 
 * @param {*} restaurant 
 * @returns 
 */
export const formatDBRestaurantCreate = (restaurant) => {
    // If data was found it will format and return the result
    if (restaurant) {
        return {
            restaurantId: restaurant.restaurantId,
            userCreatorId: restaurant.userCreatorId,
            restaurantDigiContact: restaurant.restaurantDigiContact,
            restaurantName: restaurant.restaurantName,
            restaurantPhone: restaurant.restaurantPhone,
            restaurantWebsite: restaurant.restaurantWebsite,
            ...restaurant.address,
            ...restaurant.image,
            reviewCount: restaurant.reviewCount,  
            userName: restaurant.userName,
            ...restaurant.rating
        }
    }
    // Else it will just return the parameter
    else {
        return restaurant
    }
}


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
            tasteRating: restaurant.rating.tasteRating/restaurant.reviewCount || 0,
            serviceRating: restaurant.rating.serviceRating/restaurant.reviewCount || 0,
            cleanlinessRating: restaurant.rating.cleanlinessRating/restaurant.reviewCount || 0,
            overallRating: restaurant.rating.overallRating/restaurant.reviewCount || 0 
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

/**
 * The helper function will nicely format the data retrieved from a find 
 * user request from the database and format it so it can be used 
 * by redux reducers to load into state.
 * 
 * Dev Notes: Look to the output of findByUserNameOffsetLimit for the 
 * valid database output this will format
 * 
 * @param {*} user 
 * @returns 
 */
export const formatDBUserFind = (user) => {
    // If data was found it will format and return the result
    if (user) {
        return {
            userId: user.userId,
            addressId: user.addressId,
            firstName: user.firstName,
            lastName: user.lastName,
            userEmail: user.userEmail,
            ...user.address,
            ...user.authentication,
            ...user.authentication.permission
        }
    }
    // Else it will just return the parameter
    else {
        return user
    }
}