// Initially Created by: Devin Brueberg
// CSC450 Capstone
// Restaurant Club - Restaurant.js
// January 24, 2022
// Last Edited (Initials, Date, Edits):
//  (DAB, 02/07/2022, Constructed the layout view for this component)

// Using React library in order to build components 
// for the app and importing needed components
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import XLContainer from '../template/XLContainer';
import mockStateData from "../../redux/initialState.json";
import { Card, ListGroup, Col, Row, Button } from 'react-bootstrap';
import { useParams } from "react-router-dom";
import { printStarTotal, printReviewTotal } from '../../helperFunction/StringGenerator';
import 'bootstrap/dist/css/bootstrap.min.css'
import RestaurantHeadingCardBody from '../subComponent/RestaurantHeadingCardBody';
import FullStarRatingCol from '../subComponent/FullStarRatingCol';
import FullStarRatingRow from '../subComponent/FullStarRatingRow';

function Restaurant(props) {
    // *** Temporary test data, this will be replaced with Redux in the future ***
    const [data, setData]=useState(mockStateData);
    const { id } = useParams();

    // Destructuring the needed data from the intitialState.json file
    const { user, restaurant, review, message } = data; 
    const [currentUser, ...otherUser] = user;
    const { address: currentAddress }  = currentUser;
    const { friend: currentFriendList } = currentUser;
    return (
        <XLContainer>
            <h1>
                Welcome to the Restaurant Page
            </h1>
            {console.log("PARAMS IS ", id)}
            {console.log(restaurant.filter((restaurant) => (1 === restaurant.id)))}
            
            {id === undefined ? (
                <h2 className="text-center">
                    Sorry, no restaurants found!
                </h2> 
                ) : 
                restaurant.filter((restaurant) => (id === restaurant.id.toString())).map((restaurant) => (
                    <Card className="mb-2" key={restaurant.id}>
                        {console.log(restaurant)}
                        <Card.Body>
                            <Card.Title as="h2" className="text-center">
                                <div>
                                    { restaurant.name }
                                </div>
                            </Card.Title>
                            <Card.Text as="h4" className="text-center">
                                <div>
                                    {printStarTotal(restaurant.rating.overallRating)}
                                </div>
                                <div className="h6 mb-0">
                                    {printReviewTotal(restaurant.reviewCount)}
                                </div>
                            </Card.Text>
                        </Card.Body>
                        <Card.Img className="mx-auto" 
                        style={{ maxHeight: "20rem", maxWidth: "20rem", overflow: "hidden" }} 
                        src={restaurant.image[0].imageLocation} />
                        <FullStarRatingCol rating={restaurant.rating}/>
                    </Card>
                    ))
                }
            
        </XLContainer>
    )
}

// Exporting the component
export default Restaurant;