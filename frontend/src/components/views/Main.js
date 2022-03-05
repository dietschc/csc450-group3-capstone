// Initially Created by: Devin Brueberg
// CSC450 Capstone
// Restaurant Club - Main.js
// January 24, 2022
// Last Edited (Initials, Date, Edits):
//  (DAB, 02/07/2022, The Main Layout was constructed)
//  (DAB, 02/12/2022, Refactored variables to match altered JSON array)

// Using React library in order to build components
// for the app and importing needed components
import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import DevelopersNav from "../DevelopersNav";
import RestaurantReviewDetail from "../subComponent/RestaurantReviewDetail";
import MainRRDetailButtonGroup from "../form/button/MainRRDetailButtonGroup";
import XLContainer from "../template/XLContainer";
import { connect } from "react-redux";
import {
    addReviewThunk,
    deleteAllReviews,
    findAllReviewsOrderedThunk,
} from "../../actions/reviews";
import {
    addRestaurantThunk,
    deleteAllRestaurants,
    findAllRestaurantsOrderedThunk,
} from "../../actions/restaurants";
import { findAllReviewsRestaurantsOrderedThunk } from "../../actions/reviewsRestaurants";
import { addFriendThunk } from "../../actions/friend";

/**
 * The Main Component will be the starting point of the application.
 * It will display the most recent reviews for the user to browse.
 *
 * @param {*} props
 * @returns
 */
function Main(props) {
    // Destructuring the needed data from redux
    const { restaurants, reviews, users } = props;

    // Destructuring the needed methods from props
    const {
        addReviewThunk,
        findAllReviewsOrderedThunk,
        findAllRestaurantsOrderedThunk,
        deleteAllReviews,
        deleteAllRestaurants,
        findAllReviewsRestaurantsOrderedThunk,
        addFriendThunk,
    } = props;

    // ToDo
    // Get buttons to be functional
    // * More button - "more from user." Uses the review author
    // id and restaurant id to search for more reviews from
    // this author and restaurant
    // * Restaurant button - takes the user to the restaurant page for
    // the review restaurant
    //     FOR RESTAURANT PAGE SEARCH CURRENT STATE FOR RESTAURANT, IF
    //     NOT IN STATE THEN GET IT FROM DATABASE, ADD TO STATE,
    //     AND MAYBE SORT STATE?
    // * Friend button - adds the review author to the users
    // friend list (Possibly add one side of the relation then,
    // request the other side if it does not exist when the other
    // user logs in. Accepting will add that friend and complete
    // the two way database entry) (or just one entry and order
    // does not matter?** CURRENT IMPLEMENTATION)

    // Loading the database data into state and clearing the old state
    const loadState = () => {
        // Deleting the state in redux
        deleteAllReviews();
        deleteAllRestaurants();

        // Grabbing the data from the database and adding it to state
        findAllReviewsRestaurantsOrderedThunk(0, 25);
    };

    // Loading the database data into state on page load
    useEffect(() => {
        loadState();
    }, []);

    // navigate will allow navigation between the Views
    const navigate = useNavigate();

    // The moreHandler will load in the Search View with the
    // needed URL parameters for the desired search
    const moreHandler = (authorId, restaurantId) => {
        navigate("search/" + authorId + "/" + restaurantId);
    };

    // The restaurantHandler will load in the restaurant page
    // with the restaurant id as a URL parameter
    const restaurantHandler = (restaurantId) => {
        navigate("restaurant/" + restaurantId);
    };

    // FriendHandler will add the review author id to the users
    // friend list
    const friendHandler = (friendTwoId) => {
        // If there is a user and they are logged in a friend can be added
        if (users.length > 0 && users[0].isLoggedIn === true) {
            // Destructuring the first element in the users array
            const [currentUser] = users;

            // grabbing the userId(friendOneId)
            const friendOneId = currentUser.id;

            /***********************************CHANGE THE FIRST PARAM HERE TO (friendOneId) TO ADD FRIENDS. initialState user Id is invalid */
            // Attempting to add the new friend to the database and then to state
            addFriendThunk(1, friendTwoId);
        }
    };

    // The RRDButtonGroup will accept the review array and
    // construct a MainRRDetailButtonGroup Component
    const RRDButtonGroup = (review = []) => (
        <div>
            <MainRRDetailButtonGroup
                review={review}
                moreHandler={moreHandler}
                restaurantHandler={restaurantHandler}
                friendHandler={friendHandler}
            />
        </div>
    );
    return (
        <XLContainer>
            <h1 className="mb-2">Restaurant Club</h1>
            <RestaurantReviewDetail
                restaurants={restaurants}
                reviews={reviews}
                buttonGroup={RRDButtonGroup}
            />

            {/* {Developers Nav---Delete anytime} */}
            <Container
                fluid
                style={{ maxWidth: "500px", fontSize: 30 }}
                className="pt-5"
            >
                <DevelopersNav />
            </Container>
            {/* {End of Developers Nav---} */}
        </XLContainer>
    );
}

// Mapping the redux store states to props
const mapStateToProps = (state) => ({
    restaurants: [...state.restaurants],
    reviews: [...state.reviews],
    users: [...state.users],
});

// Exporting the component
export default connect(mapStateToProps, {
    addReviewThunk,
    findAllReviewsOrderedThunk,
    findAllRestaurantsOrderedThunk,
    findAllReviewsRestaurantsOrderedThunk,
    deleteAllRestaurants,
    deleteAllReviews,
    addFriendThunk,
})(Main);
