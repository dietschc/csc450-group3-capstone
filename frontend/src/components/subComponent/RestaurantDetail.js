// Initially Created by: Devin Brueberg
// CSC450 Capstone
// Restaurant Club - RestaurantDetail.js
// March 4, 2022
// Last Edited (Initials, Date, Edits):
//  (DAB, 4/03/2022, Added in phone number for Restaurant 
//  info)
//  (DAB, 4/10/2022, Now responsive and follow expanding theme)
//  (DAB, 4/16/2022, Append "https://" to URL's so they know to 
//  reference external links. Forms are validated to allow this)

// Using React library in order to build components 
// for the app and importing needed components
// Using React library in order to build components 
// for the app and importing needed components
import React from 'react';
import { ListGroup, Button } from 'react-bootstrap';
import { formatPhoneNumber } from '../../helperFunction/FormatString';

/**
 * The RestaurantDetail component will display the restaurant specific details in a 
 * nicely formatted ListGroup. It accepts one restaurant and a newReviewHandler function 
 * as arguments.
 * 
 * @param { restaurant, newReviewHandler } props 
 * @returns 
 */
function RestaurantDetail(props) {
    // The component needed props are destructured
    const { restaurant, newReviewHandler } = props;
    const listGroupClass = "d-flex flex-wrap flex-sm-nowrap " +
        "justify-content-start pt-1 pb-0 mb-0 border-0";

    return (
        <div className="d-flex flex-column">
            <ListGroup className="mx-auto d-flex mx-sm-0 border mt-1">
                <ListGroup.Item as="li"
                    className={listGroupClass}
                >
                    <div className="d-flex pe-2" style={{ minWidth: "5rem" }}>
                        Address:
                    </div>
                    <div className="d-flex justify-content-center">
                        {restaurant.address.address}
                    </div>
                </ListGroup.Item>
                <ListGroup.Item as="li"
                    className={listGroupClass}
                >
                    <div className="pe-2" style={{ minWidth: "5rem" }}>
                        City:
                    </div>
                    <div className="mr-auto" >
                        {restaurant.address.city}
                    </div>
                </ListGroup.Item>
                <ListGroup.Item as="li"
                    className={listGroupClass}
                >
                    <div className="pe-2" style={{ minWidth: "5rem" }}>
                        State:
                    </div>
                    <div style={{ maxWidth: "5rem" }}>
                        {restaurant.address.state}
                    </div>
                </ListGroup.Item>
                <ListGroup.Item as="li"
                    className={listGroupClass}
                >
                    <div className="pe-2" style={{ minWidth: "5rem" }}>
                        Zip:
                    </div>
                    <div className="mr-auto">
                        {restaurant.address.zip}
                    </div>
                </ListGroup.Item>
                <ListGroup.Item as="li"
                    className={listGroupClass}
                >
                    <div className="pe-2" style={{ minWidth: "5rem" }}>
                        Phone:
                    </div>
                    <div className="mr-auto">
                        <a href={`tel:${formatPhoneNumber(restaurant?.phone)}`}>{formatPhoneNumber(restaurant?.phone)}</a>
                    </div>
                </ListGroup.Item>
                <ListGroup.Item as="li"
                    className={`${listGroupClass} border-bottom-1`}
                >
                    <div style={{ minWidth: "5rem" }} >
                        <a
                            href={'https://' + restaurant.website}
                            target="_blank">
                            Website
                        </a>
                    </div>
                    <div className="pe-2" >
                        {restaurant?.digitalContact !== "" &&
                            <a
                                href={'https://' + restaurant.digitalContact}
                                target="_blank">
                                Digital Contact
                            </a>
                        }
                    </div>
                </ListGroup.Item>
            </ListGroup>

            <div className="d-flex flex-column flex-sm-row justify-content-center my-2">
                <Button onClick={() => newReviewHandler(restaurant.id)}>
                    New Review
                </Button>
            </div>
        </div>
    )
}

// Exporting the component
export default RestaurantDetail;