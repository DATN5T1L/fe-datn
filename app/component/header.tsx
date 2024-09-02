'use client'
import { usePathname, useRouter } from 'next/navigation'; 
import React from 'react';
import { Container, Button, Nav, Navbar, Form} from 'react-bootstrap';
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
            <Navbar expand="lg" className="bg-body-tertiary header-nav">
                <Container fluid>
                    <Navbar.Brand href="#"><img src="/img/logo.png" style={{ width: '162px', height: '58px' }} alt="" /></Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll" className="navbar-custom">
                        <Form className="d-flex ms-auto me-3 search-bar">
                            <Form.Control
                                type="text"
                                placeholder="Tìm kiếm"
                                className="me-2 rounded-pill"
                                aria-label="Search"
                            />
                            <Button variant="outline-secondary">
                                <Search className='btn-search-icon' />
                            </Button>
                        </Form>
                        <Nav
                            className="ms-auto my-2 my-lg-0 btn-header"
                            navbarScroll
                        >
                            <Button 
                            onClick={handleRegister}
                            className={`btn-navbar ${isRegister ? 'light-check' : ''}`}
                            >Đăng Ký</Button>
                            <Button 
                            onClick={handleLogin}
                            className={`btn-navbar border-blue-1 ${isLogin ? 'light-check' : ''}`}
                            >Đăng nhập</Button>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}
export default Header