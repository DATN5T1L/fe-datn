'use client'
import React, { ReactNode } from 'react';

interface BodyProps {
    children?: ReactNode;
    gap?: string;
    justifyContent?: string
}

const BodyContainer: React.FC<BodyProps> = ({ children, gap = '10px', justifyContent = 'space-between' }) => {
    return (
        <>
            <main className='main-container' style={{ gap, justifyContent }}>
                {children}
            </main>
        </>
    );
}

export default BodyContainer;