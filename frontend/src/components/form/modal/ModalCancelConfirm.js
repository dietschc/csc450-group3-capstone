// Initially Created by: Coleman Dietsch
// CSC450 Capstone
// Restaurant Club - ModalConfirmation.js
// February 5, 2022
// Last Edited (Initials, Date, Edits):

import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap';

function ModalConfirmation() {
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShowConfirmation = () => setShow(true);

	return (
		<>
			<Button className="ml-1 w-25"  onClick={handleShowConfirmation}>
				Clear
			</Button>

			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Are you sure?</Modal.Title>
				</Modal.Header>

				<Modal.Body>Are you sure you want to do clear everything you've filled in?</Modal.Body>
				<Modal.Footer>
					
					<Button variant="secondary" onClick={handleClose}>
						Cancel
					</Button>
					<Button variant="primary" onClick={handleClose}>
						Confirm
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
}

// Exporting the component
export default ModalConfirmation;