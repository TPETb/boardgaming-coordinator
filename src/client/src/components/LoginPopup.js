import axios from "axios";
import React, { useState } from 'react';
import { Button, Form, InputGroup, Modal } from 'react-bootstrap';
import TelegramLoginButton from 'react-telegram-login';
import { initUserSession } from "../initializers/UserSession";

function LoginPopup() {
    const [username, setUsername] = useState('');

    const doTelegramLogin = async (telegramResponse) => {
        const { data } = await axios.post('/user/login', telegramResponse);

        await initUserSession(data, false, true);
    };

    const doDevLogin = async (event) => {
        event.preventDefault();

        const { data } = await axios.post('/user/dev-login', {
            username,
        });

        await initUserSession(data, false, true);
    };

    const doGuestLogin = async () => {
        alert("Внимание! В режиме гостя нельзя создавать или присоединяться к событиям. Для выхода из этого решима просто перезагрузите страницу.");

        await initUserSession({
            name: 'Guest',
            role: 'guest',
            token: 'null,'
        }, false, false);
    }

    return (<Modal
        show={true}
        backdrop="static"
        keyboard={false}
    >
        <Modal.Body>
            <div style={{ textAlign: 'center' }}>
                <TelegramLoginButton dataOnauth={doTelegramLogin} botName={process.env.REACT_APP_TELEGRAM_BOT_USERNAME} />
                <br />
                - или -
                <br />
                <Button variant={'secondary'} onClick={doGuestLogin}>Я только посмотреть</Button>

                {process.env.NODE_ENV === 'development' && (
                    <Form onSubmit={doDevLogin}>
                        <hr />
                        <span>Это только на локалке показывается!</span>
                        <Form.Group className="mb-3" controlId="name">
                            <InputGroup>
                                <InputGroup.Text>@</InputGroup.Text>
                                <Form.Control type="text" placeholder="name"
                                              value={username}
                                              onChange={(event) => setUsername(event.target.value)} />
                            </InputGroup>
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Login
                        </Button>
                    </Form>
                )}
            </div>
        </Modal.Body>
    </Modal>);
}

export default LoginPopup;
