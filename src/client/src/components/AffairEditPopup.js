import React, { useState } from 'react';
import { useRecoilState, useRecoilValue, } from 'recoil';
import { Badge, Button, CloseButton, Form, InputGroup, Modal } from "react-bootstrap";
import { DateTimePicker } from "@mui/x-date-pickers";
import { DateTime as LDateTime } from "luxon";
import TextField from "@mui/material/TextField";
import CurrentUserAtom from "../recoil/atoms/CurrentUserAtom";
import AvailableGamesAtom from "../recoil/atoms/AvailableGamesAtom";
import VisibleAffairsAtom from "../recoil/atoms/VisibleAffairsAtom";
import FullScreenLoader from "./FullScreenLoader";
import updateAffair from "../persistence/updateAffair";
import joinAffair from "../persistence/joinAffair";
import fetchAffairs from "../persistence/fetchAffairs";
import leaveAffair from "../persistence/leaveAffair";

function AffairEditPopup({ affair, onClose }) {
    const currentUser = useRecoilValue(CurrentUserAtom);

    const [availableGames, setAvailableGames] = useRecoilState(AvailableGamesAtom);
    const [visibleAffairs, setVisibleAffairs] = useRecoilState(VisibleAffairsAtom);

    const [start, setStart] = useState(affair.start);
    const [gameName, setGameName] = useState(affair.game.name);
    const [slots, setSlots] = useState(affair.slots);
    const [comment, setComment] = useState(affair.comment);

    const [loading, setLoading] = useState(false);

    const saveChanges = async () => {
        setLoading(true);

        await updateAffair(affair.id, {
            gameName, slots, comment, start
        });

        setLoading(false);
    };

    const join = async () => {
        setLoading(true);

        await joinAffair({
            affair: affair.id,
            user: currentUser.id,
        });

        setVisibleAffairs(await fetchAffairs());

        setLoading(false);
    };

    const kick = async ({id, name, pivot}) => {
        if (window.confirm(`Kick @${name} from affair?`)) {
            setLoading(true);

            await leaveAffair(pivot.id);

            setVisibleAffairs(await fetchAffairs());

            setLoading(false);
        }
    };

    return (
        <>
            {loading && <FullScreenLoader />}

            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="start">
                        <DateTimePicker
                            label={'Starts At:'}
                            ampm={false}
                            onChange={(newStart) => {
                                setStart(newStart)
                            }}
                            minDateTime={LDateTime.now()}
                            value={start}
                            renderInput={(props) => <TextField {...props} />}
                            minutesStep={30}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="name">
                        <Form.Label>Game</Form.Label>
                        <InputGroup>
                            <InputGroup.Text>#</InputGroup.Text>
                            <Form.Select value={gameName}
                                         onChange={(event) => setGameName(event.target.value)}>
                                {availableGames.map((game) => (<option key={game.id}>{game.name}</option>))}
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

                    <Form.Group>
                        <Form.Label>Participants</Form.Label>
                        <div style={{ fontSize: "1.1rem" }}>
                            {affair.participants.map(user => (
                                <Badge key={user.id} pill bg={'success'} style={{ marginRight: '5px' }}>
                                    @{user.name}
                                    <CloseButton variant="white" onClick={() => kick(user)} style={{fontSize: '0.5rem'}} />
                                </Badge>
                            ))}
                        </div>
                    </Form.Group>
                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    Close
                </Button>

                {!affair.participants.some(({ id }) => id === currentUser.id) && (
                    <Button variant={'success'} onClick={join}>Join</Button>
                )}

                <Button variant="primary" onClick={saveChanges}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </>
    );
}

export default AffairEditPopup;
