'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button, Image, Nav } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../redux/store';

const LeftSlider: React.FC = () => {
    const pathName = usePathname();
    const [isMenu, setIsMenu] = useState(true);
    const [isCourseOpen, setIsCourseOpen] = useState(false);
    const [headerHeight, setHeaderHeight] = useState(0);
    const [isHidden, setIsHidden] = useState(false);
    const userState = useSelector((state: RootState) => state.user);

    useEffect(() => {
        const checkElementsAndSetHeight = () => {
            const header = document.querySelector('.header-over') as HTMLElement;
            const footer = document.querySelector('footer') as HTMLElement;

            if (header && footer) {
                const setHeight = () => {
                    setHeaderHeight(header.offsetHeight);
                };

                const observer = new ResizeObserver(setHeight);
                observer.observe(header);
                setHeight();

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
                    observer.unobserve(header);
                };
            }
        };

        // Đợi một chút sau khi DOM đã sẵn sàng
        const timeout = setTimeout(checkElementsAndSetHeight, 100);

        return () => clearTimeout(timeout);
    }, [headerHeight]);

    const openMenu = () => {
        setIsMenu(!isMenu);
    };

    const openCourses = () => {
        setIsCourseOpen(!isCourseOpen);
    };

    const offCourse = () => {
        setIsCourseOpen(false);
    }

    const isHome = pathName === '/' || pathName === '/home';

    return (
        <Nav
            className={`slider-bar ${isHidden ? 'hidden' : 'visible-menu'}`}
            style={{ top: `calc(${headerHeight}px + 120px)` }}
        >
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

                <div
                    className={`course-submenu ${isCourseOpen ? 'active' : ''} ${isMenu ? 'p-as' : ''}`}
                    onClick={offCourse}
                >
                    <Image src="/img/index.svg" alt="" className={`logo-mini-menu`} />
                    <Link
                        href={`${userState.user ? `/coursefor/${userState.user.id}` : `/login`}`}
                        className={`btn-slide-bar-mini`}
                    >
                        <div className={`btn-e`}>Khóa học của bạn</div>
                    </Link>
                    <Link
                        href="/coursefor/1"
                        className={`btn-slide-bar-mini`}
                    >
                        <div className={`btn-e`}>Khóa học có phí</div>
                    </Link>
                    <Link
                        href="/course/1"
                        className={`btn-slide-bar-mini`}
                    >
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
                {isMenu ? (
                    <Image src='/img/chevronFill-01.svg' className='menu-img' />
                ) : (
                    <Image src='/img/chevronFill-02.svg' className='menu-img' />
                )}
            </Button>
        </Nav>
    );
};

export default LeftSlider;
