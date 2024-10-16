'use client'

import Link from "next/link"
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Button, Image, Nav } from "react-bootstrap"


const LeftSlider: React.FC = () => {
    const pathName = usePathname()
    const [isMenu, setIsMenu] = useState(true)
    const [isCourseOpen, setIsCourseOpen] = useState(false);
    const [headerHeight, setHeaderHeight] = useState(0);
    const [isHidden, setIsHidden] = useState(false)

    useEffect(() => {
        const header = document.querySelector('.header-nav') as HTMLElement;

        const setHeight = () => {
            if (header) {
                setHeaderHeight(header.offsetHeight);
            }
        };

        const observer = new ResizeObserver(setHeight);
        if (header) {
            observer.observe(header);
        }

        setHeight();

        return () => {
            if (header) {
                observer.unobserve(header);
            }
        };
    }, []);

    useEffect(() => {
        const footer = document.querySelector('footer') as HTMLElement;

        const handleScroll = () => {
            const footerRect = footer.getBoundingClientRect();
            const isFooterVisible = footerRect.top <= window.innerHeight;

            if (isFooterVisible && footerRect.top < window.innerHeight - headerHeight) {
                setIsHidden(true);
            } else {
                setIsHidden(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [headerHeight]);

    const openMenu = () => {
        setIsMenu(!isMenu)
    }

    const openCourses = () => {
        setIsCourseOpen(!isCourseOpen);
    };

    const isHome = pathName === '/' || pathName === '/home';

    return (
        <Nav className={`slider-bar ${isHidden ? 'hidden' : 'visible-menu'}`} style={{ top: `calc(${headerHeight}px + 16px)` }}>
            <section className={`slide-bar-categories`}>
                <Link href="/" className={`btn-slide-bar ${isHome ? 'bg-blu-50' : ''} ${isMenu ? 'w-auto' : 'w-268'}`}>
                    <img src='/img/home-fill.svg' className={`img block ${isHome ? 'none-icon' : ''}`} />
                    <img src='/img/home.svg' className={`img none ${isHome ? 'block-icon' : ''}`} />
                    <div className={`btn-e ${isHome ? 'text-white-100' : ''} ${isMenu ? 'w-0px' : 'block-text'}`}>Trang chủ</div>
                </Link>

                <div className={`btn-slide-bar ${isMenu ? 'w-auto' : 'w-268'}`} onClick={openCourses}>
                    <img src='/img/box-fill.svg' className='img block' />
                    <img src='/img/box.svg' className='img none' />
                    <div className={`btn-e ${isMenu ? 'w-0px' : 'block-text'}`}>Khóa học</div>
                </div>

                <div className={`course-submenu ${isCourseOpen ? 'active' : ''} ${isMenu ? 'p-as' : ''}`}>
                    <Image src="/img/index.svg" alt="" className={`logo-mini-menu`} />
                    <Link href="/coursefor" className={`btn-slide-bar-mini`}>
                        <div className={`btn-e`}>Khóa học của bạn</div>
                    </Link>
                    <Link href="/coursefor" className={`btn-slide-bar-mini`}>
                        <div className={`btn-e`}>Khóa học có phí</div>
                    </Link>
                    <Link href="/coursefor" className={`btn-slide-bar-mini`}>
                        <div className={`btn-e`}>Khóa học miễn phí</div>
                    </Link>
                </div>

                <Link href="/" className={`btn-slide-bar ${isMenu ? 'w-auto' : 'w-268'}`}>
                    <img src='/img/bagfill.svg' className='img block' />
                    <img src='/img/bag.svg' className='img none' />
                    <div className={`btn-e ${isMenu ? 'w-0px' : 'block-text'}`}>Học ngay</div>
                </Link>
                <Link href="/learningPath-FE" className={`btn-slide-bar ${isMenu ? 'w-auto' : 'w-268'}`}>
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