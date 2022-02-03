import React from 'react'
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'

function BodyContainer(props) {
    const children = props.children;
    
    return (
        <Container fluid className="text-muted" style={{ maxWidth: "500px" }}>
            {children}
        </Container>
    )  
}

export default BodyContainer;