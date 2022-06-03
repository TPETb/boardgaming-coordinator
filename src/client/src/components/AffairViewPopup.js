import React, { useState } from 'react';
import { Badge, Button, Container, Modal, Row, Table } from "react-bootstrap";
import { useRecoilState, useRecoilValue, } from 'recoil';
import CurrentUserAtom from "../recoil/atoms/CurrentUserAtom";
import VisibleAffairsAtom from "../recoil/atoms/VisibleAffairsAtom";
import joinAffair from "../persistence/joinAffair";
import fetchAffairs from "../persistence/fetchAffairs";
import leaveAffair from "../persistence/leaveAffair";
import FullScreenLoader from "./FullScreenLoader";
import dayjs from "dayjs";

function AffairViewPopup({ affair, onClose }) {
    const currentUser = useRecoilValue(CurrentUserAtom);
    const [visibleAffairs, setVisibleAffairs] = useRecoilState(VisibleAffairsAtom);

    const [loading, setLoading] = useState(false);

    const join = async () => {
        setLoading(true);

        await joinAffair({
            affair: affair.id,
            user: currentUser.id,
        });

        setVisibleAffairs(await fetchAffairs());

        setLoading(false);
    };

    const leave = async () => {
        setLoading(true);

        await leaveAffair(affair.participants.find(({ id }) => id === currentUser.id).pivot.id);

        setVisibleAffairs(await fetchAffairs());

        setLoading(false);
    };

    return (
        <>
            {loading && <FullScreenLoader />}

            <Modal.Body>
                <Table borderless striped>
                    <tbody>
                    <tr>
                        <td>Game</td>
                        <td>{affair.title}</td>
                    </tr>
                    <tr>
                        <td>When</td>
                        <td>{dayjs(affair.start).format('dddd, MMMM D, hh:mm')}</td>
                    </tr>
                    <tr>
                        <td>Host</td>
                        <td>
                            <div style={{ fontSize: "1.1rem" }}>
                                <Badge pill bg={'info'}>@{affair.host.name}</Badge>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>Slots</td>
                        <td>{affair.slots}</td>
                    </tr>
                    <tr>
                        <td>Comment</td>
                        <td>{affair.comment}</td>
                    </tr>
                    <tr>
                        <td>Participants</td>
                        <td>
                            <div style={{ fontSize: "1.1rem" }}>
                                {affair.participants.map(user => (
                                    <Badge key={user.id} pill bg={'success'} style={{ marginRight: '5px' }}>@{user.name}</Badge>
                                ))}
                            </div>
                        </td>
                    </tr>
                    </tbody>
                </Table>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    Close
                </Button>

                {affair.participants.some(({ id }) => id === currentUser.id) && (
                    <Button variant={'danger'} onClick={leave}>Leave</Button>
                )}

                {!affair.participants.some(({ id }) => id === currentUser.id) && (
                    <Button variant={'success'} onClick={join}>Join</Button>
                )}
            </Modal.Footer>
        </>
    );
}

export default AffairViewPopup;
