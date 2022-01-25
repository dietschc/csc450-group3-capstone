// Initially Created by: Devin Brueberg
// CSC450 Capstone
// Restaurant Club - Whoops404.js
// January 24, 2022
// Last Edited (Initials, Date, Edits):

// Using React library in order to build components 
// for the app and importing needed components
import React from 'react';
import { Link } from 'react-router-dom';

function Whoops404() {
    return (
        <div className="whoops-404">
            <h1>
                404 - Page not found
            </h1>
            <Link to="/">Back to Home</Link>
        </div>
    )
}

// Exporting the component
export default Whoops404;