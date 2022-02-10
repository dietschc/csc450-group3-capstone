// Initially Created by: Devin Brueberg
// CSC450 Capstone
// Restaurant Club - Admin.js
// January 24, 2022
// Last Edited (Initials, Date, Edits):

// Using React library in order to build components 
// for the app and importing needed components
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Button, Nav, Form, Container, FormControl, FormGroup, Row, Col, ButtonGroup } from 'react-bootstrap';
import XLContainer from '../template/XLContainer';

function Admin(props) {
    const [ searchOption, setSearchOption ] = useState();
    const searchSubmitHandler= (e) => {
        e.preventDefault();
        console.log("FORM SUBMITTED")
        console.log(e.target.search.value)
        console.log(e.target.searchOption.value)
        setSearchOption(e.target.searchOption.value)
    }

    
    return (
        <XLContainer>
            <h1>
                Admin
            </h1>
            <Form onSubmit={searchSubmitHandler}>
                <Row>
                    <FormGroup as={Col} sm={8} className="d-flex justify-content-around align-items-center">
                        <FormControl
                        type="search"
                        name="search"
                        placeholder="Search"
                        className="me-2"
                        aria-label="Search"
                        />
                        <Button type="submit" variant="primary">
                            Search
                        </Button>
                    </FormGroup>
                    
                    <ButtonGroup as={Col} sm={4} 
                    className="d-flex justify-content-around align-items-center" 
                    name="searchOption" 
                    onChange={e => console.log(e.target.value)}>
                        <Form.Check
                        label="User"
                        name="searchOption"
                        type="radio"
                        value="user"
                        defaultChecked
                        id="searchOptionRadio1"
                        />
                        <Form.Check
                        label="Restaurant"
                        name="searchOption"
                        type="radio"
                        value="restaurant"
                        id="searchOptionRadio1"
                        />
                    </ButtonGroup>

                </Row>
                    </Form>
                    <Link to="/">Back to Home</Link>
                </XLContainer>
    )
}

// Exporting the component
export default Admin;