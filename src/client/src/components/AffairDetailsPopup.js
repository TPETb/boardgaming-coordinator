import React from 'react';
import { useRecoilValue, } from 'recoil';
import CurrentUserAtom from "../recoil/atoms/CurrentUserAtom";
import { Modal } from "react-bootstrap";
import VisibleAffairsAtom from "../recoil/atoms/VisibleAffairsAtom";
import AffairEditPopup from "./AffairEditPopup";
import AffairViewPopup from "./AffairViewPopup";

function AffairDetailsPopup({id, onClose}) {
    const currentUser = useRecoilValue(CurrentUserAtom);
    const affairs = useRecoilValue(VisibleAffairsAtom);

    const currentAffair = affairs.find((element) => element.id === id);

    return (<Modal
        show={true}
        keyboard={true}
        onHide={onClose}
    >
        <Modal.Header closeButton>
            <Modal.Title>Affair Details</Modal.Title>
        </Modal.Header>

        {(currentUser.role === 'Admin' || currentAffair.host.id === currentUser.name) &&
            <AffairEditPopup onClose={onClose} affair={currentAffair}></AffairEditPopup>
        }
        {(currentUser.role !== 'Admin' && currentAffair.host.id !== currentUser.name) &&
            <AffairViewPopup onClose={onClose} affair={currentAffair}></AffairViewPopup>
        }
    </Modal>);
}

export default AffairDetailsPopup;
