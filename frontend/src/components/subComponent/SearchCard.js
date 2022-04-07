// Initially Created by: Coleman Dietsch
// CSC450 Capstone
// Restaurant Club - SearchCard.js
// February 7, 2022
// Last Edited (Initials, Date, Edits):
//  (DAB, Added full address and allow for the card to flex wrap)

// Using React library in order to build components
// for the app and importing needed components
import React from "react";
import { Link } from "react-router-dom";
import { Card, ListGroup } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { printStarTotal } from "../../helperFunction/StringGenerator";
import { formatPhoneNumber } from "../../helperFunction/FormatString";

function SearchCard(props) {
  // The form component specific props will be assigned and
  // used to process the form element
  const { restaurant } = props;

  const starFont = { color: "gold" };

  return (
    <Link
      className="text-decoration-none text-reset"
      to={`/restaurant/${restaurant.id}`}
    >
      <Card className="border-0 text-muted hoverable mb-2">
        <Card.Body className="text-center">
          <Card.Title>{restaurant.name}</Card.Title>
          <ListGroup
            variant="horizontal"
            className="d-flex flex-column flex-sm-row flex-wrap align-content-center justify-content-center"
          >
            <ListGroup.Item className="px-1 border-0 text-muted">
              <span style={starFont}>
                {printStarTotal(restaurant.rating.overallRating)}
              </span>
            </ListGroup.Item>
            <ListGroup.Item
              className="d-flex flex-wrap justify-content-center px-1 border-0 text-muted"
              style={{ whiteSpace: "nowrap" }}
            >
              <span className="pe-1">{`${restaurant.address.address}`}</span>
              <span>
                {`${restaurant.address.state}, ${restaurant.address.zip}`}
              </span>
            </ListGroup.Item>
            <ListGroup.Item
              className="px-1 border-0 text-muted"
              style={{ whiteSpace: "nowrap" }}
            >
              {formatPhoneNumber(restaurant.phone)}
            </ListGroup.Item>
          </ListGroup>
        </Card.Body>
      </Card>
    </Link>
  );
}

// Exporting the component
export default SearchCard;
