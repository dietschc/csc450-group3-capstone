// Initially Created by: Devin Brueberg
// CSC450 Capstone
// Restaurant Club - RestaurantReviewDetail.js
// February 6, 2022
// Last Edited (Initials, Date, Edits):
//  (DAB, 02/07/2022, Changed plain buttons variable to a buttonGroup function)
//  (DAB, 02/07/2022, Broke up into multiple reusable components)

// Using React library in order to build components 
// for the app and importing needed components
import React from 'react'
import { Card, Row, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import FullStarRatingRow from './FullStarRatingRow';
import ReviewTextCardBody from './ReviewTextCardBody';
import ReviewHeadingCardBody from './ReviewHeadingCardBody';

/**
 * A React-Bootstrap formatted component that shows the restaurant 
 * details will be generated. 
 * 
 * @param { reviews, restaurants, buttonGroup, modal } props 
 * @returns 
 */
function RestaurantReviewDetail(props) {
    // The form component specific props will be assigned and 
    // used to process the form element. 
    //**********NOTE: Feel free to add props but do not remove props you did not add
    // Also do not edit the styles in this component, only outside is allowed ******
    const { reviews, restaurants, buttonGroup, modal } = props;
    
    return (
        <Container fluid>
                <Row>
                    {reviews.map((review) => (
                        <Card className="mb-2" key={review.reviewId} style={{}}>
                            <ReviewHeadingCardBody review={review} restaurants={restaurants}/>
                            {/** DEBUG MAKE SURE TO REMOVE!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */}
                            {console.log("REVIEW IN RRD IS ", review)}
                            <Card.Img className="mx-auto" 
                            style={{ maxHeight: "20rem", maxWidth: "20rem", overflow: "hidden" }} 
                            src={review.images[0].imageLocation} />
                            <Card.Text className="text-center pt-1">
                                {review.author.userName}
                            </Card.Text>
                            <FullStarRatingRow review={review}/>
                            <ReviewTextCardBody review={review}/>
                            <Container  fluid className="d-flex px-0 mb-2 justify-content-center justify-content-sm-center justify-content-md-end ">
                                {/**Buttons to add function for this Container will generate here, add the 
                                 * buttons to the container by passing them as functional props*/}
                                {buttonGroup(review)}
                            </Container>
                        </Card>
                    ))}
                    {/** A modal can be generated here, add the modal to the container 
                     * by passing it as props*/}
                    {modal}
                </Row>
            </Container>
    )  
}

// Exporting the component
export default RestaurantReviewDetail;