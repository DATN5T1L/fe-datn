'use client'
import React from 'react';
import { Card, Col, Container, Image, Nav, Row } from 'react-bootstrap';
import RightContainer from '../rightContainer';


const RightSlideBar: React.FC = () => {
    return (
        <>
            <RightContainer>
                <Container className="right-slider-bar-container">
                    <Row md={12} className="group-section">
                        <Col md={12} className="header-slide-bar-right">
                            <Card className="group-title">
                                <Card.Img src='/img/peoplegreen.svg' className="peopleFill" />
                                <Card.Title className='group-title-hedding'>Nhóm</Card.Title>
                            </Card>
                            <Nav.Link href="/" className="see-all-link">
                                <div className='see-all-link-div green'>
                                    Xem tất cả
                                </div>
                                <Image src="/img/arrowGreen.svg" alt="" className='see-all-link-img' />
                            </Nav.Link>
                        </Col>
                        <Col md={12} className='group-section-main'>
                            <article className='group-item'>
                                <div className="avatar-slide-right-bar">
                                    <div className='avatar-container'>
                                        <Image src='/img/people.svg' className='icon-avatar-container' />
                                    </div>
                                </div>
                                <Nav.Link href="/" className="nav-link">
                                    <div className='name-group fw-bold'>JavaScript-w120</div>
                                    <small className="text-muted">Tâm:<bdi className='mess-content-slide-bar'>Các bạn code này làm sao khó quá trời luôn </bdi> • 6:34</small>
                                </Nav.Link>
                            </article>
                            <article className='group-item'>
                                <div className="avatar-slide-right-bar">
                                    <div className='avatar-container'>
                                        <Image src='/img/people.svg' className='icon-avatar-container' />
                                    </div>
                                </div>
                                <Nav.Link href="/" className="nav-link">
                                    <div className='name-group fw-bold'>JavaScript-w120</div>
                                    <small className="text-muted">Tâm:<bdi className='mess-content-slide-bar'>Các bạn code này làm sao khó quá trời luôn </bdi> • 6:34</small>
                                </Nav.Link>
                            </article>
                            <article className='group-item'>
                                <div className="avatar-slide-right-bar">
                                    <div className='avatar-container'>
                                        <Image src='/img/people.svg' className='icon-avatar-container' />
                                    </div>
                                </div>
                                <Nav.Link href="/" className="nav-link">
                                    <div className='name-group fw-bold'>JavaScript-w120</div>
                                    <small className="text-muted">Tâm:<bdi className='mess-content-slide-bar'>Các bạn code này làm sao khó quá trời luôn </bdi> • 6:34</small>
                                </Nav.Link>
                            </article>
                            <article className='group-item'>
                                <div className="avatar-slide-right-bar">
                                    <div className='avatar-container'>
                                        <Image src='/img/people.svg' className='icon-avatar-container' />
                                    </div>
                                </div>
                                <Nav.Link href="/" className="nav-link">
                                    <div className='name-group fw-bold'>JavaScript-w120</div>
                                    <small className="text-muted">Tâm:<bdi className='mess-content-slide-bar'>Các bạn code này làm sao khó quá trời luôn </bdi> • 6:34</small>
                                </Nav.Link>
                            </article>
                        </Col>
                    </Row>
                    <Row md={12} className="group-section">
                        <Col md={12} className="header-slide-bar-right">
                            <Card className="group-title2">
                                <Image src='/img/electrical.svg' className="peopleFill" />
                                <div className='group-title-hedding'>Hoạt động</div>
                            </Card>
                            <Nav.Link href="/" className="see-all-link">
                                <div className='see-all-link-div light-blue'>
                                    Xem tất cả
                                </div>
                                <Image src="/img/arrowlightblue.svg" alt="" className='see-all-link-img' />
                            </Nav.Link >
                        </Col>
                        <Col md={12} className='group-section-main'>
                            <article className='group-item'>
                                <div className="avatar-slide-right-bar">
                                    <div className='avatar-container'>
                                        <Image src='/img/tesla.jpg' className='icon-avatar-container2' />
                                    </div>
                                </div>
                                <Nav.Link href="/" className="nav-link">
                                    <div className='name-group fw-bold head-event' >
                                        <div className='head-event-name'>
                                            Công Lam
                                        </div>
                                        <div className='fill head-event-teacher'>
                                            Giảng viên
                                        </div>
                                    </div>
                                    <div className='main-event'>
                                        <small className="text-muted2"><Image src="/img/Time Circle.svg" alt="" className='.text-muted2-img' /> Đang hoạt động</small>
                                        <div className='on'></div>
                                    </div>
                                </Nav.Link>
                            </article>
                            <article className='group-item'>
                                <div className="avatar-slide-right-bar">
                                    <div className='avatar-container'>
                                        <Image src='/img/tesla.jpg' className='icon-avatar-container2' />
                                    </div>
                                </div>
                                <Nav.Link href="/" className="nav-link">
                                    <div className='name-group fw-bold head-event' >
                                        <div className='head-event-name'>
                                            Công Lam
                                        </div>
                                        <div className='fill head-event-teacher'>
                                            Giảng viên
                                        </div>
                                    </div>
                                    <div className='main-event'>
                                        <small className="text-muted2"><Image src="/img/Time Circle.svg" alt="" className='.text-muted2-img' /> Đang hoạt động</small>
                                        <div className='on'></div>
                                    </div>
                                </Nav.Link>
                            </article>
                            <article className='group-item'>
                                <div className="avatar-slide-right-bar">
                                    <div className='avatar-container'>
                                        <Image src='/img/tesla.jpg' className='icon-avatar-container2' />
                                    </div>
                                </div>
                                <Nav.Link href="/" className="nav-link">
                                    <div className='name-group fw-bold head-event' >
                                        <div className='head-event-name'>
                                            Công Lam
                                        </div>
                                        <div className='fill head-event-teacher'>
                                            Giảng viên
                                        </div>
                                    </div>
                                    <div className='main-event'>
                                        <small className="text-muted2"><Image src="/img/Time Circle.svg" alt="" className='.text-muted2-img' /> Đang hoạt động</small>
                                        <div className='on'></div>
                                    </div>
                                </Nav.Link>
                            </article>
                            <article className='group-item'>
                                <div className="avatar-slide-right-bar">
                                    <div className='avatar-container'>
                                        <Image src='/img/tesla.jpg' className='icon-avatar-container2' />
                                    </div>
                                </div>
                                <Nav.Link href="/" className="nav-link">
                                    <div className='name-group fw-bold head-event' >
                                        <div className='head-event-name'>
                                            Công Lam
                                        </div>
                                        <div className='fill head-event-teacher'>
                                            Giảng viên
                                        </div>
                                    </div>
                                    <div className='main-event'>
                                        <small className="text-muted2"><Image src="/img/Time Circle.svg" alt="" className='.text-muted2-img' /> Đang hoạt động</small>
                                        <div className='on'></div>
                                    </div>
                                </Nav.Link>
                            </article>
                            <article className='group-item'>
                                <div className="avatar-slide-right-bar">
                                    <div className='avatar-container'>
                                        <Image src='/img/tesla.jpg' className='icon-avatar-container2' />
                                    </div>
                                </div>
                                <Nav.Link href="/" className="nav-link">
                                    <div className='name-group fw-bold head-event' >
                                        <div className='head-event-name'>
                                            Công Lam
                                        </div>
                                        <div className='fill head-event-teacher'>
                                            Giảng viên
                                        </div>
                                    </div>
                                    <div className='main-event'>
                                        <small className="text-muted2"><Image src="/img/Time Circle.svg" alt="" className='.text-muted2-img' /> Đang hoạt động</small>
                                        <div className='on'></div>
                                    </div>
                                </Nav.Link>
                            </article>
                            <article className='group-item'>
                                <div className="avatar-slide-right-bar">
                                    <div className='avatar-container'>
                                        <Image src='/img/tesla.jpg' className='icon-avatar-container2' />
                                    </div>
                                </div>
                                <Nav.Link href="/" className="nav-link">
                                    <div className='name-group fw-bold head-event' >
                                        <div className='head-event-name'>
                                            Công Lam
                                        </div>
                                        <div className='fill head-event-teacher'>
                                            Giảng viên
                                        </div>
                                    </div>
                                    <div className='main-event'>
                                        <small className="text-muted2"><Image src="/img/Time Circle.svg" alt="" className='.text-muted2-img' /> Đang hoạt động</small>
                                        <div className='on'></div>
                                    </div>
                                </Nav.Link>
                            </article>
                        </Col>
                    </Row>
                    <Row md={12} className="group-section">
                        <Col md={12} className="header-slide-bar-right">
                            <Card className="group-title2">
                                <Image src='/img/news.svg' className="peopleFill" />
                                <div className='group-title-hedding'>Bài viết</div>
                            </Card>
                            <Nav.Link href="/" className="see-all-link">
                                <div className='see-all-link-div blue'>
                                    Xem tất cả
                                </div>
                                <Image src="/img/arrowblue.svg" alt="" className='see-all-link-img' />
                            </Nav.Link>
                        </Col>
                        <Col md={12} className='group-section-main'>
                            <article className='group-item'>
                                <div className="avatar-slide-right-bar">
                                    <div className='avatar-container'>
                                        <Image src='/img/tesla.jpg' className='icon-avatar-container2' />
                                    </div>
                                </div>
                                <Nav.Link href="#" className="nav-link2">
                                    <div className='name-post'>
                                        Dự án về ReactJS
                                    </div>
                                    <div className='content-post'>
                                        Hôm nay mình có quay một video trong Khóa học ReactJS là "Tạo dự án ReactJS với Webpack và Babel".
                                    </div>
                                </Nav.Link>
                            </article>
                            <article className='group-item'>
                                <div className="avatar-slide-right-bar">
                                    <div className='avatar-container'>
                                        <Image src='/img/tesla.jpg' className='icon-avatar-container2' />
                                    </div>
                                </div>
                                <Nav.Link href="#" className="nav-link2">
                                    <div className='name-post'>
                                        Dự án về ReactJS
                                    </div>
                                    <div className='content-post'>
                                        Hôm nay mình có quay một video trong Khóa học ReactJS là "Tạo dự án ReactJS với Webpack và Babel".
                                    </div>
                                </Nav.Link>
                            </article>
                            <article className='group-item'>
                                <div className="avatar-slide-right-bar">
                                    <div className='avatar-container'>
                                        <Image src='/img/tesla.jpg' className='icon-avatar-container2' />
                                    </div>
                                </div>
                                <Nav.Link href="#" className="nav-link2">
                                    <div className='name-post'>
                                        Dự án về ReactJS
                                    </div>
                                    <div className='content-post'>
                                        Hôm nay mình có quay một video trong Khóa học ReactJS là "Tạo dự án ReactJS với Webpack và Babel".
                                    </div>
                                </Nav.Link>
                            </article>
                            <article className='group-item'>
                                <div className="avatar-slide-right-bar">
                                    <div className='avatar-container'>
                                        <Image src='/img/tesla.jpg' className='icon-avatar-container2' />
                                    </div>
                                </div>
                                <Nav.Link href="#" className="nav-link2">
                                    <div className='name-post'>
                                        Dự án về ReactJS
                                    </div>
                                    <div className='content-post'>
                                        Hôm nay mình có quay một video trong Khóa học ReactJS là "Tạo dự án ReactJS với Webpack và Babel".
                                    </div>
                                </Nav.Link>
                            </article>
                        </Col>
                    </Row>
                </Container>
            </RightContainer>
        </>
    )
}

export default RightSlideBar