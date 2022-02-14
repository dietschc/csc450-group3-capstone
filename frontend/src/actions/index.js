// Devin Brueberg
// CSC450 Capstone
// Restaurant Club - index.js
// February 13, 2022
// Last Edited (Initials, Date, Edits):

// Using React library in order to build components 
// for the app and importing needed components
import C from '../constants';
import { v4 } from 'uuid';

// Use constants to build actions below. Still looking into 
// correct file structure

// This action will add a new user to state
export const addUser = (userName, 
    firstName, lastName, address, 
    city, state, zip, email, password) => ({
        type: C.ADD_USER,
        id: v4(),
        firstName: firstName,
        lastName: lastName,
        address: {
            id: v4(),
            address: address,
            city: city,
            state: state,
            zip: zip
        },
        auth: {
            id: v4(),
            userName: userName,
            permission: {
                id: 0,
                permissionName: "general"
            },
            password: password,
            history: {
                id: v4(),
                created: new Date(),
                modified: ""
            }
        },
        email: email,
        isLoggedIn: false
})

export const addReview = (userName, userId, restaurantId, restaurantName, tasteRating, 
    serviceRating, cleanlinessRating, overallRating, reviewTitle, 
    reviewText, imageLocation) => ({
        type: C.ADD_REVIEW,
        id: v4(),
        author: {
            id: userId,
            userName: userName
        },
        restaurant: {
            id: restaurantId,
            name: restaurantName
        },
        rating: {
            id: v4(),
            tasteRating: tasteRating,
            serviceRating: serviceRating,
            cleanlinessRating: cleanlinessRating,
            overallRating: overallRating
        },
        reviewTitle: reviewTitle,
        reviewText: reviewText,
        images: {
            id: v4(),
            imageLocation: imageLocation
        },
        history: {
            id: v4(),
            created: new Date(),
            modified: null
        }
    })

    export const deleteReview = (id) => ({
        type: C.DELETE_REVIEW,
        id: id
    })

    export const deleteAllReviews = () => ({
        type: C.DELETE_ALL_REVIEWS
    })