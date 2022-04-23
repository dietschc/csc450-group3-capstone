// Initially Created by: Devin Brueberg
// CSC450 Capstone
// Restaurant Club - Footer.js
// January 24, 2022
// Last Edited (Initials, Date, Edits):
// (CPD, 1/29/22, Style footer and setup getYear variable)
//  (DAB, 4/09/2022, Adjusted content for footer to hug bottom of page)

// Using React library in order to build components 
// for the app and importing needed components
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, ListGroup } from 'react-bootstrap';

/**
 * The footer will display the creating group and date edited of the Restaurant
 * Club project. 
 * 
 * @param {*} props 
 * @returns 
 */
function Footer(props) {
    // Setting the current year to display
    const currentYear = new Date().getFullYear();

    return (
        <Container fluid as="footer" className="p-0 d-flex align-content-center justify-content-center"
        style={{ position: "absolute", bottom: "0", height: "4rem"}}>
            <ListGroup className="d-flex align-content-center bg-dark w-100">
                <ListGroup.Item className="border-0 text-center text-light bg-dark pb-0">
                    CSC 450 Group 3 Spring 2022
                </ListGroup.Item>
                <ListGroup.Item className="border-0 text-center text-light bg-dark pt-0">
                    Updated @{currentYear}
                </ListGroup.Item>
            </ListGroup>
        </Container>
    )
}

// Exporting the component
export default Footer;