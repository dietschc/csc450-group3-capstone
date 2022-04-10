// Initially Created by: Devin Brueberg
// CSC450 Capstone
// Restaurant Club - RestaurantEditItem.js
// February 10, 2022
// Last Edited (Initials, Date, Edits):
//  (DAB, 3/06/2022, Added in button functionality)
//  (DAB, 4/10/2022, Buttons now are uniform size and responsive)

// Using React library in order to build components 
// for the app and importing needed components
import React from 'react'
import { ListGroup, Col, Row, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import { formatPhoneNumber } from '../../helperFunction/FormatString';

/**
 * The RestaurantEditItem Component allows the manipulation of restaurant data 
 * by the admin. The admin can be redirected to view, edit, or delete the 
 * restaurant.
 * 
 * @param { restaurant } props 
 * @returns 
 */
function RestaurantEditItem(props) {
    // The form component specific props will be assigned and 
    // used to process the form element
    const {
        restaurant,
        viewRestaurantHandler,
        editRestaurantHandler,
        deleteRestaurantHandler
    } = props;
    const restaurantId = restaurant.id;

    return (
        <ListGroup as="ul" className="justify-content-center px-0 mb-2">
            <ListGroup.Item as="li" className="border-3" style={{ minHeight: "3rem" }} action>
                <Row className="d-flex justify-content-between align-items-center">
                    <Col sm={4} md={6}>
                        <Row className="d-flex ">
                            <Col className="
                            d-flex 
                            justify-content-center 
                            justify-content-sm-start 
                            align-content-center 
                            px-0 
                            mx-0">
                                <div className="pb-1" style={{ whiteSpace: "nowrap" }}>
                                    {restaurant?.name}
                                </div>
                            </Col>
                            <Col
                                className="
                                d-flex 
                                justify-content-center 
                                justify-content-sm-start 
                                px-0 
                                mx-0">
                                <div>
                                    <a
                                        href={`tel:${formatPhoneNumber(restaurant?.phone)}`}
                                        style={{ whiteSpace: "nowrap" }}>
                                        {formatPhoneNumber(restaurant?.phone)}
                                    </a>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                    <Col
                        sm={8}
                        md={6}
                        className="d-flex flex-column flex-sm-row justify-content-between px-0">
                        <Button
                            className="m-1"
                            style={{ minWidth: "7rem" }}
                            onClick={() => viewRestaurantHandler(restaurantId)}>
                            View
                        </Button>
                        <Button
                            className="m-1"
                            style={{ minWidth: "7rem" }}
                            onClick={() => editRestaurantHandler(restaurantId)}>
                            Edit
                        </Button>
                        <Button
                            className="m-1"
                            style={{ minWidth: "7rem" }}
                            onClick={() => deleteRestaurantHandler(restaurantId)}>
                            Delete
                        </Button>
                    </Col>
                </Row>
            </ListGroup.Item>
        </ListGroup>
    )
}

// Exporting the component
export default RestaurantEditItem;