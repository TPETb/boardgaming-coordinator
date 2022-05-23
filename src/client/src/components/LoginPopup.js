import axios from "axios";
import React, { useState } from 'react';
import { useRecoilState, } from 'recoil';
import { Button, Form, InputGroup, Modal } from 'react-bootstrap';
import CurrentUserAtom from "../recoil/atoms/CurrentUserAtom";
import TelegramLoginButton from 'react-telegram-login';

function LoginPopup() {
    const [user, setUser] = useRecoilState(CurrentUserAtom);
    const [username, setUsername] = useState(window.localStorage.getItem('username'));
    const [role, setRole] = useState('Admin');

    const doLogin = async (telegramResponse) => {
        const {data} = await axios.post('/user/login', telegramResponse);

        window.localStorage.setItem('username', telegramResponse.username);

        axios.defaults.headers.common['Authorization'] = data.token;

        setUser({
            name: '@' + data.name,
            loggedIn: true,
            role,
        });
    };

    const handleTelegramResponse = response => {
        console.log(response);
    }

    return (<Modal
        show={true}
        backdrop="static"
        keyboard={false}
    >
        <Modal.Body>
            <TelegramLoginButton dataOnauth={doLogin} botName="pratchet_bot" />
        </Modal.Body>
    </Modal>);
}

export default LoginPopup;
