// Devin Brueberg
// CSC450 Capstone
// Restaurant Club - isLoading.js
// April 4, 2022
// Last Edited (Initials, Date, Edits):
//  (DAB, 4/14/2022, Added End Loading All)

// Importing constants so there is no mistype
import C from '../constants';


/************************************ REACT REDUX ACTIONS ***********************************/


/**
 * Sets referenced state to loading true.
 * 
 * @returns 
 */
export const startLoadingUsers = () => ({
    type: C.START_LOADING_USERS,
    isLoadingUsers: true
});


/**
 * Sets referenced state to loading false.
 * 
 * @returns 
 */
export const endLoadingUsers = () => ({
    type: C.END_LOADING_USERS,
    isLoadingUsers: false
});


/**
 * Sets referenced state to loading true.
 * 
 * @returns 
 */
export const startLoadingRestaurants = () => ({
    type: C.START_LOADING_RESTAURANTS,
    isLoadingRestaurants: true
});


/**
 * Sets referenced state to loading false.
 * 
 * @returns 
 */
export const endLoadingRestaurants = () => ({
    type: C.END_LOADING_RESTAURANTS,
    isLoadingRestaurants: false
});


/**
 * Sets referenced state to loading true.
 * 
 * @returns 
 */
export const startLoadingReviews = () => ({
    type: C.START_LOADING_REVIEWS,
    isLoadingReviews: true
});


/**
 * Sets referenced state to loading false.
 * 
 * @returns 
 */
export const endLoadingReviews = () => ({
    type: C.END_LOADING_REVIEWS,
    isLoadingReviews: false
});


/**
 * Sets referenced state to loading true.
 * 
 * @returns 
 */
export const startLoadingMessages = () => ({
    type: C.START_LOADING_MESSAGES,
    isLoadingMessages: true
});


/**
 * Sets referenced state to loading false.
 * 
 * @returns 
 */
export const endLoadingMessages = () => ({
    type: C.END_LOADING_MESSAGES,
    isLoadingMessages: false
});


/**
 * Sets referenced state to loading true.
 * 
 * @returns 
 */
 export const startLoadingFriends = () => ({
    type: C.START_LOADING_FRIENDS,
    isLoadingFriends: true
});


/**
 * Sets referenced state to loading false.
 * 
 * @returns 
 */
export const endLoadingFriends = () => ({
    type: C.END_LOADING_FRIENDS,
    isLoadingFriends: false
});


/**
 * Sets referenced state to loading false.
 * 
 * @returns 
 */
 export const endLoadingAll = () => ({
    type: C.END_LOADING_ALL,
    isLoadingUsers: false,
    isLoadingRestaurants: false,
    isLoadingReviews: false,
    isLoadingMessages: false,
    isLoadingFriends: false
});