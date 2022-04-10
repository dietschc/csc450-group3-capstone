// Initially Created by: Devin Brueberg
// CSC450 Capstone
// Restaurant Club - RestaurantDetail.js
// March 4, 2022
// Last Edited (Initials, Date, Edits):
//  (DAB, 4/03/2022, Added in phone number for Restaurant 
//  info)

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

    return (
        <div className="d-flex flex-column">
            <ListGroup className="mx-auto d-flex mx-sm-0 border-0 mt-1">
                <ListGroup.Item as="li"
                    className="d-flex justify-content-start align-items-start pt-1 pb-0 mb-0 border-bottom-0"
                >
                    <div className="pe-2" style={{ minWidth: "7.5rem" }}>
                        Address:
                    </div>
                    <div>
                        {restaurant.address.address}
                    </div>
                </ListGroup.Item>
                <ListGroup.Item as="li"
                    className="d-flex justify-content-start align-items-start pt-1 pb-0 mb-0 border-bottom-0"
                >
                    <div className="pe-2" style={{ minWidth: "7.5rem" }}>
                        City:
                    </div>
                    <div style={{ maxWidth: "7.5rem" }}>
                        {restaurant.address.city}
                    </div>
                </ListGroup.Item>
                <ListGroup.Item as="li"
                    className="d-flex justify-content-start align-items-start pt-1 pb-0 mb-0 border-bottom-0"
                >
                    <div className="pe-2" style={{ minWidth: "7.5rem" }}>
                        State:
                    </div>
                    <div style={{ maxWidth: "7.5rem" }}>
                        {restaurant.address.state}
                    </div>
                </ListGroup.Item>
                <ListGroup.Item as="li"
                    className="d-flex justify-content-start align-items-start pt-1 pb-0 mb-0 border-bottom-0"
                >
                    <div className="pe-2" style={{ minWidth: "7.5rem" }}>
                        Zip:
                    </div>
                    <div className="mr-auto">
                        {restaurant.address.zip}
                    </div>
                </ListGroup.Item>
                <ListGroup.Item as="li"
                    className="d-flex justify-content-start align-items-start pt-1 pb-0 mb-0 border-bottom-0"
                >
                    <div className="pe-2" style={{ minWidth: "7.5rem" }}>
                        Phone:
                    </div>
                    <div className="mr-auto">
                        <a href={`tel:${formatPhoneNumber(restaurant?.phone)}`}>{formatPhoneNumber(restaurant.phone)}</a>
                    </div>
                </ListGroup.Item>

                <ListGroup.Item as="li"
                    className="d-flex justify-content-start align-items-start pt-1 pb-1 mb-0 border-top-0"
                >
                    <div className="pe-2" style={{ minWidth: "7.5rem" }}>
                        <a href={restaurant.digitalContact} target="_blank">Digital Contact</a>
                    </div>
                    <div >
                        <a href={restaurant.website} target="_blank">Website</a>
                    </div>
                </ListGroup.Item>

            </ListGroup>
            <div className="d-flex flex-column flex-sm-row justify-content-center my-2">
                <Button onClick={() => newReviewHandler(restaurant.id)}>
                    New Review
                </Button>
            </div>
        </div>

        // <ListGroup className="d-flex mx-sm-0 border-0 border-right mt-2">
        //     <ListGroup.Item as="li"
        //         className="d-flex justify-content-center justify-content-sm-start pt-1 pb-0 mb-0 border-bottom-0"
        //     >
        //         <div className="d-flex justify-content-start align-items-start">
        //             <div className="" style={{ minWidth: "7.5rem" }}>
        //                 Address:
        //             </div>
        //             <div className="mr-auto">
        //                 {restaurant.address.address}
        //             </div>
        //         </div>

        //     </ListGroup.Item>
        //     <ListGroup.Item as="li"
        //         className="d-flex justify-content-around justify-content-sm-start pt-1 pb-0 mb-0 border-bottom-0"
        //     >
        //         <div className="">
        //             <div className="pe-2" style={{ minWidth: "7.5rem" }}>
        //                 City:
        //             </div>
        //             <div className="mr-auto" style={{ maxWidth: "7.5rem" }}>
        //                 {restaurant.address.city}
        //             </div>
        //         </div>

        //     </ListGroup.Item>
        //     <ListGroup.Item as="li"
        //         className="d-flex justify-content-start align-items-start pt-1 pb-0 mb-0 border-bottom-0"
        //     >
        //         <div className="pe-2" style={{ minWidth: "7.5rem" }}>
        //             State:
        //         </div>
        //         <div style={{ maxWidth: "7.5rem" }}>
        //             {restaurant.address.state}
        //         </div>
        //     </ListGroup.Item>
        //     <ListGroup.Item as="li"
        //         className="d-flex justify-content-start align-items-start pt-1 pb-0 mb-0 border-bottom-0"
        //     >
        //         <div className="pe-2" style={{ minWidth: "7.5rem" }}>
        //             Zip:
        //         </div>
        //         <div className="mr-auto">
        //             {restaurant.address.zip}
        //         </div>
        //     </ListGroup.Item>
        //     <ListGroup.Item as="li"
        //         className="d-flex justify-content-start align-items-start pt-1 pb-0 mb-0 border-bottom-0"
        //     >
        //         <div className="pe-2" style={{ minWidth: "7.5rem" }}>
        //             Phone:
        //         </div>
        //         <div className="mr-auto">
        //             <a href={`tel:${formatPhoneNumber(restaurant?.phone)}`}>{formatPhoneNumber(restaurant.phone)}</a>
        //         </div>
        //     </ListGroup.Item>

        //     <ListGroup.Item as="li"
        //         className="d-flex justify-content-start align-items-start pt-1 pb-1 mb-0"
        //     >
        //         <div className="pe-2" style={{ minWidth: "7.5rem" }}>
        //             <a href={restaurant.digitalContact} target="_blank">Digital Contact</a>
        //         </div>
        //         <div >
        //             <a href={restaurant.website} target="_blank">Website</a>
        //         </div>
        //     </ListGroup.Item>
        //     <ListGroup.Item className="d-flex flex-column flex-sm-row justify-content-center p-0 m-0 mt-2 border-0">
        //         <Button className="m-0" onClick={() => newReviewHandler(restaurant.id)}>New Review</Button>
        //     </ListGroup.Item>
        // </ListGroup>


        // <ListGroup className="mx-auto d-flex mx-sm-0 border-0 border-right mt-2">
        //     <ListGroup.Item as="li"
        //         className="d-flex justify-content-start align-items-start pt-1 pb-0 mb-0 border-bottom-0"
        //     >
        //         <div className="pe-2" style={{ minWidth: "7.5rem" }}>
        //             Address:
        //         </div>
        //         <div>
        //             {restaurant.address.address}
        //         </div>
        //     </ListGroup.Item>
        //     <ListGroup.Item as="li"
        //         className="d-flex justify-content-start align-items-start pt-1 pb-0 mb-0 border-bottom-0"
        //     >
        //         <div className="pe-2" style={{ minWidth: "7.5rem" }}>
        //             City
        //         </div>
        //         <div style={{ maxWidth: "7.5rem" }}>
        //             {restaurant.address.city}
        //         </div>
        //     </ListGroup.Item>
        //     <ListGroup.Item as="li"
        //         className="d-flex justify-content-start align-items-start pt-1 pb-0 mb-0 border-bottom-0"
        //     >
        //         <div className="pe-2" style={{ minWidth: "7.5rem" }}>
        //             State:
        //         </div>
        //         <div style={{ maxWidth: "7.5rem" }}>
        //             {restaurant.address.state}
        //         </div>
        //     </ListGroup.Item>
        //     <ListGroup.Item as="li"
        //         className="d-flex justify-content-start align-items-start pt-1 pb-0 mb-0 border-bottom-0"
        //     >
        //         <div className="pe-2" style={{ minWidth: "7.5rem" }}>
        //             Zip:
        //         </div>
        //         <div className="mr-auto">
        //             {restaurant.address.zip}
        //         </div>
        //     </ListGroup.Item>
        //     <ListGroup.Item as="li"
        //         className="d-flex justify-content-start align-items-start pt-1 pb-0 mb-0 border-bottom-0"
        //     >
        //         <div className="pe-2" style={{ minWidth: "7.5rem" }}>
        //             Phone:
        //         </div>
        //         <div className="mr-auto">
        //             <a href={`tel:${formatPhoneNumber(restaurant?.phone)}`}>{formatPhoneNumber(restaurant.phone)}</a>
        //         </div>
        //     </ListGroup.Item>

        //     <ListGroup.Item as="li"
        //         className="d-flex justify-content-start align-items-start pt-1 pb-1 mb-0"
        //     >
        //         <div className="pe-2" style={{ minWidth: "7.5rem" }}>
        //             <a href={restaurant.digitalContact} target="_blank">Digital Contact</a>
        //         </div>
        //         <div >
        //             <a href={restaurant.website} target="_blank">Website</a>
        //         </div>
        //     </ListGroup.Item>
        //     <ListGroup.Item className="d-flex justify-content-center border-0">
        //         <Button onClick={() => newReviewHandler(restaurant.id)}>New Review</Button>
        //     </ListGroup.Item>
        // </ListGroup>
    )
}

// Exporting the component
export default RestaurantDetail;