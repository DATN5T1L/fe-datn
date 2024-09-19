'use client'
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { Button, Image, Nav } from 'react-bootstrap';
import { usePathname } from 'next/navigation';

const LeftSlideBar: React.FC = () => {
    const [isMenu, setIsMenu] = useState(false)
    const pathname = usePathname();
    const isActive = (path: string) => pathname === path;

    useEffect(() => {
        const storedMenuState = localStorage.getItem('isMenu');
        if (storedMenuState !== null) {
            setIsMenu(JSON.parse(storedMenuState));
        }
    }, []);

    const handleMenu = () => {
        const newMenuState = !isMenu;
        setIsMenu(newMenuState);
        localStorage.setItem('isMenu', JSON.stringify(newMenuState));
    };

    return (
        <>
            <Nav className={`slider-bar ${isMenu == true ? 'w-auto' : ''}`} >
                <section className={`slide-bar-categories ${isMenu == true ? 'w-auto' : ''}`}>
                    <Link href="/" className={`${isMenu == true ? 'w-auto gap-0' : ''} btn-slide-bar ${isActive('/home') ? 'home' : ''} `}>
                        <img src='/img/home-fill.svg' className='img block' />
                        <img src='/img/home.svg' className='img none' />
                        <div className={`${isMenu == true ? 'w-0 hidden' : 'show'} btn-e  `}>Trang chủ</div>
                    </Link>
                    <Link href="/course" className={`${isMenu == true ? 'w-auto gap-0' : ''} btn-slide-bar ${isActive('/course') ? 'home' : ''}`}>
                        <img src='/img/box-fill.svg' className='img block' />
                        <img src='/img/box.svg' className='img none' />
                        <div className={`${isMenu == true ? 'w-0 hidden' : 'show'} btn-e  `}>Khóa học</div>
                    </Link>
                    <Link href="/learning-path" className={`${isMenu == true ? 'w-auto gap-0' : ''} btn-slide-bar ${isActive('/learning-path') ? 'home' : ''}`}>
                        <img src='/img/roadfill.svg' className='img block' />
                        <img src='/img/road.svg' className='img none' />
                        <div className={`${isMenu == true ? 'w-0 hidden' : 'show'} btn-e  `}>Lộ trình</div>
                    </Link>
                    <Link href="/calender" className={`${isMenu == true ? 'w-auto gap-0' : ''} btn-slide-bar ${isActive('/calender') ? 'home' : ''}`}>
                        <img src='/img/calendarfill.svg' className='img block' />
                        <img src='/img/calendar.svg' className='img none' />
                        <div className={`${isMenu == true ? 'w-0 hidden' : 'show'} btn-e  `}>Lịch học</div>
                    </Link>
                    <Link href="/#" className={`${isMenu == true ? 'w-auto gap-0' : ''} btn-slide-bar ${isActive('/news') ? 'home' : ''}`}>
                        <img src='/img/textnotefill.svg' className='img block' />
                        <img src='/img/textnote.svg' className='img none' />
                        <div className={`${isMenu == true ? 'w-0 hidden' : 'show'} btn-e  `}>Tin tức</div>
                    </Link>
                    <Link href="/#" className={`${isMenu == true ? 'w-auto gap-0' : ''} btn-slide-bar ${isActive('/chat') ? 'home' : ''}`}>
                        <img src='/img/thinkfill.svg' className='img block' />
                        <img src='/img/think.svg' className='img none' />
                        <div className={`${isMenu == true ? 'w-0 hidden' : 'show'} btn-e  `}>Trò chuyện</div>
                    </Link>
                    <Link href="/#" className={`${isMenu == true ? 'w-auto gap-0' : ''} btn-slide-bar ${isActive('/groups') ? 'home' : ''}`}>
                        <img src='/img/peoplefill.svg' className='img block' />
                        <img src='/img/people.svg' className='img none' />
                        <div className={`${isMenu == true ? 'w-0 hidden' : 'show'} btn-e  `}>Nhóm của bạn</div>
                    </Link>
                    <Link href="/#" className={`${isMenu == true ? 'w-auto gap-0' : ''} btn-slide-bar ${isActive('/wallet') ? 'home' : ''}`}>
                        <img src='/img/coinfill.svg' className='img block' />
                        <img src='/img/coin.svg' className='img none' />
                        <div className={`${isMenu == true ? 'w-0 hidden' : 'show'} btn-e  `}>Ví</div>
                    </Link>
                    <Link href="/#" className={`${isMenu == true ? 'w-auto gap-0' : ''} btn-slide-bar ${isActive('/support') ? 'home' : ''}`}>
                        <img src='/img/carefulfill.svg' className='img block' />
                        <img src='/img/careful.svg' className='img none' />
                        <div className={`${isMenu == true ? 'w-0 hidden' : 'show'} btn-e  `}>Hỗ trợ</div>
                    </Link>
                    <Link href="/#" className={`${isMenu == true ? 'w-auto gap-0' : ''} btn-slide-bar ${isActive('/settings') ? 'home' : ''}`}>
                        <img src='/img/settingfill.svg' className='img block' />
                        <img src='/img/setting.svg' className='img none' />
                        <div className={`${isMenu == true ? 'w-0 hidden' : 'show'} btn-e  `}>Cài đặt</div>
                    </Link>
                </section>
                <section>
                    <Link href="/#" className={`${isMenu == true ? 'w-auto gap-0' : ''} btn-slide-bar`}>
                        <img src='/img/logoutfill.svg' className='img block' />
                        <img src='/img/logout.svg' className='img none' />
                        <div className={`${isMenu == true ? 'w-0 hidden' : 'show'} btn-e `} >Đăng xuất</div>
                    </Link>
                </section>
                <Button className='menu' onClick={handleMenu}>
                    <Image src='/img/chevronFill-01.svg' className='menu-img' />
                </Button>
            </Nav>
        </>
    )
}

export default LeftSlideBar;
