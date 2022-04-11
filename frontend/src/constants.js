// Devin Brueberg
// CSC450 Capstone
// Restaurant Club - constants.js
// February 3, 2021
// Last Edited (Initials, Date, Edits):
//  (DAB, 3/06/2022, Added in DELETE_ADDITIONAL_USERS and 
//  BAN_USER_PERMISSION)
//  (DAB, 4/03/2022, Added in UN_BAN_USER_PERMISSION)
//  (DAB, 4/11/2022, Added in UN_ADMIN_USER_PERMISSION and ADMIN_USER_PERMISSION)

// These constants ensure that there will be no 
// spelling errors when working with static variables
const constants = {
    STATE_LIST: [
        "AK", "AL", "AR", "AZ", "CA", "CO", "CT", "DC",  
        "DE", "FL", "GA", "HI", "IA", "ID", "IL", "IN", "KS", "KY", "LA",  
        "MA", "MD", "ME", "MI", "MN", "MO", "MS", "MT", "NC", "ND", "NE",  
        "NH", "NJ", "NM", "NV", "NY", "OH", "OK", "OR", "PA", "RI", "SC",  
        "SD", "TN", "TX", "UT", "VA", "VT", "WA", "WI", "WV", "WY"
    ],

    ADD_USER: "ADD_USER",
    UPDATE_USER: "UPDATE_USER",
    DELETE_USER: "DELETE_USER",
    DELETE_ALL_USERS: "DELETE_ALL_USERS",
    DELETE_ADDITIONAL_USERS: "DELETE_ADDITIONAL_USERS",
    ADD_FRIEND: "ADD_FRIEND",
    UPDATE_FRIEND: "UPDATE_FRIEND",
    DELETE_FRIEND: "DELETE_FRIEND",
    DELETE_ALL_FRIENDS: "DELETE_ALL_FRIENDS",
    LOGIN: "LOGIN",
    LOGOUT: "LOGOUT",
    UPDATE_PERMISSION: "UPDATE_PERMISSION",
    REFRESH_TOKEN: "REFRESH_TOKEN",

    ADD_RESTAURANT: "ADD_RESTAURANT",
    DECREMENT_RESTAURANT_REVIEW_COUNT: "DECREMENT_RESTAURANT_REVIEW_COUNT",
    INCREMENT_RESTAURANT_REVIEW_COUNT: "INCREMENT_RESTAURANT_REVIEW_COUNT",
    UPDATE_RESTAURANT: "UPDATE_RESTAURANT",
    UPDATE_RESTAURANT_RATING: "UPDATE_RESTAURANT_RATINGS",
    UPDATE_RESTAURANT_REVIEW_COUNT: "UPDATE_RESTAURANT_REVIEW_COUNT",
    UPDATE_RESTAURANT_OWNER: "UPDATE_RESTAURANT_OWNER",
    DELETE_RESTAURANT: "DELETE_RESTAURANT",
    DELETE_ALL_RESTAURANTS: "DELETE_ALL_RESTAURANTS",

    ADD_REVIEW: "ADD_REVIEW",
    UPDATE_REVIEW: "UPDATE_REVIEW",
    DELETE_REVIEW: "DELETE_REVIEW",
    DELETE_ALL_REVIEWS: "DELETE_ALL_REVIEWS",

    ADD_MESSAGE: "ADD_MESSAGE",
    DELETE_MESSAGE: "DELETE MESSAGE",
    DELETE_ALL_MESSAGES: "DELETE_ALL_MESSAGES",

    START_LOADING_USERS: "START_LOADING_USERS",
    END_LOADING_USERS: "END_LOADING_USERS",
    START_LOADING_RESTAURANTS: "START_LOADING_RESTAURANTS",
    END_LOADING_RESTAURANTS: "END_LOADING_RESTAURANTS",
    START_LOADING_REVIEWS: "START_LOADING_REVIEWS",
    END_LOADING_REVIEWS: "END_LOADING_REVIEWS",
    START_LOADING_MESSAGES: "START_LOADING_MESSAGES",
    END_LOADING_MESSAGES: "END_LOADING_MESSAGES",


    BAN_USER_PERMISSION: {
        permissionId: 3,
        permissionName: "banned"
    },
    UN_BAN_USER_PERMISSION: {
        permissionId: 1,
        permissionName: "member"
    },
    ADMIN_USER_PERMISSION: {
        permissionId: 4,
        permissionName: "admin"
    },
    UN_ADMIN_USER_PERMISSION: {
        permissionId: 1,
        permissionName: "member"
    }
}

// Exporting constants
export default constants;