import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigate, Link } from "react-router-dom";
import { Container, Button } from 'react-bootstrap';
import XLContainer from "../template/XLContainer";
import Image from 'react-bootstrap/Image';
import "bootstrap/dist/css/bootstrap.min.css";
import { endLoadingAll } from '../../actions/isLoading';

function Welcome(props) {
    const navigate = useNavigate();
    const { isLoading, endLoadingAll } = props;

    useEffect(() => {
        // Ending any unfinished load ins
        endLoadingAll();
    }, []);

    return (
        <XLContainer>
            <Container as="header" className="mx-auto">
                <h1>Welcome to the Restaurant Club!</h1>
            </Container>
            <Container as="main" className="d-flex flex-wrap justify-content-center">
                <div style={{ maxWidth: "416px", maxHeight: "184px" }}>
                    <Image
                        src={window.location.origin + '/image/search.png'}
                        style={{ width: "100%", height: "100%" }}
                        className="rounded d-block mb-3"
                        alt="Search in Upper Right"
                    />
                </div>

                <p className="me-auto">
                    Here we encourage our members to make regular reviews of
                    their favorite eateries. Simply search for your restaurant
                    and go into New Review to get the process underway. We rank
                    restaurants on their Taste, Service, Cleanliness, and Overall
                    Experience on a system of 1-5 stars. If you're feeling up to it,
                    add an image for your review!</p>
                <Image
                    src={window.location.origin + '/image/review.png'}
                    style={{ width: "100%", height: "100%" }}
                    className="rounded mx-auto d-block mb-3"
                    alt="A sample review of a real restaurant"
                />
                <p className="me-auto">
                    If you don't see the your restaurant, you are welcome to add
                    them to the site! Just fill in some basic information and you'll
                    get right back to the review process.
                </p>
                <p className="me-auto">
                    While scrolling through reviews, you might find another reviewer
                    you wish to contact. From the review, it's as simple as pressing
                    the Friend button to add them to your contacts. After that, you'll
                    find them in your Dashboard where you can carry on a lively conversation
                    about your dining experiences!
                </p>
                <Image
                    src={window.location.origin + '/image/dashboard.png'}
                    style={{ width: "100%", height: "100%" }}
                    className="rounded mx-auto d-block mb-3"
                    alt="Brief view of the User Dashboard"
                />
                <p className="me-auto">
                    While on the topic of the Dashboard, it's there you'll find a summary
                    of your personal information and all of the reviews you've previously
                    written. You are welcome to edit either as needed.
                </p>
                <p className="me-auto">
                    Alright! Time to get started! Check out the newest reviews on the&nbsp;
                    <Link to="/" style={{ color: "#024AB6"}}>
                        home page.
                    </Link>
                </p>
            </Container>
        </XLContainer>
    )
}

const mapStateToProps = state =>
({
    isLoading: { ...state.isLoading }
});

export default connect(mapStateToProps, {
    endLoadingAll
})(Welcome);