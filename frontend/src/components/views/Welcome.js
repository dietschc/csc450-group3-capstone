import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { Container, Button } from 'react-bootstrap';
import XLContainer from "../template/XLContainer";
import Image from 'react-bootstrap/Image';
import "bootstrap/dist/css/bootstrap.min.css";
import { endLoadingAll } from '../../actions/isLoading';

function Welcome(props)
{
    const navigate = useNavigate();
    const { isLoading, endLoadingAll } = props;

    useEffect(() => {
        // Ending any unfinished load ins
        endLoadingAll();
    }, [] );

    return(
        <XLContainer>
            <Container as="header" className="mx-auto">
                <h1>Welcome to the Restaurant Club!</h1>
            </Container>
            <Container as="main" className="mx-auto">
                <Image
                    src={window.location.origin + '/image/search.png'}
                    className="rounded mx-auto d-block mb-3"
                    alt="Search in Upper Right"
                    />
                <p>Here we encourage our members to make regular reviews of their favorite eateries. Simply search for your restaurant and go into New Review to get the process underway. We rank restaurants on their Taste, Service, Cleaniless, and Overall Experience on a system of 1-5 stars. If you're feeling up to it, add an image for your review!</p>
                <Image
                    src={window.location.origin + '/image/review.png'}
                    className="rounded mx-auto d-block mb-3"
                    alt="A sample review of a real restaurant"
                    />
                <p>
                    If you don't see the your restaurant, you are welcome to add them to the site! Just fill in some basic information and you'll get right back to the review process.
                </p>
                <p>
                    While scrolling through reviews, you might find another reviewer you wish to contact. From the review, it's as simple as pressing the Friend button to add them to your contacts. After that, you'll find them in your Dashboard where you can carry on a lively conversation about your dining experiences!
                </p>
                <Image
                    src={window.location.origin + '/image/dashboard.png'}
                    className="rounded mx-auto d-block mb-3"
                    alt="Brief view of the User Dashboard"
                    />
                <p>
                    While on the topic of the Dashboard, it's there you'll find a summary of your personal information and all of the reviews you've previously written. You are welcome to edit either as needed.
                </p>
                <p>
                    Finally, as this site promotes the regular review of restaurants (including repeat visits), your account may be suspended due to lack of activity in the creation of reviews. (SOME TEXT HERE ABOUT THAT PROCESS)
                </p>
                <p>
                    Alright! Time to get started! We just ask that you log in for good measure and then you'll be off and reviewing.
                </p>
                <Container className="mt-3 mb-3">
                    <Button
                        className="mx-auto d-block"
                        style={{ minWidth: "10rem" }}
                        onClick={() => navigate('/login')}>
                        Login
                    </Button>
                </Container>
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
}) (Welcome);