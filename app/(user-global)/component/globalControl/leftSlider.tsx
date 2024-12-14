'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button, Image, Nav } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../redux/store';
import { ShowNameElement } from '@app/(user-global)/component/globalControl/commonC';

const LeftSlider: React.FC = () => {
    const pathName = usePathname();
    const [isMenu, setIsMenu] = useState(true);
    const [isCourseOpen, setIsCourseOpen] = useState(false);
    const [headerHeight, setHeaderHeight] = useState(0);
    const [isHidden, setIsHidden] = useState(false);
    const userState = useSelector((state: RootState) => state.user);
    const [clientHref, setClientHref] = useState('/login');
    const [idCourse, setIdCourse] = useState<string | null>('');
    const menuRef = useRef<HTMLDivElement>(null); // Ref cho menu

    useEffect(() => {
        // Lắng nghe sự kiện click ngoài menu
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsCourseOpen(false); // Tắt menu khi click outside
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const openMenu = () => {
        setIsMenu(!isMenu);
    };

    const openCourses = () => {
        setIsCourseOpen(!isCourseOpen);
    };

    const offCourse = () => {
        setIsCourseOpen(false);
    };

    const isHome = pathName === '/' || pathName === '/home';

    return (
        <Nav
            className={`slider-bar ${isHidden ? 'hidden' : 'visible-menu'}`}
            style={{ top: `calc(${headerHeight}px + 120px)` }}
            ref={menuRef} // Đặt ref cho menu
        >
            <section className="slide-bar-categories">
                <ShowNameElement name="Trang chủ">
                    <Link
                        href="/"
                        className={`btn-slide-bar ${isHome ? 'bg-blu-50' : ''} ${isMenu ? 'w-auto' : 'w-268'}`}
                    >
                        <img src="/img/home-fill.svg" alt="Trang chủ" className={`img block ${isHome ? 'none-icon' : ''}`} />
                        <img src="/img/home.svg" alt="Trang chủ" className={`img none ${isHome ? 'block-icon' : ''}`} />
                        <div className={`btn-e ${isHome ? 'text-white-100' : ''} ${isMenu ? 'w-0px' : 'block-text'}`}>
                            Trang chủ
                        </div>
                    </Link>
                </ShowNameElement>
                <div className={`btn-slide-bar ${isMenu ? 'w-auto' : 'w-268'}`} onClick={openCourses}>
                    <img src="/img/box-fill.svg" alt="" className="img block" />
                    <img src="/img/box.svg" alt="Khóa học" className="img none" />
                    <div className={`btn-e ${isMenu ? 'w-0px' : 'block-text'}`}>Khóa học</div>
                </div>
                <div className={`course-submenu ${isCourseOpen ? 'active' : ''} ${isMenu ? 'p-as' : ''}`} onClick={offCourse}>
                    <Image src="/img/index.svg" alt="Khóa học" className="logo-mini-menu" />
                    <Link href={`${userState.user ? `/coursefor` : `/login`}`} className="btn-slide-bar-mini">
                        <div className="btn-e">Khóa học của bạn</div>
                    </Link>
                    <Link href={`${userState.user ? `/CourseFa` : `/login`}`} className="btn-slide-bar-mini">
                        <div className="btn-e">Khóa học yêu thích</div>
                    </Link>
                    <Link href={`${userState.user ? `/Reminder` : `/login`}`} className="btn-slide-bar-mini">
                        <div className="btn-e">Nhắc nhở học tập</div>
                    </Link>
                </div>
                <div
                    className={`course-submenu ${isCourseOpen ? 'active' : ''} ${isMenu ? 'p-as' : ''}`}
                    onClick={offCourse}
                >
                    <Image src="/img/index.svg" alt="Phát triển ứng dụng backend với tto" className={`logo-mini-menu`} />
                    <Link
                        href={`${userState.user ? `/coursefor` : `/login`}`}
                        className={`btn-slide-bar-mini`}
                    >
                        <div className={`btn-e`}>Khóa học của bạn</div>
                    </Link>
                    <Link
                        href={`${userState.user ? `/CourseFa` : `/login`}`}
                        className={`btn-slide-bar-mini`}
                    >
                        <div className={`btn-e`}>Khóa học yêu thích</div>
                    </Link>
                    <Link
                        href={`${userState.user ? `/Reminder` : `/login`}`}
                        className={`btn-slide-bar-mini`}
                    >
                        <div className={`btn-e`}>Nhắc nhở học tập</div>
                    </Link>
                </div>
                <ShowNameElement name='Học ngay'>
                    <Link href={`${userState.user ? `/coursefor` : `/login`}`} className={`btn-slide-bar ${isMenu ? 'w-auto' : 'w-268'}`}>
                        <img src='/img/bagfill.svg' alt="Đánh giá khóa học tại TTO" className='img block' />
                        <img src='/img/bag.svg' alt="Đánh giá khóa học tại TTO" className='img none' />
                        <div className={`btn-e ${isMenu ? 'w-0px' : 'block-text'}`}>Học ngay</div>
                    </Link>
                </ShowNameElement>
                <ShowNameElement name='Lộ trình học tập'>
                    <Link href="/learningPath-FE" className={`btn-slide-bar ${isMenu ? 'w-auto' : 'w-268'}`}>
                        <img src='/img/roadfill.svg' alt="Đánh giá khóa học tại TTO" className='img block' />
                        <img src='/img/road.svg' alt="Đánh giá khóa học tại TTO" className='img none' />
                        <div className={`btn-e ${isMenu ? 'w-0px' : 'block-text'}`}>Lộ trình</div>
                    </Link>
                </ShowNameElement>
                <ShowNameElement name='Bản tin TTO.SH'>
                    <Link href="/post" className={`btn-slide-bar ${isMenu ? 'w-auto' : 'w-268'}`}>
                        <img src='/img/textnotefill.svg' alt="Đánh giá khóa học tại TTO" className='img block' />
                        <img src='/img/textnote.svg' alt="Đánh giá khóa học tại TTO" className='img none' />
                        <div className={`btn-e ${isMenu ? 'w-0px' : 'block-text'}`}>Tin tức</div>
                    </Link>
                </ShowNameElement>
            </section>
            <Button className="menu" onClick={openMenu}>
                {isMenu ? (
                    <Image src="/img/chevronFill-01.svg" className="menu-img" />
                ) : (
                    <Image src="/img/chevronFill-02.svg" className="menu-img" />
                )}
            </Button>
        </Nav>
    );
};

export default LeftSlider;
