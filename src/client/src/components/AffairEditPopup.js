import React, { useState } from 'react';
import { useRecoilValue, } from 'recoil';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'
import CurrentUserAtom from "../recoil/atoms/CurrentUserAtom";
import { InputGroup } from "react-bootstrap";

function AffairEditPopup({ affair, onClose }) {
    const user = useRecoilValue(CurrentUserAtom);
    const [affairName, setAffairName] = useState(affair.title);
    const [slots, setSlots] = useState(affair.slots);
    const [comment, setComment] = useState(affair.comment);

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
                                          value={affairName}
                                          onChange={(event) => setAffairName(event.target.value)} />
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

export default AffairEditPopup;
