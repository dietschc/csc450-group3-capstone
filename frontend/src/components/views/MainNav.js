// Initially Created by: Devin Brueberg
// CSC450 Capstone
// Restaurant Club - Chat.js
// January 27, 2022
// Last Edited (Initials, Date, Edits):
//  (DAB, 01/28/2022, Upgraded the color scheme)
//  (DAB, 01/28/2022, Added state to nav)
//  (CPD, 2/26/22, Added checkLogin method and state constants)
//  (DAB, 03/13/2022, Added in Admin link when an admin is logged in 
//  light front end only secured)
//  (DAB, 03/13/2022, Moved DevelopersNav into MainNav)
//  (DAB, 04/03/2022, Fixed Logout behavior to not return to Login screen 
//  when clicked)

// Using React library in order to build components 
// for the app and importing needed components
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Navbar, Button, Nav, Form, Container, FormControl } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { connect } from 'react-redux';
import { deleteAllUsers } from '../../actions/users';
import { deleteAllMessages } from '../../actions/messages';
import { deleteAllReviews } from '../../actions/reviews';
import { deleteAllRestaurants } from '../../actions/restaurants';
import { checkLogin } from '../../helperFunction/CheckLogin';
import ModalLogoutConfirm from '../modal/LogoutConfirm';
import DevelopersNav from '../DevelopersNav';

function MainNav(props) {
    // Setting up the basic state needed to run MainNav
    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
    const [basicActive, setBasicActive] = useState();
    const [searchInput, setSearchInput] = useState("");
    const navigate = useNavigate();
    const location = useLocation();

    // Get user state from props
    const {
        users,
        deleteAllUsers,
        deleteAllMessages,
        deleteAllReviews,
        deleteAllRestaurants
    } = props;

    // Setting the active nav element
    const setActive = (value) => {
        if (value === basicActive) return;
        setBasicActive(value);
    }

    // The searchHandler method will navigate the user 
    // to the search page so a search can be performed
    const searchHandler = (e) => {
        // Preventing default form submission actions
        e.preventDefault();

        // Navigating the user to the search page and passing 
        // the needed search parameters
        navigate(`search/${searchInput}`);

        // Clearing the search input 
        setSearchInput("")

        // Clearing the active button
        setActive("none")
    }

    // Handlers for the LogoutConfirm modal
    const showLogoutHandler = () => setShowLogoutConfirm(true);
    const closeLogoutHandler = () => setShowLogoutConfirm(false);

    // Handles the click to show the modal windows when the logout button is pressed
    const logoutHandler = () => {
        // console.log("logout button pressed");
        showLogoutHandler();
    }

    // Remove everything from state on logout
    const logoutAccount = () => {
        // On logout users and user messages are always deleted 
        // from state
        deleteAllUsers();
        deleteAllMessages();
        
        // If the user is not on the home page, all reviews and 
        // restaurants are deleted. The home page does this 
        // already
        if (location.pathname !== '/') {
            // Deleting all reviews and restaurants so fresh 
            // ones can be loaded onto the home page
            deleteAllReviews();
            deleteAllRestaurants();
           // Navigate to home after logout
            navigate('/'); 
        }
    }

    const showAdmin = () => {
        if (users) {
            const [currentUser] = users;
            if (
                currentUser.isLoggedIn &&
                currentUser.auth.permission.permissionName === "admin") {
                return (
                    <Nav.Item className="mx-3">
                        <LinkContainer to="/admin">
                            <Nav.Link>
                                Admin
                            </Nav.Link>
                        </LinkContainer>
                    </Nav.Item>
                )
            }
        }
    }

    const showLoginControls = () => (
        <>
            {checkLogin(users) ? (
                <>
                    <Nav.Item className="mx-3">
                        <LinkContainer to="/userDashboard">
                            <Nav.Link>
                                Dashboard
                            </Nav.Link>
                        </LinkContainer>
                    </Nav.Item>
                    {showAdmin()}
                    <Nav.Item className="mx-3" onClick={logoutHandler}>
                            <Nav.Link>
                                Logout
                            </Nav.Link>
                    </Nav.Item>
                </>
            ) : (
                <>
                    <Nav.Item className="mx-3">
                        <LinkContainer to="/login">
                            <Nav.Link>
                                Login
                            </Nav.Link>
                        </LinkContainer>
                    </Nav.Item>
                </>
            )}

            <ModalLogoutConfirm
                show={showLogoutConfirm}
                logout={logoutAccount}
                closeHandler={closeLogoutHandler} />
        </>
    )

    // Theme variables
    const buttonTheme = "outline-light";
    const backgroundTheme = "dark";
    const variantTheme = "dark";

    return (
            <Navbar
                sticky="top"
                className="mainNav px-2 rounded-bottom"
                bg={backgroundTheme}
                variant={variantTheme}
                collapseOnSelect
                expand="md">
                <Navbar.Brand>
                    <img
                        src={window.location.origin + '/logo.gif'}
                        width="124px"
                        height="90px"
                        className="flex-begin rounded"
                        alt="Logo"
                    />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
                    <Nav fill className="mb-auto pe-3"
                        activeKey={location.pathname.substring(0, location.pathname.lastIndexOf('/'))}
                        onSelect={(key) => setActive(key)}>
                        <DevelopersNav />
                        <Nav.Item className="mx-3">
                            <LinkContainer to="/">
                                <Nav.Link>
                                    Home
                                </Nav.Link>
                            </LinkContainer>
                        </Nav.Item>
                        {showLoginControls()}
                    </Nav>
                    <Form onSubmit={searchHandler} className="d-flex">
                        <FormControl
                            type="search"
                            name="searchInput"
                            value={searchInput}
                            onInput={e => setSearchInput(e.target.value)}
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                        />
                        <Button type="submit" variant={buttonTheme}>
                            Search
                        </Button>
                    </Form>
                </Navbar.Collapse>
            </Navbar>
    )
}

// Mapping the redux store states to props
const mapStateToProps = state =>
({
    users: [...state.users]
});

// Exporting the component
// export default MainNav;
export default connect(mapStateToProps, {
    deleteAllUsers,
    deleteAllMessages,
    deleteAllReviews,
    deleteAllRestaurants
})(MainNav);