// Initially Created by: Devin Brueberg
// CSC450 Capstone
// Restaurant Club - ReviewTextCardBody.js
// February 7, 2022
// Last Edited (Initials, Date, Edits):

// Using React library in order to build components 
// for the app and importing needed components
import React from 'react'
import { Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'

/**
 * 
 * @param { review } props 
 * @returns 
 */
function ReviewTextCardBody(props) {
    // The form component specific props will be assigned and 
    // used to process the form element
    const { review } = props;

    return (
        <Card.Body>
            <Card.Title className="text-center">
                {review.reviewTitle}
            </Card.Title>
            <Card.Text>
                {review.reviewText}
            </Card.Text> 
        </Card.Body>
    )  
}

// Exporting the component
export default ReviewTextCardBody;