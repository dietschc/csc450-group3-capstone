// Initially Created by: Devin Brueberg
// CSC450 Capstone
// Restaurant Club - Chat.js
// January 24, 2022
// Last Edited (Initials, Date, Edits):

// Using React library in order to build components 
// for the app and importing needed components
import React from 'react';
import { Link } from 'react-router-dom';

function Footer(props) {
    return (
        <div className="footer">
            <h1>
                Welcome to the Footer!
            </h1>
            <Link to="/">Back to Home</Link>
        </div>
    )
}

// Exporting the component
export default Footer;