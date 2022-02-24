// Initially Created by: Devin Brueberg
// CSC450 Capstone
// Restaurant Club - Chat.js
// January 27, 2022
// Last Edited (Initials, Date, Edits):
//  (DAB, 01/28/2022, Upgraded the color scheme)
//  (DAB, 01/28/2022, Added state to nav)

// Using React library in order to build components 
// for the app and importing needed components
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar, Button, Nav, Form, Container, FormControl } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useSelector, connect } from 'react-redux';
import { deleteUser } from '../../actions/users';

function MainNav(props) {
    const [basicActive, setBasicActive] = useState();
    const navigate = useNavigate();

    // Get user state from props
    const { deleteUser, users } = props;

    const checkLogin = () => {
        if (users.length > 0 && typeof (users[0].isLoggedIn) !== 'undefined' && users[0].isLoggedIn != null) {
            // console.log("Not Undefined and Not Null " + users[0].isLoggedIn);
            return true;
        } else {
            // console.log('Undefined or Null')
            return false;
        }
    }

    const setActive = (value) => {
        if (value === basicActive) return;
        console.log("Navigating to " + value)
        setBasicActive(value);
    }

    const searchHandler = () => {
        navigate("search");
        setActive("none")
    }

    const logoutAccount = () => {
        // This will remove the user from state
        // deleteUser(users[0].id);
    }

    const buttonTheme = "outline-primary";
    const backgroundTheme = "light";
    const variantTheme = "light";

    return (
        <Container fluid>
            <Navbar
                className="mainNav px-2"
                bg={backgroundTheme}
                variant={variantTheme}
                collapseOnSelect
                expand="md">
                <Navbar.Brand>
                    <img
                        src="../logo.gif"
                        width="90"
                        height="90"
                        className="flex-begin"
                        alt="Restaurant Club Logo"
                    />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
                    <Nav fill variant="pills" bg="dark" className="mb-auto pe-3"
                        activeKey={basicActive}
                        onSelect={(key) => setActive(key)}>
                        <Nav.Item className="mx-3">
                            <LinkContainer to="/">
                                <Nav.Link>
                                    Home
                                </Nav.Link>
                            </LinkContainer>

                        </Nav.Item>
                        <Nav.Item className="mx-3">
                            <LinkContainer to="/userDashboard">
                                <Nav.Link>
                                    Dashboard
                                </Nav.Link>
                            </LinkContainer>

                        </Nav.Item>
                        <Nav.Item className="mx-3">

                            <LinkContainer to="/login">
                                <Nav.Link>
                                    {checkLogin() ? <div onClick={logoutAccount}>Logout</div> : "Login"}
                                </Nav.Link>
                            </LinkContainer>

                        </Nav.Item>
                    </Nav>
                    <Form className="d-flex">
                        <FormControl
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                        />
                        <Button variant={buttonTheme} onClick={() => searchHandler()}>
                            Search
                        </Button>
                    </Form>
                </Navbar.Collapse>
            </Navbar>
        </Container>
    )
}

// Mapping the redux store states to props
const mapStateToProps = state =>
({
    users: [...state.users]
});

// Exporting the component
// export default MainNav;
export default connect(mapStateToProps, { deleteUser })(MainNav);