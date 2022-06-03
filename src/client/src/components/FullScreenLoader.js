import React from 'react';
import { Spinner } from "react-bootstrap";


function FullScreenLoader() {
    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            zIndex: '99999',
            width: '100%',
            height: '100%',
            background: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <Spinner animation="border" variant={'light'} />
        </div>
    );
}

export default FullScreenLoader;
