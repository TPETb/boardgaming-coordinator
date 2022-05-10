import React, { useState } from 'react';
import { useRecoilState, } from 'recoil';
import { Form, InputGroup, Button, Modal } from 'react-bootstrap';
import CurrentUserAtom from "../recoil/atoms/CurrentUserAtom";

function LoginPopup() {
    const [user, setUser] = useRecoilState(CurrentUserAtom);

    const [username, setUsername] = useState('');
    const [role, setRole] = useState('Admin');

    const doLogin = () => {
        setUser({
            name: '@' + username.replaceAll(/[^a-zA-Z0-9_]/g, ''),
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
                                      onChange={(event) => setUsername(event.target.value)} />
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
