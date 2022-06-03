import React from 'react';
import CalendarWrapper from './CalendarWrapper';
import LoginPopup from './LoginPopup';
import { useRecoilValue, } from 'recoil';
import Header from './Header';
import CurrentUserAtom from '../recoil/atoms/CurrentUserAtom';
import { Container } from 'react-bootstrap';

function MainScreen() {
    const user = useRecoilValue(CurrentUserAtom);

    return (
        <Container fluid>
            <Header></Header>

            <CalendarWrapper/>

            {!user && (<LoginPopup></LoginPopup>)}
        </Container>
    );
}

export default MainScreen;
