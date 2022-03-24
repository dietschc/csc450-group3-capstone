// Initially Created by: Devin Brueberg
// CSC450 Capstone
// Restaurant Club - AuthReview.js
// March 22, 2022
// Last Edited (Initials, Date, Edits):
//  (DAB, 3/24/2022, Tested code and updated comments)

// Using React library in order to build components 
// for the app and importing needed components
import React from "react";
import { Navigate, useLocation, useParams } from "react-router-dom";
import { connect } from 'react-redux';

/**
 * AuthReview wrapper will only allow the component to be displayed if 
 * the user is logged in and either an author of the review or holds an 
 * admin permission. If the user is not logged in, they are routed to the 
 * Login View, if they are logged in but not an admin and the authorId is 
 * not theirs they will be directed to their own dashboard to find the review, 
 * and last if they are an admin and the review is not found they will 
 * be redirected to the Admin View to search for it.
 * 
 * @param {*} props 
 * @returns 
 */
function AuthReview(props) {
    // Destructuring the users, reviews, and children from props
    const { users, reviews, children } = props;
    // A location object is created to reference this path for return after being redirected
    const location = useLocation();
    // Saving the param Id
    const { reviewId } = useParams();

    // Initializing isAdmin and isLoggedIn to false values
    let isAdmin = false;
    let isLoggedIn = false;

    // The checkAuthorization method will check that the user satisfies the 
    // conditions of being logged in and either the author of the review or holds 
    // an admin permission. False will be returned in all other instances
    const checkAuthorization = () => {
        // If a user is not logged in false is returned
        if (users.length <= 0) {
            return false;
        }

        // If there are no reviews, the user is checked to be admin and logged in 
        // before false is returned
        if (reviews.length <= 0) {
            // Checking if the user holds an admin permission
            isAdmin = users[0]?.auth?.permission?.permissionName === 'admin';
            // Checking if the user is logged in
            isLoggedIn = users[0]?.isLoggedIn;
            return false;
        }

        // Checking if the user is logged in
        isLoggedIn = users[0]?.isLoggedIn;
        // Checking that the user is the author of the review by comparing id's held in state
        const isAuthor = users[0]?.id === reviews.filter(review => review.id === Number(reviewId))[0]?.author?.id;
        // Checking if the user holds an admin permission
        isAdmin = users[0]?.auth?.permission?.permissionName === 'admin';

        // If the user is logged in and is either an author or holds an admin permission. All other 
        // conditions will return false
        return isLoggedIn && (isAuthor || isAdmin);
    }

    // Checking the authorization and if true the child will be rendered, else the user will be redirected 
    // to the appropriate View needed to complete the operation
    return checkAuthorization() ? children : (
        isAdmin ? <Navigate to="/admin" /> : (
            isLoggedIn ? <Navigate to="/userDashboard" /> :
                <Navigate to="/login" replace state={{ path: location.pathname }} />));
}

// Mapping the redux store states to props
const mapStateToProps = (state) => ({
    users: [...state.users],
    reviews: [...state.reviews]
});

// Exporting the component
export default connect(mapStateToProps, null)(AuthReview);