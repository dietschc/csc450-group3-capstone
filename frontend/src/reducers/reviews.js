// Devin Brueberg
// CSC450 Capstone
// Restaurant Club - reviews.js
// February 13, 2022
// Last Edited (Initials, Date, Edits):

// Using React library in order to build components 
// for the app and importing needed components
import C from '../constants';
// The history reducer is the same from users
import { history } from './users';
// The author, rating, images, and image reducers are the same from restaurants
import { author, rating, images, image } from './restaurants';

// The reviews reducer will allow the reviews [] state to be 
// altered
export const reviews = (state = [], action) => {
    switch (action.type) {
        default:
            return state;
    }
}

// The review reducer will allow the review {} state to be 
// altered
export const review = (state = {}, action) => {
    switch (action.type) {
        default:
            return state;
    }
}

// The reviewAuthor reducer will allow the author {} state to be 
// altered. THE REVIEW AUTHOR IS THE SAME AS RESTAURANT AUTHOR
export const reviewAuthor = (state = {}, action) => author(state, action);

// The reviewRestaurant reducer will allow the review specific restaurant {} 
// state to be altered
export const reviewRestaurant = (state = {}, action) => {
    switch (action.type) {
        default:
            return state;
    }
}

// The reviewRating reducer will allow the rating {} state to be 
// altered. THE REVIEW RATING IS THE SAME AS RESTAURANT RATING
export const reviewRating = (state = {}, action) => rating(state, action);

// The reviewImages reducer will allow the images [] state to be 
// altered. THE REVIEW IMAGES IS THE SAME AS RESTAURANT IMAGES
export const reviewImages = (state = [], action) => images(state, action);

// The reviewImage reducer will allow the image {} state to be 
// altered
export const reviewImage = (state = {}, action) => image(state, action);

// The reviewHistory reducer will allow the history {} state to be 
// altered
export const reviewHistory = (state = {}, action) => history(state, action);