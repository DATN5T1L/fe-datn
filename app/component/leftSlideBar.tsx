'use client'
import Link from 'next/link';
import React from 'react';
import { Nav } from 'react-bootstrap';
import { Bell, BoxArrowLeft, BoxFill, Calendar, CalendarFill, ChatFill, Coin, GearFill, HouseDoorFill, PeopleFill } from 'react-bootstrap-icons';

const LeftSlideBar: React.FC = () => {
    return (
        <>
            <Nav className="slider-bar" >
                <section className='slide-bar-categories'>
                    <Link href="#" className="btn-slide-bar home" >
                        <img src='/img/home.svg'  />
                        <div style={{ color: 'white' }}>Trang chủ</div>
                    </Link>
                    <Link href="#" className="btn-slide-bar" >
                        <img src='/img/box-fill.svg'  />
                        <div >Khóa học</div>
                    </Link>
                    <Link href="#" className="btn-slide-bar" >
                        <img src='/img/roadfill.svg'  />
                        <div >Lộ trình</div>
                    </Link>
                    <Link href="#" className="btn-slide-bar" >
                        <img src='/img/calendarfill.svg'  />
                        <div >Lịch học</div>
                    </Link>
                    <Link href="#" className="btn-slide-bar" >
                        <img src='/img/textnotefill.svg'  />
                        <div >Tin tức</div>
                    </Link>
                    <Link href="#" className="btn-slide-bar" >
                        <img src='/img/thinkfill.svg'  />
                        <div >Trò chuyện</div>
                    </Link>
                    <Link href="#" className="btn-slide-bar" >
                        <img src='/img/peoplefill.svg'  />
                        <div >Nhóm của bạn</div>
                    </Link>
                    <Link href="#" className="btn-slide-bar" >
                        <img src='/img/home-fill.svg'  />
                        <div >Trang chủ</div>
                    </Link>
                    <Link href="#" className="btn-slide-bar" >
                        <img src='/img/coinfill.svg'  />
                        <div >Ví</div>
                    </Link>
                </section>

                <section >
                <Link href="#" className="btn-slide-bar" >
                        <img src='/img/logoutfill.svg'  />
                        <div >Đăng xuất</div>
                    </Link>
                </section>

            </Nav>
        </>
    )
}

export default LeftSlideBar