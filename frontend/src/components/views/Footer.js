// Initially Created by: Devin Brueberg
// CSC450 Capstone
// Restaurant Club - Footer.js
// January 24, 2022
// Last Edited (Initials, Date, Edits):
// (CPD, 1/29/22, Style footer and setup getYear variable)

// Using React library in order to build components 
// for the app and importing needed components
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'

const currentYear = new Date().getFullYear();

function Footer(props) {
    return (
        <footer className="fixed-bottom footer mt-auto py-3 bg-light text-center">
            <div class="container">
                <ul className="list-unstyled text-muted">
                    <li>CSC 450 Group 3 Spring 2022</li>
                    <li>Updated @{currentYear}</li>
                </ul>
            </div>
        </footer>
    )
}

// Exporting the component
export default Footer;