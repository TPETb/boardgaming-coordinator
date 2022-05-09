import React, { useState } from 'react';
import CalendarWrapper from './CalendarWrapper';
import LoginPopup from './LoginPopup';
import { useRecoilValue, } from 'recoil';
import Header from './Header';
import CurrentUserAtom from '../recoil/atoms/CurrentUserAtom';
import { Container } from 'react-bootstrap';

function MainScreen() {
    const user = useRecoilValue(CurrentUserAtom);

    const [value, onChange] = useState(new Date());

    return (
        <Container fluid>
            <Header></Header>

            <CalendarWrapper onChange={onChange} value={value} />

            {!user.loggedIn && (<LoginPopup></LoginPopup>)}
        </Container>
    );
}

export default MainScreen;
