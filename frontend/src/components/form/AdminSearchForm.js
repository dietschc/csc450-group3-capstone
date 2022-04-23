// Initially Created by: Devin Brueberg
// CSC450 Capstone
// Restaurant Club - AdminSearchForm.js
// March 6, 2022
// Last Edited (Initials, Date, Edits):
//  (DAB, 4/10/2022, Fixed WAVE label errors in radio buttons)

// Using React library in order to build components 
// for the app and importing needed components
import React from 'react'
import { Button, Form, FormControl, FormGroup, Row, Col, ButtonGroup } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'

/**
 * The AdminSearchForm allows the admin to perform two searches selected by radio buttons. 
 * The first is a restaurant search by restaurantName. The restaurants can be viewed, edited, or deleted.
 * The second is a user search by userName. The users can be viewed, banned, or deleted.
 * 
 * @param { rating } props 
 * @returns 
 */
function AdminSearchForm(props) {
    // The form component specific props will be assigned and 
    // used to process the form element. 
    const { setSearchInput, onChangeHandler, searchSubmitHandler, searchInput } = props;

    return (
        <Form className="px-2" onSubmit={searchSubmitHandler}>
            <Row>
                <FormGroup as={Col} sm={8} className="d-flex justify-content-around align-items-center px-1 mb-3">
                    <FormControl
                        type="search"
                        name="search"
                        value={searchInput}
                        onInput={e => setSearchInput(e.target.value)}
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
                    onChange={e => onChangeHandler(e)}>
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
                        id="searchOptionRadio2"
                    />
                </ButtonGroup>
            </Row>
        </Form>
    )
}

// Exporting the component
export default AdminSearchForm;