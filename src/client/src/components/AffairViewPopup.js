import React from 'react';
import { useRecoilValue, } from 'recoil';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Modal from 'react-bootstrap/Modal'
import CurrentUserAtom from "../recoil/atoms/CurrentUserAtom";
import { Col } from "react-bootstrap";

function AffairViewPopup({affair, onClose}) {
    const currentUser = useRecoilValue(CurrentUserAtom);

    return (
        <Modal.Body>
            <Container fluid>
                <Row>
                    <Col>{affair.title}</Col>
                    <Col>{affair.host.name}</Col>
                    <Col>{affair.slots}</Col>
                </Row>
                <Row>
                    <Col>{affair.comment}</Col>
                </Row>
                <Row>
                    <h4>Joined:</h4>
                    {affair.joined.map(user => (
                        <>{user.id}</>
                    ))}
                </Row>
            </Container>
        </Modal.Body>
    );
}

export default AffairViewPopup;
