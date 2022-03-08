// Initially Created by: Devin Brueberg
// CSC450 Capstone
// Restaurant Club - EditFormButtons.js
// February 3, 2022
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
function UDRestaurantReviewDetail(props) {
    // The form component specific props will be assigned and 
    // used to process the form element
    const { reviewEditHandler, deleteReviewHandler, review } = props;

    return (
        <div>
            <Button className="mx-1" style={{ width: "5rem" }} onClick={() => {reviewEditHandler(review)}}>
                Edit
            </Button>
            <Button className="mx-1" style={{ width: "5rem" }} onClick={() => {deleteReviewHandler(review)}}>
                Delete
            </Button>
        </div>
    )  
}

// Exporting the component
export default UDRestaurantReviewDetail;