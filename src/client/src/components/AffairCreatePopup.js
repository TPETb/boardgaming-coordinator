import React, { useState } from 'react';
import { useRecoilState, useRecoilValue, } from 'recoil';
import CurrentUserAtom from "../recoil/atoms/CurrentUserAtom";
import { Button, Form, InputGroup, Modal } from "react-bootstrap";
import VisibleAffairsAtom from "../recoil/atoms/VisibleAffairsAtom";
import AvailableGamesAtom from "../recoil/atoms/AvailableGamesAtom";
import { DateTimePicker } from '@mui/x-date-pickers';
import TextField from '@mui/material/TextField';
import createAffair from "../persistence/createAffair";
import { DateTime } from "luxon";

function AffairCreatePopup({ defaultStart, close }) {
    const currentUser = useRecoilValue(CurrentUserAtom);

    const [start, setStart] = useState(defaultStart);

    const [availableGames, setAvailableGames] = useRecoilState(AvailableGamesAtom);
    const [visibleAffairs, setVisibleAffairs] = useRecoilState(VisibleAffairsAtom);

    const [gameName, setGameName] = useState(availableGames[0].name);
    const [slots, setSlots] = useState(1);
    const [comment, setComment] = useState('');

    const onCreateClick = async () => {
        if (+start < +DateTime.now()) {
            alert("Нельзя создавать событие в прошлом... Ну серьезно...");
            return;
        }

        const newAffair = await createAffair({
            gameName, slots, comment, start, participants: [],
        });

        setVisibleAffairs(visibleAffairs.concat([newAffair]));

        close();
    };

    if (!currentUser.id) {
        return null;
    }

    return (
        <Modal show={true} keyboard={true} onHide={close}>
            <Modal.Header closeButton>
                <Modal.Title>Создать событие</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="start">
                        <DateTimePicker
                            label={'Начало в:'}
                            ampm={false}
                            onChange={(newStart) => {
                                setStart(newStart)
                            }}
                            minDateTime={DateTime.now()}
                            value={start}
                            renderInput={(props) => <TextField {...props} />}
                            minutesStep={30}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="name">
                        <Form.Label>Игра</Form.Label>
                        <InputGroup>
                            <InputGroup.Text>#</InputGroup.Text>
                            <Form.Select value={gameName}
                                         onChange={(event) => setGameName(event.target.value)}>
                                {availableGames.map((game) => (<option key={game.id}>{game.name}</option>))}
                            </Form.Select>
                        </InputGroup>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="slots">
                        <Form.Label>Максимальное число участников</Form.Label>
                        <Form.Control type="number" placeholder=""
                                      value={slots}
                                      onChange={(event) => setSlots(event.target.value)} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="comment">
                        <Form.Label>Комментарий</Form.Label>
                        <Form.Control type="text" placeholder=""
                                      as="textarea" rows={3}
                                      value={comment}
                                      onChange={(event) => setComment(event.target.value)} />
                    </Form.Group>
                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={close}>
                    Отмена
                </Button>

                <Button variant="primary" onClick={onCreateClick}>
                    Создать
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default AffairCreatePopup;
