// Initially Created by: Devin Brueberg
// CSC450 Capstone
// Restaurant Club - FullStarRatingCol.js
// February 7, 2022
// Last Edited (Initials, Date, Edits):

// Using React library in order to build components 
// for the app and importing needed components
import React from 'react'
import { ListGroup, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import { printStarTotal } from '../../helperFunction/StringGenerator';

/**
 * 
 * @param { rating } props 
 * @returns 
 */
function FullStarRatingCol(props) {
    // The form component specific props will be assigned and 
    // used to process the form element. Works with either restaurant
    // or review
    const { rating } = props;

    return (
        <Col className="d-flex justify-content-center justify-content-sm-start pt-2">
            <ListGroup as="ul">
                <ListGroup.Item as="li" 
                className="d-flex justify-content-between align-items-start pt-1 pb-0 mb-0 border-bottom-0" 
                style={{ maxWidth: "13rem"}}>
                    <div className="pe-2">
                        Taste
                    </div>
                    <div>
                        {printStarTotal(rating.tasteRating)}
                    </div>
                </ListGroup.Item>
                <ListGroup.Item as="li" 
                className="d-flex justify-content-between align-items-start pt-1 pb-0 mb-0 border-bottom-0" 
                style={{ maxWidth: "13rem"}}>
                    <div className="pe-2">
                        Service
                    </div>
                    <div>
                        {printStarTotal(rating.serviceRating)}
                    </div>
                </ListGroup.Item>
                <ListGroup.Item as="li" 
                className="d-flex justify-content-between align-items-start pt-1 pb-0 mb-0 border-bottom-0" 
                style={{ maxWidth: "13rem"}}>
                    <div className="pe-2">
                        Cleanliness
                    </div>
                    <div>
                        {printStarTotal(rating.cleanlinessRating)}
                    </div>
                </ListGroup.Item>
                <ListGroup.Item as="li" 
                className="d-flex justify-content-between align-items-start pt-1 pb-0 mb-0" 
                style={{ maxWidth: "13rem"}}>
                    <div className="pe-2">
                        Overall 
                    </div>
                    <div>
                        {printStarTotal(rating.overallRating)}
                    </div>
                </ListGroup.Item>
            </ListGroup>
        </Col>
    )  
}

// Exporting the component
export default FullStarRatingCol;