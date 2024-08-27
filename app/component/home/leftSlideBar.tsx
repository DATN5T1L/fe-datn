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
                        <img src='/img/home-fill.svg' className='block'/>
                        <img src='/img/home.svg'  className='none'/>
                        <div >Trang chủ</div>
                    </Link>
                    <Link href="#" className="btn-slide-bar" >
                        <img src='/img/box-fill.svg'  className='block'/>
                        <img src='/img/box.svg'  className='none'/>
                        <div >Khóa học</div>
                    </Link>
                    <Link href="#" className="btn-slide-bar" >
                        <img src='/img/roadfill.svg'  className='block'/>
                        <img src='/img/road.svg'  className='none'/>
                        <div >Lộ trình</div>
                    </Link>
                    <Link href="#" className="btn-slide-bar" >
                        <img src='/img/calendarfill.svg'  className='block'/>
                        <img src='/img/calendar.svg'  className='none'/>
                        <div >Lịch học</div>
                    </Link>
                    <Link href="#" className="btn-slide-bar" >
                        <img src='/img/textnotefill.svg'  className='block'/>
                        <img src='/img/textnote.svg'  className='none'/>
                        <div >Tin tức</div>
                    </Link>
                    <Link href="#" className="btn-slide-bar" >
                        <img src='/img/thinkfill.svg'  className='block'/>
                        <img src='/img/think.svg'  className='none'/>
                        <div >Trò chuyện</div>
                    </Link>
                    <Link href="#" className="btn-slide-bar" >
                        <img src='/img/peoplefill.svg'  className='block'/>
                        <img src='/img/people.svg'  className='none'/>
                        <div >Nhóm của bạn</div>
                    </Link>
                    <Link href="#" className="btn-slide-bar" >
                        <img src='/img/coinfill.svg'  className='block'/>
                        <img src='/img/coin.svg'  className='none'/>
                        <div >Ví</div>
                    </Link>
                    <Link href="#" className="btn-slide-bar" >
                        <img src='/img/carefulfill.svg'  className='block'/>
                        <img src='/img/careful.svg'  className='none'/>
                        <div >Hỗ trợ</div>
                    </Link>
                </section>

                <section >
                <Link href="#" className="btn-slide-bar" >
                        <img src='/img/logoutfill.svg'  className='block'/>
                        <img src='/img/logout.svg'  className='none'/>
                        <div >Đăng xuất</div>
                    </Link>
                </section>

            </Nav>
        </>
    )
}

export default LeftSlideBar