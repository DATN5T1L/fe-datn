'use client'
import React, { ReactNode } from 'react';

interface MainHomeProps {
    children?: ReactNode;
}

const MainContainer: React.FC<MainHomeProps> = ({ children }) => {
    return (
        <>
            <main className='main-content'>
                {children}
            </main>
        </>
    );
}

export default MainContainer;