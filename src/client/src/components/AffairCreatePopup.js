import React from 'react';
import { useRecoilState, useRecoilValue, } from 'recoil';
import CurrentUserAtom from "../recoil/atoms/CurrentUserAtom";
import { InputGroup, Modal } from "react-bootstrap";
import VisibleAffairsAtom from "../recoil/atoms/VisibleAffairsAtom";
import AvailableGamesAtom from "../recoil/atoms/AvailableGamesAtom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import createGame from "../persistence/createGame";
import createAffair from "../persistence/createAffair";

function AffairCreatePopup({ start, onClose }) {
    const currentUser = useRecoilValue(CurrentUserAtom);

    const [availableGames, setAvailableGames] = useRecoilState(AvailableGamesAtom);
    const [visibleAffairs, setVisibleAffairs] = useRecoilState(VisibleAffairsAtom);

    const [gameName, setGameName] = useState(availableGames[0].name);
    const [slots, setSlots] = useState(1);
    const [comment, setComment] = useState('');

    const onCreateClick = async () => {
        const newAffair = await createAffair({
            gameName,
            slots,
            comment,
            start,
        });

        // todo add newAffair into VisibleAffairsAtom
    };

    return (<Modal
        show={true}
        keyboard={true}
        onHide={onClose}
    >
        <Modal.Header closeButton>
            <Modal.Title>Create Affair</Modal.Title>
        </Modal.Header>

        <Modal.Body>
            <Form>
                <Form.Group className="mb-3" controlId="start">
                    <Form.Label>Starts At:</Form.Label>
                    <Form.Control type="text"
                                  value={start}
                                  readOnly={true} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="name">
                    <Form.Label>Game name</Form.Label>
                    <InputGroup>
                        <InputGroup.Text>#</InputGroup.Text>
                        <Form.Select value={gameName}
                                     onChange={(event) => setGameName(event.target.value)}>
                            {availableGames.map((game) => (<option>{game.name}</option>))}
                        </Form.Select>
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

            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={onCreateClick}>
                    Create
                </Button>
            </Modal.Footer>
        </Modal.Body>
    </Modal>);
}

export default AffairCreatePopup;
