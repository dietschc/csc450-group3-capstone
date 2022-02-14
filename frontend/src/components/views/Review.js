// Initially Created by: Devin Brueberg
// CSC450 Capstone
// Restaurant Club - Review.js
// January 24, 2022
// Last Edited (Initials, Date, Edits):
// (CPD, 02/4/22, Review View Layout #33 - Initial layout and styling)

// Using React library in order to build components 
// for the app and importing needed components
import React, { useState } from 'react'
import { Row, Col, Form, Container, Button, FloatingLabel } from 'react-bootstrap';
import FloatingImageUpload from '../form/floatingComponents/FloatingImageUpload';
import ModalCancelConfirm from '../form/modal/ModalCancelConfirm';
import { useParams } from "react-router-dom";
import { printStarTotal, printReviewTotal } from '../../helperFunction/StringGenerator';
import { connect } from 'react-redux';
import { addReview, deleteAllReviews, deleteReview } from '../../actions';


function Review(props) {

    const { id: restaurantId } = useParams();
    const { addReview, deleteAllReviews, deleteReview } = props;

    const restaurantName = "Joe's Burgers";

    const [tasteRating, setTasteRating] = useState("3");
    const [serviceRating, setServiceRating] = useState("3");
    const [cleanRating, setCleanRating] = useState("3");
    const [overallRating, setOverallRating] = useState("3");
    const [fileName, setFileName] = useState("");
    const [reviewTitle, setReviewTitle] = useState("");
    const [reviewText, setReviewText] = useState("");

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

    const onChangeFileName = e => {
        const fileName = e.target.value;
        setFileName(fileName);
    }

    const onChangeReviewTitle = e => {
        const reviewTitle = e.target.value
        setReviewTitle(reviewTitle);
    }

    const onChangeReviewText = e => {
        const reviewText = e.target.value
        setReviewText(reviewText);
    }

    const saveReview = () => {
        
        console.log(props.users)
        console.log(props.reviews)
        console.log(props.users[0].auth.userName)
        addReview(props.users[0].auth.userName, props.users[0].id, restaurantId, restaurantName, 
            tasteRating, serviceRating, cleanRating, overallRating, reviewTitle, 
            reviewText, fileName);
        // deleteAllReviews();
        // deleteReview(0)
    }

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

                <Form>
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
                            <img
                                src="../reviewImages/3/stock-illustration-retro-diner.jpg"
                                width="300"
                                height="200"
                                className="p-3 flex-begin"
                                alt="Upload preview"
                            />

                            <FloatingImageUpload as={Row} fileName={fileName} onChangeFileName={onChangeFileName} />
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
                        <Button className="mr-1 w-25" variant="outline-primary" onClick={saveReview}>
                            Submit
                        </Button>

                        <ModalCancelConfirm></ModalCancelConfirm>
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
        users: [...state.users]
    });

// Mapping the state actions to props
const mapDispatchToProps = dispatch => 
    ({
        // This method will add a new review
        addReview(userName, userId, restaurantId, restaurantName, tasteRating, 
            serviceRating, cleanlinessRating, overallRating, reviewTitle, 
            reviewText, imageLocation) {
            dispatch(addReview(userName, userId, restaurantId, restaurantName, tasteRating, 
                serviceRating, cleanlinessRating, overallRating, reviewTitle, 
                reviewText, imageLocation)
                )
        },
        deleteAllReviews() {
            dispatch(deleteAllReviews()
            )
        },
        deleteReview(id) {
            dispatch(deleteReview(id))
        }
    })


// Exporting the connect Wrapped EditAccount Component
export default connect(mapStateToProps, mapDispatchToProps)(Review);