'use client'

import Link from "next/link"
import { useEffect, useRef, useState } from "react";
import { Button, Image, Nav } from "react-bootstrap"


const LeftSlider: React.FC = () => {
    const [isMenu, setIsMenu] = useState(true)
    const [isCourseOpen, setIsCourseOpen] = useState(false);

    const openMenu = () => {
        setIsMenu(!isMenu)
    }

    const openCourses = () => {
        setIsCourseOpen(!isCourseOpen);
    };

    return (
        <Nav className={`slider-bar`} >
            <section className={`slide-bar-categories`}>
                <Link href="/" className={`btn-slide-bar ${isMenu ? 'w-auto' : 'w-268'}`}>
                    <img src='/img/home-fill.svg' className='img block' />
                    <img src='/img/home.svg' className='img none' />
                    <div className={`btn-e ${isMenu ? 'w-0px' : 'block-text'}`}>Trang chủ</div>
                </Link>

                <div className={`btn-slide-bar ${isMenu ? 'w-auto' : 'w-268'}`} onClick={openCourses}>
                    <img src='/img/box-fill.svg' className='img block' />
                    <img src='/img/box.svg' className='img none' />
                    <div className={`btn-e ${isMenu ? 'w-0px' : 'block-text'}`}>Khóa học</div>
                </div>

                <div className={`course-submenu ${isCourseOpen ? 'active' : ''} ${isMenu ? 'p-as' : ''}`}>
                    <Image src="/img/index.svg" alt="" className={`logo-mini-menu`} />
                    <Link href="/course/topic1" className={`btn-slide-bar-mini`}>
                        <div className={`btn-e`}>Khóa học của bạn</div>
                    </Link>
                    <Link href="/course/topic2" className={`btn-slide-bar-mini`}>
                        <div className={`btn-e`}>Khóa học có phí</div>
                    </Link>
                    <Link href="/course/topic3" className={`btn-slide-bar-mini`}>
                        <div className={`btn-e`}>Khóa học miễn phí</div>
                    </Link>
                </div>

                <Link href="/" className={`btn-slide-bar ${isMenu ? 'w-auto' : 'w-268'}`}>
                    <img src='/img/bagfill.svg' className='img block' />
                    <img src='/img/bag.svg' className='img none' />
                    <div className={`btn-e ${isMenu ? 'w-0px' : 'block-text'}`}>Học ngay</div>
                </Link>
                <Link href="/learning-path" className={`btn-slide-bar ${isMenu ? 'w-auto' : 'w-268'}`}>
                    <img src='/img/roadfill.svg' className='img block' />
                    <img src='/img/road.svg' className='img none' />
                    <div className={`btn-e ${isMenu ? 'w-0px' : 'block-text'}`}>Lộ trình</div>
                </Link>
                <Link href="/#" className={`btn-slide-bar ${isMenu ? 'w-auto' : 'w-268'}`}>
                    <img src='/img/textnotefill.svg' className='img block' />
                    <img src='/img/textnote.svg' className='img none' />
                    <div className={`btn-e ${isMenu ? 'w-0px' : 'block-text'}`}>Tin tức</div>
                </Link>
            </section>
            <Button className='menu' onClick={openMenu}>
                {
                    isMenu
                        ? (<Image src='/img/chevronFill-01.svg' className='menu-img' />)
                        : (<Image src='/img/chevronFill-02.svg' className='menu-img' />)
                }
            </Button>
        </Nav>
    );
}

export default LeftSlider