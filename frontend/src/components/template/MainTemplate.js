// Initially Created by: Devin Brueberg
// CSC450 Capstone
// Restaurant Club - MainTemplate.js
// January 28, 2022
// Last Edited (Initials, Date, Edits):

// Using React library in order to build components 
// for the app and importing needed components
import React from 'react';
import MainNav from '../views/MainNav';
import Footer from '../views/Footer';
import App from '../../App';
import 'bootstrap/dist/css/bootstrap.min.css'

// This function will build a page template that accepts 
// children sandwiched between the main navigation and 
// the footer
function MainTemplate() {

    return (
        <div className="page bg-light">
            <MainNav />
            <App/>
            <Footer/>
        </div>
    )
}

// Exporting the PageTemplate component
export default MainTemplate;