'use client'
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';
import { Container, Button, Nav, Navbar, Form, Image } from 'react-bootstrap';
import { Search } from 'react-bootstrap-icons';


const Header: React.FC = () => {
    const router = typeof window !== 'undefined' ? useRouter() : null;
    const pathname = typeof window !== 'undefined' ? usePathname() : '';

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
            <Navbar className="header-nav">
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