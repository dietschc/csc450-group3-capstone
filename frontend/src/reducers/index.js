// Devin Brueberg
// CSC450 Capstone
// Restaurant Club - index.js
// February 13, 2022
// Last Edited (Initials, Date, Edits):

// Using React library in order to build components 
// for the app and importing needed components
import { combineReducers } from 'redux';
import users from './users';
import restaurants from './restaurants';
import messages from './messages';
import reviews from './reviews';

// Combining all reducers
const reducers = combineReducers({
    users,
    restaurants,
    reviews,
    messages
});

// Exporting combined reducers
export default reducers;