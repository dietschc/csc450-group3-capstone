// Initially Created by: Devin Brueberg
// CSC450 Capstone
// Restaurant Club - Main.js
// January 24, 2022
// Last Edited (Initials, Date, Edits):
//  (DAB, 02/07/2022, The Main Layout was constructed)
//  (DAB, 02/12/2022, Refactored variables to match altered JSON array)
//  (DAB, 03/13/2022, Moved DevelopersNav into MainNav)
//  (DAB, 04/04/2022, Added Spinners for database load in)
//  (DAB, 04/05/2022, Users can no longer friend themselves)

// Using React library in order to build components
// for the app and importing needed components
import React, { useEffect, useLayoutEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import RestaurantReviewDetail from "../subComponent/RestaurantReviewDetail";
import MainRRDetailButtonGroup from "../form/button/MainRRDetailButtonGroup";
import XLContainer from "../template/XLContainer";
import { connect } from "react-redux";
import {
    addReviewThunk,
    deleteAllReviews,
} from "../../actions/reviews";
import {
    deleteAllRestaurants,
    findAllRestaurantsOrderedThunk,
} from "../../actions/restaurants";
import { findAllReviewsRestaurantsOrderedThunk } from "../../actions/reviewsRestaurants";
import { addFriendThunk } from "../../actions/friend";
import ThemedSpinner from "../subComponent/ThemedSpinner";

/**
 * The Main Component will be the starting point of the application.
 * It will display the most recent reviews for the user to browse.
 *
 * @param {*} props
 * @returns
 */
function Main(props) {
    // Destructuring the needed data from redux
    const { restaurants, reviews, users, isLoading } = props;

    // Destructuring the needed methods from props
    const {
        deleteAllReviews,
        deleteAllRestaurants,
        findAllReviewsRestaurantsOrderedThunk,
        addFriendThunk,
    } = props;

    // navigate will allow navigation between the Views
    const navigate = useNavigate();

    // Deleting old state before the DOM is painted
    useLayoutEffect(() => {
        // Deleting the state in redux
        deleteAllReviews();
        deleteAllRestaurants();
    }, []);


    // Loading the database data into state on page load
    useEffect(() => {
        loadState();
    }, []);


    // FriendHandler will add the review author id to the users
    // friend list
    const friendHandler = (friendTwoId) => {
        // If there is a user and they are logged in a friend can be added
        if (users.length > 0 && users[0].isLoggedIn === true) {
            // Destructuring the first element in the users array
            const [currentUser] = users;

            // grabbing the userId(friendOneId)
            const friendOneId = currentUser.id;

            // Making sure that a user cannot friend themselves
            if (friendOneId !== friendTwoId) {
                // Attempting to add the new friend to the database and then to state. Only 
                // friends not in the database/state will be added
                addFriendThunk(friendOneId, friendTwoId);
            } 
        }
    }


    // Loading the database data into state and clearing the old state
    const loadState = async () => {
        // Grabbing the data from the database and adding it to state
        await findAllReviewsRestaurantsOrderedThunk(0, 25);
    }


    // The moreHandler will load in the Search View with the
    // needed URL parameters for the desired search
    const moreHandler = (authorId, restaurantId) => {
        navigate(`restaurant/${restaurantId}/${authorId}`);
    }


    // The restaurantHandler will load in the restaurant page
    // with the restaurant id as a URL parameter
    const restaurantHandler = (restaurantId) => {
        navigate(`restaurant/${restaurantId}`);
    }


    // The RRDButtonGroup will accept the review array and
    // construct a MainRRDetailButtonGroup Component
    const RRDButtonGroup = (review = []) => (
        <MainRRDetailButtonGroup
            review={review}
            users={users}
            moreHandler={moreHandler}
            restaurantHandler={restaurantHandler}
            friendHandler={friendHandler}
        />
    );

    return (
        <XLContainer>
            <h1 className="mb-2">Restaurant Club</h1>
            {isLoading?.isLoadingRestaurants ?
                (
                    <ThemedSpinner />
                ) : (
                    <RestaurantReviewDetail
                        restaurants={restaurants}
                        reviews={reviews}
                        buttonGroup={RRDButtonGroup}
                    />
                )
            }
        </XLContainer>
    );
}

// Mapping the redux store states to props
const mapStateToProps = (state) => ({
    restaurants: [...state.restaurants],
    reviews: [...state.reviews],
    users: [...state.users],
    isLoading: { ...state.isLoading }
});

// Exporting the component
export default connect(mapStateToProps, {
    addReviewThunk,
    findAllRestaurantsOrderedThunk,
    findAllReviewsRestaurantsOrderedThunk,
    deleteAllRestaurants,
    deleteAllReviews,
    addFriendThunk,
})(Main);
