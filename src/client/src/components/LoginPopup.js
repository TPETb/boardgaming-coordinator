import React, { useState } from 'react';
import {
    RecoilRoot, atom, selector, useRecoilState, useRecoilValue,
} from 'recoil';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'
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
                        <Form.Control type="text" placeholder="@name" onChange={(event) => setUsername(event.target.value)} />
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
