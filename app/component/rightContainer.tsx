'use client'
import React from 'react';
import { Container, Nav } from 'react-bootstrap';


interface RightContainerProps {
    height?: string;
    children: React.ReactNode;
}

const RightContainer: React.FC<RightContainerProps> = ({ height = '1109px', children }) => {
    return (
        <>
            <Nav className='right-slide-bar' style={{ height }}>
                {children}
            </Nav>
        </>
    );
}

export default RightContainer;