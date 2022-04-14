// Initially Created by: Devin Brueberg
// CSC450 Capstone
// Restaurant Club - Restaurant.js
// January 24, 2022
// Last Edited (Initials, Date, Edits):
//  (DAB, 02/07/2022, Constructed the layout view for this component)
//  (DAB, 02/12/2022, Refactored variables to match altered JSON array)
//  (DAB, 2/17/2022, Added redux connect and restaurants actions)
//  (DAB, 3/04/2022, Added in database functionality, comments, 
//  and cleaned up the code)
//  (DAB, 3/05/2022, Added in functionality for author based restaurant 
//  display and cleaned up the code more)
//  (TJI, 03/29/2022 - Added alt tags for images)
//  (DAB, 04/04/2022, Added Spinners for database load in)
//  (DAB, 04/12/2022, Adjusted layout and set fixed WxH for images)
//  (DAB, 04/14/2022, added endLoadingAll action to page load in to clean 
//  up any skipped load ins)

// Using React library in order to build components 
// for the app and importing needed components
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import XLContainer from '../template/XLContainer';
import { Card, Row, Container } from 'react-bootstrap';
import { useParams } from "react-router-dom";
import RestaurantHeadingCardBody from '../subComponent/RestaurantHeadingCardBody';
import FullStarRatingCol from '../subComponent/FullStarRatingCol';
import { connect } from 'react-redux';
import {
    deleteAllReviews,
    findReviewByAuthorRestaurantThunk,
    findReviewByRestaurantThunk
} from '../../actions/reviews';
import RestaurantDetail from '../subComponent/RestaurantDetail';
import ReviewCard from '../subComponent/ReviewCard';
import ThemedSpinner from '../subComponent/ThemedSpinner';
import { endLoadingAll } from '../../actions/isLoading';

/**
 * The Restaurant Component will display the Restaurant details and 
 * all of the reviews for that restaurant in typical theme style. 
 * 
 * @param {*} props 
 * @returns 
 */
function Restaurant(props) {
    // Pulling all needed data/methods from params and props
    const { authorId, restaurantId } = useParams();
    const { restaurants, reviews, isLoading } = props;
    const {
        deleteAllReviews,
        findReviewByAuthorRestaurantThunk,
        findReviewByRestaurantThunk,
        endLoadingAll
    } = props;
    const navigate = useNavigate();

    // Saving the deconstructed current restaurant as an object to be used for 
    // component construction
    const [currentRestaurant] = restaurants.length > 0 ? restaurants.filter(
        (restaurant) => (restaurantId === restaurant.id.toString())) : [];

    // Loading in the initial data from the database
    const loadData = () => {
        // On load in current reviews in state are deleted
        deleteAllReviews();

        // If the authorId and restaurantId have values the page 
        // will display all reviews from the author for the 
        // selected restaurant
        if (authorId && restaurantId) {
            findReviewByAuthorRestaurantThunk(0, 25, authorId, restaurantId)
        }
        // Else the page will display all reviews for a selected restaurant
        else if (restaurantId) {
            findReviewByRestaurantThunk(0, 25, restaurantId);
        }
    }

    // Loading in the initial restaurant data and restaurant 
    // specific reviews once on page load
    useEffect(() => {
        // Load initial data
        loadData();
        // Ending any unfinished load ins
        endLoadingAll();
    }, []);

    // The reviewHandler will take the restaurantId as a param and pass it 
    // to the review page so the restaurant can be reviewed
    const newReviewHandler = (restaurantId) => {
        navigate(`../review/${restaurantId}`);
    }

    // This function will dynamically display the h1
    const displayHeader = (
        // If there is not an author Id 
        authorId === undefined ?
            (<h1>
                Welcome to the Restaurant Page
            </h1>)
            :
            // If there is an authorId and there were reviews found
            // the header will be personalized
            reviews.length > 0 ?
                (<h1>
                    More Reviews from {reviews[0].author.userName}
                </h1>)
                :
                // If there are no reviews found
                (<h1>
                    Welcome to the Restaurant Page
                </h1>)
    )

    // The logic for the body of Restaurant is done here
    const displayBody = (
        // If neither critical variable is undefined the page displays 
        // that no restaurants were found
        restaurantId === undefined || currentRestaurant === undefined ?
            (
                <h2 className="text-center">
                    Sorry, no restaurants found!
                </h2>
            ) :
            // If a restaurant was found it will be displayed on the screen. 
            // The data is protected from crashing via a check that there is 
            // a current restaurant 
            (
                currentRestaurant !== undefined &&
                <Card className="mb-2 p-2">
                    <RestaurantHeadingCardBody restaurant={currentRestaurant} />
                    {currentRestaurant?.images[0].imageLocation &&
                        <div className="mx-auto" style={{ maxHeight: "20rem", maxWidth: "20rem", overflow: "hidden" }}>
                            <Card.Img
                                style={{ height: "100%", width: "100%", overflow: "hidden" }}
                                src={currentRestaurant?.images[0].imageLocation}
                                alt={currentRestaurant?.name} />
                        </div>
                    }
                    <FullStarRatingCol rating={currentRestaurant.rating} />
                    <RestaurantDetail restaurant={currentRestaurant} newReviewHandler={newReviewHandler} />
                    <Container fluid>
                        <Row>
                            {reviews.length > 0 &&
                                reviews.map((review, index) => (
                                    (review.restaurant.id === currentRestaurant.id) &&
                                    // If reviews were found for the restaurant they will be displayed here
                                    (
                                        <ReviewCard review={review} restaurant={currentRestaurant} key={index} />
                                    )
                                ))
                            }
                        </Row>
                    </Container>
                </Card>
            )
    );

    return (
        <XLContainer>
            {displayHeader}
            {isLoading?.isLoadingRestaurants || isLoading?.isLoadingReviews ?
                (
                    <ThemedSpinner />
                ) : (
                    displayBody
                )
            }
        </XLContainer>
    )
}

// Mapping the redux store states to props
const mapStateToProps = state =>
({
    reviews: [...state.reviews],
    restaurants: [...state.restaurants],
    isLoading: { ...state.isLoading }
});

// Exporting the connect Wrapped Restaurant Component
export default connect(mapStateToProps, { 
    deleteAllReviews, 
    findReviewByAuthorRestaurantThunk, 
    findReviewByRestaurantThunk, 
    endLoadingAll 
})(Restaurant);