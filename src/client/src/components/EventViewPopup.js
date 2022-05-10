import React, { useState } from 'react';
import {
    RecoilRoot, atom, selector, useRecoilState, useRecoilValue,
} from 'recoil';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'
import CurrentUserAtom from "../recoil/atoms/CurrentUserAtom";
import { Col, InputGroup } from "react-bootstrap";

function EventViewPopup({event, onClose}) {
    const currentUser = useRecoilValue(CurrentUserAtom);

    return (
        <Modal.Body>
            <Container fluid>
                <Row>
                    <Col>{event.title}</Col>
                    <Col>{event.creator.id}</Col>
                    <Col>{event.slots}</Col>
                </Row>
                <Row>
                    <Col>{event.comment}</Col>
                </Row>
                <Row>
                    <h4>Joined:</h4>
                    {event.joined.map(user => (
                        <>{user.id}</>
                    ))}
                </Row>
            </Container>
        </Modal.Body>
    );
}

export default EventViewPopup;
