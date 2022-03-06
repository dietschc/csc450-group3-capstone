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
 * The RestaurantHeadingCardBody is a Component that consists 
 * of the title and overall rating in stars of a restaurant. It 
 * will display centered in the Card Body.
 * 
 * @param { restaurant } props 
 * @returns 
 */
function RestaurantHeadingCardBody(props) {
    // The form component specific props will be assigned and 
    // used to process the form element
    const { restaurant } = props;

    return (
        <Card.Body>
            <Card.Title as="h2" className="text-center">
                <div>
                    {restaurant.name}
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
    )
}

// Exporting the component
export default RestaurantHeadingCardBody;