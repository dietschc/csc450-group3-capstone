// Initially Created by: Devin Brueberg
// CSC450 Capstone
// Restaurant Club - RestaurantHeadingCardBody.js
// February 7, 2022
// Last Edited (Initials, Date, Edits):

// Using React library in order to build components 
// for the app and importing needed components
import React from 'react'
import { Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import { printStarTotal, printReviewTotal } from '../../helperFunction/StringGenerator';

/**
 * The ReviewHeadingCardBody is a Component that will accept a Restaurant 
 * Club review and restaurant parameter. The details of that specific review will be 
 * printed to the screen.
 * 
 * @param { review, restaurant } props 
 * @returns 
 */
function ReviewHeadingCardBody(props) {
    // The form component specific props will be assigned and 
    // used to process the form element
    const { review, restaurant } = props;

    return (
        <Card.Body>
            <Card.Title as="h2" className="text-center">
                <div>
                    {review.restaurant.name}
                </div>
            </Card.Title>
            <Card.Text as="h4" className="text-center">
                <div>
                    {printStarTotal(restaurant.filter((restaurant) => (restaurant.id === review.restaurant.id))[0].rating.overallRating)}
                </div>
                <div className="h6 mb-0">
                    {printReviewTotal(restaurant.filter((restaurant) => (restaurant.id === review.restaurant.id))[0].reviewCount)}
                </div>
            </Card.Text>
        </Card.Body>
    )  
}

// Exporting the component
export default ReviewHeadingCardBody;