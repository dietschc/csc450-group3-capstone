// Initially Created by: Devin Brueberg
// CSC450 Capstone
// Restaurant Club - Review.js
// January 24, 2022
// Last Edited (Initials, Date, Edits):
// (CPD, 2/4/22, Review View Layout #33 - Initial layout and styling)

// Using React library in order to build components 
// for the app and importing needed components
import React, { useState } from 'react'
import { Row, Col, Form, Container, Button, FloatingLabel } from 'react-bootstrap';

function Review(props) {

    const restaurantName = "Joe's Burgers";

    const [tasteRating, setTasteRating] = useState("2.5");
    const [serviceRating, setServiceRating] = useState("2.5");
    const [cleanRating, setCleanRating] = useState("2.5");
    const [overallRating, setOverallRating] = useState("2.5");

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

    const onChangeReviewTitle = e => {
        const reviewTitle = e.target.value
        setReviewTitle(reviewTitle);
    }

    const onChangeReviewText = e => {
        const reviewText = e.target.value
        setReviewText(reviewText);
    }

    return (
        <Container fluid className="text-muted" style={{ maxWidth: "1000px" }}>
            <Container as="header">
                <div className="text-center p-1">
                    <h1>{restaurantName} Review</h1>
                </div>
            </Container>
            <Container fluid as="main" className="pb-5 justify-content-center">
                <strong>Please rate your visit!</strong>
                <Form>
                    <Row>
                        <Col xs="6">
                            <Form.Group>
                                <Form.Label>Taste</Form.Label>
                                <Form.Range
                                    className="mb-2"
                                    min={0}
                                    max={5}
                                    step={0.5}
                                    value={tasteRating}
                                    onChange={onChangeTasteRating}
                                />

                                <Form.Label>Service</Form.Label>
                                <Form.Range
                                    className="mb-2"
                                    min={0}
                                    max={5}
                                    step={0.5}
                                    value={serviceRating}
                                    onChange={onChangeServiceRating}
                                />

                                <Form.Label>Cleanliness</Form.Label>
                                <Form.Range
                                    className="mb-2"
                                    min={0}
                                    max={5}
                                    step={0.5}
                                    value={cleanRating}
                                    onChange={onChangeCleanRating}
                                />

                                <Form.Label>Overall</Form.Label>
                                <Form.Range
                                    min={0}
                                    max={5}
                                    step={0.5}
                                    value={overallRating}
                                    onChange={onChangeOverallRating}
                                />
                            </Form.Group>
                        </Col>

                        <Col style={{ maxWidth: "90px" }}>
                            <Form.Floating className="mb-1 p-0">
                                <FloatingLabel
                                    controlId="floatingTasteRating"
                                    label="Taste">
                                    <Form.Control
                                        className="text-center"
                                        value={tasteRating}
                                        onChange={onChangeTasteRating}
                                    />
                                </FloatingLabel>
                            </Form.Floating>

                            <Form.Floating className="mb-1">
                                <FloatingLabel
                                    controlId="floatingServiceRating"
                                    label="Service">
                                    <Form.Control
                                        className="text-center"
                                        value={serviceRating}
                                        onChange={onChangeServiceRating}
                                    />
                                </FloatingLabel>
                            </Form.Floating>

                            <Form.Floating className="mb-1">
                                <FloatingLabel
                                    controlId="floatingCleanRating}"
                                    label="Clean">
                                    <Form.Control
                                        className="text-center"
                                        value={cleanRating}
                                        onChange={onChangeCleanRating}
                                    />
                                </FloatingLabel>
                            </Form.Floating>

                            <Form.Floating className="mb-1">
                                <FloatingLabel
                                    controlId="floatingOverallRating"
                                    label="Overall">
                                    <Form.Control
                                        className="text-center"
                                        value={overallRating}
                                        onChange={onChangeOverallRating}
                                    />
                                </FloatingLabel>
                            </Form.Floating>
                        </Col>

                        <Col className="text-center">
                            <img
                                src="reviewImages/3/stock-illustration-retro-diner.jpg"
                                width="300"
                                height="200"
                                className="flex-begin"
                                alt="Uploaded image preview"
                            />
                        </Col>
                    </Row>

                    <Row>
                        <Col xs={{ offset: 9 }}>
                            <Button className="mb-3" variant="outline-primary">
                                Add Image
                            </Button>
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
                        <Button className="mr-1 w-25" variant="outline-primary">
                            Submit
                        </Button>

                        <Button className="ml-1 w-25" variant="outline-primary">
                            Clear
                        </Button>
                    </div>
                </Form>
            </Container>
        </Container>
    )
}

// Exporting the component
export default Review;