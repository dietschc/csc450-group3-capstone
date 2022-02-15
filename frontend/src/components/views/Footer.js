// Initially Created by: Devin Brueberg
// CSC450 Capstone
// Restaurant Club - Footer.js
// January 24, 2022
// Last Edited (Initials, Date, Edits):
// (CPD, 1/29/22, Style footer and setup getYear variable)

// Using React library in order to build components 
// for the app and importing needed components
import React, { useLayoutEffect, useRef, useState, useCallback, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, ListGroup } from 'react-bootstrap';

function Footer(props) {
    const currentYear = new Date().getFullYear();

    return (
        <Container fluid as="footer" className="fixed-bottom">
            <ListGroup>
                <ListGroup.Item className="border-0 text-center text-muted pb-0">
                    CSC 450 Group 3 Spring 2022
                </ListGroup.Item>
                <ListGroup.Item className="border-0 text-center text-muted pt-0">
                    Updated @{currentYear}
                </ListGroup.Item>
            </ListGroup>
        </Container>
    );
}

// Exporting the component
export default Footer;