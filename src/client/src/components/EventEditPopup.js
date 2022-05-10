import React, { useState } from 'react';
import {
    RecoilRoot, atom, selector, useRecoilState, useRecoilValue,
} from 'recoil';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'
import CurrentUserAtom from "../recoil/atoms/CurrentUserAtom";
import { InputGroup } from "react-bootstrap";

function EventEditPopup({ event, onClose }) {
    const user = useRecoilValue(CurrentUserAtom);
    const [eventName, setEventName] = useState(event.title);
    const [slots, setSlots] = useState(event.slots);
    const [comment, setComment] = useState(event.comment);

    const saveChanges = () => {
        onClose();
    };

    return (
        <>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="name">
                        <Form.Label>Game name</Form.Label>
                        <InputGroup>
                            <InputGroup.Text>#</InputGroup.Text>
                            <Form.Control type="text" placeholder="#name"
                                          value={eventName}
                                          onChange={(event) => setEventName(event.target.value)} />
                        </InputGroup>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="slots">
                        <Form.Label>Slots</Form.Label>
                        <Form.Control type="number" placeholder=""
                                      value={slots}
                                      onChange={(event) => setSlots(event.target.value)} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="comment">
                        <Form.Label>Comment</Form.Label>
                        <Form.Control type="text" placeholder=""
                                      as="textarea" rows={3}
                                      value={comment}
                                      onChange={(event) => setComment(event.target.value)} />
                    </Form.Group>
                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={saveChanges}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </>
    );
}

export default EventEditPopup;
