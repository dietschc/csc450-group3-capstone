// Initially Created by: Devin Brueberg
// CSC450 Capstone
// Restaurant Club - Restaurant.js
// January 24, 2022
// Last Edited (Initials, Date, Edits):
//  (DAB, 02/07/2022, Constructed the layout view for this component)
//  (DAB, 02/12/2022, Refactored variables to match altered JSON array)
//  (DAB, 2/17/2022, Added redux connect and restaurants actions)

// Using React library in order to build components 
// for the app and importing needed components
import React, { useState, useEffect } from 'react';
import { Link, useHistory, useNavigate } from 'react-router-dom';
import XLContainer from '../template/XLContainer';
import mockStateData from "../../redux/initialState.json";
import { Card, ListGroup, Row, Button, Container } from 'react-bootstrap';
import { useParams } from "react-router-dom";
import RestaurantHeadingCardBody from '../subComponent/RestaurantHeadingCardBody';
import FullStarRatingCol from '../subComponent/FullStarRatingCol';
import FullStarRatingRow from '../subComponent/FullStarRatingRow';
import ReviewTextCardBody from '../subComponent/ReviewTextCardBody';
import { connect } from 'react-redux';
import { deleteAllReviews, findByRestaurantThunk } from '../../actions/reviews';

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

    useEffect(() => {
        loadData();
    }, []);


    // TO DO
    // *Search database for restaurant reviews and add them to state
    // by restaurant Id
    // *Check why random restaurant loads in when navigating to the /2 url

    const newReviewHandler = (id) => {
        navigate("../review/" + id);
    }
    
    return (
        <XLContainer>
            <h1>
                Welcome to the Restaurant Page
            </h1>
            {console.log("PARAMS IS ", id)}
            {console.log(restaurants.filter((restaurant) => (1 === restaurant.id)))}
            
            {id === undefined ? (
                <h2 className="text-center">
                    Sorry, no restaurants found!
                </h2> 
                ) : 
                restaurants.length > 0 && restaurants.filter((restaurant) => (id === restaurant.id.toString())).map((restaurant, index) => (
                    <Card className="mb-2 p-2" key={index}>
                        <RestaurantHeadingCardBody restaurant={restaurant}/>
                        <Card.Img className="mx-auto" 
                        style={{ maxHeight: "20rem", maxWidth: "20rem", overflow: "hidden" }} 
                        src={restaurant.images[0].imageLocation} />
                        <FullStarRatingCol rating={restaurant.rating}/>
                        
                        <ListGroup className="mx-auto mx-sm-0 border-0 border-right mt-2">
                            <ListGroup.Item as="li" 
                            className="d-flex justify-content-start align-items-start pt-1 pb-0 mb-0 border-bottom-0" 
                            >
                                <div className="pe-2" style={{ minWidth: "7.5rem"}}>
                                    Address:
                                </div>
                                <div>
                                    {restaurant.address.address}
                                </div>
                            </ListGroup.Item>
                            <ListGroup.Item as="li" 
                            className="d-flex justify-content-start align-items-start pt-1 pb-0 mb-0 border-bottom-0" 
                            >
                                <div className="pe-2" style={{ minWidth: "7.5rem"}}>
                                    City
                                </div>
                                <div style={{ maxWidth: "7.5rem"}}>
                                    {restaurant.address.city}
                                </div>
                            </ListGroup.Item>
                            <ListGroup.Item as="li" 
                            className="d-flex justify-content-start align-items-start pt-1 pb-0 mb-0 border-bottom-0" 
                            >
                                <div className="pe-2" style={{ minWidth: "7.5rem"}}>
                                    State:
                                </div>
                                <div style={{ maxWidth: "7.5rem"}}>
                                    {restaurant.address.state}
                                </div>
                            </ListGroup.Item>
                            <ListGroup.Item as="li" 
                            className="d-flex justify-content-start align-items-start pt-1 pb-0 mb-0 border-bottom-0" 
                            >
                                <div className="pe-2" style={{ minWidth: "7.5rem"}}>
                                    Zip:
                                </div>
                                <div className="mr-auto">
                                    {restaurant.address.zip}
                                </div>
                            </ListGroup.Item>
                            
                            <ListGroup.Item as="li" 
                            className="d-flex justify-content-start align-items-start pt-1 pb-1 mb-0" 
                            >
                                <div className="pe-2" style={{ minWidth: "7.5rem"}}>
                                    <a href={restaurant.digitalContact} target="_blank">Digital Contact</a>
                                </div>
                                <div >
                                    <a href={restaurant.website} target="_blank">Website</a>
                                </div>
                            </ListGroup.Item>
                            <ListGroup.Item className="d-flex justify-content-center border-0">
                                <Button onClick={() => newReviewHandler(restaurant.id)}>New Review</Button>
                            </ListGroup.Item>
                        </ListGroup>

                        
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
export default connect(mapStateToProps, {deleteAllReviews, findByRestaurantThunk})(Restaurant);