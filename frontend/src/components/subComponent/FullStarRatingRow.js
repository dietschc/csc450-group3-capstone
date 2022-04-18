// Initially Created by: Devin Brueberg
// CSC450 Capstone
// Restaurant Club - FullStarRatingRow.js
// February 7, 2022
// Last Edited (Initials, Date, Edits):
//  (DAB, 4/09/2022, Removed "visited" from "Date visited:")
//  (DAB, 4/16/2022, Added some margin to the Row and shifted 
//  date to the end for small and larger)

// Using React library in order to build components 
// for the app and importing needed components
import React from 'react';
import { Col, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import FullStarRatingCol from './FullStarRatingCol';
import { formatTimeMMddYYYY } from '../../helperFunction/FormatString';

/**
 * The FullStarRatingRow will accept a review for a prop and 
 * return a beautifully styled row that will contain a 
 * FullStarRatingCol on the bottom left and a created history 
 * date on the right.
 * 
 * @param { review } props 
 * @returns 
 */
function FullStarRatingRow(props) {
    // The form component specific props will be assigned and 
    // used to process the form element
    const { review } = props;

    return (
        <Row style={{ margin: ".01rem"}}> 
            <FullStarRatingCol rating={review.rating} />
            <Col className="d-flex justify-content-center justify-content-sm-end align-items-end">
                <span className="text-center text-sm-end" style={{ minWidth: "12rem" }}>
                    Date: {formatTimeMMddYYYY(review.history.created)}
                </span>
            </Col>
        </Row>
    )
}

// Exporting the component
export default FullStarRatingRow;