'use client'
import Link from 'next/link';
import React from 'react';
import { Nav } from 'react-bootstrap';
import { usePathname  } from 'next/navigation';

const LeftSlideBar: React.FC = () => {
    const pathname  = usePathname();  
    const isActive = (path: string) => pathname === path;

    return (
        <>
            <Nav className="slider-bar" >
                <section className='slide-bar-categories'>
                    <Link href="/" className={`btn-slide-bar ${isActive('/home') ? 'home' : ''}`}>
                        <img src='/img/home-fill.svg' className='img block' />
                        <img src='/img/home.svg' className='img none' />
                        <div className='btn no-border'>Trang chủ</div>
                    </Link>
                    <Link href="/#" className={`btn-slide-bar ${isActive('/courses') ? 'home' : ''}`}>
                        <img src='/img/box-fill.svg' className='img block' />
                        <img src='/img/box.svg' className='img none' />
                        <div className='btn no-border'>Khóa học</div>
                    </Link>
                    <Link href="/learning-path" className={`btn-slide-bar ${isActive('/learning-path') ? 'home' : ''}`}>
                        <img src='/img/roadfill.svg' className='img block' />
                        <img src='/img/road.svg' className='img none' />
                        <div className='btn no-border'>Lộ trình</div>
                    </Link>
                    <Link href="/calender" className={`btn-slide-bar ${isActive('/calender') ? 'home' : ''}`}>
                        <img src='/img/calendarfill.svg' className='img block' />
                        <img src='/img/calendar.svg' className='img none' />
                        <div className='btn no-border'>Lịch học</div>
                    </Link>
                    <Link href="/#" className={`btn-slide-bar ${isActive('/news') ? 'home' : ''}`}>
                        <img src='/img/textnotefill.svg' className='img block' />
                        <img src='/img/textnote.svg' className='img none' />
                        <div className='btn no-border'>Tin tức</div>
                    </Link>
                    <Link href="/#" className={`btn-slide-bar ${isActive('/chat') ? 'home' : ''}`}>
                        <img src='/img/thinkfill.svg' className='img block' />
                        <img src='/img/think.svg' className='img none' />
                        <div className='btn no-border'>Trò chuyện</div>
                    </Link>
                    <Link href="/#" className={`btn-slide-bar ${isActive('/groups') ? 'home' : ''}`}>
                        <img src='/img/peoplefill.svg' className='img block' />
                        <img src='/img/people.svg' className='img none' />
                        <div className='btn no-border'>Nhóm của bạn</div>
                    </Link>
                    <Link href="/#" className={`btn-slide-bar ${isActive('/wallet') ? 'home' : ''}`}>
                        <img src='/img/coinfill.svg' className='img block' />
                        <img src='/img/coin.svg' className='img none' />
                        <div className='btn no-border'>Ví</div>
                    </Link>
                    <Link href="/#" className={`btn-slide-bar ${isActive('/support') ? 'home' : ''}`}>
                        <img src='/img/carefulfill.svg' className='img block' />
                        <img src='/img/careful.svg' className='img none' />
                        <div className='btn no-border'>Hỗ trợ</div>
                    </Link>
                    <Link href="/#" className={`btn-slide-bar ${isActive('/settings') ? 'home' : ''}`}>
                        <img src='/img/settingfill.svg' className='img block' />
                        <img src='/img/setting.svg' className='img none' />
                        <div className='btn no-border'>Cài đặt</div>
                    </Link>
                </section>
                <section>
                    <Link href="/#" className="btn-slide-bar">
                        <img src='/img/logoutfill.svg' className='img block' />
                        <img src='/img/logout.svg' className='img none' />
                        <div className='btn'>Đăng xuất</div>
                    </Link>
                </section>
            </Nav>
        </>
    )
}

export default LeftSlideBar;
