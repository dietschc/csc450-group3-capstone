// Initially Created by: Coleman Dietsch
// CSC450 Capstone
// Restaurant Club - SearchCard.js
// February 7, 2022
// Last Edited (Initials, Date, Edits):

// Using React library in order to build components 
// for the app and importing needed components
import React from 'react'
import { Link } from 'react-router-dom';
import { Card, ListGroup } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import { printStarTotal } from '../../helperFunction/StringGenerator';
import { formatPhoneNumber } from '../../helperFunction/FormatString'

function SearchCard(props) {
    // The form component specific props will be assigned and 
    // used to process the form element
    // const { search } = props;
    const { restaurant } = props;

    const starFont = { color: "gold" }

    return (
        <Link className="text-decoration-none text-reset" to={`/restaurant/${restaurant.id}`}>
            <Card className="border-0 text-muted hoverable mb-2">
            <Card.Body className="text-center">
                    <Card.Title>{restaurant.name}</Card.Title>
                    <ListGroup variant="horizontal" className="justify-content-center">
                        <ListGroup.Item className="border-0 text-muted">
                            {restaurant.overallRating} Star
                            <span style={starFont}> {printStarTotal(restaurant.rating.overallRating)}</span>
                        </ListGroup.Item>
                        <ListGroup.Item className="border-0 text-muted">{restaurant.address.address}</ListGroup.Item>
                        <ListGroup.Item className="border-0 text-muted">{formatPhoneNumber(restaurant.phone)}</ListGroup.Item>
                    </ListGroup>
                </Card.Body>
                {/* <Card.Body className="text-center">
                    <Card.Title>{props.restaurantName}</Card.Title>
                    <ListGroup variant="horizontal" className="justify-content-center">
                        <ListGroup.Item className="border-0 text-muted">
                            {props.averageRating} Star
                            <span style={starFont}> {printStarTotal(props.averageRating)}</span>
                        </ListGroup.Item>
                        <ListGroup.Item className="border-0 text-muted">{props.address}</ListGroup.Item>
                        <ListGroup.Item className="border-0 text-muted">{props.phone}</ListGroup.Item>
                    </ListGroup>
                </Card.Body> */}
            </Card>
        </Link>
    )
}

// Exporting the component
export default SearchCard;
