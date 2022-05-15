import axios from "axios";
import React, { useState } from 'react';
import { useRecoilState, } from 'recoil';
import { Button, Form, InputGroup, Modal } from 'react-bootstrap';
import CurrentUserAtom from "../recoil/atoms/CurrentUserAtom";

function LoginPopup() {
    const [user, setUser] = useRecoilState(CurrentUserAtom);
    const [username, setUsername] = useState(window.localStorage.getItem('username'));
    const [role, setRole] = useState('Admin');

    const doLogin = async () => {
        const {data} = await axios.post('/user/login', {
            username
        });

        window.localStorage.setItem('username', username);

        axios.defaults.headers.common['Authorization'] = data.token;

        setUser({
            name: '@' + data.name,
            loggedIn: true,
            role,
        });
    };

    return (<Modal
        show={true}
        backdrop="static"
        keyboard={false}
    >
        <Modal.Body>
            <Form>
                <Form.Group className="mb-3" controlId="name">
                    <Form.Label>Telegram name</Form.Label>
                    <InputGroup>
                        <InputGroup.Text>@</InputGroup.Text>
                        <Form.Control type="text" placeholder="name"
                                      value={username}
                                      onChange={(Affair) => setUsername(Affair.target.value)} />
                    </InputGroup>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Label>Role</Form.Label>
                    <Form.Check type="radio" name="role" label="Admin" checked={role === 'Admin'} onChange={() => setRole('Admin')} />
                    <Form.Check type="radio" name="role" label="Authorised" checked={role === 'Authorised'} onChange={() => setRole('Authorised')} />
                    <Form.Check type="radio" name="role" label="Guest" checked={role === 'Guest'} onChange={() => setRole('Guest')} />
                </Form.Group>

                <Button variant="primary" type="button" onClick={doLogin}>
                    Login
                </Button>
            </Form>
        </Modal.Body>
    </Modal>);
}

export default LoginPopup;
