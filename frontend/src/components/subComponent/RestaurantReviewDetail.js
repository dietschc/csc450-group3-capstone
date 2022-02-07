// Initially Created by: Devin Brueberg
// CSC450 Capstone
// Restaurant Club - RestaurantReviewDetail.js
// February 6, 2022
// Last Edited (Initials, Date, Edits):
//  (DAB, 02/07/2022, Changed plain buttons variable to a buttonGroup function)

// Using React library in order to build components 
// for the app and importing needed components
import React from 'react'
import { Card, ListGroup, Col, Row, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import { printStarTotal, printReviewTotal } from '../../helperFunction/StringGenerator';

/**
 * A React-Bootstrap formatted component that shows the restaurant 
 * details will be generated. 
 * 
 * @param { review, restaurant, buttonGroup, modal } props 
 * @returns 
 */
function RestaurantReviewDetail(props) {
    // The form component specific props will be assigned and 
    // used to process the form element. 
    //**********NOTE: Feel free to add props but do not remove props you did not add
    // Also do not edit the styles in this component, only outside is allowed ******
    const { review, restaurant, buttonGroup, modal } = props;
    

    return (
        <Container fluid>
                <Row>
                    {review.map((review) => (
                        <Card className="mb-2" key={review.reviewId} style={{}}>
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
                            {/** MAKE SURE TO REMOVE!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */}
                            {console.log("REVIEW IN RRD IS ", review)}
                            <Card.Img className="mx-auto" style={{ maxHeight: "20rem", maxWidth: "20rem", overflow: "hidden" }} src={review.image[0].imageLocation} />
                            <Card.Text className="text-center pt-1">
                                {review.author.userName}
                            </Card.Text>
                            <Row>
                                <Col className="d-flex justify-content-center justify-content-sm-start pt-2">
                                    <ListGroup as="ul">
                                        <ListGroup.Item as="li" 
                                        className="d-flex justify-content-between align-items-start pt-1 pb-0 mb-0 border-bottom-0" 
                                        style={{ maxWidth: "13rem"}}>
                                            <div className="pe-2">
                                                Taste
                                            </div>
                                            <div>
                                                {printStarTotal(review.tasteRating)}
                                            </div>
                                        </ListGroup.Item>
                                        <ListGroup.Item as="li" 
                                        className="d-flex justify-content-between align-items-start pt-1 pb-0 mb-0 border-bottom-0" 
                                        style={{ maxWidth: "13rem"}}>
                                            <div className="pe-2">
                                                Service
                                            </div>
                                            <div>
                                                {printStarTotal(review.serviceRating)}
                                            </div>
                                        </ListGroup.Item>
                                        <ListGroup.Item as="li" 
                                        className="d-flex justify-content-between align-items-start pt-1 pb-0 mb-0 border-bottom-0" 
                                        style={{ maxWidth: "13rem"}}>
                                            <div className="pe-2">
                                                Cleanliness
                                            </div>
                                            <div>
                                                {printStarTotal(review.cleanlinessRating)}
                                            </div>
                                        </ListGroup.Item>
                                        <ListGroup.Item as="li" 
                                        className="d-flex justify-content-between align-items-start pt-1 pb-0 mb-0" 
                                        style={{ maxWidth: "13rem"}}>
                                            <div className="pe-2">
                                                Overall 
                                            </div>
                                            <div>
                                                {printStarTotal(review.overallRating)}
                                            </div>
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Col>
                                <Col className="d-flex justify-content-center justify-content-sm-end align-items-end">
                                    <span className="text-center" style={{minWidth: "12rem"}}>
                                        Date Of Visit: {review.history.created}
                                    </span>
                                </Col>
                            </Row>
                            <Card.Body>
                                <Card.Title className="text-center">
                                    {review.reviewTitle}
                                </Card.Title>
                                <Card.Text>
                                    {review.reviewText}
                                </Card.Text> 
                                <Container  fluid className="d-flex px-0 justify-content-center justify-content-sm-center justify-content-md-end ">
                                    {/**Buttons to add function for this Container will generate here, add the 
                                     * buttons to the container by passing them as functional props*/}
                                    {buttonGroup(review)}
                                </Container>
                            </Card.Body>
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