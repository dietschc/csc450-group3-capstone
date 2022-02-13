// Devin Brueberg
// CSC435 Adv Web App Development
// Restaurant Club - index.js
// February 13, 2022
// Last Edited (Initials, Date, Edits):

// Using React library in order to build components 
// for the app and importing needed components
import C from '../constants';


// START OF USERS REDUCERS********************
// The users reducer will allow the users [] state to be 
// altered
export const users = (state = [], action) => {
    switch (action.type) {
    }
}

// The user reducer will allow the user {} state to be 
// altered
export const user = (state = {}, action) => {
    switch (action.type) {
    }
}

// The auth reducer will allow the auth {} state to be 
// altered
export const auth = (state = {}, action) => {
    switch (action.type) {
    }
}

// The permission reducer will allow the permission {} state to be 
// altered
export const permission = (state = {}, action) => {
    switch (action.type) {
    }
}

// The history reducer will allow the history {} state to be 
// altered
export const history = (state = {}, action) => {
    switch (action.type) {
    }
}

// The address reducer will allow the address {} state to be 
// altered
export const address = (state = {}, action) => {
    switch (action.type) {
    }
}

// The friends reducer will allow the friends [] state to be 
// altered
export const friends = (state = [], action) => {
    switch (action.type) {
    }
}

// The friend reducer will allow the friend {} state to be 
// altered
export const friend = (state = {}, action) => {
    switch (action.type) {
    }
}

// END OF USERS REDUCERS********************




// START OF RESTAURANTS REDUCERS********************

// The restaurants reducer will allow the restaurants [] state to be 
// altered
export const restaurants = (state = [], action) => {
    switch (action.type) {
    }
}

// The restaurant reducer will allow the restaurant {} state to be 
// altered
export const restaurant = (state = {}, action) => {
    switch (action.type) {
    }
}

// The author reducer will allow the author {} state to be 
// altered
export const author = (state = {}, action) => {
    switch (action.type) {
    }
}

// The restaurants reducer will allow the restaurants [] state to be 
// altered. ADDRESS IS THE SAME FOR USERS AND RESTAURANTS
export const restaurantAddress = (state = [], action) => address(state, action);

// The rating reducer will allow the rating {} state to be 
// altered
export const rating = (state = {}, action) => {
    switch (action.type) {
    }
}

// The images reducer will allow the images [] state to be 
// altered
export const images = (state = [], action) => {
    switch (action.type) {
    }
}

// The image reducer will allow the image {} state to be 
// altered
export const image = (state = {}, action) => {
    switch (action.type) {
    }
}

// END OF RESTAURANTS REDUCERS*******************



// START OF REVIEWS REDUCERS********************

// The reviews reducer will allow the reviews [] state to be 
// altered
export const reviews = (state = [], action) => {
    switch (action.type) {
    }
}

// The review reducer will allow the review {} state to be 
// altered
export const review = (state = [], action) => {
    switch (action.type) {
    }
}

// The reviewAuthor reducer will allow the author {} state to be 
// altered. THE REVIEW AUTHOR IS THE SAME AS RESTAURANT AUTHOR
export const reviewAuthor = (state = {}, action) => author(state, action);

// The reviewRestaurant reducer will allow the review specific restaurant {} 
// state to be altered
export const reviewRestaurant = (state = {}, action) => {
    switch (action.type) {
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

// END OF REVIEWS REDUCERS********************




// START OF MESSAGES REDUCERS********************

// The messages reducer will allow the messages [] state to be 
// altered
export const messages = (state = [], action) => {
    switch (action.type) {
    }
}

// The messages reducer will allow the messages {} state to be 
// altered
export const message = (state = {}, action) => {
    switch (action.type) {
    }
}

// The userMessage reducer will allow the userMessage {} state to be 
// altered
export const userMessage = (state = {}, action) => {
    switch (action.type) {
    }
}