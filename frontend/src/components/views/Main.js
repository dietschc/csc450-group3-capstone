// Initially Created by: Devin Brueberg
// CSC450 Capstone
// Restaurant Club - Main.js
// January 24, 2022
// Last Edited (Initials, Date, Edits):
//  (DAB, 02/07/2022, The Main Layout was constructed)
//  (DAB, 02/12/2022, Refactored variables to match altered JSON array)

// Using React library in order to build components 
// for the app and importing needed components
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import mockStateData from "../../redux/initialState.json";
import { useNavigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import DevelopersNav from '../DevelopersNav';
import RestaurantReviewDetail from '../subComponent/RestaurantReviewDetail';
import MainRRDetailButtonGroup from '../form/button/MainRRDetailButtonGroup';
import XLContainer from '../template/XLContainer';
import { connect } from 'react-redux';
import { addReviewThunk, findAllReviewsOrdered } from '../../actions/reviews';
import Service from '../../services/review.service'

/**
 * The Main Component will be the starting point of the application. 
 * It will display the most recent reviews for the user to browse.
 * 
 * @param {*} props 
 * @returns 
 */
function Main(props) {
    // ToDo
    // Pull review out of state
    // Create Thunk to grab review state from database, start with 25 limit
    // Get buttons to be functional

    const { addReviewThunk, findAllReviewsOrdered } = props;

    // useEffect(
    //     findAllReviewsOrdered(0, 2)
    //     // console.log(Service.findAllOffsetLimit(0, 2))
    // ,[])
    useEffect(() => {
        console.log(Service.getAll);
        findAllReviewsOrdered(0, 25)
    }, []);


    // navigate will allow navigation between the Views
    const navigate = useNavigate();

    // The moreHandler will load in the Search View with the 
    // needed URL parameters for the desired search
    const moreHandler = (authorId, restaurantId) => {
        navigate("search/" + authorId + "/" + restaurantId);
    }

    // The restaurantHandler will load in the restaurant page 
    // with the restaurant id as a URL parameter
    const restaurantHandler = (restaurantId) => {
        navigate("restaurant/" + restaurantId);
    }

    // FriendHandler will add the review author id to the users 
    // friend list
    const friendHandler = (friendId) => {
        // Add review author id to friend list
        console.log("UserId " + friendId + " was added to friend list.")
    }

    // Destructuring the needed data from the intitialState.json file
    const { users, restaurants, reviews } = props; 
    const [user=[], ...otherUser] = users;
    const { address: currentAddress }  = user;
    const { friend: currentFriendList } = user;

    // The RRDButtonGroup will accept the review array and 
    // construct a MainRRDetailButtonGroup Component
    const RRDButtonGroup = (review = []) => (
        <div>
            <MainRRDetailButtonGroup review={review}
            moreHandler={moreHandler}
            restaurantHandler={restaurantHandler} 
            friendHandler={friendHandler}/>
        </div>
    );
    const createData = {
        userId: 1, 
        restaurantId: 1,
        reviewTitle: "Title",
        reviewText: "Review Body Text",
        tasteRating: 3,
        serviceRating: 3,
        cleanlinessRating: 3,
        overallRating: 3,
        imageLocation: "FakeLocation.gif"
    }

    const loadData = () => {
        findAllReviewsOrdered(0, 2)
    }
    return (
        <XLContainer>
            <h1 className="mb-2">
                Restaurant Club
            </h1>
            <RestaurantReviewDetail restaurants={restaurants} reviews={reviews} buttonGroup={RRDButtonGroup}/>

            {/* {Developers Nav---Delete anytime} */}
            <Container fluid
            style={{ maxWidth: "500px", fontSize: 30 }}
            className="pt-5">
                <DevelopersNav/>
            </Container>
            {/* {End of Developers Nav---} */}

        </XLContainer>
    )
}

// Mapping the redux store states to props
const mapStateToProps = state =>
({
    users: [...state.users],
    restaurants: [...state.restaurants],
    reviews: [...state.reviews]
});


// Exporting the component
export default connect(mapStateToProps, { addReviewThunk, findAllReviewsOrdered })(Main);