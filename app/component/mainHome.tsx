'use client'
import React, { ReactNode } from 'react';

interface MainHomeProps {
    children?: ReactNode;
}

const MainHome: React.FC<MainHomeProps> = ({ children }) => {
    return (
        <>
            <main className='main-content'>
                {children}
            </main>
        </>
    );
}

export default MainHome;