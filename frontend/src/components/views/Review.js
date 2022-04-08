// Initially Created by: Devin Brueberg
// CSC450 Capstone
// Restaurant Club - Review.js
// January 24, 2022
// Last Edited (Initials, Date, Edits):
//  (CPD, 02/4/22, Review View Layout #33 - Initial layout and styling)
//  (CPD, 03/08/22, Added image upload and create review functionality)
//  (CPD, 03/10/22, Added update review thunk)
//  (CPD, 03/12/22, Added code to display an upload image preview)
//  (DAB, 3/24/22, Began adding inner authorization for reviewing restaurants)
//  (DAB, 3/27/22, Inner authorization for reviews complete. A user can now 
//  only review a valid restaurant and the review must be for that restaurant)
//  (DAB, 3/27/22, Enhanced comments)
//  (TJI, 03/29/2022 - Added in character limits for review title and text to match database)
//  (TJI, 04/07/2022 - Added in Cancel button)

// Using React library in order to build components 
// for the app and importing needed components
import React, { useState, useEffect } from 'react'
import { Row, Col, Form, Container, Button, FloatingLabel } from 'react-bootstrap';
import FloatingImageUpload from '../form/floatingComponents/FloatingImageUpload';
import ModalConfirmation from '../modal/ModalCancelConfirm';
import { useParams, useNavigate } from "react-router-dom";
import { printStarTotal } from '../../helperFunction/StringGenerator';
import { connect } from 'react-redux';
import { addReviewThunk, updateReviewThunk } from '../../actions/reviews';
import { findByRestaurantIdThunk } from '../../actions/restaurants';
import CancelFormButton from '../form/button/CancelFormButton';

/**
 * The Review View will allow a user to create and edit restaurant reviews. The 
 * Review page has validations that verify the user can only create reviews for 
 * existing restaurants and edit reviews referencing their respective restaurants.
 * 
 * @param {*} props 
 * @returns 
 */
