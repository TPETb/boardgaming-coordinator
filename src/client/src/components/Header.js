import React from 'react';
import { useRecoilState, } from 'recoil';
import CurrentUserAtom from "../recoil/atoms/CurrentUserAtom";
import { Col, Row } from 'react-bootstrap';

function Header() {
    const [user, setUser] = useRecoilState(CurrentUserAtom);

    return (
        <Row className="justify-content-end">
            <Col xs={"au"}>
                {user.name}
            </Col>
        </Row>
        );
}

export default Header;
