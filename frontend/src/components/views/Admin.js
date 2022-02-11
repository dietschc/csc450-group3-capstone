// Initially Created by: Devin Brueberg
// CSC450 Capstone
// Restaurant Club - Admin.js
// January 24, 2022
// Last Edited (Initials, Date, Edits):

// Using React library in order to build components 
// for the app and importing needed components
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Button, Nav, Form, Container, FormControl, FormGroup, Row, Col, ButtonGroup, ListGroup } from 'react-bootstrap';
import XLContainer from '../template/XLContainer';

function Admin(props) {
    // The mock state will be held as data
    const [data, setData] = useState(mockStateData);
    const [chatMessage, setChatMessage] = useState("");
    const [messageHistory, setMessageHistory] = useState(data.message);
    const [ searchOption, setSearchOption ] = useState();

    const { user, restaurant } = data;

    const searchSubmitHandler= (e) => {
        e.preventDefault();
        console.log("FORM SUBMITTED")
        console.log(e.target.search.value)
        console.log(e.target.searchOption.value)
        setSearchOption(e.target.searchOption.value)
    }

    const userSearch = (userName) => {
        let searchResults = user.filter((user) => user.
    }

    const restaurantSearch = (restaurantName) => {

    }

    
    return (
        <XLContainer>
            <h1>
                Admin
            </h1>
            <Form className="px-2" onSubmit={searchSubmitHandler}>
                <Row>
                    <FormGroup as={Col} sm={8} className="d-flex justify-content-around align-items-center px-1 mb-3">
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

                    <ListGroup className="justify-content-center px-0 mb-2">
                        <ListGroup.Item  className="border-3" style={{minHeight:"3rem"}} action>
                            <Row className="d-flex justify-content-between align-items-center">
                                <Col sm={6}>
                                    <div className="pb-1">
                                        User Name
                                    </div>
                                </Col>
                                <Col sm={6} className="d-flex justify-content-between">
                                    <Button className="mx-1" style={{width:"7rem"}}>
                                        Dashboard
                                    </Button>
                                    <Button className="mx-1" style={{width:"7rem"}}>
                                        Ban
                                    </Button>
                                    <Button className="mx-1" style={{width:"7rem"}}>
                                        Delete
                                    </Button>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                    </ListGroup>
                    <ListGroup className="justify-content-center px-0 mb-2">
                        <ListGroup.Item  className="border-3" style={{minHeight:"3rem"}} action>
                            <Row className="d-flex justify-content-between align-items-center">
                                <Col sm={6}>
                                    <Row>
                                        <Col xs={6} className="d-flex align-content-center pe-0">
                                            <div>
                                                Restaurant Name
                                            </div>
                                        </Col>
                                        <Col xs={6} 
                                        className="d-flex justify-content-end justify-content-sm-center ps-0">
                                            <div>
                                                Phone Number
                                            </div>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col sm={6} className="d-flex justify-content-between">
                                    <Button className="mx-1" style={{width:"7rem"}}>
                                        View
                                    </Button>
                                    <Button className="mx-1" style={{width:"7rem"}}>
                                        Edit
                                    </Button>
                                    <Button className="mx-1" style={{width:"7rem"}}>
                                        Delete
                                    </Button>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                    </ListGroup>
                    <Link to="/">Back to Home</Link>
                </XLContainer>
    )
}

// Exporting the component
export default Admin;