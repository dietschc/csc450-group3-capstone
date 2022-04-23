// Initially Created by: Devin Brueberg
// CSC450 Capstone
// Restaurant Club - EditFormButtons.js
// February 3, 2022
// Last Edited (Initials, Date, Edits):
//  (DAB, 3/09/2022, Added in a clearFormHandler for modal support)
//  (DAB, 4/10/2022, Buttons now are uniform size and responsive)
//  (DAB, 04/13/2022, Added multiple request protection and spinner for adding
//  restaurants)

// Using React library in order to build components 
// for the app and importing needed components
import React from 'react'
import { Button, Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'

/**
 * A React-Bootstrap Button is returned that will work with both Edit Views. 
 * The button will update depending on what parent form is loaded.
 * 
 * @param { isUpdate, isLoading, clearFormHandler } props 
 * @returns
 */
function EditFormButtons(props) {
    // The form component specific props will be assigned and 
    // used to process the form element
    const { isUpdate, isLoading, clearFormHandler } = props;

    return (
        <div className="d-flex flex-column flex-sm-row justify-content-around pt-2">
            <Button
                className="my-1"
                type="submit"
                style={{ minWidth: "10rem" }}>
                {isLoading.isLoadingRestaurants ? (
                    <Spinner
                        as="span"
                        variant="light"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                        animation="border" />
                ) : isUpdate ? (
                    "Update"
                ) : (
                    "Submit"
                )}
            </Button>

            <Button
                className="my-1"
                onClick={clearFormHandler}
                style={{ minWidth: "10rem" }}>
                Clear
            </Button>
        </div>
    )
}

// Exporting the component
export default EditFormButtons;