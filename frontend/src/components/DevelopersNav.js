// Initially Created by: Devin Brueberg
// CSC450 Capstone
// Restaurant Club - DevelopersNav.js
// February 7, 2022
// Last Edited (Initials, Date, Edits):
//  (DAB, 03/13/2022, Turned DevelopersNav into drop down nav)

// Using React library in order to build components 
// for the app and importing needed components
import React from 'react';
import { Link } from 'react-router-dom';
import { NavDropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'

/**
 * A TEMPORARY NAV FOR DEVELOPERS
 * 
 * @param {*} props 
 * @returns 
 */
function DevelopersNav(props) {
    return (
        <NavDropdown title="Dev Nav" variant="flush">
            <NavDropdown.Item className="text-center text-muted">
                <Link className="text-decoration-none text-reset" to="/restaurant">
                    Restaurant
                </Link>
            </NavDropdown.Item>

            <NavDropdown.Item className="text-center text-muted">
                <Link className="text-decoration-none text-reset" to="/chat">
                    Chat
                </Link>
            </NavDropdown.Item>

            <NavDropdown.Item className="text-center text-muted">
                <Link className="text-decoration-none text-reset" to="/editAccount">
                    Edit Account
                </Link>
            </NavDropdown.Item>

            <NavDropdown.Item className="text-center text-muted">
                <Link className="text-decoration-none text-reset" to="/editRestaurant">
                    Edit Restaurant
                </Link>
            </NavDropdown.Item>

            <NavDropdown.Item className="text-center text-muted">
                <Link className="text-decoration-none text-reset" to="/login">
                    Login
                </Link>
            </NavDropdown.Item>

            <NavDropdown.Item className="text-center text-muted">
                <Link className="text-decoration-none text-reset" to="/review">
                    Review
                </Link>
            </NavDropdown.Item>

            <NavDropdown.Item className="text-center text-muted">
                <Link className="text-decoration-none text-reset" to="/search">
                    Search
                </Link>
            </NavDropdown.Item>

            <NavDropdown.Item className="text-center text-muted">
                <Link className="text-decoration-none text-reset" to="/userDashboard">
                    User Dashboard
                </Link>
            </NavDropdown.Item>

            <NavDropdown.Item className="text-center text-muted">
                <Link className="text-decoration-none text-reset" to="/Admin">
                    Admin
                </Link>
            </NavDropdown.Item>
        </NavDropdown>
    )

}

// Exporting the component
export default DevelopersNav;