import React from 'react';
import { useRecoilState, } from 'recoil';
import CurrentUserAtom from "../recoil/atoms/CurrentUserAtom";
import { Col, Dropdown, DropdownButton, Row } from 'react-bootstrap';
import { destructUserSession } from "../initializers/UserSession";

function Header() {
    const [user, setUser] = useRecoilState(CurrentUserAtom);

    const doLogout = async () => {
        await destructUserSession()
        window.location.reload();
    }

    return (
        <Row className="justify-content-end">
            <Col xs={"au"} style={{textAlign: "right"}}>
                {user && (
                    <DropdownButton variant={'secondary'} id="dropdown-basic-button" title="Profile">
                        <Dropdown.Item onClick={()=>{}}>{user.name}</Dropdown.Item>
                        <Dropdown.Item onClick={()=>{}}>{user.role}</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item onClick={doLogout}>Logout</Dropdown.Item>
                    </DropdownButton>
                )}
            </Col>
        </Row>
    );
}

export default Header;
