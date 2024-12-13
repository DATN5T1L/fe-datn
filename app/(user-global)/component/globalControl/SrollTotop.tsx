"use client"
import React, { useState, useEffect } from 'react';
import c from '@public/styles/globalControl/Nav.module.css'
import { IconSroll } from '../icon/icons';
const ScrollToTopButton: React.FC = () => {
    const [isVisible, setIsVisible] = useState<boolean>(false);
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 200) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };
    return (
        <>
            {isVisible && (
                <button
                    onClick={scrollToTop}
                    className={c.buttonScrollto}
                    aria-label="Scroll to top"
                >
                    <IconSroll />
                </button>
            )}
        </>
    );
};

// Styles cho button


export default ScrollToTopButton;
