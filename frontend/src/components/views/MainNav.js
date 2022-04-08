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
//  (DAB, 04/05/2022, Added in sticky nav bar functionality and cleaned up 
//  code)

// Using React library in order to build components 
// for the app and importing needed components
import React, { useEffect, useState, useRef } from 'react';
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
import checkEnv from "../../helperFunction/checkEnvironment";

// Check if we are on the prod environment
const isProd = checkEnv();

/**
 * The MainNav component will allow the user to navigate the 
 * Restaurant Club Application. It is responsive and will 
 * change depending on the permission of the user different 
 * options will be available.
 * 
 * @param {*} props 
 * @returns 
 */
function MainNav(props) {
    // Retrieving state data and functions from props
    const { users } = props;
    const {
        deleteAllUsers,
        deleteAllMessages,
        deleteAllReviews,
        deleteAllRestaurants
    } = props;


    // Setting up the basic local state needed to run MainNav
    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
    const [basicActive, setBasicActive] = useState();
    const [searchInput, setSearchInput] = useState("");
    const [navExpanded, setNavExpanded] = useState(false);
    const [showNav, setShowNav] = useState(true);

    // Refs are used to hold current data within listeners
    const windowY = useRef(window?.scrollY);
    const navExpandedRef = useRef(false);

    // Application navigation objects
    const navigate = useNavigate();
    const location = useLocation();

    // Theme variables
    const buttonTheme = "outline-light";
    const backgroundTheme = "dark";
    const variantTheme = "dark";


    // This use effect will only execute one time when the view is 
    // initially loaded
    useEffect(() => {
        // Adding an event listener to monitor the page scroll
        window.addEventListener('scroll', hideNavbar);

        return () => {
            // Unsubscribing to the listener when the view is closed
            window.removeEventListener('scroll', hideNavbar);
        }
    }, []);


    // Handler for the LogoutConfirm modal
    const closeLogoutHandler = () => setShowLogoutConfirm(false);


    // The hideNavbar function will either show or hide the navBar 
    // depending on the windows Y coordinate and weather the user 
    // is scrolling up or down
    const hideNavbar = () => {
        // The navbar will only hide if the navbar is not expanded
        if (!navExpandedRef.current) {
            // If the user is scrolling up the navbar will appear 
            // at the top of the view
            if (window.scrollY > windowY.current) {
                // Showing the navbar
                setShowNav(true)
                // resetting the last windowY coordinates
                windowY.current = window.scrollY;
            }
            // Else the user is scrolling down so the navbar is 
            // hidden
            else {
                // Hiding the navbar
                setShowNav(false)
                // resetting the last windowY coordinates
                windowY.current = window.scrollY;
            }
        }
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

        // Closing the nav if open
        if (navExpanded) {
            setToggle();
        }
    }


    // Setting the active nav element
    const setActive = (value) => {
        if (value === basicActive) return;
        setBasicActive(value);
    }


    // The setToggle function works with the navBar and will allow it 
    // to expand when true or contract when false
    const setToggle = () => {
        // Setting the state
        setNavExpanded(!navExpanded);

        // Setting the ref to be used in the listener
        navExpandedRef.current = !navExpandedRef.current;
    }


    // Handler for the LogoutConfirm modal
    const showLogoutHandler = () => setShowLogoutConfirm(true);


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


    // Handles the click to show the modal windows when the logout button is pressed
    const logoutHandler = () => {
        // Closing the nav if open
        if (navExpanded) {
            setToggle();
        }
        
        // console.log("logout button pressed");
        showLogoutHandler();
    }


    // The showAdmin render function will only show the Admin button if the 
    // user is logged in and had an admin permission
    const showAdmin = () => {
        // If there is a user in state
        if (users) {
            // The first user in the array is deconstructed, they are the 
            // user who's session this is
            const [currentUser] = users;

            // If the user is both logged in and an admin
            if (
                currentUser.isLoggedIn &&
                currentUser.auth.permission.permissionName === "admin") {
                // The Admin button is returned
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


    // The showLoginControls render function will render the links 
    // dependent on if the user is logged in or logged out
    const showLoginControls = () => (
        <>
            {checkLogin(users) ?
                (
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
                )
            }
        </>
    )


    return (
        <Navbar
            id="mainNav"
            onToggle={setToggle}
            className="px-2 rounded-bottom"
            style={showNav ?
                { position: "responsive" } :
                { position: "sticky", top: "0", bottom: "0", zIndex: "1" }
            }
            bg={backgroundTheme}
            variant={variantTheme}
            collapseOnSelect
            expanded={navExpanded}
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
            <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end" >
                <Nav fill className="mb-auto pe-3"
                    activeKey={location.pathname.substring(0, location.pathname.lastIndexOf('/'))}
                    onSelect={(key) => setActive(key)}>

                    {/* Show dev nav if we are not on prod env */}
                    {(isProd === false) && <DevelopersNav />}

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
                    <Button type="submit" variant={buttonTheme} >
                        Search
                    </Button>
                </Form>
                <ModalLogoutConfirm
                    show={showLogoutConfirm}
                    logout={logoutAccount}
                    closeHandler={closeLogoutHandler} />
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