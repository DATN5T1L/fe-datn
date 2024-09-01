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
                        <img src='/img/home-fill.svg' className='img block' />
                        <img src='/img/home.svg' className='img none' />
                        <div className='btn'>Trang chủ</div>
                    </Link>
                    <Link href="#" className="btn-slide-bar" >
                        <img src='/img/box-fill.svg' className='img block' />
                        <img src='/img/box.svg' className='img none' />
                        <div className='btn'>Khóa học</div>
                    </Link>
                    <Link href="#" className="btn-slide-bar" >
                        <img src='/img/roadfill.svg' className='img block' />
                        <img src='/img/road.svg' className='img none' />
                        <div className='btn'>Lộ trình</div>
                    </Link>
                    <Link href="#" className="btn-slide-bar" >
                        <img src='/img/calendarfill.svg' className='img block' />
                        <img src='/img/calendar.svg' className='img none' />
                        <div className='btn'>Lịch học</div>
                    </Link>
                    <Link href="#" className="btn-slide-bar" >
                        <img src='/img/textnotefill.svg' className='img block' />
                        <img src='/img/textnote.svg' className='img none' />
                        <div className='btn'>Tin tức</div>
                    </Link>
                    <Link href="#" className="btn-slide-bar" >
                        <img src='/img/thinkfill.svg' className='img block' />
                        <img src='/img/think.svg' className='img none' />
                        <div className='btn'>Trò chuyện</div>
                    </Link>
                    <Link href="#" className="btn-slide-bar" >
                        <img src='/img/peoplefill.svg' className='img block' />
                        <img src='/img/people.svg' className='img none' />
                        <div className='btn'>Nhóm của bạn</div>
                    </Link>
                    <Link href="#" className="btn-slide-bar" >
                        <img src='/img/coinfill.svg' className='img block' />
                        <img src='/img/coin.svg' className='img none' />
                        <div className='btn'>Ví</div>
                    </Link>
                    <Link href="#" className="btn-slide-bar" >
                        <img src='/img/carefulfill.svg' className='img block' />
                        <img src='/img/careful.svg' className='img none' />
                        <div className='btn'>Hỗ trợ</div>
                    </Link>
                    <Link href="#" className="btn-slide-bar" >
                        <img src='/img/settingfill.svg' className='img block' />
                        <img src='/img/setting.svg' className='img none' />
                        <div className='btn'>Cài đặt</div>
                    </Link>
                </section>

                <section >
                    <Link href="#" className="btn-slide-bar" >
                        <img src='/img/logoutfill.svg' className='img block' />
                        <img src='/img/logout.svg' className='img none' />
                        <div className='btn'>Đăng xuất</div>
                    </Link>
                </section>
            </Nav>
        </>
    )
}

export default LeftSlideBar