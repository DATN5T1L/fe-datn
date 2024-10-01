'use client'
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { Container, Button, Nav, Navbar, Form, Image } from 'react-bootstrap';
import { Search } from 'react-bootstrap-icons';


const Header: React.FC = () => {
    const router = typeof window !== 'undefined' ? useRouter() : null;
    const pathname = typeof window !== 'undefined' ? usePathname() : '';

    const [showHeader, setShowHeader] = useState(true);
    const [lastScroll, setLastScroll] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScroll = window.pageYOffset;
            if (currentScroll > lastScroll) {
                setShowHeader(false);
            } else {
                setShowHeader(true);
            }
            setLastScroll(currentScroll);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [lastScroll]);

    const handleLogin = () => {
        if (router) {
            router.push(`/login`);
        }
    }
    const handleRegister = () => {
        if (router) {
            router.push(`/register`);
        }
    }

    const isLogin = pathname === '/login';
    const isRegister = pathname === '/register';

    return (
        <>
            <Navbar className={`header-nav ${showHeader ? 'visible' : 'hidden'}`}>
                <Navbar.Brand href="/" className='brand-header'><Image src="/img/LogoPage.jpg" alt="logo" className='img-brand-header' /></Navbar.Brand>
                <Form className="search-bar">
                    <Form.Control
                        type="text"
                        placeholder="Tìm kiếm"
                        className="search"
                        aria-label="Search"
                    />
                    <Button variant="outline-secondary" className='btn-search-icon'>
                        <Search className='search-icon' />
                    </Button>
                </Form>
                <Nav
                    className="btn-header"
                >
                    <Button
                        onClick={handleRegister}
                        className={`btn-navbar ${isRegister ? 'light-check' : ''}`}
                    >Đăng ký</Button>
                    <Button
                        onClick={handleLogin}
                        className={`btn-navbar border-blue-1 ${isLogin ? 'light-check' : ''}`}
                    >Đăng nhập</Button>
                </Nav>
            </Navbar>
        </>
    )
}
export default Header