// Initially Created by: Devin Brueberg
// CSC450 Capstone
// Restaurant Club - AuthReview.js
// March 22, 2022
// Last Edited (Initials, Date, Edits):

// Using React library in order to build components 
// for the app and importing needed components
import React from "react";
import { Navigate, useLocation, useParams } from "react-router-dom";
import { connect } from 'react-redux';

/**
 * AuthAccount wrapper will only allow the component to be displayed if 
 * there is a use and they are logged in. On successful login it will then 
 * take the user back to the original page they were trying to access.
 * 
 * @param {*} props 
 * @returns 
 */
function AuthReview(props) {
    const { users, reviews, children } = props;
    const location = useLocation();
    // Saving the param Id
    const { reviewId } = useParams();

    const checkAuthorization = () => {
        if (users.length < 0 || reviews.length < 0) {
            return false
        }

        

        const isLoggedIn = users[0]?.isLoggedIn;
        const isAuthor = users[0]?.id === reviews.filter(review => review.id === Number(reviewId))[0]?.author?.id;
        // const isAuthor = reviews.filter(review => {
        //     console.log("REVIEW IS", review)
        //     return users[0].id === review?.author?.id
        // }).length > 0;
        const isAdmin = users[0]?.auth?.permission?.permissionName === 'admin';
        console.log("isLoggedIn", isLoggedIn)
        console.log("isAuthor", isAuthor)
        console.log(reviews.filter(review => review.id === Number(reviewId)))
        // console.log(reviews.filter(review => users[0].id === review?.author?.id))
        console.log("isAdmin", isAdmin)

        return isLoggedIn && (isAuthor || isAdmin);
    }

    // return ((users.length > 0 && restaurants.length > 0) && (users[0].isLoggedIn &&  restaurants.filter((restaurant) => restaurant.id === restaurantId).length > 0) ? children : <Navigate to="/login" replace state={{ path: location.pathname }}/>);


    return checkAuthorization() ? children : <Navigate to="/login" replace state={{ path: location.pathname }}/>;
  }

  // Mapping the redux store states to props
const mapStateToProps = (state) => ({
    users: [...state.users],
    reviews: [...state.reviews]
  });
  
// Exporting the component
export default connect(mapStateToProps, null)(AuthReview);