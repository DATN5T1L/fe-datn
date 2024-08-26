'use client'
import Link from 'next/link';
import React from 'react';
import { Nav } from 'react-bootstrap';
import { PeopleFill } from 'react-bootstrap-icons';

const RightSlideBar: React.FC = () => {
    return (
        <>
            <div className='right-slide-bar-container'>
                <Nav className="flex-column right-slider-bar">
                    <section className="group-section">
                        <div className="d-flex justify-content-between align-items-center header-slide-bar-right">
                            <div className="group-title">
                                <img src='/img/peoplegreen.svg' className="peopleFill" />
                                <h4>Nhóm</h4>
                            </div>
                            <Link href="/" className="see-all-link">
                                <div className='green'>
                                    Xem tất cả
                                </div>
                                <img src="/img/arrowGreen.svg" alt="" />
                            </Link>
                        </div>
                        <div className='group-section-main'>
                            <div className='group-item'>
                                <div className="avatar-slide-right-bar">
                                    <div className='avatar-container'>
                                        <img src='/img/people.svg' className='icon-avatar-container' />
                                    </div>
                                </div>
                                <Nav.Link href="#" className="nav-link">
                                    <div className='name-group fw-bold'>JavaScript-w120</div>
                                    <small className="text-muted">Tâm:<span className='mess-content-slide-bar'>Các bạn code này làm sao khó quá trời luôn </span> • 6:34</small>
                                </Nav.Link>
                            </div>
                            <div className='group-item'>
                                <div className="avatar-slide-right-bar">
                                    <div className='avatar-container'>
                                        <img src='/img/people.svg' className='icon-avatar-container' />
                                    </div>
                                </div>
                                <Nav.Link href="#" className="nav-link">
                                    <div className='name-group fw-bold'>JavaScript-w120</div>
                                    <small className="text-muted">Tâm:<span className='mess-content-slide-bar'>Các bạn code này làm sao khó quá trời luôn </span> • 6:34</small>
                                </Nav.Link>
                            </div>
                            <div className='group-item'>
                                <div className="avatar-slide-right-bar">
                                    <div className='avatar-container'>
                                        <img src='/img/people.svg' className='icon-avatar-container' />
                                    </div>
                                </div>
                                <Nav.Link href="#" className="nav-link">
                                    <div className='name-group fw-bold'>JavaScript-w120</div>
                                    <small className="text-muted">Tâm:<span className='mess-content-slide-bar'>Các bạn code này làm sao khó quá trời luôn </span> • 6:34</small>
                                </Nav.Link>
                            </div>
                            <div className='group-item'>
                                <div className="avatar-slide-right-bar">
                                    <div className='avatar-container'>
                                        <img src='/img/people.svg' className='icon-avatar-container' />
                                    </div>
                                </div>
                                <Nav.Link href="#" className="nav-link">
                                    <div className='name-group fw-bold'>JavaScript-w120</div>
                                    <small className="text-muted">Tâm:<span className='mess-content-slide-bar'>Các bạn code này làm sao khó quá trời luôn </span> • 6:34</small>
                                </Nav.Link>
                            </div>
                            <div className='group-item'>
                                <div className="avatar-slide-right-bar">
                                    <div className='avatar-container'>
                                        <img src='/img/people.svg' className='icon-avatar-container' />
                                    </div>
                                </div>
                                <Nav.Link href="#" className="nav-link">
                                    <div className='name-group fw-bold'>JavaScript-w120</div>
                                    <small className="text-muted">Tâm:<span className='mess-content-slide-bar'>Các bạn code này làm sao khó quá trời luôn </span> • 6:34</small>
                                </Nav.Link>
                            </div>
                            <div className='group-item'>
                                <div className="avatar-slide-right-bar">
                                    <div className='avatar-container'>
                                        <img src='/img/people.svg' className='icon-avatar-container' />
                                    </div>
                                </div>
                                <Nav.Link href="#" className="nav-link">
                                    <div className='name-group fw-bold'>JavaScript-w120</div>
                                    <small className="text-muted">Tâm:<span className='mess-content-slide-bar'>Các bạn code này làm sao khó quá trời luôn </span> • 6:34</small>
                                </Nav.Link>
                            </div>
                        </div>
                    </section>
                    <section className="group-section">
                        <div className="d-flex justify-content-between align-items-center header-slide-bar-right">
                            <div className="group-title2">
                                <img src='/img/electrical.svg' className="peopleFill" />
                                <h4>Hoạt động</h4>
                            </div>
                            <Link href="/" className="see-all-link">
                                <div className='light-blue'>
                                    Xem tất cả
                                </div>
                                <img src="/img/arrowlightblue.svg" alt="" />
                            </Link>
                        </div>
                        <div className='group-section-main'>
                            <div className='group-item'>
                                <div className="avatar-slide-right-bar">
                                    <div className='avatar-container'>
                                        <img src='/img/tesla.jpg' className='icon-avatar-container2' />
                                    </div>
                                </div>
                                <Nav.Link href="#" className="nav-link">
                                    <div className='name-group fw-bold head-event' >
                                        <div className='head-event-name'>
                                            Công Lam
                                        </div>
                                        <div className='fill head-event-teacher'>
                                            Giảng viên
                                        </div>
                                    </div>
                                    <div className='main-event'>
                                        <small className="text-muted2"><img src="/img/Time Circle.svg" alt="" /> Đang hoạt động</small>
                                        <div className='on'></div>
                                    </div>
                                </Nav.Link>
                            </div>
                            <div className='group-item'>
                                <div className="avatar-slide-right-bar">
                                    <div className='avatar-container'>
                                        <img src='/img/tesla.jpg' className='icon-avatar-container2' />
                                    </div>
                                </div>
                                <Nav.Link href="#" className="nav-link">
                                    <div className='name-group fw-bold head-event' >
                                        <div className='head-event-name'>
                                            Tuấn Huỳnh
                                        </div>
                                        <div className='fill head-event-teacher'>
                                            Giảng viên
                                        </div>
                                    </div>
                                    <div className='main-event'>
                                        <small className="text-muted2"><img src="/img/Time Circle.svg" alt="" /> 12 phút trước</small>
                                        <div className='off'></div>
                                    </div>
                                </Nav.Link>
                            </div>
                            <div className='group-item'>
                                <div className="avatar-slide-right-bar">
                                    <div className='avatar-container'>
                                        <img src='/img/tesla.jpg' className='icon-avatar-container2' />
                                    </div>
                                </div>
                                <Nav.Link href="#" className="nav-link">
                                    <div className='name-group fw-bold head-event' >
                                        <div className='head-event-name'>
                                            Gia Thành
                                        </div>
                                        <div className='fill head-event-teacher'>
                                            học viên
                                        </div>
                                    </div>
                                    <div className='main-event'>
                                        <small className="text-muted2"><img src="/img/Time Circle.svg" alt="" /> Đang hoạt động</small>
                                        <div className='on'></div>
                                    </div>
                                </Nav.Link>
                            </div>
                            <div className='group-item'>
                                <div className="avatar-slide-right-bar">
                                    <div className='avatar-container'>
                                        <img src='/img/tesla.jpg' className='icon-avatar-container2' />
                                    </div>
                                </div>
                                <Nav.Link href="#" className="nav-link">
                                    <div className='name-group fw-bold head-event' >
                                        <div className='head-event-name'>
                                            Minh Tâm
                                        </div>
                                        <div className='fill head-event-teacher'>
                                            Giảng viên
                                        </div>
                                    </div>
                                    <div className='main-event'>
                                        <small className="text-muted2"><img src="/img/Time Circle.svg" alt="" /> Đang hoạt động</small>
                                        <div className='on'></div>
                                    </div>
                                </Nav.Link>
                            </div>
                            <div className='group-item'>
                                <div className="avatar-slide-right-bar">
                                    <div className='avatar-container'>
                                        <img src='/img/tesla.jpg' className='icon-avatar-container2' />
                                    </div>
                                </div>
                                <Nav.Link href="#" className="nav-link">
                                    <div className='name-group fw-bold head-event' >
                                        <div className='head-event-name'>
                                            Hiếu Thảo
                                        </div>
                                        <div className='fill head-event-teacher'>
                                            Giảng viên
                                        </div>
                                    </div>
                                    <div className='main-event'>
                                        <small className="text-muted2"><img src="/img/Time Circle.svg" alt="" /> Đang hoạt động</small>
                                        <div className='on'></div>
                                    </div>
                                </Nav.Link>
                            </div>
                            <div className='group-item'>
                                <div className="avatar-slide-right-bar">
                                    <div className='avatar-container'>
                                        <img src='/img/tesla.jpg' className='icon-avatar-container2' />
                                    </div>
                                </div>
                                <Nav.Link href="#" className="nav-link">
                                    <div className='name-group fw-bold head-event' >
                                        <div className='head-event-name'>
                                            Minh Thuận
                                        </div>
                                        <div className='fill head-event-teacher'>
                                            Giảng viên
                                        </div>
                                    </div>
                                    <div className='main-event'>
                                        <small className="text-muted2"><img src="/img/Time Circle.svg" alt="" /> Đang hoạt động</small>
                                        <div className='on'></div>
                                    </div>
                                </Nav.Link>
                            </div>
                        </div>
                    </section>
                    <section className="group-section">
                        <div className="d-flex justify-content-between align-items-center header-slide-bar-right">
                            <div className="group-title2">
                                <img src='/img/news.svg' className="peopleFill" />
                                <h4>Bài viết</h4>
                            </div>
                            <Link href="/" className="see-all-link">
                                <div className='blue'>
                                    Xem tất cả
                                </div>
                                <img src="/img/arrowblue.svg" alt="" />
                            </Link>
                        </div>
                        <div className='group-section-main'>
                            <div className='group-item'>
                                <div className="avatar-slide-right-bar">
                                    <div className='avatar-container'>
                                        <img src='/img/tesla.jpg' className='icon-avatar-container2' />
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
                            </div>

                            <div className='group-item'>
                                <div className="avatar-slide-right-bar2">
                                    <div className='avatar-container'>
                                        <img src='/img/pitago.jpg' className='icon-avatar-container2' />
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
                            </div>
                            <div className='group-item'>
                                <div className="avatar-slide-right-bar2">
                                    <div className='avatar-container'>
                                        <img src='/img/pitago.jpg' className='icon-avatar-container2' />
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
                            </div>
                            <div className='group-item'>
                                <div className="avatar-slide-right-bar2">
                                    <div className='avatar-container'>
                                        <img src='/img/pitago.jpg' className='icon-avatar-container2' />
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
                            </div>
                            <div className='group-item'>
                                <div className="avatar-slide-right-bar2">
                                    <div className='avatar-container'>
                                        <img src='/img/pitago.jpg' className='icon-avatar-container2' />
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
                            </div>
                        </div>
                    </section>
                </Nav>
            </div>
        </>
    )
}

export default RightSlideBar