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
import { deleteAllReviews, findByRestaurantThunk } from '../../actions/reviews';
import RestaurantDetail from '../subComponent/RestaurantDetail';
import ReviewCard from '../subComponent/ReviewCard';

/**
 * The Restaurant Component will display the Restaurant details and 
 * all of the reviews for that restaurant in typical theme style. 
 * 
 * @param {*} props 
 * @returns 
 */
function Restaurant(props) {
    // *** Temporary test data, this will be replaced with Redux in the future ***
    // const [data, setData]=useState(mockStateData);
    const { id } = useParams();
    const { restaurants, reviews, deleteAllReviews, findByRestaurantThunk } = props;
    const navigate = useNavigate();

    // Loading in the initial data from the database
    const loadData = () => {
        deleteAllReviews();
        findByRestaurantThunk(0, 25, id);
    }

    // Loading in the initial restaurant data and restaurant 
    // specific reviews
    useEffect(() => {
        loadData();
    }, []);

    // The reviewHandler will take the restaurantId as a param and pass it 
    // to the review page so the restaurant can be reviewed
    const newReviewHandler = (id) => {
        navigate("../review/" + id);
    }

    return (
        <XLContainer>
            <h1>
                Welcome to the Restaurant Page
            </h1>

            {id === undefined ? (
                <h2 className="text-center">
                    Sorry, no restaurants found!
                </h2>
            ) :
                restaurants.length > 0 && restaurants.filter((restaurant) => (id === restaurant.id.toString())).map((restaurant, index) => (
                    <Card className="mb-2 p-2" key={index}>
                        <RestaurantHeadingCardBody restaurant={restaurant} />
                        <Card.Img className="mx-auto"
                            style={{ maxHeight: "20rem", maxWidth: "20rem", overflow: "hidden" }}
                            src={restaurant.images[0].imageLocation} />
                        <FullStarRatingCol rating={restaurant.rating} />
                        <RestaurantDetail restaurant={restaurant} newReviewHandler={newReviewHandler} />
                        <Container fluid>
                            <Row>
                                {reviews.length > 0 && reviews.map((review, index) => ((review.restaurant.id === restaurant.id) ? (
                                    <ReviewCard review={review} restaurant={restaurant} key={index} />
                                ) : (console.log("nothing"))))}
                            </Row>
                        </Container>
                    </Card>
                ))
            }
        </XLContainer>
    )
}

// Mapping the redux store states to props
const mapStateToProps = state =>
({
    reviews: [...state.reviews],
    restaurants: [...state.restaurants]
});

// Exporting the connect Wrapped Restaurant Component
export default connect(mapStateToProps, { deleteAllReviews, findByRestaurantThunk })(Restaurant);