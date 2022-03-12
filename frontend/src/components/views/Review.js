// Initially Created by: Devin Brueberg
// CSC450 Capstone
// Restaurant Club - Review.js
// January 24, 2022
// Last Edited (Initials, Date, Edits):
// (CPD, 02/4/22, Review View Layout #33 - Initial layout and styling)
// (CPD, 03/08/22, Added image upload and create review functionality)
// (CPD, 03/10/22, Added update review thunk)
// (CPD, 03/10/22, Added code to display an upload image preview)

// Using React library in order to build components 
// for the app and importing needed components
import React, { useState } from 'react'
import { Row, Col, Form, Container, Button, FloatingLabel } from 'react-bootstrap';
import FloatingImageUpload from '../form/floatingComponents/FloatingImageUpload';
import ModalCancelConfirm from '../form/modal/ModalCancelConfirm';
import { useParams, useNavigate } from "react-router-dom";
import { printStarTotal } from '../../helperFunction/StringGenerator';
import { connect } from 'react-redux';
import { addReviewThunk, updateReviewThunk } from '../../actions/reviews';

function Review(props) {

    const { users, reviews, restaurants, addReviewThunk, updateReviewThunk } = props;

    // Extract IDs from URL as parameters
    const { restaurantId, reviewId } = useParams();
    const [paramRestaurant = []] = restaurants.filter((restaurant) => (restaurant.id) === Number(restaurantId));
    const [paramReview = []] = reviews.filter((review) => (review.id) === Number(reviewId));

    // Display restaurant name
    const restaurantName = paramRestaurant.name;

    // console.log("review id: ", reviewId);
    // console.log("restaurant id: ", restaurantId);
    // console.log("restaurant details: ", paramRestaurant);
    // console.log("review details: ", paramReview);
    // console.log("review id greater than 0: ", paramReview.id > 0);

    // If the params review id > 0, this implies you are editing a review 
    const [isUpdate, setIsUpdate] = useState(paramReview.id > 0 ? true : false);
    const [tasteRating, setTasteRating] = useState(paramReview.id > 0 ? paramReview.rating.tasteRating : "3");
    const [serviceRating, setServiceRating] = useState(paramReview.id > 0 ? paramReview.rating.serviceRating : "3");
    const [cleanRating, setCleanRating] = useState(paramReview.id > 0 ? paramReview.rating.cleanlinessRating : "3");
    const [overallRating, setOverallRating] = useState(paramReview.id > 0 ? paramReview.rating.overallRating : "3");
    const [reviewTitle, setReviewTitle] = useState(paramReview.id > 0 ? paramReview.reviewTitle : "");
    const [reviewText, setReviewText] = useState(paramReview.id > 0 ? paramReview.reviewText : "");
    const [file, setFile] = useState("");
    const [tempFileUrl, setTempFileUrl] = useState("");

    const navigate = useNavigate();

    const onChangeTasteRating = e => {
        const tasteRating = e.target.value
        setTasteRating(tasteRating);
    }

    const onChangeServiceRating = e => {
        const serviceRating = e.target.value
        setServiceRating(serviceRating);
    }

    const onChangeCleanRating = e => {
        const cleanRating = e.target.value
        setCleanRating(cleanRating);
    }

    const onChangeOverallRating = e => {
        const overallRating = e.target.value
        setOverallRating(overallRating);
    }

    const onChangeFile = e => {
        const file = e.target.files[0]
        setFile(file);

        // Create temporary URL for image preview
        const tempFileUrl = URL.createObjectURL(file);
        setTempFileUrl(tempFileUrl);
    }

    const onChangeReviewTitle = e => {
        const reviewTitle = e.target.value
        setReviewTitle(reviewTitle);
    }

    const onChangeReviewText = e => {
        const reviewText = e.target.value
        setReviewText(reviewText);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        // console.log("file info: ", file);

        if (isUpdate) {
            await updateReview();
        } else {
            await saveReview();
        }
    };

    /**
     * Save review function calls the addReviewThunk
     */
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
        const imageLocation = paramReview.images[0].imageLocation;

        // Pass parameters to add review thunk action
        await updateReviewThunk(reviewId, userId, reviewTitle, reviewText,
            Number(tasteRating), Number(serviceRating), Number(cleanRating),
            Number(overallRating), file, imageLocation);

        // console.log("update new image? ", file);

        // Bring back to user dashboard after
        setTimeout(() => { navigate("../userDashboard") }, 500);
    }

    /**
     * This will display the existing image if you are editing, or else it will display
     * the placeholder image, until you upload a new image, at which point it should
     * display the new image (in a temp tempFileUrl)
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

    const starFont = { color: "gold" }

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
                                    onChange={onChangeTasteRating}
                                />

                                <Form.Label>Service</Form.Label>
                                <Form.Range
                                    className="mb-2"
                                    min={1}
                                    max={5}
                                    step={1}
                                    value={serviceRating}
                                    onChange={onChangeServiceRating}
                                />

                                <Form.Label>Cleanliness</Form.Label>
                                <Form.Range
                                    className="mb-2"
                                    min={1}
                                    max={5}
                                    step={1}
                                    value={cleanRating}
                                    onChange={onChangeCleanRating}
                                />

                                <Form.Label>Overall</Form.Label>
                                <Form.Range
                                    min={1}
                                    max={5}
                                    step={1}
                                    value={overallRating}
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
                            />
                        </FloatingLabel>
                    </Form.Floating>

                    <div className="d-flex justify-content-around pt-2 pb-5">
                        <Button type="submit" className="mr-1 w-25" variant="outline-primary">
                            {isUpdate ? "Update" : "Submit"}
                        </Button>

                        <ModalCancelConfirm />
                    </div>
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

// // Mapping the state actions to props
// const mapDispatchToProps = dispatch => 
//     ({
//         // This method will add a new review
//         addReview(userName, userId, restaurantId, restaurantName, tasteRating, 
//             serviceRating, cleanlinessRating, overallRating, reviewTitle, 
//             reviewText, imageLocation) {
//             dispatch(addReview(userName, userId, restaurantId, restaurantName, tasteRating, 
//                 serviceRating, cleanlinessRating, overallRating, reviewTitle, 
//                 reviewText, imageLocation)
//                 )
//         },
//         deleteAllReviews() {
//             dispatch(deleteAllReviews()
//             )
//         },
//         deleteReview(id) {
//             dispatch(deleteReview(id))
//         },
//         updateReview(reviewId, tasteRating, 
//             serviceRating, cleanlinessRating, overallRating, reviewTitle, 
//             reviewText, imageLocation) {
//                 dispatch(updateReview(reviewId, tasteRating, 
//                     serviceRating, cleanlinessRating, overallRating, reviewTitle, 
//                     reviewText, imageLocation))    
//         }
//     })


// Exporting the connect Wrapped EditAccount Component
export default connect(mapStateToProps, { addReviewThunk, updateReviewThunk })(Review);