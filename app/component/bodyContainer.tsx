'use client'
import React, { ReactNode } from 'react';

interface BodyProps {
    children?: ReactNode;
    gap?: string;
}

const BodyContainer: React.FC<BodyProps> = ({ children, gap = '10px' }) => {
    return (
        <>
            <main className='main-container' style={{ gap }}>
                {children}
            </main>
        </>
    );
}

export default BodyContainer;