function Review(props) {

    // Destructuring the needed arrays and data functions from props
    const { users, reviews, restaurants } = props;
    const { addReviewThunk, updateReviewThunk, findByRestaurantIdThunk } = props;
    const starFont = { color: "gold" }

    // Extract IDs from URL as parameters
    const { restaurantId, reviewId } = useParams();
    let [paramRestaurant = []] = restaurants.filter((restaurant) => (restaurant.id) === Number(restaurantId));
    const [paramReview] = reviews.filter((review) => (review.id) === Number(reviewId));

    // Display restaurant name
    const restaurantName = paramRestaurant.name;

    // Confirm modal local state
    const [showClearFormConfirm, setShowClearFormConfirm] = useState(false);

    // If the params review id > 0, this implies you are editing a review 
    const [isUpdate, setIsUpdate] = useState(paramReview?.id > 0 ? true : false);
    const [tasteRating, setTasteRating] = useState(paramReview?.id > 0 ? paramReview.rating.tasteRating : "3");
    const [serviceRating, setServiceRating] = useState(paramReview?.id > 0 ? paramReview.rating.serviceRating : "3");
    const [cleanRating, setCleanRating] = useState(paramReview?.id > 0 ? paramReview.rating.cleanlinessRating : "3");
    const [overallRating, setOverallRating] = useState(paramReview?.id > 0 ? paramReview.rating.overallRating : "3");
    const [reviewTitle, setReviewTitle] = useState(paramReview?.id > 0 ? paramReview.reviewTitle : "");
    const [reviewText, setReviewText] = useState(paramReview?.id > 0 ? paramReview.reviewText : "");
    const [file, setFile] = useState("");
    const [tempFileUrl, setTempFileUrl] = useState("");

    // The navigate reference will allow redirecting users to appropriate pages if needed
    const navigate = useNavigate();

    // This useEffect will run only once on load in
    useEffect(() => {
        // If there is a restaurantId then the restaurant will be loaded in if needed
        if (restaurantId) {
            // If there is no restaurant in paramRestaurant, then the database will 
            // be queried for that restaurant
            if (paramRestaurant.length <= 0) {
                // Calling get restaurant to search and add a restaurant to state if 
                // it exists
                getRestaurant()
            }
        }
    }, []);


    // This useEffect runs every time the restaurants state is changed
    useEffect(() => {
        // Checking the restaurants state for a restaurant that matched the param restaurantId
        paramRestaurant = restaurants.filter((restaurant) => (restaurant.id) === Number(restaurantId));

        // If a restaurant was found and a review exists
        if (paramRestaurant.length > 0 && paramReview) {
            // If the review is not written for the referenced restaurantId the user is 
            // rerouted back to dashBoard
            if (paramRestaurant[0]?.id != paramReview?.restaurant?.id) {
                navigate("/userDashboard");
            }
        }
    }, [restaurants])


    // The getRestaurant method will search the database for the restaurant in the restaurantId. 
    // If it exists it will add it to state otherwise it will navigate the user to the search 
    // page to look for a different restaurant
    const getRestaurant = async () => {
        // Saving the query result of true (success)/false (no data) to result
        const result = await findByRestaurantIdThunk(restaurantId)

        // If the database was searched and no results were found, the user is 
        // navigated to the search page
        if (!result) {
            navigate('/search');
        }
    }


    // The handleSubmit method will handle the initial form submission
    const handleSubmit = async (e) => {
        // Preventing default form submission action
        e.preventDefault();

        // If this is an update to an existing review, updateReview is called
        if (isUpdate) {
            await updateReview();
        }
        // Else this is a new review so saveReview is called
        else {
            await saveReview();
        }
    };


    // Handles the clean rating form input
    const onChangeCleanRating = e => {
        const cleanRating = e.target.value
        setCleanRating(cleanRating);
    }


    // Handles the file form input
    const onChangeFile = e => {
        const file = e.target.files[0]
        setFile(file);

        // Create temporary URL for image preview
        const tempFileUrl = URL.createObjectURL(file);
        setTempFileUrl(tempFileUrl);
    }


    // Handles the overall rating form input
    const onChangeOverallRating = e => {
        const overallRating = e.target.value
        setOverallRating(overallRating);
    }


    // Handles the review text form input
    const onChangeReviewText = e => {
        const { value, maxLength } = e.target;
        const reviewText = value.slice(0, maxLength);
        setReviewText(reviewText);
    }


    // Handles the review title form input
    // Reduces user input to maxLength of input field which copies database's limit.
    const onChangeReviewTitle = e => {
        const { value, maxLength } = e.target;
        const reviewTitle = value.slice(0, maxLength);
        setReviewTitle(reviewTitle);
    }


    // Handles the service rating form input
    const onChangeServiceRating = e => {
        const serviceRating = e.target.value
        setServiceRating(serviceRating);
    }


    // Handles the taste rating form input
    const onChangeTasteRating = e => {
        const tasteRating = e.target.value
        setTasteRating(tasteRating);
    }


    // The saveReview method will save the new review to the database then navigate the 
    // user to the dashboard
    const saveReview = async () => {
        // Set user id
        const userId = users[0].id;

        // Pass parameters to add review thunk action
        await addReviewThunk(userId, restaurantId, reviewTitle, reviewText,
            Number(tasteRating), Number(serviceRating), Number(cleanRating),
            Number(overallRating), file);

        // Bring back to user dashboard after
        setTimeout(() => { navigate("../userDashboard") }, 500);
    }

    const updateReview = async () => {
        // Set user id
        const userId = users[0].id;
        const imageLocation = paramReview.images[0].imageLocation || '';

        // Pass parameters to add review thunk action
        await updateReviewThunk(reviewId, userId, reviewTitle, reviewText,
            Number(tasteRating), Number(serviceRating), Number(cleanRating),
            Number(overallRating), file, imageLocation);

        // console.log("update new image? ", file);

        // Bring back to user dashboard after
        setTimeout(() => { navigate("../userDashboard") }, 500);
    }


    //*************************** RENDER FUNCTIONS  *********************************/


    /**
     * This will display the existing image if you are editing, or else it will display
     * the placeholder image, until you upload a new image, at which point it should
     * display the new image (in the tempFileUrl).
     * 
     * @returns 
     */
    const displayReviewImage = () => (
        <img
            src={isUpdate && paramReview.images[0].imageLocation !== ''
                ? tempFileUrl || paramReview.images[0].imageLocation
                : tempFileUrl || window.location.origin + '/reviewImages/3/stock-illustration-retro-diner.jpg'
            }
            width="300"
            height="200"
            className="p-3 flex-begin"
            alt="Upload preview"
        />
    )

    // The clearForm function will clear the form data
    const clearForm = () => {
        setTasteRating("1");
        setServiceRating("1");
        setCleanRating("1");
        setOverallRating("1");
        setReviewTitle("");
        setReviewText("");

        // We are not allowing to replace review photos at this time
        // The review must be deleted to delete the current photo
        // setFile("cleared");
        // setTempFileUrl(window.location.origin + '/reviewImages/3/stock-illustration-retro-diner.jpg');
    }

    // The close handler will close the clear form modal
    const closeClearFormHandler = () => setShowClearFormConfirm(false);

    // The show handler will show the close form modal
    const showClearFormHandler = () => setShowClearFormConfirm(true);


    return (
        <Container fluid className="text-muted" style={{ maxWidth: "1000px" }}>
            <Container as="header">
                <div className="text-center p-1">
                    <h1>{restaurantName} Review</h1>
                </div>
            </Container>
            <Container fluid as="main" className="pb-5 justify-content-center">
                <div className="text-center pb-3">
                    <strong>Please rate your visit!</strong>
                </div>

                <Form onSubmit={handleSubmit}>
                    <Row className="justify-content-center">
                        <Col xs="6">
                            <Form.Group>
                                <Form.Label>Taste</Form.Label>
                                <Form.Range
                                    className="mb-2"
                                    min={1}
                                    max={5}
                                    step={1}
                                    value={tasteRating}
                                    aria-label="Taste Slider"
                                    onChange={onChangeTasteRating}
                                />

                                <Form.Label>Service</Form.Label>
                                <Form.Range
                                    className="mb-2"
                                    min={1}
                                    max={5}
                                    step={1}
                                    value={serviceRating}
                                    aria-label="Service Slider"
                                    onChange={onChangeServiceRating}
                                />

                                <Form.Label>Cleanliness</Form.Label>
                                <Form.Range
                                    className="mb-2"
                                    min={1}
                                    max={5}
                                    step={1}
                                    value={cleanRating}
                                    aria-label="Cleanliness Slider"
                                    onChange={onChangeCleanRating}
                                />

                                <Form.Label>Overall</Form.Label>
                                <Form.Range
                                    min={1}
                                    max={5}
                                    step={1}
                                    value={overallRating}
                                    aria-label="Overall Slider"
                                    onChange={onChangeOverallRating}
                                />
                            </Form.Group>
                        </Col>

                        <Col xs="3" style={{ maxWidth: "120px" }}>
                            <Form.Floating className="mb-1 p-0">
                                <FloatingLabel
                                    controlId="floatingTasteRating"
                                    label="Taste">
                                    <Form.Control
                                        disabled
                                        style={starFont}
                                        className="text-center bg-white"
                                        value={printStarTotal(tasteRating)}
                                        onChange={onChangeTasteRating}
                                    />
                                </FloatingLabel>
                            </Form.Floating>

                            <Form.Floating className="mb-1">
                                <FloatingLabel
                                    controlId="floatingServiceRating"
                                    label="Service">
                                    <Form.Control
                                        disabled
                                        style={starFont}
                                        className="text-center bg-white"
                                        value={printStarTotal(serviceRating)}
                                        onChange={onChangeServiceRating}
                                    />
                                </FloatingLabel>
                            </Form.Floating>

                            <Form.Floating className="mb-1">
                                <FloatingLabel
                                    controlId="floatingCleanRating}"
                                    label="Clean">
                                    <Form.Control
                                        disabled
                                        style={starFont}
                                        className="text-center bg-white"
                                        value={printStarTotal(cleanRating)}
                                        onChange={onChangeCleanRating}
                                    />
                                </FloatingLabel>
                            </Form.Floating>

                            <Form.Floating className="mb-1">
                                <FloatingLabel
                                    controlId="floatingOverallRating"
                                    label="Overall">
                                    <Form.Control
                                        disabled
                                        style={starFont}
                                        className="text-center bg-white"
                                        value={printStarTotal(overallRating)}
                                        onChange={onChangeOverallRating}
                                    />
                                </FloatingLabel>
                            </Form.Floating>
                        </Col>

                        <Col className="text-center">

                            {displayReviewImage()}

                            <FloatingImageUpload as={Row} onChangeFile={onChangeFile} />

                        </Col>
                    </Row>

                    <Form.Floating className="mb-3 justify-content-center">
                        <FloatingLabel
                            controlId="floatingReviewTitle"
                            label="Review Title">
                            <Form.Control
                                type="text"
                                placeholder="Review Title"
                                required
                                value={reviewTitle}
                                onChange={onChangeReviewTitle}
                                maxLength="64"
                            />
                        </FloatingLabel>
                    </Form.Floating>

                    <Form.Floating className="mb-3 justify-content-center">
                        <FloatingLabel
                            controlId="floatingReviewText"
                            label="Review Text">
                            <Form.Control
                                as="textarea"
                                style={{ height: '250px' }}
                                type="text"
                                placeholder="Review Text"
                                required
                                value={reviewText}
                                onChange={onChangeReviewText}
                                maxLength="5000"
                            />
                        </FloatingLabel>
                    </Form.Floating>

                    <div className="d-flex justify-content-around pt-2 pb-5">
                        <Button type="submit" className="mr-1 w-25">
                            {isUpdate ? "Update" : "Submit"}
                        </Button>

                        <Button onClick={showClearFormHandler} className="mr-1 w-25">
                            Clear
                        </Button>

                        <CancelFormButton />
                    </div>
                    <ModalConfirmation
                        show={showClearFormConfirm}
                        closeHandler={closeClearFormHandler}
                        clearForm={clearForm} />
                </Form>
            </Container>
        </Container>
    )
}

// Mapping the redux store states to props
const mapStateToProps = state =>
({
    reviews: [...state.reviews],
    restaurants: [...state.restaurants],
    users: [...state.users]
});

// Exporting the connect Wrapped EditAccount Component
export default connect(mapStateToProps, {
    addReviewThunk,
    updateReviewThunk,
    findByRestaurantIdThunk
})(Review);