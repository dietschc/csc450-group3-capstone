// Initially Created by: Devin Brueberg
// CSC450 Capstone
// Restaurant Club - ReviewTextCardBody.js
// February 7, 2022
// Last Edited (Initials, Date, Edits):
//  (DAB, 4/03/2022, Added in a "showMore/showLess" button for when the 
//  review is over 250 characters only)
//  (DAB, 4/07/2022, Review Text will now show white space)

// Using React library in order to build components 
// for the app and importing needed components
import React, { useState, useRef } from 'react'
import { Card, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'

/**
 * The ReviewTextCardBody is wrapped in a Card.Body and will 
 * display the review's title and text.
 * 
 * @param { review } props 
 * @returns 
 */
function ReviewTextCardBody(props) {
    // The form component specific props will be assigned and 
    // used to process the form element
    const { review } = props;

    // This state will hold if the review should display or not display
    const [showMore, setShowMore] = useState(false);

    // Needed this ref because React was not refocusing on the right 
    // location when using showless...
    const autoScroll = useRef();


    // This function will scroll the message window to the bottom to read the newest message
    const reviewScrollTo = () => {
        // If the page is not rendered nothing is done
        if (!autoScroll.current) return;

        // If the page is rendered the message box will be scrolled to the bottom
        autoScroll.current.scrollIntoView({ behavior: 'smooth' });
    }


    // The reviewSlice function will slice the review text when it is over the 
    // 255 character max limit and do nothing if otherwise
    const reviewSlice = () => {
        // If the review text is over 255 characters only the first 
        // 255 are returned
        if (review && review?.reviewText.length > 255) {
            return review?.reviewText.slice(0, 255);
        }
        // If the review text is less than 255 characters, the whole 
        // string is returned
        else {
            return review?.reviewText;
        }
    }


    // The showLessHandler will handle the actions for the "show less..." 
    // button
    const showLessHandler = (e) => {
        // Losing button focus after click
        e.currentTarget.blur()

        // Setting showMore to false will hide the characters greater than 
        // the limit
        setShowMore(false)

        // Scrolling to the review title to re-orient the user
        reviewScrollTo();
    }


    // The showMoreHandler will handle the actions for the "show more..." 
    // button
    const showMoreHandler = (e) => {
        // Losing button focus after click
        e.currentTarget.blur()

        // Setting showMore to true will show the entire review
        setShowMore(true)
    }


    // Render function that will display a showMore or showLess button when
    // the review is greater than 250 characters. Only a max of 250 characters 
    // will be shown unless showMore... is selected
    const reviewText = () => (
        showMore ? (
            <Card.Text style={{whiteSpace: "pre-wrap"}}>
                {review?.reviewText}
                {review?.reviewText.length > 250 &&
                    <Button
                        className='ms-1 b-0 p-0 px-1'
                        variant="outline-alert"
                        style={{ fontSize: ".7rem" }}
                        onClick={(e) => showLessHandler(e)}>
                        show less...
                    </Button>}
            </Card.Text>
        ) : (
            <Card.Text style={{whiteSpace: "pre-wrap"}}>
                {reviewSlice()}
                {review?.reviewText.length > 250 &&
                    <Button
                        className='ms-1 b-0 p-0 px-1'
                        variant="outline-alert"
                        style={{ fontSize: ".7rem" }}
                        onClick={(e) => showMoreHandler(e)}>
                        show more...
                    </Button>}
            </Card.Text>
        )
    )

    return (
        <Card.Body>
            <span className="p-0 m-0" ref={autoScroll} />
            <Card.Title className="text-center">
                {review.reviewTitle}
            </Card.Title>
            {reviewText()}
        </Card.Body>
    )
}

// Exporting the component
export default ReviewTextCardBody;