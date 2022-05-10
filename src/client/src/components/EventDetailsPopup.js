import React, { useState } from 'react';
import {
    RecoilRoot, atom, selector, useRecoilState, useRecoilValue,
} from 'recoil';
import CurrentUserAtom from "../recoil/atoms/CurrentUserAtom";
import { InputGroup, Form, Button, Modal } from "react-bootstrap";
import VisibleEventsAtom from "../recoil/atoms/VisibleEventsAtom";
import EventEditPopup from "./EventEditPopup";
import EventViewPopup from "./EventViewPopup";

function EventDetailsPopup({id, onClose}) {
    const currentUser = useRecoilValue(CurrentUserAtom);
    const events = useRecoilValue(VisibleEventsAtom);

    const currentEvent = events.find((element) => element.id === id);

    return (<Modal
        show={true}
        keyboard={true}
        onHide={onClose}
    >
        <Modal.Header closeButton>
            <Modal.Title>Event Details</Modal.Title>
        </Modal.Header>

        {(currentUser.role === 'Admin' || currentEvent.creator.id === currentUser.name) &&
            <EventEditPopup onClose={onClose} event={currentEvent}></EventEditPopup>
        }
        {(currentUser.role !== 'Admin' && currentEvent.creator.id !== currentUser.name) &&
            <EventViewPopup onClose={onClose} event={currentEvent}></EventViewPopup>
        }
    </Modal>);
}

export default EventDetailsPopup;
