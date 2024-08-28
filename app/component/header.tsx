'use client'
import Link from 'next/link';
import React from 'react';
import { Container, Row, Col, Button, Spinner, Nav, Navbar, Form, NavDropdown } from 'react-bootstrap';
import { Bell, Box, BoxArrowLeft, BoxFill, Calendar, CalendarFill, ChatFill, Coin, GearFill, HouseDoorFill, PeopleFill, Search } from 'react-bootstrap-icons';
import Banner from './home/banner';

const Header: React.FC = () => {
    return (
        <>
            <Navbar expand="lg" className="bg-body-tertiary header-nav">
                <Container fluid>
                    <Navbar.Brand href="#"><img src="/img/logo.png" style={{width:'162px',height:'58px'}} alt="" /></Navbar.Brand>
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
                                <Search className='btn-search-icon'/>
                            </Button>
                        </Form>
                        <Nav
                            className="ms-auto my-2 my-lg-0 btn-header"
                            navbarScroll
                        >
                            <Nav.Link href="#action1" className='navbar-link'>
                                <Button className='btn-navbar'>Đăng Ký</Button>
                            </Nav.Link>
                            <Nav.Link href="#action2" className='navbar-link'>
                                <Button className='btn-navbar'>Đăng nhập</Button>
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}
export default Header