// Initially Created by: Devin Brueberg
// CSC450 Capstone
// Restaurant Club - MainRRDetailButtonGroup.js
// February 7, 2022
// Last Edited (Initials, Date, Edits):

// Using React library in order to build components 
// for the app and importing needed components
import React from 'react'
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'

/**
 * A React-Bootstrap Button is returned that will work with both Edit Views. 
 * The button will update depending on what parent form is loaded.
 * 
 * @param { isUpdate, saveAccount, clearForm } props 
 * @returns
 */
function MainRRDetailButtonGroup(props) {
    // The form component specific props will be assigned and 
    // used to process the form element
    const { moreHandler, restaurantHandler, friendHandler, review } = props;

    return (
        <div>
            <Button className="mx-1" style={{ width: "8rem" }} 
            onClick={() => {moreHandler(review.author.userId, review.restaurant.id)}}>
                More {console.log("Review in BUTTON IS ", review)}
            </Button>
            <Button className="mx-1" style={{ width: "8rem" }} 
            onClick={() => {restaurantHandler(review.restaurant.id)}}>
                Restaurant
            </Button>
            <Button className="mx-1" style={{ width: "8rem" }} 
            onClick={() => {friendHandler(review.author.userId)}}>
                Friend
            </Button>
        </div>
    )  
}

// Exporting the component
export default MainRRDetailButtonGroup;